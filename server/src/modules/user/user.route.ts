import express from "express";
import { isAuthenticated } from "../../middleware/auth.js";
import {
  activateUser,
  getUserInfo,
  loginUser,
  logoutUser,
  registerUser,
  socialAuth,
  updateToken,
} from "./user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, logoutUser);
router.get("/refresh", updateToken);
router.get("/me", isAuthenticated, getUserInfo);
router.post("/social-auth", socialAuth);
export default router;
