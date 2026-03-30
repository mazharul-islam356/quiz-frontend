"use client";
import { useState } from "react";
import API from "@/lib/api";
import Link from "next/link";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const res = await API.post("/auth/login", form);

      if (!res.data.token) {
        alert(res.data.msg);
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);

      if (res.data.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/quiz";
      }
    } catch (err) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-white">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back</h1>
        <p className="text-center text-gray-300 mb-6">
          Login to continue your quiz journey
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-300"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full p-3 mb-6 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-300"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Button */}
        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition duration-200"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="underline cursor-pointer hover:text-white"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
