"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import Navbar from "@/components/Navbar";

export default function Quiz() {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {
    API.get("/quiz/today").then((res) => {
      setQuiz(res.data);
    });
  }, []);

  const submit = async () => {
    const res = await API.post("/quiz/submit", {
      answers,
      quizId: quiz._id,
    });

    setResult(res.data);
  };

  if (!quiz) return <p>Loading...</p>;

  if (quiz.msg) return <h2 className="text-center mt-10">{quiz.msg}</h2>;

  if (result) {
    return (
      <div className="p-5">
        <h1>Score: {result.score}/10</h1>

        {result.result.map((r, i) => (
          <div key={i} className="border p-3 my-2">
            <p>{r.question}</p>
            <p>Your: {r.options[r.userAnswer]}</p>
            <p>Correct: {r.options[r.correctAnswer]}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="p-5">
        {quiz.questions.map((q, i) => (
          <div key={i} className="mb-4">
            <h3>{q.question}</h3>

            {q.options.map((opt, idx) => (
              <button
                key={idx}
                className="block border px-3 py-1 my-1"
                onClick={() => {
                  const newAns = [...answers];
                  newAns[i] = idx;
                  setAnswers(newAns);
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        ))}

        <button onClick={submit} className="bg-black text-white px-5 py-2">
          Submit
        </button>
      </div>
    </div>
  );
}
