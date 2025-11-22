import express from "express";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import { createOrder, getAllOrers } from "./order.controller.js";
import { updateToken } from "../user/user.controller.js";

const router = express.Router();

router.post("/create-order", updateToken, isAuthenticated, createOrder);
router.get(
  "/get-all-orders",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrers
);

export default router;
