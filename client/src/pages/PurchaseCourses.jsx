import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axios";
import { useNavigate, useParams } from "react-router";

export default function PurchaseCourses() {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function getCourseDetails() {
    try {
      const response = await axiosInstance(`/courses/${courseId}`);
      setCourse(response.data.data);
    } catch (error) {
      console.error(error);
      setError("Failed to load course details");
    }
  }

  useEffect(() => {
    getCourseDetails();
  }, []);

  async function handlePurchase() {
    try {
      setLoading(true);
      setError("");
      await axiosInstance.post(`courses/purchase`, {
        courseId: course._id,
      });
      navigate("/user/courses");
    } catch (error) {
      console.error(error);
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!course.title) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-white">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Complete Purchase</h2>
          
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-4">{course.description}</p>
            
            <div className="flex items-baseline space-x-2 mb-4">
              <span className="text-2xl font-medium text-gray-900">₹{course.price}</span>
              <span className="text-sm text-gray-500">one-time payment</span>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-900">Total Amount</span>
                <span className="text-lg font-medium text-gray-900">₹{course.price}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 text-sm text-red-600">{error}</div>
          )}

          <button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "Processing..." : "Complete Payment"}
          </button>

          <p className="mt-4 text-xs text-gray-500 text-center">
            By completing this purchase you agree to our terms and conditions
          </p>
        </div>
      </div>
    </div>
  );
}
