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

router.post("/register", registerUser);
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.get("/refresh", updateToken);
router.get("/me", isAuthenticated, getUserInfo);
router.post("/social-auth", socialAuth);
router.patch("/update-user", isAuthenticated, udpateUserInfo);
router.patch("/update-user-password",isAuthenticated, updatePassword)
router.patch("/update-user-avatar",isAuthenticated, updateProfilePicture)
router.get("/get-all-users",isAuthenticated,authorizeRoles("admin"), getAllUsers)
router.post("/update-role",isAuthenticated,authorizeRoles("admin"), updateUserRole)
router.delete("/delete-user/:id",isAuthenticated,authorizeRoles("admin"), deleteUser)



export default router;
