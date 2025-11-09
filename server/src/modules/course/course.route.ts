import express from "express";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import {
  addAnswer,
  addQuestion,
  editCourse,
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


export default router;
