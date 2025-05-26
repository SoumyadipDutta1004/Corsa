import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../utils/axios";

export default function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});

  const redirect = useNavigate();

  async function getCourseDetails() {
    try {
      const response = await axiosInstance(`/courses/${courseId}`);
      setCourse(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCourseDetails();
  }, []);

  if (!course.title) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white p-8 rounded shadow-sm border border-gray-100">
          <div className="w-full aspect-4/2 rounded overflow-hidden">
            <img
              src={
                course.thumbnail ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsqiOYwKF0MXIJXkB_hGpia15XovyFYLStaQ&s"
              }
              alt={course.title}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4">
            {course.title}
          </h1>

          <div className="prose prose-sm text-gray-600 mb-8">
            <p>{course.description}</p>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <p className="text-sm text-gray-600">Created by</p>
            <p className="text-sm font-medium text-gray-900">
              {course.creatorId?.name}
            </p>
          </div>

          <div className="flex items-center justify-between py-4 border-t border-gray-100">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-medium text-gray-900">
                ₹{course.price}
              </span>
              <span className="text-sm text-gray-500">one-time payment</span>
            </div>

            <button
              onClick={() => {
                redirect(`/purchase-course/${courseId}`);
              }}
              className="bg-black text-white px-6 py-2 rounded text-sm hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Purchase Course
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
