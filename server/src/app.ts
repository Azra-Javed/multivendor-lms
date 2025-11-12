import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/error.js";
import userRouter from "./modules/user/user.route.js";
import courseRouter from "./modules/course/course.route.js";
import orderRouter from "./modules/order/order.route.js";
import NotificationRouter from "./modules/notification/notificaion.route.js";
import analyticsRouter from "./modules/analytics/analytics.route.js";
import layoutRouter from "./modules/layout/layout.route.js";

// dotenv
dotenv.config();

//body parser
app.use(express.json({ limit: "50mb" }));

//cookie parser
app.use(cookieParser());

//cors => cross origin resource sharing
app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);

//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/notification", NotificationRouter);
app.use("/api/v1/analytics", analyticsRouter);
app.use("/api/v1/layout", layoutRouter);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "api is working",
  });
});

// unknown route handler
app.all(/.*/, (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Route ${req.originalUrl} not found`) as Error & {
    statusCode?: number;
  };
  error.statusCode = 404;
  next(error);
});

//global error middleware
app.use(errorMiddleware);
