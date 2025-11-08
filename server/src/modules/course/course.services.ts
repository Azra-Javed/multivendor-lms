import { NextFunction, Response } from "express";
import CourseModel from "./course.model.js";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors.js";

//create course
export const createCourse = CatchAsyncError(async (data: any, res: Response, next: NextFunction) => {
  const course = await CourseModel.create(data);
  return res.status(201).json({
    success: true,
    course,
  });
});

