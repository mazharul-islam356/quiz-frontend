"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import Navbar from "../components/Navbar";

export default function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  console.log(quiz);
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
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg">Loading Quiz...</p>
      </div>
    );

  if (quiz.msg)
    return (
      <h2 className="text-center mt-10 text-xl font-semibold">{quiz.msg}</h2>
    );

  // ================= RESULT UI =================
  if (result) {
    return (
      <div className="min-h-screen bg-gray-100 p-5">
        <h1 className="text-3xl font-bold text-center mb-6">
          Your Score: {result.score}/{quiz.questions.length}
        </h1>

        <div className="max-w-3xl mx-auto space-y-4">
          {result.result.map((r, i) => (
            <div
              key={i}
              className={`p-4 text-gray-500 rounded-lg border ${
                r.userAnswer === r.correctAnswer
                  ? "bg-green-100 border-green-400"
                  : "bg-red-100 border-red-400"
              }`}
            >
              <p className="font-semibold mb-2">
                {i + 1}. {r.question}
              </p>

              <p className="text-sm">
                Your Answer:{" "}
                <span className="font-medium">{r.options[r.userAnswer]}</span>
              </p>

              <p className="text-sm">
                Correct Answer:{" "}
                <span className="font-medium">
                  {r.options[r.correctAnswer]}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================= QUIZ UI =================
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-3xl mx-auto p-5">
        {/* Progress */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-1">
            Progress: {answers.filter((a) => a !== undefined).length} /{" "}
            {quiz.questions.length}
          </p>
          <div className="w-full bg-gray-300 h-2 rounded">
            <div
              className="bg-black h-2 rounded"
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
        <div className="space-y-5">
          {quiz.questions.map((q, i) => (
            <div key={i} className="bg-gray-400 p-5 rounded-xl shadow">
              <h3 className="font-semibold mb-4">
                {i + 1}. {q.question}
              </h3>

              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  const isSelected = answers[i] === idx;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(i, idx)}
                      className={`w-full text-left p-3 rounded-lg border transition
                        ${
                          isSelected
                            ? "bg-black text-gray-200 border-black"
                            : "bg-gray-50 text-gray-600 hover:bg-gray-100"
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
          className="mt-6 w-full bg-black text-white py-3 rounded-lg"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
