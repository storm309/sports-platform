// src/components/PerformanceChart.jsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PerformanceChart({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-slate-400">No data to show chart.</p>;
  }

  // convert createdAt to nice label
  const chartData = data
    .map((p) => ({
      name: new Date(p.createdAt || p._id?.toString().slice(0, 8)).toLocaleDateString(),
      speed: p.speed,
      stamina: p.stamina,
      strength: p.strength,
    }))
    .reverse(); // oldest → newest

  return (
    <div className="bg-slate-800 p-4 rounded-lg shadow h-80">
      <h3 className="text-lg font-semibold mb-2">Performance Trend</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="speed" stroke="#22c55e" />
          <Line type="monotone" dataKey="stamina" stroke="#3b82f6" />
          <Line type="monotone" dataKey="strength" stroke="#f97316" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
