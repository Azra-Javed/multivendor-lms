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
import { newOrder } from "./order.service.js";
import { fileURLToPath } from "url";

//@desc: create order
//@route: PUT /api/v1/order/create-order

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      const user = await userModel.findById(req.user?._id);
      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("You have already purchased this course", 400)
        );
      }

      const course = await CourseModel.findById(courseId) as ICourse | null;

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

      // create __dirname in ES module
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);

      const html = await ejs.renderFile(
        path.join(__dirname, "../../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user!.email,
            subject: "Order Confirmation",
            template: "order-confirmation",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push(course._id);

      await user?.save();

      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
      });

       if(course.purchased){
        course.purchased +=1;
       }

       await course.save();
       await newOrder(data, res, next);

    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
