
import { useState } from "react";
import { useNavigate } from "react-router";
import { axiosInstance } from "../utils/axios";

export default function CreateCourses() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate price is a number
      const priceNumber = Number(formData.price);
      if (isNaN(priceNumber)) {
        throw new Error("Price must be a valid number");
      }

      // Create course with validated data
      await axiosInstance.post("/courses/create-course", {
        ...formData,
        price: priceNumber,
      });

      // Redirect to admin courses page on success
      navigate("/admin/courses");
    } catch (error) {
      if (error.response?.status === 401) {
        setError("Please sign in to create a course");
        navigate("/auth/login");
      } else if (error.response?.status === 403) {
        setError("You are not authorized to create courses");
      } else {
        setError(error.response?.data?.message || error.message || "Failed to create course");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-normal text-gray-900">Create New Course</h1>
          <p className="mt-2 text-sm text-gray-600">
            Fill in the details below to create your new course
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Course Title
            </label>
            <input
              type="text"
              id="title"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">
              Thumbnail url
            </label>
            <input
              type="text"
              id="thumbnail"
              required
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400"
              value={formData.thumbnail}
              onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price (₹)
            </label>
            <input
              type="number"
              id="price"
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-black text-white py-2 px-4 rounded text-sm hover:bg-gray-800 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? "Creating Course..." : "Create Course"}
          </button>
        </form>
      </div>
    </div>
  );
}
