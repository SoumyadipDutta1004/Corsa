
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../../utils/axios";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await axiosInstance.post("/auth/register", formData);
      navigate("/auth/login");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white py-12 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-sm border border-gray-100">
        <h2 className="text-2xl font-normal text-gray-900 mb-6">Register</h2>
        <p className="text-sm text-gray-600 mb-8">Create a new account to get started.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-gray-400"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded text-sm hover:bg-gray-800 transition-colors"
          >
            Create Account
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/auth/login" className="text-black hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

