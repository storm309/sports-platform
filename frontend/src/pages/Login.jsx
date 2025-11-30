// src/pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      const res = await api.post("/auth/login", form);

      if (res.data.token && res.data.user) {
        // 🔥 Save Token + User
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        console.log("TOKEN SAVED:", res.data.token);
        console.log("USER SAVED:", res.data.user);

        setMsg("Login successful!");

        // 🔥 Redirect based on role
        if (res.data.user.role === "coach") {
          navigate("/coach");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(res.data.message || "Login failed: No token received");
      }
    } catch (err) {
      console.log("Login Error:", err);
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            type="email"
            className="w-full p-2 rounded bg-slate-700 outline-none"
            onChange={handleChange}
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            className="w-full p-2 rounded bg-slate-700 outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* 🔥 ERROR MESSAGE */}
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

        {/* 🔥 SUCCESS MESSAGE */}
        {msg && <p className="mt-3 text-sm text-green-400">{msg}</p>}

        <p className="mt-4 text-sm text-slate-300">
          New here?{" "}
          <Link to="/register" className="text-green-400 underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
}
