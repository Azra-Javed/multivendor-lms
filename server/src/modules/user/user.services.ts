import userModel from "./user.model.js";

// get user by id
export const getUserById = async (id: string) => {
  const user = await userModel.findById(id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
