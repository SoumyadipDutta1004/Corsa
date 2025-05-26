import { Course } from "../models/course.model.js";
import { Purchase } from "../models/purchase.model.js";
import {
  filterCoursesBySearch,
  sendCourseResponse,
} from "../utils/course.utils.js";


async function getCourse(req, res) {
  const { courseId } = req.params;
  
  try {
    const course = await Course.findOne({ _id:courseId }).populate("creatorId", "name email");

    if (!course) {
      return res.status(404).json({
        message: "course not found",
      });
    }

    return sendCourseResponse(
      res,
      course,
      "Course fetched successfully"
    );
  } catch (error) {
    console.error(`Error fetching courses in getCourses: ${error.message}`);
    res.status(500).json({
      message: "Failed to fetch course",
      error: error.message,
    });
  }
}

async function exploreCourses(req, res) {
  const { search = "all" } = req.query;  

  try {
    const courses = await Course.find({}).populate("creatorId", "name email");

    if (courses.length === 0) {
      return res.status(404).json({
        message: "No courses found",
      });
    }
    const filteredCourses = filterCoursesBySearch(courses, search);

    return sendCourseResponse(
      res,
      filteredCourses,
      "Courses fetched successfully"
    );
  } catch (error) {
    console.error(`Error fetching courses in exploreCourses: ${error.message}`);
    res.status(500).json({
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
}

async function getUserCourses(req, res) {
  const { search = "all" } = req.query;
  const userId = req.user._id;

  try {
    const courses = await Purchase.find({ userId }).populate({
      path: "courseId",
      populate: {
        path: "creatorId",
        select: "name email",
      },
    });

    if (courses.length === 0) {
      return res.status(404).json({
        message: "No courses found",
      });
    }
    const courseList = courses.map((purchase) => purchase.courseId);
    const filteredCourses = filterCoursesBySearch(courseList, search);

    return sendCourseResponse(
      res,
      filteredCourses,
      "Courses fetched successfully"
    );
  } catch (error) {
    console.error(`Error fetching courses in getUserCourses: ${error.message}`);
    res.status(500).json({
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
}

async function getAdminCourses(req, res) {
  const { search = "all" } = req.query;
  const creatorId = req.user._id;

  try {
    const courses = await Course.find({ creatorId }).populate(
      "creatorId",
      "name email"
    );

    if (courses.length === 0) {
      return res.status(404).json({
        message: "No courses found",
      });
    }

    const filteredCourses = filterCoursesBySearch(courses, search);
    return sendCourseResponse(
      res,
      filteredCourses,
      "Courses fetched successfully"
    );
  } catch (error) {
    console.error(
      `Error fetching courses in getAdminCourses: ${error.message}`
    );
    res.status(500).json({
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
}

async function createCourse(req, res) {
  const { title, description, thumbnail, price } = req.body;
  const creatorId = req.user._id;

  try {
    await Course.create({
      title,
      description,
      price,
      thumbnail,
      creatorId,
    });

    res.status(201).json({
      message: "Course created successfully",
    });
  } catch (error) {
    console.error(`Error creating course in createCourse: ${error.message}`);
    res.status(500).json({
      message: "Failed to create course",
      error: error.message,
    });
  }
}

async function purchaseCourse(req, res) {
  const { courseId } = req.body;
  const userId = req.user._id;

  try {
    await Purchase.create({
      courseId,
      userId,
    });

    res.status(201).json({
      message: "Course purchased successfully",
    });
  } catch (error) {
    console.error(
      `Error purchasing course in purchaseCourse: ${error.message}`
    );
    res.status(500).json({
      message: "Failed to purchase course",
      error: error.message,
    });
  }
}

export {
  getCourse,
  exploreCourses,
  purchaseCourse,
  getUserCourses,
  getAdminCourses,
  createCourse,
};
