"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/user/results").then((res) => setData(res.data));
  }, []);

  // Stats Calculation
  const totalQuiz = data.length;
  const avgScore =
    data.length > 0
      ? (data.reduce((acc, curr) => acc + curr.score, 0) / data.length).toFixed(
          2,
        )
      : 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-5xl mx-auto p-6">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-gray-500 text-sm">Total Quizzes</h2>
            <p className="text-2xl font-bold">{totalQuiz}</p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h2 className="text-gray-500 text-sm">Average Score</h2>
            <p className="text-2xl font-bold">{avgScore}</p>
          </div>
        </div>

        {/* Results List */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-xl font-semibold mb-4">Quiz History</h2>

          {data.length === 0 ? (
            <p className="text-gray-500 text-center py-5">
              No quiz attempts yet.
            </p>
          ) : (
            <div className="space-y-3">
              {data.map((d, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border p-3 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{d.date}</p>
                    <p className="text-sm text-gray-500">Attempt #{i + 1}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">{d.score}</p>
                    <p className="text-xs text-gray-500">Score</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
