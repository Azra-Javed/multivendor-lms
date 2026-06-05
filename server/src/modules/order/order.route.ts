import express from "express";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import {
  createOrder,
  getAllOrers,
  getStripePublishableKey,
  newPayment,
} from "./order.controller.js";
import { updateToken } from "../user/user.controller.js";

const router = express.Router();

router.post("/create-order", updateToken, isAuthenticated, createOrder);
router.get(
  "/get-orders",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrers,
);
router.get("/payment/stripepublishablekey", getStripePublishableKey);
router.post("/payment", isAuthenticated, newPayment);
export default router;
