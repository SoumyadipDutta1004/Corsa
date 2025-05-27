import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { Link, useNavigate } from "react-router";
import { useCourseStore } from "../utils/store";

export default function AdminCourses() {
  const navigate = useNavigate();
  const [adminCourses, setAdminCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const setCourse = useCourseStore((state) => state.setCourse);
  const [error, setError] = useState("");

  async function getMyCourses() {
    try {
      const response = await axiosInstance.get("/courses/admin");
      setAdminCourses(response.data.data);
      setError("");
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Please sign in to view your courses");
      } else if (error.response?.status === 403) {
        setError("You are not authorized to access this page");
      }else if (error.response?.status === 404) {
        setError("You haven't created any courses yet");
      } else {
        setError("Failed to fetch courses. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  }

  function viewCourse(courseId, course) {
    setCourse(course);
    navigate(`/course/${courseId}`);
  }

  useEffect(() => {
    getMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-gray-600">Loading your courses...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
        <p className="text-gray-900 font-medium mb-4">{error}</p>
          {error.includes("sign in") && (
          <button
            onClick={() => navigate("/auth/login")}
            className="bg-black text-white px-6 py-2 rounded text-sm hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Sign In
          </button>
        )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-normal text-gray-900">Your Courses</h1>
          <Link
            to="/admin/create-course"
            className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
          >
            Create New Course
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminCourses.map((course) => (
            <div
              key={course._id}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-2">{course.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-900 font-medium">₹{course.price}</div>
                  <div className="text-sm text-gray-500">{course.creatorId.name}</div>
                </div>
                <button
                  onClick={() => viewCourse(course._id, course)}
                  className="block w-full bg-black text-white text-center py-2 rounded text-sm hover:bg-gray-800 transition-colors"
                >
                  View Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
