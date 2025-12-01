import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Hexagon, User, LogIn } from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-blue-500 selection:text-white flex flex-col">
      
      {/* BACKGROUND GRADIENT OVERLAY */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0f172a] to-[#1e293b]"></div>
        {/* Subtle radial glow for depth */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-green-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* NAVBAR */}
      <nav className="relative z-50 w-full px-6 py-6 max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <div className="relative">
            <Hexagon className="w-8 h-8 text-blue-500 fill-blue-500/20 group-hover:scale-110 transition-transform duration-300" strokeWidth={2.5} />
            <div className="absolute inset-0 bg-blue-400 blur-lg opacity-20"></div>
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-blue-100 transition-colors">
            TALENT<span className="text-blue-500">SCOUT</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'About', 'Features', 'Contact'].map((item) => (
            <a 
              key={item} 
              href="#" 
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-slate-300 hover:text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden relative z-40 bg-slate-800/90 backdrop-blur-md border-b border-slate-700">
          <div className="flex flex-col p-4 gap-4">
            {['Home', 'About', 'Features', 'Contact'].map((item) => (
              <a key={item} href="#" className="text-slate-300 hover:text-white font-medium">
                {item}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-4 text-center mt-[-4rem]">
        
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Sports Talent <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Assessment
            </span> <br />
            Platform
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed">
            Players upload performance, coaches analyse. <br className="hidden sm:block"/>
            <span className="text-slate-300 font-normal">All in One Place.</span>
          </p>

          {/* Buttons with React Router Links */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link 
              to="/login"
              className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl shadow-lg shadow-blue-600/30 hover:shadow-blue-600/50 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto overflow-hidden inline-flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" />
                Login
              </span>
            </Link>

            <Link 
              to="/register"
              className="group px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto inline-flex items-center justify-center"
            >
               <span className="flex items-center justify-center gap-2">
                <User className="w-5 h-5" />
                Register Now
              </span>
            </Link>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-slate-800/50 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Sports Talent. All rights reserved.
          </div>
          
          <div className="flex gap-6 text-sm text-slate-400">
            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-400 transition-colors">Support</a>
          </div>
        </div>
      </footer>

      {/* Custom Keyframe Animation Style */}
      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}