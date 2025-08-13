import { Link } from "react-router-dom";

export default function PageNotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 flex-grow min-h-[70vh]">
      {/* Animated 404 */}
      <div className="flex items-center mb-6 select-none">
        <span className="inline-block animate-bounce text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-blue-600 dark:text-blue-400">4</span>
        <span className="inline-block mx-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gray-400 dark:text-gray-600">0</span>
        <span className="inline-block animate-bounce animation-delay-150 text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-blue-600 dark:text-blue-400">4</span>
      </div>

      {/* Message */}
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-4 text-center">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md text-center text-sm sm:text-base">
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
