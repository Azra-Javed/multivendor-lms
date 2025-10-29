import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import jwt, { type Secret } from "jsonwebtoken";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import sendMail from "../../utils/sendMail.js";
import userModel from "./user.model.js";
import { IUser } from "./user.model.js";

import {
  IActivateUser,
  IActivationToken,
  ILogin,
  IRegistration,
} from "./user.types.js";
import { send } from "process";
import { sendToken } from "../../utils/jwt.js";
import { redis } from "../../utils/redis.js";

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
//@route: POST /api/user/v1/register
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
//@route: POST /api/user/v1/activate-user
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
//@route: POST /api/user/v1/login
export const loginUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as ILogin;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");
    console.log(user);

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

    await redis.del(userId);
    res.status(200).json({
      success: true,
      message: "User logout successfully",
    });
  }
);
