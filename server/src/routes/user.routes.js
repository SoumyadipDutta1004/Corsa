// - Add route skeleton for user login, sign-up, sees the purchased courses course
import { Router } from "express";
import userMiddleware from "../middlewares/user.middleware.js";
import { getUserCourses } from "../controllers/course.controllers.js";

const router = Router();

router.get("/purchased-courses", userMiddleware, getUserCourses);

export default router;
