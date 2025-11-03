import { redis } from "../../utils/redis.js";
import userModel from "./user.model.js";

// get user by id
export const getUserById = async (id: string) => {
  const userJson = await redis.get(id);

  if (!userJson) {
    throw new Error("User not found");
  }
  const user = JSON.parse(userJson);

  return user;
};
