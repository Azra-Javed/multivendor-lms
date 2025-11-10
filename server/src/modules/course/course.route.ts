import express from "express";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import {
  addAnswer,
  addQuestion,
  addReplyToReview,
  addReview,
  editCourse,
  getAllCourses,
  getCourse,
  getCourseByUser,
  getCourses,
  uploadCourse,
} from "./course.controller.js";
const router = express.Router();

router.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);
router.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);
router.get("/get-course/:id", getCourse);
router.get("/get-courses", getCourses);
router.get("/get-course-content/:id", isAuthenticated, getCourseByUser);
router.put("/add-question", isAuthenticated, addQuestion);
router.put("/add-answer", isAuthenticated, addAnswer);
router.put("/add-review/:id", isAuthenticated, addReview);
router.put("/add-reply", isAuthenticated,authorizeRoles("admin"), addReplyToReview);
router.get("/get-all-courses", isAuthenticated,authorizeRoles("admin"), getAllCourses);

export default router;
