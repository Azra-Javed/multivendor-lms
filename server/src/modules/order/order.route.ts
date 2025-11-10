import express from "express";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import { createOrder, getAllOrers } from "./order.controller.js";

const router = express.Router();

router.post("/create-order", isAuthenticated, createOrder);
router.get("/get-all-orders", isAuthenticated, authorizeRoles("admin"), getAllOrers);

export default router;