import express from "express";
import {
  activateUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./user.controller.js";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.post("/logout", isAuthenticated, authorizeRoles("admin"), logoutUser);
export default router;
