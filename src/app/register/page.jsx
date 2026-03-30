"use client";
import { useState } from "react";
import API from "@/lib/api";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (form.password !== form.confirmPassword) {
      return alert("Password does not match");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", {
        email: form.email,
        password: form.password,
      });

      alert("Registered সফল ✅");
      window.location.href = "/login";
    } catch (err) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 px-4">
      {/* Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 text-white">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-2">Create Account</h1>
        <p className="text-center text-gray-300 mb-6">
          Start your quiz journey today 🚀
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
          placeholder="Create password"
          className="w-full p-3 mb-4 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-300"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm password"
          className="w-full p-3 mb-6 rounded-lg bg-white/20 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white placeholder-gray-300"
          onChange={(e) =>
            setForm({ ...form, confirmPassword: e.target.value })
          }
        />

        {/* Button */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition duration-200"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-300 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => (window.location.href = "/login")}
            className="underline cursor-pointer hover:text-white"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
