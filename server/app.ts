import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/error.js";

// dotenv
import dotenv from "dotenv";
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

app.use(errorMiddleware);
