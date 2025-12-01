import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Hexagon, AlertCircle, CheckCircle2 } from "lucide-react";

// Mock API for preview purposes since "../api/api" is not available in this environment
const api = {
  post: async (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate success for demo
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
          // Simulate failure
          reject({
            response: {
              data: {
                message: "Invalid credentials provided."
              }
            }
          });
        }
      }, 1500); // 1.5s delay to show loading state
    });
  }
};

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

        setMsg("Login successful!");
        
        // Small delay to show success message before redirect
        setTimeout(() => {
            if (res.data.user.role === "coach") {
            // In a real app with router: navigate("/coach");
            console.log("Navigating to /coach");
            navigate("/coach"); 
            } else {
            // In a real app with router: navigate("/dashboard");
            console.log("Navigating to /dashboard");
            navigate("/dashboard");
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
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 font-sans relative overflow-hidden px-4">
      
      {/* BACKGROUND EFFECTS (Matches Home Page) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#1e293b]"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* LOGIN CARD */}
      <div className="relative z-10 w-full max-w-md bg-slate-800/50 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-700/50">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
                <Hexagon className="w-10 h-10 text-blue-500 fill-blue-500/20" strokeWidth={2.5} />
                <div className="absolute inset-0 bg-blue-400 blur-lg opacity-30"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-400 text-sm">
            Enter your credentials to access the platform
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                name="email"
                placeholder="coach@example.com"
                type="email"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-500 transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                name="password"
                placeholder="••••••••"
                type="password"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 py-3.5 px-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
               <span className="flex items-center gap-2">Processing...</span>
            ) : (
               <>
                 <span>Sign In</span>
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </>
            )}
          </button>
        </form>

        {/* Status Messages */}
        {error && (
            <div className="mt-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
            </div>
        )}
        
        {msg && (
            <div className="mt-6 p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-center gap-3 text-green-400 text-sm animate-in fade-in slide-in-from-top-2">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>{msg}</span>
            </div>
        )}

        {/* Footer Link */}
        <div className="mt-8 text-center pt-6 border-t border-slate-700/50">
          <p className="text-slate-400 text-sm">
            Don't have an account?{' '}
            <Link 
                to="/register" 
                className="text-blue-400 hover:text-blue-300 font-medium hover:underline transition-all"
            >
              Create Account
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}