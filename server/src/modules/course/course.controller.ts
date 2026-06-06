import cloudinary from "cloudinary";
import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { CatchAsyncError } from "../../middleware/catchAsyncErrors.js";
import ErrorHandler from "../../utils/ErrorHandler.js";
import { redis } from "../../utils/redis.js";
import CourseModel from "./course.model.js";
import { createCourse, getAllCoursesService } from "./course.services.js";
import {
  IAddAnswerData,
  IAddAnswerToReviewData,
  IAddQuestionData,
  IAddReviewData,
} from "./course.types.js";

import axios from "axios";
import sendMail from "../../utils/sendMail.js";
import NotificationModel from "../notification/notification.model.js";

//@desc: upload course
//@route: POST /api/v1/course/create-course
export const uploadCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      data.createdBy = req.user._id;

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
  },
);

//@desc: edit course
//@route: PUT /api/v1/course/edit-course
export const editCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;

      const courseId = req.params.id!;
      const courseData = (await CourseModel.findById(courseId)) as any;

      if (thumbnail && !thumbnail.startsWith("https")) {
        await cloudinary.v2.uploader.destroy(courseData.thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "courses",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (thumbnail.startsWith("https")) {
        data.thumbnail = {
          public_id: courseData?.thumbnail.public_id,
          url: courseData?.thumbnail.url,
        };
      }

      const course = await CourseModel.findByIdAndUpdate(
        courseId,
        {
          $set: data,
        },
        { new: true },
      );
      // update course in redis
      await redis.set(courseId?.toString(), JSON.stringify(course));

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
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
          "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links",
        );

        await redis.set(courseId, JSON.stringify(course), "EX", 604800);

        res.status(200).json({
          success: true,
          course,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

//@desc: get all courses withour purchasing
//@route: GET /api/v1/course/get-courses
export const getCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await CourseModel.find().select(
        "-courseData.videoUrl -courseData.suggestion -courseData.questions -courseData.links",
      );
      await redis.set("allCourses", JSON.stringify(courses));
      res.status(200).json({
        success: true,
        courses,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

//@desc: get course content -- only for valid user
//@route: GET /api/v1/course/get-course-content/:id
export const getCourseByUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.id;

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found!", 404));
      }

      const user = req.user;

      // check ownership
      const isOwner = course.createdBy.toString() === user._id.toString();

      // check enrollment
      const isEnrolled = user.courses?.some(
        (c: any) => c._id.toString() === courseId,
      );

      // FINAL AUTH CHECK
      if (!isOwner && !isEnrolled) {
        return next(
          new ErrorHandler("You are not eligible to access this course!", 403),
        );
      }

      const content = course.courseData;

      res.status(200).json({
        success: true,
        content,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
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
        item._id.equals(contentId),
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

      //create notification
      await NotificationModel.create({
        userId: req.user._id,
        title: "new Question Received",
        message: `You have a new question in ${courseContent?.title}`,
      });

      // Send response
      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

//@desc: add answer in course
//@route: PUT /api/v1/add-answer
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
        item._id.equals(contentId),
      );
      if (!courseContent) {
        return next(new ErrorHandler("Content not found", 404));
      }

      //  Find question
      const question = courseContent.questions.find((item: any) =>
        item._id.equals(questionId),
      );
      if (!question) {
        return next(new ErrorHandler("Question not found", 404));
      }

      // Create new answer
      const newAnswer: any = {
        user: req.user,
        answer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Add and save
      question?.questionReplies?.push(newAnswer);
      await course.save();

      // Notify or email
      if (req.user._id.toString() !== question.user._id.toString()) {
        await NotificationModel.create({
          userId: question.user._id,
          title: "New Question Reply Received",
          message: `You have a new reply on your question in ${course.name}`,
        });

        const data = {
          name: question.user.name || "User",
          title: courseContent.title,
        };

        try {
          await sendMail({
            email: question.user.email,
            subject: "Question Reply",
            template: "question-reply",
            data,
          });
        } catch (error: any) {
          console.error("Email error:", error);
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
  },
);

//@desc: add review in course
//@route: PUT /api/v1/course/add-review
export const addReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userCourseList = req.user?.courses;
      const courseId = req.params.id!;

      //check courseId alrady exists in userCourseList based on _id
      const courseExists = userCourseList?.some(
        (course: any) => course._id.toString() === courseId?.toString(),
      );

      if (!courseExists) {
        return next(
          new ErrorHandler("You are not eligible to access this course", 400),
        );
      }

      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }
      const { review, rating } = req.body as IAddReviewData;

      const reviewData: any = {
        user: req.user,
        comment: review,
        rating,
      };

      course?.reviews.push(reviewData);
      //calculate average rating
      const total = course.reviews.reduce(
        (sum: number, rev: any) => sum + rev.rating,
        0,
      );
      course.ratings = total / course.reviews.length;

      await course.save();

      //update redis
      await redis.set(courseId, JSON.stringify(course), "EX", 604800);

      const notification = {
        title: "New Review Received",
        message: `${req.user?.name} has given a review in ${course?.name}`,
      };

      //create notification
      await NotificationModel.create({
        userId: req.user._id,
        title: notification.title,
        message: notification.message,
      });

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

//@desc: add reply to review in course
//@route: PUT /api/v1/course/add-reply
export const addReplyToReview = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { comment, courseId, reviewId } =
        req.body as IAddAnswerToReviewData;
      const course = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      const review = course?.reviews?.find(
        (rev: any) => rev._id.toString() === reviewId,
      );
      if (!review) {
        return next(new ErrorHandler("Review not found", 404));
      }

      const replyData: any = {
        user: req.user,
        comment,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      if (!review.commentReplies) {
        review.commentReplies = [];
      }
      review.commentReplies?.push(replyData);
      await course?.save();

      //update redis
      await redis.set(
        courseId.toString(),
        JSON.stringify(course),
        "EX",
        604800,
      );

      res.status(200).json({
        success: true,
        course,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

//@desc: get all courses -- only for admins
//@route: patch /api/v1/user/get-all-courses
export const getAllCourses = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllCoursesService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  },
);

//@desc: delete course -- only for admins
//@route: delete /api/v1/course/delete-course/:id
export const deleteCourse = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const course = await CourseModel.findById(id);
      if (!course) {
        return next(new ErrorHandler("Course not found", 404));
      }

      await course.deleteOne();

      if (id) {
        await redis.del(id);
      }

      res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

//@desc: generate video url
//@route: POST /api/getVideoCipherOTP
export const generateVideoUrl = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { videoId } = req.body;
      const response = await axios.post(
        `https://dev.vdocipher.com/api/videos/${videoId}/otp`,
        { ttl: 300 },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
          },
        },
      );
      res.json(response.data);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  },
);
