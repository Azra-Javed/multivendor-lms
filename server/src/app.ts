import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
export const app = express();
import cors from "cors";
import { rateLimit } from "express-rate-limit";
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
    credentials: true,
  }),
);

//api request limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  legacyHeaders: false,
  ipv6Subnet: 56,
});

//routes
app.use(
  "/api/v1/",
  userRouter,
  courseRouter,
  orderRouter,
  NotificationRouter,
  analyticsRouter,
  layoutRouter,
);

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

// Apply the rate limiting middleware to all requests.
app.use(limiter);

//global error middleware
app.use(errorMiddleware);
