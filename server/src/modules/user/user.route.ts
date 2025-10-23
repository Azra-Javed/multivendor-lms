import express from "express";
import { activateUser, registerUser } from "./user.controller.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/activate-user", activateUser);
export default router;
