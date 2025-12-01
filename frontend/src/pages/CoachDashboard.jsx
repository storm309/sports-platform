import React, { useEffect, useState } from "react";
import { Users, Activity, TrendingUp, Video, Search, User, Zap, Timer, Trophy } from "lucide-react";

// -----------------------------------------------------------------------------
// ⚠️ IMPORTANT: FOR YOUR LOCAL PROJECT
// Uncomment the line below and delete the temporary `const api` object following it.
// -----------------------------------------------------------------------------
import api from "../api/api"; 


// -----------------------------------------------------------------------------

export default function CoachDashboard() {
  const [players, setPlayers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingPerf, setLoadingPerf] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      const res = await api.get("/coach/players");
      // Safety check: ensure we always set an array
      setPlayers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Error loading players", err);
      setPlayers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadPerformance = async (id) => {
    setSelected(id);
    setLoadingPerf(true);
    setPerformance([]); 
    try {
      const res = await api.get(`/coach/player/${id}/performance`);
      setPerformance(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Error loading performance", err);
    } finally {
      setLoadingPerf(false);
    }
  };

  // Filter players based on search term
  const filteredPlayers = players.filter(p => 
    p.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans relative overflow-hidden p-4 md:p-8">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      {/* DASHBOARD CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-fade-in-down">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
              <div className="p-2 bg-blue-600/20 rounded-lg border border-blue-500/30">
                <Activity className="w-8 h-8 text-blue-400" />
              </div>
              Coach Dashboard
            </h1>
            <p className="text-slate-400">Manage your team and analyze player metrics</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-slate-800/50 backdrop-blur-md border border-slate-700 rounded-full px-4 py-2 flex items-center gap-2 text-slate-400 focus-within:border-blue-500/50 focus-within:text-blue-400 transition-colors">
                <Search className="w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search players..." 
                  className="bg-transparent border-none focus:outline-none text-sm w-32 md:w-48 text-slate-200 placeholder-slate-500" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Player List */}
          <div className="lg:col-span-5 space-y-6 animate-slide-up">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-xl flex flex-col h-[600px]">
              
              <div className="p-6 border-b border-slate-700/50 bg-slate-800/30 flex justify-between items-center">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <Users className="w-5 h-5 text-emerald-400" />
                  Team Roster
                </h2>
                <span className="bg-slate-700 text-xs font-bold px-2 py-1 rounded text-slate-300">
                  {filteredPlayers.length} Players
                </span>
              </div>

              <div className="overflow-y-auto flex-1 p-4 space-y-2 custom-scrollbar">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-40 text-slate-500 space-y-4">
                    <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                    <p>Loading roster...</p>
                  </div>
                ) : filteredPlayers.length === 0 ? (
                  <div className="text-center p-8 text-slate-500">
                    {players.length === 0 ? "No players found." : "No matches found."}
                  </div>
                ) : (
                  filteredPlayers.map((p) => (
                    <button
                      key={p._id}
                      onClick={() => loadPerformance(p._id)}
                      className={`w-full text-left group p-4 rounded-2xl transition-all duration-300 border flex items-center gap-4 relative overflow-hidden
                        ${selected === p._id 
                          ? "bg-blue-600/20 border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.1)]" 
                          : "bg-slate-800/40 border-slate-700/30 hover:bg-slate-700/50 hover:border-slate-600"
                        }`}
                    >
                      {/* Selection Indicator Line */}
                      {selected === p._id && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500"></div>
                      )}

                      {/* Avatar Placeholder */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors
                        ${selected === p._id ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600 group-hover:text-slate-200'}`}>
                        <User className="w-6 h-6" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                            <h3 className={`font-semibold truncate ${selected === p._id ? 'text-blue-100' : 'text-slate-200'}`}>
                                {p.name}
                            </h3>
                            {/* Only show status if it exists in backend data */}
                            {p.status && (
                                <span className="text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wide font-bold bg-slate-700/50 text-slate-400">
                                    {p.status}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-slate-400 truncate">{p.email}</p>
                        {/* Only show role if it exists in backend data */}
                        {p.role && (
                          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-medium">{p.role}</p>
                        )}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Performance Details */}
          <div className="lg:col-span-7 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-xl h-[600px] flex flex-col">
              
              <div className="p-6 border-b border-slate-700/50 bg-slate-800/30">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Performance Metrics
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto p-6 bg-slate-900/30">
                {!selected ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-full border border-slate-700">
                        <User className="w-12 h-12 opacity-50" />
                    </div>
                    <p className="text-lg">Select a player from the roster to view details</p>
                  </div>
                ) : loadingPerf ? (
                   <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                    <div className="w-8 h-8 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
                    <p>Fetching performance data...</p>
                  </div>
                ) : performance.length === 0 ? (
                  <div className="text-center p-8 text-slate-500">No performance records found for this player.</div>
                ) : (
                  <div className="space-y-4">
                    {performance.map((p, index) => (
                      <div
                        key={p._id || index}
                        className="group bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-lg"
                      >
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4 border-b border-slate-700/50 pb-4">
                            <div>
                                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                    {p.sport}
                                    {/* Only show date if it exists */}
                                    {p.date && (
                                      <span className="text-xs font-normal text-slate-400 bg-slate-700/50 px-2 py-1 rounded-md">{p.date}</span>
                                    )}
                                </h3>
                            </div>
                            {p.video ? (
                                <a href={p.video} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full hover:bg-blue-500/20 transition-colors">
                                    <Video className="w-3 h-3" />
                                    Watch Replay
                                </a>
                            ) : (
                                <span className="text-xs font-bold text-slate-500 bg-slate-700/30 px-3 py-1.5 rounded-full flex items-center gap-2 cursor-not-allowed">
                                    <Video className="w-3 h-3" />
                                    No Video
                                </span>
                            )}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {/* Score */}
                            <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/30 flex flex-col items-center text-center">
                                <div className="mb-2 p-2 bg-purple-500/10 rounded-full">
                                    <Trophy className="w-4 h-4 text-purple-400" />
                                </div>
                                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Score</span>
                                <span className="text-lg font-mono text-purple-200 mt-1">{p.score || "-"}</span>
                            </div>

                             {/* Speed */}
                             <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/30 flex flex-col items-center text-center">
                                <div className="mb-2 p-2 bg-emerald-500/10 rounded-full">
                                    <Timer className="w-4 h-4 text-emerald-400" />
                                </div>
                                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Speed</span>
                                <span className="text-lg font-mono text-emerald-200 mt-1">{p.speed || "-"}</span>
                            </div>

                             {/* Stamina */}
                             <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-700/30 flex flex-col items-center text-center">
                                <div className="mb-2 p-2 bg-amber-500/10 rounded-full">
                                    <Zap className="w-4 h-4 text-amber-400" />
                                </div>
                                <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Stamina</span>
                                <span className="text-lg font-mono text-amber-200 mt-1">{p.stamina || "-"}</span>
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 41, 59, 0.5); 
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(71, 85, 105, 0.8); 
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(100, 116, 139, 1); 
        }
        
        @keyframes fade-in-down {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fade-in-down 0.8s ease-out forwards;
        }

        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}