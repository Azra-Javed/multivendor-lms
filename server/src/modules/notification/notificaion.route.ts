import express from "express";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import {
  getNotifications,
  updateNotification,
} from "./notification.controller.js";
import { updateToken } from "../user/user.controller.js";

const router = express.Router();

router.get(
  "/get-all-notifications",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getNotifications
);
router.put(
  "/update-notification/:id",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  updateNotification
);

export default router;
