"use client";
import { useState } from "react";
import API from "@/lib/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async () => {
    const res = await API.post("/auth/login", form);

    if (!res.data.token) return alert(res.data.msg);

    localStorage.setItem("token", res.data.token);

    if (res.data.role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/quiz";
    }
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

      <button onClick={login} className="bg-black text-white px-4 py-2">
        Login
      </button>
    </div>
  );
}
