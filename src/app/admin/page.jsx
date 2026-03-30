"use client";
import { useEffect, useState } from "react";
import API from "@/lib/api";
import Navbar from "@/components/Navbar";

export default function Admin() {
  const [quizzes, setQuizzes] = useState([]);
  const [form, setForm] = useState({
    date: "",
    published: false,
    questions: [],
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchQuiz();
  }, []);

  const fetchQuiz = () => {
    API.get("/admin/quizzes").then((res) => setQuizzes(res.data));
  };

  const addQuiz = async () => {
    await API.post("/admin/quiz", form);
    fetchQuiz();
  };

  return (
    <div>
      <Navbar />

      <div className="p-5">
        <h1 className="text-xl mb-3">Create Quiz</h1>

        <input
          placeholder="Date (YYYY-MM-DD)"
          className="border p-2"
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <button
          onClick={() =>
            setForm({
              ...form,
              questions: [
                ...form.questions,
                { question: "", options: ["", "", "", ""], correctAnswer: 0 },
              ],
            })
          }
        >
          Add Question
        </button>

        {form.questions.map((q, i) => (
          <div key={i}>
            <input
              placeholder="Question"
              onChange={(e) => {
                const newQ = [...form.questions];
                newQ[i].question = e.target.value;
                setForm({ ...form, questions: newQ });
              }}
            />

            {q.options.map((opt, idx) => (
              <input
                key={idx}
                placeholder={`Option ${idx}`}
                onChange={(e) => {
                  const newQ = [...form.questions];
                  newQ[i].options[idx] = e.target.value;
                  setForm({ ...form, questions: newQ });
                }}
              />
            ))}
          </div>
        ))}

        <button onClick={addQuiz} className="bg-black text-white px-4 py-2">
          Save Quiz
        </button>

        <hr className="my-5" />

        <h2>All Quiz</h2>

        {quizzes.map((q) => (
          <div key={q._id} className="border p-2 my-2">
            <p>{q.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
