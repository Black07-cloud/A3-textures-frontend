import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-8xl font-extrabold text-yellow-400">
          404
        </h1>

        <h2 className="text-4xl font-bold text-white mt-6">
          Page Not Found
        </h2>

        <p className="text-slate-400 mt-4">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-500"
        >
          Go Back Home
        </Link>

      </div>

    </div>
  );
}