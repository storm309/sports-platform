import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Activity, 
  Trophy, 
  Search, 
  LogOut, 
  PlayCircle, 
  FileVideo, 
  Zap, 
  Dumbbell, 
  Heart,
  ArrowRightLeft,
  TrendingUp,
  LayoutGrid
} from "lucide-react";

// --- MOCK API (Simulates Backend) ---
const api = {
  get: async (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (url === "/coach/players") {
          resolve({
            data: [
              { _id: "1", name: "Alex Johnson", email: "alex@team.com", position: "Forward" },
              { _id: "2", name: "Sam Smith", email: "sam@team.com", position: "Midfielder" },
              { _id: "3", name: "Jordan Lee", email: "jordan@team.com", position: "Defender" },
              { _id: "4", name: "Casey West", email: "casey@team.com", position: "Goalkeeper" },
            ]
          });
        } else if (url.includes("/performance")) {
          resolve({
            data: [
              { _id: 101, sport: "Soccer", createdAt: new Date().toISOString(), speed: 85, stamina: 78, strength: 70, videoUrl: "https://youtube.com", videoFile: "/vid1.mp4" },
              { _id: 102, sport: "Soccer", createdAt: new Date(Date.now() - 86400000).toISOString(), speed: 82, stamina: 75, strength: 72 },
              { _id: 103, sport: "Gym", createdAt: new Date(Date.now() - 172800000).toISOString(), speed: 80, stamina: 80, strength: 75 },
            ]
          });
        } else if (url.includes("/compare")) {
          // Parse IDs from url for mock logic
          resolve({
            data: {
              p1: { speed: Math.random() * 20 + 70, stamina: Math.random() * 20 + 70, strength: Math.random() * 20 + 70 },
              p2: { speed: Math.random() * 20 + 70, stamina: Math.random() * 20 + 70, strength: Math.random() * 20 + 70 }
            }
          });
        }
      }, 600);
    });
  }
};

// --- MOCK CHART COMPONENT (Placeholder) ---
// In your real app, import your actual PerformanceChart
const PerformanceChart = ({ data }) => (
  <div className="h-48 flex items-end justify-between px-4 pb-4 gap-2">
    {data.length === 0 ? (
      <div className="w-full h-full flex items-center justify-center text-slate-500 text-sm">
        Select a player to view chart
      </div>
    ) : (
      data.map((d, i) => (
        <div key={i} className="w-full bg-blue-500/20 rounded-t-lg relative group transition-all hover:bg-blue-500/40" style={{ height: `${(d.speed / 100) * 100}%` }}>
          <div className="absolute bottom-0 w-full bg-blue-500/50 h-1/2 rounded-t-lg" style={{ height: `${(d.stamina / 100) * 100}%` }} />
        </div>
      ))
    )}
  </div>
);

export default function CoachDashboard() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [performance, setPerformance] = useState([]);
  const [msg, setMsg] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Comparison State
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [compareData, setCompareData] = useState(null);
  const [isComparing, setIsComparing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadPlayers();
  }, []);

  useEffect(() => {
    setFilteredPlayers(
      players.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, players]);

  const loadPlayers = async () => {
    try {
      const res = await api.get("/coach/players");
      setPlayers(res.data);
      setFilteredPlayers(res.data);
    } catch (err) {
      console.log("Error loading players", err);
      setMsg("Error loading players");
    }
  };

  const loadPerformance = async (id) => {
    try {
      setSelected(id);
      setIsLoading(true);
      const res = await api.get(`/coach/player/${id}/performance`);
      setPerformance(res.data);
    } catch (err) {
      console.log("Error loading performance", err);
    } finally {
      setIsLoading(false);
    }
  };

  const comparePlayers = async () => {
    if (!p1 || !p2 || p1 === p2) return;
    try {
      setIsComparing(true);
      const res = await api.get(`/coach/compare?p1=${p1}&p2=${p2}`);
      setCompareData(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsComparing(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden p-4 md:p-6">
      
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900" />
        <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-center bg-slate-900/50 backdrop-blur-xl p-4 rounded-2xl border border-white/5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-emerald-200 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
              <LayoutGrid className="w-8 h-8 text-blue-400" />
              Coach Dashboard
            </h1>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/50 rounded-xl transition-all duration-300"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* FEEDBACK MSG */}
        {msg && <div className="p-3 bg-red-500/20 border border-red-500/50 text-red-200 rounded-xl text-center">{msg}</div>}

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-12 gap-6 h-[calc(100vh-140px)] min-h-[600px]">
          
          {/* LEFT COLUMN: PLAYER LIST (3 Cols) */}
          <div className="lg:col-span-3 bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/5">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-emerald-400" />
                Roster
              </h2>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Find player..." 
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
              {filteredPlayers.length === 0 ? (
                <div className="text-center p-6 text-slate-500 text-sm">No players found</div>
              ) : (
                filteredPlayers.map((p) => (
                  <div
                    key={p._id}
                    onClick={() => loadPerformance(p._id)}
                    className={`p-3 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3 border ${
                      selected === p._id
                        ? "bg-gradient-to-r from-blue-600/20 to-emerald-600/20 border-emerald-500/30 shadow-lg"
                        : "bg-slate-800/30 border-transparent hover:bg-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                      selected === p._id ? "bg-emerald-500 text-white" : "bg-slate-700 text-slate-400"
                    }`}>
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <div className={`font-medium ${selected === p._id ? "text-white" : "text-slate-200"}`}>{p.name}</div>
                      <div className="text-xs text-slate-500">{p.position || "Player"}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* MIDDLE COLUMN: PERFORMANCE FEED (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl">
            <div className="p-5 border-b border-white/5 bg-slate-900/40">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-400" />
                {selected ? "Performance History" : "Performance Feed"}
              </h2>
            </div>

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              {!selected ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-3 opacity-60">
                  <PlayCircle className="w-12 h-12" />
                  <p>Select a player to view performance</p>
                </div>
              ) : performance.length === 0 ? (
                <div className="text-center p-8 text-slate-500">No performance records found.</div>
              ) : (
                <div className="space-y-4">
                  {performance.map((p) => (
                    <div key={p._id} className="relative pl-6 before:absolute before:left-[7px] before:top-2 before:bottom-[-24px] before:w-[2px] before:bg-slate-800 last:before:hidden">
                      {/* Timeline Dot */}
                      <div className="absolute left-0 top-2 w-4 h-4 rounded-full border-[3px] border-slate-900 bg-blue-500 z-10"></div>
                      
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 hover:bg-slate-800 transition-colors">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">{p.sport}</span>
                            <div className="text-xs text-slate-500 mt-1">{new Date(p.createdAt).toLocaleDateString()} at {new Date(p.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                          </div>
                          {(p.videoUrl || p.videoFile) && (
                            <div className="flex gap-2">
                              {p.videoUrl && <a href={p.videoUrl} target="_blank" rel="noreferrer" className="p-1.5 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition"><PlayCircle className="w-4 h-4" /></a>}
                              {p.videoFile && <a href={`http://localhost:5000${p.videoFile}`} target="_blank" rel="noreferrer" className="p-1.5 bg-teal-500/10 text-teal-400 rounded-lg hover:bg-teal-500/20 transition"><FileVideo className="w-4 h-4" /></a>}
                            </div>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-slate-900/50 p-2 rounded-xl text-center border border-slate-700/30">
                            <Zap className="w-4 h-4 text-yellow-400 mx-auto mb-1" />
                            <div className="text-lg font-bold text-white">{p.speed}</div>
                            <div className="text-[10px] text-slate-500 uppercase">Speed</div>
                          </div>
                          <div className="bg-slate-900/50 p-2 rounded-xl text-center border border-slate-700/30">
                            <Heart className="w-4 h-4 text-red-400 mx-auto mb-1" />
                            <div className="text-lg font-bold text-white">{p.stamina}</div>
                            <div className="text-[10px] text-slate-500 uppercase">Stamina</div>
                          </div>
                          <div className="bg-slate-900/50 p-2 rounded-xl text-center border border-slate-700/30">
                            <Dumbbell className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                            <div className="text-lg font-bold text-white">{p.strength}</div>
                            <div className="text-[10px] text-slate-500 uppercase">Strength</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: ANALYTICS (4 Cols) */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            
            {/* Chart Card */}
            <div className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-5 shadow-2xl relative overflow-hidden">
               <div className="flex justify-between items-center mb-4">
                 <h2 className="text-lg font-semibold flex items-center gap-2">
                   <TrendingUp className="w-5 h-5 text-purple-400" />
                   Trends
                 </h2>
               </div>
               <div className="bg-slate-800/50 rounded-2xl pt-4 border border-slate-700/30">
                 <PerformanceChart data={performance} />
               </div>
            </div>

            {/* Comparison Card */}
            <div className="bg-slate-900/60 backdrop-blur-2xl rounded-3xl border border-white/10 p-5 shadow-2xl flex-1">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <ArrowRightLeft className="w-5 h-5 text-orange-400" />
                Head-to-Head
              </h2>
              
              <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/30 space-y-3">
                <div className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                  <select 
                    value={p1} 
                    onChange={(e) => setP1(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="">Player 1</option>
                    {players.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                  </select>
                  
                  <span className="text-slate-500 text-xs font-bold">VS</span>
                  
                  <select 
                    value={p2} 
                    onChange={(e) => setP2(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-xs rounded-lg p-2 focus:ring-1 focus:ring-red-500"
                  >
                    <option value="">Player 2</option>
                    {players.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                  </select>
                </div>
                
                <button
                  onClick={comparePlayers}
                  disabled={!p1 || !p2 || p1 === p2 || isComparing}
                  className="w-full py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-all"
                >
                  {isComparing ? "Analyzing..." : "Compare Stats"}
                </button>
              </div>

              {/* Comparison Results */}
              {compareData && (
                <div className="mt-4 space-y-3 animate-in fade-in slide-in-from-bottom-2">
                  {[
                    { label: "Speed", key: "speed", icon: Zap, color: "text-yellow-400" },
                    { label: "Stamina", key: "stamina", icon: Heart, color: "text-red-400" },
                    { label: "Strength", key: "strength", icon: Dumbbell, color: "text-purple-400" },
                  ].map((stat) => (
                    <div key={stat.key} className="bg-slate-800/30 p-3 rounded-xl border border-slate-700/30">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>P1</span>
                        <span className={`uppercase font-bold ${stat.color} flex items-center gap-1`}>
                          <stat.icon className="w-3 h-3" /> {stat.label}
                        </span>
                        <span>P2</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-bold w-8 text-right">{compareData.p1[stat.key].toFixed(0)}</div>
                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden flex">
                          {/* Visual Bar Comparison */}
                          <div 
                            className="h-full bg-blue-500" 
                            style={{ width: `${(compareData.p1[stat.key] / (compareData.p1[stat.key] + compareData.p2[stat.key])) * 100}%` }} 
                          />
                          <div 
                            className="h-full bg-red-500" 
                            style={{ width: `${(compareData.p2[stat.key] / (compareData.p1[stat.key] + compareData.p2[stat.key])) * 100}%` }} 
                          />
                        </div>
                        <div className="text-sm font-bold w-8">{compareData.p2[stat.key].toFixed(0)}</div>
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
  );
}