"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    API.get("/quiz/today").then((res) => {
      setQuiz(res.data);
    });
  }, []);

  const handleSelect = (qIndex, optIndex) => {
    const newAns = [...answers];
    newAns[qIndex] = optIndex;
    setAnswers(newAns);
  };

  const submit = async () => {
    if (answers.length !== quiz.questions.length) {
      return alert("Please answer all questions");
    }

    const res = await API.post("/quiz/submit", {
      answers,
      quizId: quiz._id,
    });

    setResult(res.data);
  };

  if (!quiz)
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg animate-pulse">Loading Quiz...</p>
      </div>
    );

  if (quiz.msg)
    return (
      <h2 className="text-center mt-10 text-xl font-semibold text-white bg-black min-h-screen flex items-center justify-center">
        {quiz.msg}
      </h2>
    );

  // ================= RESULT UI =================
  if (result) {
    return (
      <div className="min-h-screen bg-black text-white p-5">
        <h1 className="text-3xl font-bold text-center mb-8">
          Score: {result.score}/{quiz.questions.length}
        </h1>

        <div className="max-w-3xl mx-auto space-y-4">
          {result.result.map((r, i) => {
            const isCorrect = r.userAnswer === r.correctAnswer;

            return (
              <div
                key={i}
                className={`p-5 rounded-xl border transition ${
                  isCorrect
                    ? "border-green-500 bg-green-900/20"
                    : "border-red-500 bg-red-900/20"
                }`}
              >
                <p className="font-semibold mb-2">
                  {i + 1}. {r.question}
                </p>

                <p className="text-sm text-gray-300">
                  Your Answer:{" "}
                  <span className="font-medium text-white">
                    {r.options[r.userAnswer]}
                  </span>
                </p>

                {!isCorrect && (
                  <p className="text-sm text-gray-300">
                    Correct Answer:{" "}
                    <span className="font-medium text-green-400">
                      {r.options[r.correctAnswer]}
                    </span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <Link
          href="/"
          className="flex items-center justify-center text-center bg-gray-500 w-auto mt-2 rounded-xl px-4 py-1 "
        >
          Home
        </Link>
      </div>
    );
  }

  // ================= QUIZ UI =================
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto p-5">
        {/* Progress */}
        <div className="mb-6">
          <p className="text-sm text-gray-400 mb-2">
            Progress: {answers.filter((a) => a !== undefined).length} /{" "}
            {quiz.questions.length}
          </p>

          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-white h-2 transition-all duration-300"
              style={{
                width: `${
                  (answers.filter((a) => a !== undefined).length /
                    quiz.questions.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {quiz.questions.map((q, i) => (
            <div
              key={i}
              className="bg-[#111] border border-gray-800 p-5 rounded-2xl shadow-lg"
            >
              <h3 className="font-semibold mb-4 text-lg">
                {i + 1}. {q.question}
              </h3>

              <div className="space-y-3">
                {q.options.map((opt, idx) => {
                  const isSelected = answers[i] === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(i, idx)}
                      className={`w-full text-left p-3 rounded-lg border transition-all duration-200
                      ${
                        isSelected
                          ? "bg-white text-black border-white"
                          : "bg-black text-gray-300 border-gray-700 hover:border-gray-500 hover:bg-[#1a1a1a]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={submit}
          className="mt-8 w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
