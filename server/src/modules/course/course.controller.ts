import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import cloudinary from "cloudinary";
import { createCourse } from "./course.services.js";
import CourseModel from "./course.model.js";
import { redis } from "../../utils/redis.js";
import { IAddAnswerData, IAddQuestionData } from "./course.types.js";
import mongoose from "mongoose";
import path from "path";
import ejs from "ejs";
import sendMail from "../../utils/sendMail.js";
import { fileURLToPath } from "url";

//@desc: upload course
//@route: POST /api/v1/course/create-course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      // Check if thumbnail exists
      if (data.thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(data.thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      await createCourse(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: edit course
//@route: PUT /api/v1/course/edit-course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;

      if (thumbnail) {
        await cloudinary.v2.uploader.destroy(thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      const courseId = req.params.id;
      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: get single course withour purchasing
//@route: GET /api/v1/course/get-course
export const getCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id!;
      const isCacheExist = await redis.get(courseId);

      if (isCacheExist) {
        const course = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          course,
        });
      } else {
        const course = await CourseModel.findById(req.params.id).select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );

        await redis.set(courseId, JSON.stringify(course));
        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: get all courses withour purchasing
//@route: GET /api/v1/course/get-courses
export const getCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const isCacheExist = await redis.get("allCourses");
      if (isCacheExist) {
        const courses = JSON.parse(isCacheExist);
        res.status(200).json({
          success: true,
          courses,
        });
      } else {
        const courses = await CourseModel.find().select(
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links"
        );
        await redis.set("allCourses", JSON.stringify(courses));
        res.status(200).json({
          success: true,
          courses,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: get course content -- only for valid user
//@route: GET /api/v1/course/get-course-content/:id
export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id;

      const courseExists = userCourseList?.find(
        (course: any) => course._id.toString() === courseId
      );
      if (!courseExists) {
        return next(
          new ErrorHandler("You are not eligible to access this course!", 404)
        );
      }

      const course = await CourseModel.findById(courseId);
      const content = course?.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: add question in course
//@route: PUT /api/v1/course/add-question
export const addQuestion = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, courseId, contentId }: IAddQuestionData = req.body;

      //  Find course
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      //  Validate content ID format
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }

      //  Find course content
      const courseContent = course.courseData.find((item: any) =>
        item._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler("Content not found", 404));
      }

      // Create question object
      const newQuestion: any = {
        user: req.user,
        question,
        questionReplies: [],
      };

      // Add question to content and save
      courseContent.questions.push(newQuestion);
      await course.save();

      // Send response
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

//@desc: add question in course
//@route: PUT /api/v1/course/add-question
export const addAnswer = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, contentId, courseId, questionId }: IAddAnswerData =
        req.body;

      // Find course
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      // Validate IDs
      if (!mongoose.Types.ObjectId.isValid(contentId)) {
        return next(new ErrorHandler("Invalid content id", 400));
      }
      if (!mongoose.Types.ObjectId.isValid(questionId)) {
        return next(new ErrorHandler("Invalid question id", 400));
      }

      // Find course content
      const courseContent = course.courseData.find((item: any) =>
        item._id.equals(contentId)
      );
      if (!courseContent) {
        return next(new ErrorHandler("Content not found", 404));
      }

      //  Find question
      const question = courseContent.questions.find((item: any) =>
        item._id.equals(questionId)
      );
      if (!question) {
        return next(new ErrorHandler("Question not found", 404));
      }

      // Create new answer
      const newAnswer: any = {
        user: req.user,
        answer,
      };

      // Add and save
      question?.questionReplies?.push(newAnswer);
      await course.save();

      // Notify or email
      if (req.user._id === question.user._id) {
        // Create notification logic here
      } else {
        const data = {
          name: question.user.name || "User",
          title: courseContent.title,
        };

        // Recreate __dirname in ES module
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const html = await ejs.renderFile(
          path.join(__dirname, "../../mails/question-reply.ejs"),
          data
        );

        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Reply",
            template: "question-reply",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }

      //  Response
      return res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
