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

  // ================= LOADING =================
  if (!quiz)
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <p className="text-lg animate-pulse tracking-wide">Loading Quiz...</p>
      </div>
    );

  if (quiz.msg)
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <h2 className="text-xl font-semibold">{quiz.msg}</h2>
      </div>
    );

  // ================= RESULT =================
  if (result) {
    return (
      <div className="min-h-screen bg-black text-white px-4 py-10">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">Your Score</h1>
          <p className="text-2xl text-gray-300">
            {result.score} / {quiz.questions.length}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          {result.result.map((r, i) => {
            const isCorrect = r.userAnswer === r.correctAnswer;

            return (
              <div
                key={i}
                className={`p-5 rounded-2xl border backdrop-blur-md
                ${
                  isCorrect
                    ? "border-green-500/40 bg-green-500/10"
                    : "border-red-500/40 bg-red-500/10"
                }`}
              >
                <p className="font-semibold mb-2 text-lg">
                  {i + 1}. {r.question}
                </p>

                <p className="text-sm text-gray-400">
                  Your Answer:{" "}
                  <span className="text-white font-medium">
                    {r.options[r.userAnswer]}
                  </span>
                </p>

                {!isCorrect && (
                  <p className="text-sm text-gray-400">
                    Correct:{" "}
                    <span className="text-green-400 font-medium">
                      {r.options[r.correctAnswer]}
                    </span>
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ================= QUIZ =================
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Sticky Progress */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-gray-800">
        <div className="max-w-3xl mx-auto px-5 py-3">
          <p className="text-xs text-gray-400 mb-1">
            Progress: {answers.filter((a) => a !== undefined).length} /{" "}
            {quiz.questions.length}
          </p>

          <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
            <div
              className="h-2 bg-gradient-to-r from-white to-gray-400 transition-all duration-300"
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
      </div>

      <div className="max-w-3xl mx-auto p-5 space-y-8">
        {quiz.questions.map((q, i) => (
          <div
            key={i}
            className="bg-white/5 border border-gray-800 p-6 rounded-2xl backdrop-blur-lg shadow-xl"
          >
            <h3 className="font-semibold mb-5 text-lg leading-relaxed">
              {i + 1}. {q.question}
            </h3>

            <div className="space-y-3">
              {q.options.map((opt, idx) => {
                const isSelected = answers[i] === idx;

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(i, idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200
                    ${
                      isSelected
                        ? "bg-white text-black border-white scale-[1.02]"
                        : "bg-black text-gray-300 border-gray-700 hover:border-gray-500 hover:bg-white/10"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Submit */}
        <button
          onClick={submit}
          className="w-full mt-6 bg-gradient-to-r from-white to-gray-300 text-black py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
