import express from "express";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import {
  activateUser,
  deleteUser,
  getAllUsers,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  udpateUserInfo,
  updatePassword,
  updateProfilePicture,
  updateToken,
  updateUserRole,
} from "./user.controller.js";

const router = express.Router();

router.post("/registeration", registerUser);
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.get("/logout", updateToken, isAuthenticated, logoutUser);
router.get("/refresh", updateToken);
router.get("/me", updateToken, isAuthenticated, getUserInfo);
router.post("/social-auth", socialAuth);
router.patch("/update-user", updateToken, isAuthenticated, udpateUserInfo);
router.patch(
  "/update-user-password",
  updateToken,
  isAuthenticated,
  updatePassword
);
router.patch(
  "/update-user-avatar",
  updateToken,
  isAuthenticated,
  updateProfilePicture
);
router.get(
  "/get-all-users",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllUsers
);
router.post(
  "/update-role",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateUserRole
);
router.delete(
  "/delete-user/:id",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  deleteUser
);

export default router;
