import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Activity, LogOut, Zap, Heart, Dumbbell, Trophy, Upload, Video, Plus, CheckCircle2, AlertCircle, Link as LinkIcon, HelpCircle } from "lucide-react";

// --- MOCK API (Preserved) ---
const api = {
  get: async (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { _id: 1, sport: "Sprint", speed: 85, stamina: 60, strength: 70, createdAt: new Date().toISOString(), videoUrl: "https://youtube.com" },
            { _id: 2, sport: "Marathon", speed: 60, stamina: 95, strength: 65, createdAt: new Date(Date.now() - 86400000).toISOString() },
            { _id: 3, sport: "Weightlifting", speed: 40, stamina: 50, strength: 98, createdAt: new Date(Date.now() - 172800000).toISOString(), videoFile: "/mock.mp4" },
          ]
        });
      }, 800);
    });
  },
  post: async (url, data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: { message: "Performance recorded successfully!" } });
      }, 1000);
    });
  }
};

const PerformanceChart = ({ data }) => (
  <div className="h-full w-full flex items-end justify-between gap-2 px-2 pb-2">
    {data.length === 0 ? (
      <div className="w-full h-full flex items-center justify-center text-slate-500">Add data to see chart</div>
    ) : (
      data.map((d, i) => (
        <div key={i} className="group relative w-full h-[80%] bg-slate-800/50 rounded-t-lg hover:bg-slate-700/50 transition-all cursor-pointer" title={`${d.sport}: Speed ${d.speed}, Str ${d.strength}`}>
           <div className="absolute bottom-0 w-full bg-blue-500/80 rounded-t-lg transition-all group-hover:bg-blue-400" style={{ height: `${d.speed}%` }}></div>
           <div className="absolute bottom-0 w-full bg-purple-500/80 rounded-t-lg opacity-50" style={{ height: `${d.strength}%` }}></div>
        </div>
      ))
    )}
  </div>
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ sport: "", speed: "", stamina: "", strength: "", videoUrl: "" });
  const [videoFile, setVideoFile] = useState(null);
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    try {
      const res = await api.get("/performance/my");
      setList(res.data);
    } catch (err) { console.log(err); }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMsg("");
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (videoFile) fd.append("videoFile", videoFile);

      const res = await api.post("/performance/add", fd, { headers: { "Content-Type": "multipart/form-data" } });
      setMsg(res.data.message || "Saved");
      const newEntry = { ...form, _id: Date.now(), createdAt: new Date().toISOString(), videoFile: videoFile ? "mock" : null };
      setList([newEntry, ...list]);
      setForm({ sport: "", speed: "", stamina: "", strength: "", videoUrl: "" });
      setVideoFile(null);
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Error saving performance");
    } finally { setIsSubmitting(false); }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden p-4 md:p-6">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900" />
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="flex justify-between items-center bg-slate-900/50 backdrop-blur-xl p-4 rounded-2xl border border-white/5 shadow-lg">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-200 via-white to-blue-200 bg-clip-text text-transparent flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" /> Player Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="mailto:shivamkumarp447@gmail.com" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-slate-800 text-blue-400 border border-slate-700 rounded-xl hover:bg-slate-700 transition-all text-sm">
              <HelpCircle className="w-4 h-4" /> Support
            </a>
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-red-500/10 text-slate-300 hover:text-red-400 border border-slate-700 hover:border-red-500/50 rounded-xl transition-all duration-300 group">
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* LEFT COLUMN - FORM */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-xl">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2"><Plus className="w-5 h-5 text-blue-400" /> New Entry</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 ml-1">Activity Name</label>
                  <input name="sport" value={form.sport} onChange={handleChange} placeholder="e.g. 100m Sprint" required className="w-full p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-blue-500/50 focus:bg-slate-800 outline-none transition-all placeholder-slate-600" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase text-center block">Speed</label>
                      <div className="relative"><Zap className="w-3 h-3 absolute left-3 top-3.5 text-yellow-400" /><input name="speed" value={form.speed} onChange={handleChange} placeholder="0-100" type="number" className="w-full pl-8 pr-2 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-yellow-500/50 outline-none text-center text-sm transition-all" /></div>
                  </div>
                  <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase text-center block">Stamina</label>
                      <div className="relative"><Heart className="w-3 h-3 absolute left-3 top-3.5 text-red-400" /><input name="stamina" value={form.stamina} onChange={handleChange} placeholder="0-100" type="number" className="w-full pl-8 pr-2 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-red-500/50 outline-none text-center text-sm transition-all" /></div>
                  </div>
                  <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase text-center block">Strength</label>
                      <div className="relative"><Dumbbell className="w-3 h-3 absolute left-3 top-3.5 text-purple-400" /><input name="strength" value={form.strength} onChange={handleChange} placeholder="0-100" type="number" className="w-full pl-8 pr-2 py-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-purple-500/50 outline-none text-center text-sm transition-all" /></div>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <div className="relative">
                    <LinkIcon className="w-4 h-4 absolute left-3 top-3.5 text-slate-500" />
                    <input name="videoUrl" value={form.videoUrl} onChange={handleChange} placeholder="External Video URL (Optional)" className="w-full pl-10 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 focus:border-blue-500/50 outline-none transition-all text-sm placeholder-slate-600" />
                  </div>
                  <div className="relative group cursor-pointer">
                    <input type="file" id="file-upload" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} className="hidden" />
                    <label htmlFor="file-upload" className={`flex flex-col items-center justify-center w-full p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${videoFile ? 'border-green-500/50 bg-green-500/10' : 'border-slate-700/50 hover:border-blue-500/50 hover:bg-slate-800/50'}`}>
                      {videoFile ? <div className="flex items-center gap-2 text-green-400"><CheckCircle2 className="w-5 h-5" /><span className="text-sm font-medium truncate max-w-[200px]">{videoFile.name}</span></div> : <div className="flex flex-col items-center text-slate-500 group-hover:text-blue-400"><Upload className="w-6 h-6 mb-2" /><span className="text-xs font-medium">Upload Video File</span></div>}
                    </label>
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                  {isSubmitting ? "Saving..." : "Save Performance"}
                </button>
                {msg && <div className={`p-3 rounded-xl text-center text-sm flex items-center justify-center gap-2 ${msg.includes("Error") ? "bg-red-500/10 text-red-400" : "bg-green-500/10 text-green-400"}`}>{msg.includes("Error") ? <AlertCircle className="w-4 h-4"/> : <CheckCircle2 className="w-4 h-4"/>} {msg}</div>}
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN - CHART & LIST */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-slate-900/60 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-xl h-[300px] flex flex-col">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Activity className="w-5 h-5 text-purple-400" /> Progress Analytics</h2>
              <div className="flex-1 bg-slate-800/30 rounded-xl border border-slate-700/30 pt-4"><PerformanceChart data={list} /></div>
            </div>
            <div className="bg-slate-900/60 backdrop-blur-2xl p-6 rounded-3xl border border-white/10 shadow-xl flex flex-col h-[calc(100%-324px)] min-h-[400px]">
              <h2 className="text-lg font-semibold mb-4">Recent History</h2>
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                {list.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500"><Trophy className="w-12 h-12 mb-3 opacity-20" /><p>No performance data recorded yet.</p></div>
                ) : (
                  list.map((p) => (
                    <div key={p._id} className="group bg-slate-800/40 hover:bg-slate-800/80 border border-slate-700/50 hover:border-blue-500/30 p-4 rounded-2xl transition-all duration-300">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-white text-lg">{p.sport}</h3>
                          <p className="text-xs text-slate-500">{new Date(p.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                          {p.videoUrl && <a href={p.videoUrl} target="_blank" rel="noreferrer" className="p-2 bg-slate-700 rounded-lg hover:bg-blue-600 hover:text-white transition-colors"><LinkIcon className="w-4 h-4" /></a>}
                          {p.videoFile && <a href={`#`} className="p-2 bg-slate-700 rounded-lg hover:bg-teal-600 hover:text-white transition-colors"><Video className="w-4 h-4" /></a>}
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div className="bg-slate-900/50 rounded-lg p-2 flex items-center justify-between border border-slate-700/30"><Zap className="w-3 h-3 text-yellow-500" /><span className="text-sm font-bold">{p.speed}</span></div>
                        <div className="bg-slate-900/50 rounded-lg p-2 flex items-center justify-between border border-slate-700/30"><Heart className="w-3 h-3 text-red-500" /><span className="text-sm font-bold">{p.stamina}</span></div>
                        <div className="bg-slate-900/50 rounded-lg p-2 flex items-center justify-between border border-slate-700/30"><Dumbbell className="w-3 h-3 text-purple-500" /><span className="text-sm font-bold">{p.strength}</span></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}