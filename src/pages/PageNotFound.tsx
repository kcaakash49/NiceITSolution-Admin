
import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 flex-grow">
      {/* Animated 404 */}
      <div className="text-9xl font-extrabold mb-6 select-none">
        <span className="inline-block animate-bounce text-blue-600 dark:text-blue-400">4</span>
        <span className="inline-block mx-4 text-gray-400 dark:text-gray-600">0</span>
        <span className="inline-block animate-bounce animation-delay-150 text-blue-600 dark:text-blue-400">4</span>
      </div>

      {/* Message */}
      <h1 className="text-3xl md:text-4xl font-semibold mb-4 text-center">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md text-center">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Back to home button */}
      <Link
        to="/dashboard"
        className="inline-block bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition"
      >
        Go Back Home
      </Link>
    </div>
  );
}
