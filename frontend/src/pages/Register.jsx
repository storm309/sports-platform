// src/pages/Register.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "player",
  });
  const [msg, setMsg] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);
      setMsg(res.data.message || "Registered!");
    } catch (err) {
      setMsg(err.response?.data?.message || "Error registering");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-slate-800 p-8 rounded-xl w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Create Account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            className="w-full p-2 rounded bg-slate-700 outline-none"
            onChange={handleChange}
          />
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
          <select
            name="role"
            className="w-full p-2 rounded bg-slate-700 outline-none"
            onChange={handleChange}
            value={form.role}
          >
            <option value="player">Player</option>
            <option value="coach">Coach</option>
          </select>
          <button
            type="submit"
            className="w-full bg-green-600 py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </form>
        {msg && <p className="mt-3 text-sm text-emerald-400">{msg}</p>}

        <p className="mt-4 text-sm text-slate-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-400 underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
