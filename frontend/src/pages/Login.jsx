import React, { useState } from "react";
import { Mail, Lock, ArrowRight, Hexagon, AlertCircle, CheckCircle2, Sparkles, Eye, EyeOff } from "lucide-react";

// Mock API for preview purposes
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
          reject({
            response: {
              data: {
                message: "Invalid credentials provided."
              }
            }
          });
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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900" />
        
        {/* Animated orbs */}
        <div 
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '1s' }}
        />
        <div 
          className="absolute top-[40%] left-[50%] w-[300px] h-[300px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: '5s', animationDelay: '2s' }}
        />

        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glow effect behind card */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl rounded-3xl" />
        
        <div className="relative bg-slate-900/80 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-white/10">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-5">
              <div className="relative group">
                <Hexagon className="w-14 h-14 text-blue-500 fill-blue-500/20 group-hover:fill-blue-500/40 transition-all duration-300" strokeWidth={2.5} />
                <Sparkles className="w-5 h-5 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
                <div className="absolute inset-0 bg-blue-400 blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
              <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h2>
            <p className="text-slate-400 text-sm">
              Enter your credentials to access the platform
            </p>
          </div>

          {/* Form Section */}
          <div className="space-y-5">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  name="email"
                  placeholder="coach@example.com"
                  type="email"
                  required
                  value={form.email}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-slate-800 transition-all duration-300 hover:border-slate-600"
                  onChange={handleChange}
                />
                {/* Subtle gradient border on focus */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-focus-within:from-blue-500/20 group-focus-within:via-purple-500/20 group-focus-within:to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors duration-300">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  name="password"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  required
                  value={form.password}
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 focus:bg-slate-800 transition-all duration-300 hover:border-slate-600"
                  onChange={handleChange}
                />
                {/* Eye icon to toggle password visibility */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-blue-400 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-500/0 group-focus-within:from-blue-500/20 group-focus-within:via-purple-500/20 group-focus-within:to-blue-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="relative w-full mt-2 py-4 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Status Messages */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          {msg && (
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-start gap-3 text-green-400 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{msg}</span>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-3 text-slate-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">Google</span>
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 group"
            >
              <svg className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">GitHub</span>
            </button>
          </div>

          {/* Footer Link */}
          <div className="mt-8 text-center pt-6 border-t border-slate-700/50">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <a 
                href="/register" 
                className="text-blue-400 hover:text-blue-300 font-semibold hover:underline transition-all duration-300"
              >
                Create Account
              </a>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}