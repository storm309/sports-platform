// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    sport: "",
    speed: "",
    stamina: "",
    strength: "",
    videoUrl: "",
  });
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const loadMyPerformance = async () => {
    try {
      const res = await api.get("/performance/my");
      setList(res.data);
    } catch (err) {
      setMsg("Failed to load performance");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/performance/add", {
        sport: form.sport,
        speed: Number(form.speed),
        stamina: Number(form.stamina),
        strength: Number(form.strength),
        videoUrl: form.videoUrl,
      });
      setMsg("Performance saved!");
      setForm({
        sport: "",
        speed: "",
        stamina: "",
        strength: "",
        videoUrl: "",
      });
      loadMyPerformance();
    } catch (err) {
      setMsg("Error saving performance");
    }
  };

  useEffect(() => {
    loadMyPerformance();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Player Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 p-6 rounded-xl space-y-3"
        >
          <h2 className="text-xl font-semibold mb-2">
            Add Performance Metrics
          </h2>
          <input
            name="sport"
            placeholder="Sport (e.g. Football)"
            className="w-full p-2 rounded bg-slate-700 outline-none"
            value={form.sport}
            onChange={handleChange}
          />
          <input
            name="speed"
            placeholder="Speed (0-10)"
            className="w-full p-2 rounded bg-slate-700 outline-none"
            value={form.speed}
            onChange={handleChange}
          />
          <input
            name="stamina"
            placeholder="Stamina (0-10)"
            className="w-full p-2 rounded bg-slate-700 outline-none"
            value={form.stamina}
            onChange={handleChange}
          />
          <input
            name="strength"
            placeholder="Strength (0-10)"
            className="w-full p-2 rounded bg-slate-700 outline-none"
            value={form.strength}
            onChange={handleChange}
          />
          <input
            name="videoUrl"
            placeholder="Video URL (optional)"
            className="w-full p-2 rounded bg-slate-700 outline-none"
            value={form.videoUrl}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 py-2 rounded hover:bg-emerald-700"
          >
            Save Performance
          </button>
          {msg && <p className="mt-2 text-sm text-emerald-400">{msg}</p>}
        </form>

        <div className="bg-slate-800 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-3">My Performances</h2>
          {list.length === 0 && (
            <p className="text-slate-400 text-sm">
              No performance data yet. Add your first entry!
            </p>
          )}
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {list.map((p) => (
              <div
                key={p._id}
                className="border border-slate-700 rounded-lg p-3"
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{p.sport}</span>
                  <span className="text-xs text-slate-400">
                    Speed: {p.speed} | Stamina: {p.stamina} | Strength:{" "}
                    {p.strength}
                  </span>
                </div>
                {p.videoUrl && (
                  <a
                    href={p.videoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-400 text-xs underline"
                  >
                    Watch video
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
