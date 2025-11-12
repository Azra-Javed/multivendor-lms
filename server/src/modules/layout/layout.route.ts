import express from "express";
import { createLayout } from "./layout.controller.js";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
const router = express.Router();

router.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);
export default router;
