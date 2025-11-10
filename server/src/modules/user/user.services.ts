import { redis } from "../../utils/redis.js";
import userModel from "./user.model.js";
import { Response } from "express";

// get user by id
export const getUserById = async (id: string) => {
  const userJson = await redis.get(id);

  if (!userJson) {
    throw new Error("User not found");
  }
  const user = JSON.parse(userJson);

  return user;
};

//get all users
export const getAllUsersService = async (res: Response) => {
  const users = await userModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    users,
  });
};
