import { Link } from "react-router";
import notFound from '/page-not-found.svg'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 px-4">
      <img className="w-96" src={notFound} alt="Not Found" />
      <p className="text-2xl md:text-3xl font-semibold mt-4 text-gray-700">
        Oops! Page not found.
      </p>
      <p className="mt-2 text-gray-500">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
