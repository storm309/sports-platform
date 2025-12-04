import React, { useState } from "react";
import { Mail, Lock, ArrowRight, Hexagon, AlertCircle, CheckCircle2, Sparkles, Eye, EyeOff } from "lucide-react";

// Mock API (Preserved)
const api = {
  post: async (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.email && data.password) {
          resolve({
            data: {
              token: "mock-jwt-token-12345",
              user: {
                id: 1,
                name: "Demo User",
                email: data.email,
                role: data.email.includes("coach") ? "coach" : "player"
              }
            }
          });
        } else {
          reject({ response: { data: { message: "Invalid credentials provided." } } });
        }
      }, 1500);
    });
  }
};

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      if (res.data.token && res.data.user) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setMsg("Login successful! Redirecting...");
        setTimeout(() => {
          if (res.data.user.role === "coach") {
            window.location.href = "/coach";
          } else {
            window.location.href = "/dashboard";
          }
        }, 800);
      } else {
        setError(res.data.message || "Login failed: No token received");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 font-sans relative overflow-hidden px-4">
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900" />
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      </div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl rounded-3xl" />
        
        <div className="relative bg-slate-900/80 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/10">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <div className="relative group">
                <Hexagon className="w-14 h-14 text-blue-500 fill-blue-500/20" strokeWidth={2.5} />
                <Sparkles className="w-5 h-5 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
              <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">Welcome Back</span>
            </h2>
            <p className="text-slate-400 text-sm">Enter your credentials to access the platform</p>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <input name="email" placeholder="coach@example.com" type="email" required value={form.email} className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-slate-800 transition-all" onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                  <Lock className="w-5 h-5" />
                </div>
                <input name="password" placeholder="••••••••" type={showPassword ? "text" : "password"} required value={form.password} className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-slate-800 transition-all" onChange={handleChange} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-blue-400">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="button" onClick={handleSubmit} disabled={isLoading} className="relative w-full py-4 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {error && <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-sm"><AlertCircle className="w-5 h-5" /> <span>{error}</span></div>}
          {msg && <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-3 text-green-400 text-sm"><CheckCircle2 className="w-5 h-5" /> <span>{msg}</span></div>}

          <div className="mt-8 text-center pt-6 border-t border-slate-700/50">
            <p className="text-slate-400 text-sm mb-4">
              Don't have an account? <a href="/register" className="text-blue-400 hover:text-blue-300 font-semibold hover:underline">Create Account</a>
            </p>
            <p className="text-xs text-slate-600">
              Need help? <a href="mailto:shivamkumarp447@gmail.com" className="text-slate-500 hover:text-slate-400 underline">Contact Support</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}