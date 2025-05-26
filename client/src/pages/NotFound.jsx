
import { useNavigate } from "react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h2 className="text-6xl font-bold text-black mb-2">404</h2>
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-black text-white px-6 py-2 rounded text-sm hover:bg-gray-800 transition-colors cursor-pointer"
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
}
