"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [quizzes, setQuizzes] = useState([]);
  const [form, setForm] = useState({
    date: "",
    published: false,
    questions: [],
  });

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = () => {
    API.get("/admin/quizzes").then((res) => setQuizzes(res.data));
  };

  const addQuiz = async () => {
    if (!form.date) return alert("Date required");
    if (form.questions.length !== 5) return alert("Must add 10 questions");

    await API.post("/admin/quiz", form);
    fetchQuiz();
    alert("Quiz Created ✅");
  };
  const addQuestion = () => {
    setForm({
      ...form,
      questions: [
        ...form.questions,
        { question: "", options: ["", "", "", ""], correctAnswer: 0 },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <Navbar />

      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-6">
        {/* LEFT: CREATE QUIZ */}
        <div className="bg-gray-500 rounded-xl shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Create Quiz</h1>

          {/* Date */}
          <input
            type="date"
            className="w-full border p-3 rounded mb-4"
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={form.published}
              onChange={(e) =>
                setForm({ ...form, published: e.target.checked })
              }
            />
            <label className="text-white font-medium">Publish Quiz</label>
          </div>
          {/* Add Question Button */}
          <button
            onClick={addQuestion}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Add Question
          </button>

          {/* Questions */}
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {form.questions.map((q, i) => (
              <div key={i} className="border rounded-lg p-4 bg-gray-500">
                <h3 className="font-semibold mb-2">Question {i + 1}</h3>

                {/* Question */}
                <input
                  placeholder="Enter question"
                  className="w-full border p-2 rounded mb-3"
                  onChange={(e) => {
                    const newQ = [...form.questions];
                    newQ[i].question = e.target.value;
                    setForm({ ...form, questions: newQ });
                  }}
                />

                {/* Options */}
                <div className="grid grid-cols-2 gap-2">
                  {q.options.map((opt, idx) => (
                    <input
                      key={idx}
                      placeholder={`Option ${idx + 1}`}
                      className="border p-2 rounded"
                      onChange={(e) => {
                        const newQ = [...form.questions];
                        newQ[i].options[idx] = e.target.value;
                        setForm({ ...form, questions: newQ });
                      }}
                    />
                  ))}
                </div>

                {/* Correct Answer */}
                <select
                  className="mt-3 border p-2 rounded w-full text-gray-700"
                  onChange={(e) => {
                    const newQ = [...form.questions];
                    newQ[i].correctAnswer = Number(e.target.value);
                    setForm({ ...form, questions: newQ });
                  }}
                >
                  <option value={0}>Correct: Option 1</option>
                  <option value={1}>Correct: Option 2</option>
                  <option value={2}>Correct: Option 3</option>
                  <option value={3}>Correct: Option 4</option>
                </select>

                {/* Remove Question */}
                <button
                  onClick={() => {
                    const newQ = form.questions.filter((_, idx) => idx !== i);
                    setForm({ ...form, questions: newQ });
                  }}
                  className="mt-3 text-red-500 text-sm"
                >
                  Remove Question
                </button>
              </div>
            ))}
          </div>

          {/* Save */}
          <button
            onClick={addQuiz}
            className="mt-5 w-full bg-black text-white py-3 rounded-lg"
          >
            Save Quiz
          </button>
        </div>

        {/* RIGHT: QUIZ LIST */}
        <div className="bg-gray-500 rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">All Quizzes</h2>

          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {quizzes.map((q) => (
              <div
                key={q._id}
                className="border rounded-lg p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{q.date}</p>
                  <p className="text-sm text-gray-500">
                    {q.questions?.length || 0} Questions
                  </p>
                </div>

                <span className="text-xs bg-gray-800 px-2 py-1 rounded">
                  {q.published ? "Published" : "Draft"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
