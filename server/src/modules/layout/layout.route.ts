import express from "express";
import {
  createLayout,
  editLayout,
  getLayoutBYType,
} from "./layout.controller.js";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import { updateToken } from "../user/user.controller.js";
const router = express.Router();

router.post(
  "/create-layout",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);
router.put(
  "/edit-layout",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout
);
router.get("/get-layout/:type", getLayoutBYType);
export default router;
