import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-7xl font-bold text-blue-600">404</h1>

      <h2 className="text-3xl font-bold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-600 mt-3 max-w-md">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-xl"
      >
        Go Home
      </Link>
    </div>
  );
}