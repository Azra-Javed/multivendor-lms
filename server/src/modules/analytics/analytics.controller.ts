import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors.js";
import { generateLast12MonthData } from "../../utils/analytics-generator.js";
import userModel from "../user/user.model.js";
import CourseModel from "../course/course.model.js";
import OrderModel from "../order/order.model.js";

//@desc: get users analytics -> last 12 month
//@routr: GET /api/v1/analytics/get-users-analytics
export const getUsersAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await generateLast12MonthData(userModel);

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: get courses analytics -> last 12 month
//@routr: GET /api/v1/analytics/get-courses-analytics
export const getCoursesAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await generateLast12MonthData(CourseModel);

      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: get courses analytics -> last 12 month
//@routr: GET /api/v1/analytics/get-courses-analytics
export const getOrdersAnalytics = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await generateLast12MonthData(OrderModel);

      res.status(200).json({
        success: true,
        orders,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
