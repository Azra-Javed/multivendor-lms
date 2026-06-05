import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import sendMail from "../../utils/sendMail.js";
import CourseModel, { ICourse } from "../course/course.model.js";
import NotificationModel from "../notification/notification.model.js";
import userModel from "../user/user.model.js";
import { IOrder } from "./order.model.js";
import { getAllOrdersService, newOrder } from "./order.service.js";

import { redis } from "../../utils/redis.js";

//Stripe

import mongoose from "mongoose";
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is missing in environment variables");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2025-11-17.clover",
});

// //@desc: create order
// //@route: PUT /api/v1/order/create-order
// export const createOrder = CatchAsyncError(
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const { courseId, payment_info } = req.body as IOrder;

//       if (payment_info && "id" in payment_info) {
//         const paymentIntentId = payment_info.id as string;
//         const paymentIntent =
//           await stripe.paymentIntents.retrieve(paymentIntentId);

//         if (paymentIntent.status !== "succeeded") {
//           return next(new ErrorHandler("Payment not authorized!", 400));
//         }
//       }

//       const user = await userModel.findById(req.user?._id);

//       const courseExistInUser = user?.courses.some(
//         (course: any) => course._id.toString() === courseId,
//       );

//       if (courseExistInUser) {
//         return next(
//           new ErrorHandler("You have already purchased this course", 400),
//         );
//       }

//       const course = (await CourseModel.findById(courseId)) as ICourse | null;

//       if (!course) {
//         return next(new ErrorHandler("Course not found", 404));
//       }

//       const data: any = {
//         courseId: course._id,
//         userId: user?._id,
//         payment_info,

//         // snapshot fields
//         userName: user?.name,
//         userEmail: user?.email,
//         courseTitle: course.name,
//         price: course.price,
//       };

//       const mailData = {
//         order: {
//           _id: (course._id as any).toString().slice(0, 6),
//           name: course.name,
//           price: course.price,
//           date: new Date().toLocaleDateString("en-US", {
//             year: "numeric",
//             month: "long",
//             day: "numeric",
//           }),
//         },
//       };

//       try {
//         if (user) {
//           await sendMail({
//             email: user.email,
//             subject: "Order Confirmation",
//             template: "order-confirmation",
//             data: mailData,
//           });
//         }
//       } catch (error: any) {
//         return next(new ErrorHandler(error.message, 500));
//       }

//       user?.courses.push(course._id as mongoose.Types.ObjectId);
//       await redis.set(req.user?._id.toString(), JSON.stringify(user));

//       await user?.save();

//       await NotificationModel.create({
//         userId: user?._id,
//         title: "New Order",
//         message: `You have a new order from ${course?.name}`,
//       });

//       course.purchased += 1;
//       await course.save();

//       await newOrder(data, res, next);
//     } catch (error: any) {
//       return next(new ErrorHandler(error.message, 500));
//     }
//   },
// );

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      // Debug logs
      console.log("1. Create order started");

      if (payment_info && "id" in payment_info) {
        console.log("2. Verifying Stripe payment");

        const paymentIntentId = payment_info.id as string;
        const paymentIntent =
          await stripe.paymentIntents.retrieve(paymentIntentId);

        console.log("3. Stripe verification completed");

        if (paymentIntent.status !== "succeeded") {
          return next(new ErrorHandler("Payment not authorized!", 400));
        }
      }

      console.log("4. Finding user");

      const user = await userModel.findById(req.user?._id);

      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId,
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400),
        );
      }

      console.log("5. Finding course");

      const course = (await CourseModel.findById(courseId)) as ICourse | null;

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
        userName: user?.name,
        userEmail: user?.email,
        courseTitle: course.name,
        price: course.price,
      };

      // Update user first
      user?.courses.push(course._id as mongoose.Types.ObjectId);

      console.log("6. Saving user");
      await user?.save();

      // Update Redis AFTER successful DB save
      console.log("7. Updating redis");
      await redis.set(req.user?._id.toString(), JSON.stringify(user));

      // Create notification
      console.log("8. Creating notification");
      await NotificationModel.create({
        userId: user?._id,
        title: "New Order",
        message: `You have a new order from ${course.name}`,
      });

      // Update course stats
      console.log("9. Updating course");
      course.purchased += 1;
      await course.save();

      console.log("10. Creating order");
      await newOrder(data, res, next);

      // Email should NOT block order completion
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

      if (user) {
        sendMail({
          email: user.email,
          subject: "Order Confirmation",
          template: "order-confirmation",
          data: mailData,
        }).catch((error: any) => {
          console.error("Email sending failed:", error);
        });
      }

      console.log("11. Order flow completed");
    } catch (error: any) {
      console.error("Create order error:", error);
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
