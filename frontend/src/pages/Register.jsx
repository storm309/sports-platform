import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Lock, Mail, ArrowRight, Hexagon, AlertCircle, CheckCircle2 } from "lucide-react";

// Mock API for preview (Simulates a real backend)
const api = {
  post: async (url, data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate checking if email already exists
        if (data.email === "test@test.com") {
          reject({
            response: {
              data: {
                message: "User already exists with this email."
              }
            }
          });
        } else {
          // Simulate successful registration
          resolve({
            data: {
              token: "mock-jwt-token-register-123",
              user: {
                id: Math.floor(Math.random() * 1000),
                name: data.name,
                email: data.email,
                role: data.role || "player"
              },
              message: "Registration successful!"
            }
          });
        }
      }, 1500); // 1.5s simulated network delay
    });
  }
};

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "player" });
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
      // Using our mock api here instead of real axios calls
      const res = await api.post("/auth/register", form);

      if (res.data.token) {
        setMsg("Registration successful! Redirecting...");
        
        // Simulate storing token
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(res.data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 font-sans relative overflow-hidden px-4 py-8">
      
      {/* BACKGROUND EFFECTS */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#1e293b]"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* REGISTER CARD */}
      <div className="relative z-10 w-full max-w-md bg-slate-800/50 backdrop-blur-xl p-8 sm:p-10 rounded-3xl shadow-2xl border border-slate-700/50">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
             <div className="relative">
                <Hexagon className="w-10 h-10 text-emerald-500 fill-emerald-500/20" strokeWidth={2.5} />
                <div className="absolute inset-0 bg-emerald-400 blur-lg opacity-30"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
            Create Account
          </h2>
          <p className="text-slate-400 text-sm">
            Join us to track and analyze your performance
          </p>
        </div>

        {/* Form Section */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          {/* Name Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Full Name</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                <User className="w-5 h-5" />
              </div>
              <input
                name="name"
                placeholder="John Doe"
                type="text"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Email Address</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <input
                name="email"
                placeholder="you@example.com"
                type="email"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">Password</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                <Lock className="w-5 h-5" />
              </div>
              <input
                name="password"
                placeholder="••••••••"
                type="password"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider ml-1">I am a</label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`cursor-pointer border rounded-xl p-3 text-center transition-all duration-300 ${form.role === 'player' ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                <input 
                  type="radio" 
                  name="role" 
                  value="player" 
                  checked={form.role === 'player'} 
                  onChange={handleChange} 
                  className="hidden" 
                />
                <span className="font-medium">Player</span>
              </label>
              
              <label className={`cursor-pointer border rounded-xl p-3 text-center transition-all duration-300 ${form.role === 'coach' ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-slate-900/50 border-slate-700 text-slate-400 hover:border-slate-500'}`}>
                <input 
                  type="radio" 
                  name="role" 
                  value="coach" 
                  checked={form.role === 'coach'} 
                  onChange={handleChange} 
                  className="hidden" 
                />
                <span className="font-medium">Coach</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all duration-300 transform active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
               <span className="flex items-center gap-2">Creating Account...</span>
            ) : (
               <>
                 <span>Register</span>
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
            Already have an account?{' '}
            <Link 
                to="/login" 
                className="text-emerald-400 hover:text-emerald-300 font-medium hover:underline transition-all"
            >
              Login here
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  );
}