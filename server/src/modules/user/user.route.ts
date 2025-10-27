import express from "express";
import {
  activateUser,
  loginUser,
  logoutUser,
  registerUser,
} from "./user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/activate-user", activateUser);
router.post("/login", loginUser);
router.delete("/logout", logoutUser);
export default router;
