
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../../utils/axios";
import { useUserStore } from "../../utils/store";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const user = await axiosInstance.post("/auth/login", formData);
      setUser(user.data.user);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white py-12 px-4">
      <div className="w-full max-w-sm bg-white p-8 rounded shadow-sm border border-gray-100">
        <h2 className="text-2xl font-normal text-gray-900 mb-6">Login</h2>
        <p className="text-sm text-gray-600 mb-8">Please enter your username and password to login.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
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
                autoComplete="current-password"
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
            className="w-full bg-black text-white py-2 px-4 rounded text-sm hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Sign in
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <Link to="/auth/register" className="text-black hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
