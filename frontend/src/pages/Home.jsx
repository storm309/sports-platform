// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <h1 className="text-4xl font-extrabold mb-4">
        Sports Talent Assessment Platform
      </h1>
      <p className="mb-6 text-slate-300">
        Players upload performance, coaches analyse – sab ek jagah.
      </p>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
