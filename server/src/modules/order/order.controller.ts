import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import OrderModel from "./order.model.js";
import { IOrder } from "./order.model.js";
import userModel from "../user/user.model.js";
import CourseModel, { ICourse } from "../course/course.model.js";
import path from "path";
import ejs from "ejs";
import sendMail from "../../utils/sendMail.js";
import NotificationModel from "../notification/notification.model.js";
import { getAllOrdersService, newOrder } from "./order.service.js";
import { fileURLToPath } from "url";
import { redis } from "../../utils/redis.js";

//Stripe

import Stripe from "stripe";
import mongoose from "mongoose";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
});

//@desc: create order
//@route: PUT /api/v1/order/create-order
export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      if (payment_info && "id" in payment_info) {
        const paymentIntentId = payment_info.id as string;
        const paymentIntent =
          await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status !== "succeeded") {
          return next(new ErrorHandler("Payment not authorized!", 400));
        }
      }

      const user = await userModel.findById(req.user?._id);

      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId,
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400),
        );
      }

      const course = (await CourseModel.findById(courseId)) as ICourse | null;

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const mailData = {
        order: {
          _id: (course._id as any).toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push(course._id as mongoose.Types.ObjectId);
      await redis.set(req.user?._id.toString(), JSON.stringify(user));

      await user?.save();

      await NotificationModel.create({
        userId: user?._id,
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
      });

      course.purchased += 1;
      await course.save();

      await newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
//@desc: get all orders -- only for admins
//@route: patch /api/v1/user/get-all-orders
export const getAllOrers = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  },
);

//@desc: send stripe publishable key
//@route: GET /api/v1/getPublishAbleKey
export const getStripePublishableKey = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!process.env.STRIPE_PUBLISHABLE_KEY) {
      return next(new ErrorHandler("Stripe publishable key not found", 500));
    }

    res.status(200).json({
      publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  },
);

//@desc: new payment
//@route: GET /api/v1/newPayment
export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "USD",
        metadata: {
          description: "E-Learning",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(200).json({
        success: true,
        clientSecret: myPayment.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);
