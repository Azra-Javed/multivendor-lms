import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";
import jwt, { type Secret } from "jsonwebtoken";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import sendMail from "../../utils/sendMail.js";
import userModel from "./user.model.js";

dotenv.config();

// Register user
interface IRegistration {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

interface IActivationToken {
  token: string;
  activationCode: string;
}

const createActivationToken = (user: IRegistration): IActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET as Secret,
    { expiresIn: "5m" }
  );

  return { token, activationCode };
};

export const registerUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    console.log(req.body);

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
