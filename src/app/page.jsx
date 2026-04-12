"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
          Zero to Web Hero Quiz
        </h1>

        <p className="text-gray-400 text-lg mb-8">
          Master web development from scratch. Practice quizzes, test your
          knowledge, and become a pro step by step.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4 flex-wrap">
          {!isLoggedIn ? (
            <>
              <a
                href="/login"
                className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
              >
                Login
              </a>

              <a
                href="/register"
                className="border border-gray-600 px-6 py-3 rounded-xl hover:border-white hover:text-white transition"
              >
                Register
              </a>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-500 px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* Decorative Section */}
      <div className="absolute bottom-10 text-gray-600 text-sm">
        Built with ❤️ using Next.js
      </div>
    </div>
  );
}
