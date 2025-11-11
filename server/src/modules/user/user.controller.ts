import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, type Secret } from "jsonwebtoken";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import sendMail from "../../utils/sendMail.js";
import userModel from "./user.model.js";
import { IUser } from "./user.model.js";
import cloudinary from "cloudinary";

import {
  IActivateUser,
  IActivationToken,
  ILogin,
  IRegistration,
  IsocialAuth,
  IUpdateUserInfo,
  IUpdateUserPassword,
} from "./user.types.js";
import {
  accessTokenOPtions,
  refreshTokenOPtions,
  sendToken,
} from "../../utils/jwt.js";
import { redis } from "../../utils/redis.js";
import {
  getAllUsersService,
  getUserById,
  updateUserRoleService,
} from "./user.services.js";

dotenv.config();

const createActivationToken = (user: IRegistration): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as Secret,
    { expiresIn: "5m" }
  );

  return { token, activationCode };
};

//@desc: register user
//@route: POST /api/v1/user/register
export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!password || password.length < 6) {
      return next(
        new ErrorHandler("Password must be at least 6 characters", 400)
      );
    }

    // Check existing user
    const isEmailExists = await userModel.findOne({ email });
    if (isEmailExists) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    // Create activation token
    const user: IRegistration = { name, email, password };
    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;

    // Prepare template data
    const data = { user: { name: user.name }, activationCode };

    // Send activation mail
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        template: "activation-mail",
        data,
      });

      res.status(201).json({
        success: true,
        message: `Please check your email (${user.email}) to activate your account.`,
        activationToken: activationToken.token,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//@desc: activate user
//@route: POST /api/v1/user/activate-user
export const activateUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { activation_token, activation_code } = req.body as IActivateUser;

    //verify token
    const payload = jwt.verify(
      activation_token,
      process.env.ACTIVATION_SECRET as string
    ) as { user: IUser; activationCode: string };

    if (payload.activationCode !== activation_code) {
      return next(new ErrorHandler("Invalid activation code", 400));
    }

    const { name, email, password } = payload.user;
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    res.status(201).json({
      success: true,
    });
  }
);

//@desc: login user
//@route: POST /api/v1/user/login
export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as ILogin;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(new ErrorHandler("Invalid email or password", 400));
    }

    sendToken(user, 200, res);
  }
);

//@desc: logout user
//@route: POST /api/user/v1/logout
export const logoutUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("access_token", "", { maxAge: 1 });
    res.cookie("refresh_token", "", { maxAge: 1 });

    const userId = req.user?._id || req.user?.id;

    await redis.del(userId.toString());
    res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  }
);

//@desc: update access token
//@route: GET /api/v1/user/refresh
export const updateToken = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const refresh_token = req.cookies.refresh_token as string;

      if (!refresh_token) {
        return next(new ErrorHandler("No refresh token provided", 400));
      }

      const decoded = jwt.verify(
        refresh_token,
        process.env.REFRESH_TOKEN as string
      ) as JwtPayload;

      if (!decoded || !decoded.id) {
        return next(new ErrorHandler("Invalid refresh token", 400));
      }

      const session = await redis.get(decoded.id);
      if (!session) {
        return next(new ErrorHandler("Session expired or invalid", 400));
      }

      const user = JSON.parse(session);

      const accessToken = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN as string,
        { expiresIn: "5m" }
      );

      const refreshToken = jwt.sign(
        { id: user._id },
        process.env.REFRESH_TOKEN as string,
        {
          expiresIn: "7d",
        }
      );

      // Optionally refresh Redis session TTL
      await redis.set(decoded.id, JSON.stringify(user));
      req.user = user;

      // Send new access token as cookie
      res.cookie("access_token", accessToken, accessTokenOPtions);
      res.cookie("refresh_token", refreshToken, refreshTokenOPtions);

      return res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error) {
      return next(new ErrorHandler("Could not refresh token", 400));
    }
  }
);

//@desc: get user info
//@route: GET /api/v1/user/userInfo
export const getUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?._id;
      if (!userId) {
        return next(new ErrorHandler("User not authenticated", 401));
      }
      const user = await getUserById(userId.toString());
      res.status(200).json({ success: true, user });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//@desc: social auth
//@route: Post /api/v1/user/social-auths
export const socialAuth = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, name, avatar } = req.body as IsocialAuth;
      const user = await userModel.findOne({ email });
      if (!user) {
        const newUser = await userModel.create({ email, name, avatar });
        sendToken(newUser, 200, res);
      } else {
        sendToken(user, 200, res);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//@desc: update user info
//@route: patch /api/v1/user/update-user

export const udpateUserInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email } = req.body as IUpdateUserInfo;
      const userId = req.user?._id;
      if (!userId) {
        return next(new ErrorHandler("User not authenticated", 401));
      }
      const user = await userModel.findById(userId);

      if (email && user) {
        const isEmailExists = await userModel.findOne({ email });
        if (isEmailExists) {
          return next(new ErrorHandler("Email already exist", 400));
        }
        user.email = email;
      }

      if (name && user) {
        user.name = name;
      }

      await user?.save();

      //update reids data
      await redis.set(userId.toString(), JSON.stringify(user));
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//@desc: update user password
//@route: patch /api/v1/user/update-password
export const updatePassword = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { oldPassword, newPassword } = req.body as IUpdateUserPassword;

      const user = await userModel.findById(req.user?._id).select("+password");

      if (!oldPassword || !newPassword) {
        return next(
          new ErrorHandler("Please provide both old and new passwords", 400)
        );
      }

      if (user?.password === undefined) {
        return next(
          new ErrorHandler(
            "Password change is not allowed for social login accounts",
            400
          )
        );
      }

      const isPasswordMatch = await user?.comparePassword(oldPassword);
      if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid old password", 400));
      }

      user.password = newPassword;
      await user.save();

      await redis.set(req.user._id.toString(), JSON.stringify(user));

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//@desc: update user profile avatar
//@route: patch /api/v1/user/update-avatar
export const updateProfilePicture = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { avatar } = req.body;
      const userId = req.user._id;

      const user = await userModel.findById(userId);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      //if  user already has an avatar, delete the old one
      if (user?.avatar?.public_id) {
        await cloudinary.v2.uploader.destroy(user?.avatar?.public_id);
      }

      //upload new avatar
      const myCloud = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
      });

      //update user document
      user.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };

      await user.save();

      await redis.set(userId.toString(), JSON.stringify(user));
      res.status(200).json({
        success: true,
        message: "Profile picture updated successfully",
        avatar: user.avatar,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//@desc: get all users -- only for admins
//@route: patch /api/v1/user/get-all-users
export const getAllUsers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllUsersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

//@desc: update user role -- only for admins
//@route: patch /api/v1/user/update-role
export const updateUserRole = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id, role } = req.body;
      updateUserRoleService(id, role, res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: delete user -- only for admins
//@route: delete /api/v1/user/delete-user/:id
export const deleteUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const user = await userModel.findById(id);
      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      await user.deleteOne();

      if (id) {
        await redis.del(id);
      }

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
