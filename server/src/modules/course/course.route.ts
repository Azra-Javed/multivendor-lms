import express from "express";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth.js";
import {
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

export default router;
