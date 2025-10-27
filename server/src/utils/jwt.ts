import dotenv from "dotenv";
import { Response } from "express";
import { IUser } from "../modules/user/user.model.js";
import { redis } from "./redis.js";

dotenv.config();

// token interface
interface IToken {
  expires: Date;
  maxAge: number; //expiry duration
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

export const sendToken = (user: IUser, statusCode: number, res: Response) => {
  const accessToken = user.signAccessToken();
  const refreshToken = user.signRefreshToken();

  //upload session to redis
  redis.set(String(user._id), JSON.stringify(user));

  //parse environment variables to integrates with fallback values
  const accessTokenExpire = parseInt(
    process.env.ACCESS_TOKEN_EXPIRE || "300",
    10
  );
  const refreshTokenExpire = parseInt(
    process.env.REFRESH_TOKEN_EXPIRE || "1200",
    10
  );

  //options for cookies
  const accessTokenOPtions: IToken = {
    expires: new Date(Date.now() + accessTokenExpire * 1000),
    maxAge: accessTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  const refreshTokenOPtions: IToken = {
    expires: new Date(Date.now() + refreshTokenExpire * 1000),
    maxAge: refreshTokenExpire * 1000,
    httpOnly: true,
    sameSite: "lax",
  };

  //only set secure to true in production
  if (process.env.NODE_ENV === "production") {
    accessTokenOPtions.secure = true;
  }

  res.cookie("access_token", accessToken, accessTokenOPtions);
  res.cookie("refresh_token", refreshToken, refreshTokenOPtions);

  res.status(statusCode).json({
    success: true,
    user,
    accessToken,
  });
};
