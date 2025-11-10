import NotificationModel from "./notification.model.js";
import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import cron from "node-cron";

//@desc: get all notification --> only for admin
//@route: GET /api/v1/notification/get-all-notifications

export const getNotifications = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: update notification status --> only for admin
//@route: PUT /api/v1/notification/update-status
export const updateNotification = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Update status to "read" and get the updated document
      const notification = await NotificationModel.findByIdAndUpdate(
        req.params.id,
        { status: "read" },
        { new: true }
      );

      if (!notification) {
        return next(new ErrorHandler("Notification not found", 404));
      }

      // Fetch all notifications sorted by latest --> to update the frontend
      const notifications = await NotificationModel.find().sort({
        createdAt: -1,
      });

      res.status(200).json({
        success: true,
        notifications,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: delete notificaions --> only for admin
cron.schedule("0 0 0 * * *", async () => {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  await NotificationModel.deleteMany({
    status: "read",
    createdAt: { $lt: thirtyDaysAgo },
  });
});
