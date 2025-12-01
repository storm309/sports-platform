// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/PlayerDashboard";
import CoachDashboard from "./pages/CoachDashboard";

function ProtectedRoute({ children, requiredRole }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!token) return <Navigate to="/login" replace />;

  // role check
  if (requiredRole && user?.role !== requiredRole) {
    console.log("Access denied: Wrong role");
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* PLAYER DASHBOARD */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole="player">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* COACH DASHBOARD */}
      <Route
        path="/coach"
        element={
          <ProtectedRoute requiredRole="coach">
            <CoachDashboard />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
