import { NextFunction, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors.js";
import OrderModel from "./order.model.js";

//create new order
export const newOrder = CatchAsyncError(
  async (data: any, res:Response, next: NextFunction) => {
    const order = await OrderModel.create(data);
    return res.status(201).json({
        success: true,
        message: "Order created and email sent successfully",
        order,
      });
  }
);

//get all orders
export const getAllOrdersService = async (res: Response) => {
  const orders = await OrderModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    orders,
  });
};
