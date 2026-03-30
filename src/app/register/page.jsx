"use client";
import { useState } from "react";
import API from "@/lib/api";

export default function Register() {
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async () => {
    await API.post("/auth/register", form);
    alert("Registered সফল");
    window.location.href = "/login";
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <input
        placeholder="Email"
        className="border p-2 m-2"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 m-2"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <button onClick={submit} className="bg-black text-white px-4 py-2">
        Register
      </button>
    </div>
  );
}
