import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function CoachDashboard() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [performance, setPerformance] = useState([]);

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      const res = await api.get("/coach/players");
      setPlayers(res.data);
    } catch (err) {
      console.log("Error loading players", err);
      setPlayers([]);
    }
  };

  const loadPerformance = async (id) => {
    try {
      setSelected(id);
      const res = await api.get(`/coach/player/${id}/performance`);
      setPerformance(res.data);
    } catch (err) {
      console.log("Error loading performance", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Coach Dashboard</h1>

      <div className="grid grid-cols-2 gap-6">
        
        <div className="bg-slate-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Players</h2>

          {players.length === 0 ? (
            <p className="text-slate-400">No players found.</p>
          ) : (
            players.map((p) => (
              <div
                key={p._id}
                onClick={() => loadPerformance(p._id)}
                className={`p-3 mb-2 rounded cursor-pointer ${
                  selected === p._id ? "bg-slate-600" : "bg-slate-700"
                }`}
              >
                {p.name} — {p.email}
              </div>
            ))
          )}
        </div>

        <div className="bg-slate-800 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Performance</h2>

          {performance.length === 0 ? (
            <p className="text-slate-400">Select a player to view performance.</p>
          ) : (
            performance.map((p) => (
              <div key={p._id} className="bg-slate-700 p-3 rounded mb-2">
                <p><b>Sport:</b> {p.sport}</p>
                <p><b>Score:</b> {p.score}</p>
                <p><b>Speed:</b> {p.speed}</p>
                <p><b>Stamina:</b> {p.stamina}</p>
                {p.video && <a href={p.video} className="text-blue-400" target="_blank">Watch Video</a>}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
