import express from "express";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAllCourses,
  getCourse,
  getCourseByUser,
  getCourses,
  uploadCourse,
} from "./course.controller.js";
import { updateToken } from "../user/user.controller.js";
const router = express.Router();

router.post(
  "/create-course",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
router.put(
  "/edit-course/:id",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
router.get("/get-course/:id", getCourse);
router.get("/get-courses", getCourses);
router.get(
  "/get-course-content/:id",
  updateToken,
  isAuthenticated,
  getCourseByUser
);
router.put("/add-question", updateToken, isAuthenticated, addQuestion);
router.put("/add-answer", updateToken, isAuthenticated, addAnswer);
router.put("/add-review/:id", updateToken, isAuthenticated, addReview);
router.put(
  "/add-reply",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  addReplyToReview
);
router.get(
  "/get-all-courses",
  updateToken,
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCourses
);
router.post("/getVdoCipherOTP", generateVideoUrl);
router.delete("/delete-course/:id", deleteCourse);

export default router;
