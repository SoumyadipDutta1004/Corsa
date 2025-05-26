import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { useNavigate } from "react-router";

export default function UserCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function getMyCourses() {
    try {
      setLoading(true);
      setError("");
      const response = await axiosInstance.get("/user/purchased-courses");
      setMyCourses(response.data.data || []);
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Please sign in to view your courses");
      } else if (error.response?.status === 404) {
        setError("You haven't purchased any courses yet");
      } else {
        setError("Failed to load your courses");
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMyCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <p className="text-gray-600">Loading your courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-4">
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
    );
  }

  return (
    <div className="min-h-screen w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">My Courses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white border border-gray-100 rounded shadow-sm overflow-hidden"
            >
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={
                    course.thumbnail ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsqiOYwKF0MXIJXkB_hGpia15XovyFYLStaQ&s"
                  }
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {course.description}
                </p>

                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>Created by</span>
                  <span className="font-medium text-gray-900">
                    {course.creatorId?.name}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/course/${course._id}`)}
                  className="mt-4 w-full bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
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
