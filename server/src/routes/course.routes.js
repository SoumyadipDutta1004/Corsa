// - Add route skeleton for courses purchase a course, sees all courses
import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware.js";
import {
  createCourse,
  exploreCourses,
  getAdminCourses,
  getCourse,
  purchaseCourse,
} from "../controllers/course.controllers.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = Router();

// User routes
router.post("/purchase", userMiddleware, purchaseCourse);

// Admin routes
router.get("/admin", adminMiddleware, getAdminCourses);
router.post("/create-course", adminMiddleware, createCourse);

// General routes
router.get("/explore", exploreCourses);
router.get("/:courseId", getCourse);

export default router;
