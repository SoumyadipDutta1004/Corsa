import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { useNavigate } from "react-router";
import { useCourseStore } from "../utils/store";

export default function ExploreCourses() {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("all");

  const setCourse = useCourseStore((state) => state.setCourse);

  const redirect = useNavigate();

  async function fetchCourses() {
    if (searchTerm === " ") {
      setSearchTerm("all");
    }
    try {
      const response = await axiosInstance.get(
        `/courses/explore?search=${searchTerm}`
      );
      setCourses(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  function handlePurchase(course) {
    setCourse(course);
    redirect(`/course/${course._id}`);
  }

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="min-h-screen w-full py-24">
      {/* Search Bar */}
      <div className="w-full flex justify-center items-center gap-2">
        <input
          type="text"
          placeholder="Search Courses"
          className="w-1/3 border border-gray-300 rounded-lg py-2 px-4 outline-none"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchCourses();
            }
          }}
        />
        <button
          className="bg-black py-2 px-5 rounded-lg text-white cursor-pointer"
          onClick={fetchCourses}
        >
          Search
        </button>
      </div>

      {/* Course Container */}
      <div className="w-full min-h-[600px] px-6 md:px-12 lg:px-24 mt-20">
        {courses.length === 0 && (
          <div className="w-full h-full flex justify-center items-center">
            <h1 className="text-xl md:text-3xl lg:text-2xl xl:text-3xl font-bold text-neutral-600">
              No Courses Found
            </h1>
          </div>
        )}
        <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <div
              key={i}
              className={`rounded-xl aspect-3/2 shadow-xl relative overflow-hidden cursor-pointer`}
              onClick={() => handlePurchase(course)}
            >
              <img
                src={
                  course.thumbnail ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsqiOYwKF0MXIJXkB_hGpia15XovyFYLStaQ&s"
                }
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-t from-black to-transparent" />
              <div className="absolute bottom-0 left-0 py-6 px-4">
                <h1 className="text-xl md:text-2xl lg:text-xl xl:text-xl font-bold text-white">
                  {course.title}
                </h1>
                <p className="text-xs md:text-sm lg:text- text-neutral-400">
                  {course.description}
                </p>
                <p className="text-base md:text-lg font-bold text-white mt-2">
                  ₹{course.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
