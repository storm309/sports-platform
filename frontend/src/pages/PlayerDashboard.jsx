import React, { useState, useEffect } from "react";
import { 
  Activity, 
  Flame, 
  Dumbbell, 
  Play, 
  Plus, 
  History, 
  Trophy, 
  Timer, 
  Zap, 
  Save,
  LayoutDashboard
} from "lucide-react";
import api from "../api/api"; 
export default function Dashboard() {
  const [performances, setPerformances] = useState([]);
  const [form, setForm] = useState({
    sport: "",
    speed: "",
    stamina: "",
    strength: "",
    video: ""
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    loadMyPerformances();
  }, []);

  const loadMyPerformances = async () => {
    try {
      const res = await api.get("/performance/my");
      setPerformances(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load performances", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMsg("");

    try {
      const res = await api.post("/performance", form);
      // Optimistically update UI or reload
      if (res.data.newEntry) {
        setPerformances([res.data.newEntry, ...performances]);
      }
      setMsg("Performance saved successfully!");
      setForm({ sport: "", speed: "", stamina: "", strength: "", video: "" });
      
      // Clear message after 3 seconds
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.error("Error saving performance", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 font-sans relative overflow-hidden p-4 md:p-8">
      
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-10 animate-fade-in-down">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2 flex items-center gap-3">
            <div className="p-2 bg-purple-600/20 rounded-lg border border-purple-500/30">
              <LayoutDashboard className="w-8 h-8 text-purple-400" />
            </div>
            Player Dashboard
          </h1>
          <p className="text-slate-400">Track your progress and upload new performance metrics</p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Input Form */}
          <div className="lg:col-span-5 animate-slide-up">
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 md:p-8 shadow-xl sticky top-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-white">
                <Plus className="w-5 h-5 text-emerald-400" />
                Add New Performance
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Sport */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sport</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                      <Trophy className="w-5 h-5" />
                    </div>
                    <input
                      name="sport"
                      value={form.sport}
                      onChange={handleChange}
                      placeholder="e.g. Football"
                      required
                      className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all"
                    />
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Speed */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Speed</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500">
                        <Timer className="w-4 h-4" />
                      </div>
                      <input
                        name="speed"
                        type="number"
                        min="0"
                        max="10"
                        value={form.speed}
                        onChange={handleChange}
                        placeholder="0-10"
                        required
                        className="w-full pl-9 pr-2 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all text-center"
                      />
                    </div>
                  </div>

                  {/* Stamina */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Stamina</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-500">
                        <Zap className="w-4 h-4" />
                      </div>
                      <input
                        name="stamina"
                        type="number"
                        min="0"
                        max="10"
                        value={form.stamina}
                        onChange={handleChange}
                        placeholder="0-10"
                        required
                        className="w-full pl-9 pr-2 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all text-center"
                      />
                    </div>
                  </div>

                  {/* Strength */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Strength</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-rose-500">
                        <Dumbbell className="w-4 h-4" />
                      </div>
                      <input
                        name="strength"
                        type="number"
                        min="0"
                        max="10"
                        value={form.strength}
                        onChange={handleChange}
                        placeholder="0-10"
                        required
                        className="w-full pl-9 pr-2 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500 transition-all text-center"
                      />
                    </div>
                  </div>
                </div>

                {/* Video URL */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Video URL (Optional)</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
                      <Play className="w-5 h-5" />
                    </div>
                    <input
                      name="video"
                      type="url"
                      value={form.video}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full pl-11 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full mt-4 py-3.5 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Performance
                    </>
                  )}
                </button>

                {msg && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-sm text-center animate-fade-in">
                    {msg}
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: History List */}
          <div className="lg:col-span-7 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-3xl overflow-hidden shadow-xl min-h-[500px] flex flex-col">
              
              <div className="p-6 border-b border-slate-700/50 bg-slate-800/30">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-white">
                  <History className="w-5 h-5 text-blue-400" />
                  My Past Performances
                </h2>
              </div>

              <div className="p-6 overflow-y-auto max-h-[600px] custom-scrollbar space-y-4">
                {isLoading ? (
                   <div className="flex flex-col items-center justify-center h-40 text-slate-500 space-y-4">
                    <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                    <p>Loading your stats...</p>
                  </div>
                ) : performances.length === 0 ? (
                  <div className="text-center p-10 text-slate-500 bg-slate-800/30 rounded-2xl border border-slate-700/30 border-dashed">
                    <Activity className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>No performance data yet.</p>
                    <p className="text-sm">Add your first entry on the left!</p>
                  </div>
                ) : (
                  performances.map((p, idx) => (
                    <div 
                      key={p._id || idx} 
                      className="group bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 rounded-2xl p-5 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1"
                    >
                      <div className="flex justify-between items-start mb-4 border-b border-slate-700/50 pb-3">
                        <div>
                          <h3 className="text-lg font-bold text-white">{p.sport}</h3>
                          <span className="text-xs text-slate-400">{p.date || "Just now"}</span>
                        </div>
                        {p.video && (
                           <a href={p.video} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full hover:bg-blue-500/20 transition-colors">
                              <Play className="w-3 h-3" />
                              Replay
                          </a>
                        )}
                      </div>

                      <div className="grid grid-cols-3 gap-2">
                         <div className="bg-slate-900/50 rounded-lg p-2 text-center border border-slate-700/30">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-1 flex justify-center items-center gap-1">
                               <Timer className="w-3 h-3 text-emerald-500" /> Speed
                            </div>
                            <div className="text-lg font-mono text-emerald-200">{p.speed}</div>
                         </div>
                         <div className="bg-slate-900/50 rounded-lg p-2 text-center border border-slate-700/30">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-1 flex justify-center items-center gap-1">
                               <Zap className="w-3 h-3 text-amber-500" /> Stamina
                            </div>
                            <div className="text-lg font-mono text-amber-200">{p.stamina}</div>
                         </div>
                         <div className="bg-slate-900/50 rounded-lg p-2 text-center border border-slate-700/30">
                            <div className="text-xs text-slate-500 uppercase font-bold mb-1 flex justify-center items-center gap-1">
                               <Dumbbell className="w-3 h-3 text-rose-500" /> Strength
                            </div>
                            <div className="text-lg font-mono text-rose-200">{p.strength}</div>
                         </div>
                      </div>
                    </div>
                  ))
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
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}