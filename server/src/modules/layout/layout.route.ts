import express from "express";
import {
  createLayout,
  editLayout,
  getLayoutBYType,
} from "./layout.controller.js";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
const router = express.Router();

router.post(
  "/create-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  createLayout
);
router.patch(
  "/edit-layout",
  isAuthenticated,
  authorizeRoles("admin"),
  editLayout
);
router.get("/get-layout", getLayoutBYType);
export default router;
