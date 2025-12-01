import React, { useState, useEffect } from "react";
import { 
  Menu, 
  X, 
  Hexagon, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Video, 
  BarChart, 
  Users, 
  ShieldCheck, 
  Mail, 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  Award 
} from "lucide-react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const u = localStorage.getItem("user");
    if (u) setUser(JSON.parse(u));

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
    // navigate to login - you'll need to implement this with your router
    window.location.href = "/login";
  };

  const navigateHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="bg-slate-950 text-white font-sans overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900" />
        
        {/* Animated orbs */}
        <div 
          className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/30 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '4s' }}
        />
        <div 
          className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/20 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '6s', animationDelay: '1s' }}
        />
        <div 
          className="absolute top-[40%] right-[20%] w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse"
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

      {/* Navbar with glass effect */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50 
            ? 'bg-slate-950/80 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo with animation */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={navigateHome}
          >
            <div className="relative">
              <Hexagon className="w-10 h-10 text-blue-500 fill-blue-500/20 group-hover:fill-blue-500/40 transition-all duration-300 group-hover:rotate-180" />
              <Sparkles className="w-4 h-4 text-blue-400 absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
              TALENT<span className="text-blue-500">SCOUT</span>
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="text-slate-300 hover:text-white transition-colors relative group">
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#features" className="text-slate-300 hover:text-white transition-colors relative group">
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#contact" className="text-slate-300 hover:text-white transition-colors relative group">
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300" />
            </a>

            {user ? (
              <>
                <a
                  href={user.role === "coach" ? "/coach" : "/dashboard"}
                  className="bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 rounded-xl flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </a>
                <button
                  onClick={logoutUser}
                  className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-5 py-2.5 rounded-xl flex items-center gap-2 hover:bg-red-600/20 hover:border-red-500/50 transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <a 
                  href="/login" 
                  className="text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-2"
                >
                  Login
                </a>
                <a 
                  href="/register" 
                  className="bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  Register
                </a>
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-slate-300 hover:text-white transition-colors p-2"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu with slide animation */}
      <div 
        className={`fixed top-[72px] left-0 right-0 z-40 md:hidden bg-slate-900/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="p-6 space-y-4">
          <a href="#about" className="block text-slate-300 hover:text-white py-2 transition-colors" onClick={() => setIsMenuOpen(false)}>
            About
          </a>
          <a href="#features" className="block text-slate-300 hover:text-white py-2 transition-colors" onClick={() => setIsMenuOpen(false)}>
            Features
          </a>
          <a href="#contact" className="block text-slate-300 hover:text-white py-2 transition-colors" onClick={() => setIsMenuOpen(false)}>
            Contact
          </a>

          {user ? (
            <>
              <a
                href={user.role === "coach" ? "/coach" : "/dashboard"}
                className="block bg-blue-600 px-4 py-3 rounded-xl font-semibold text-center hover:bg-blue-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </a>
              <button
                onClick={() => {
                  logoutUser();
                  setIsMenuOpen(false);
                }}
                className="w-full text-red-400 border border-red-500/30 px-4 py-3 rounded-xl hover:bg-red-500/10 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <a 
                href="/login" 
                className="block text-center border border-slate-700 px-4 py-3 rounded-xl hover:bg-slate-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </a>
              <a 
                href="/register" 
                className="block bg-emerald-600 px-4 py-3 rounded-xl text-center font-semibold hover:bg-emerald-500 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Register
              </a>
            </>
          )}
        </div>
      </div>

      {/* HERO Section */}
      <section className="relative z-10 pt-40 pb-32 px-6">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-300 font-medium">AI-Powered Sports Analytics</span>
          </div>

          {/* Main Heading with gradient */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] mb-6">
            Discover Future{" "}
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Sports Talent
            </span>
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed">
            A complete AI-ready platform for players, coaches, and managers.
            <br className="hidden sm:block" />
            <span className="text-slate-300 font-semibold">Upload. Analyse. Compare. Improve.</span>
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/register"
              className="group bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              Get Started Free
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>

            <a
              href="#features"
              className="group bg-slate-800/50 backdrop-blur-sm border border-slate-700 px-8 py-4 rounded-2xl text-lg hover:bg-slate-800 hover:border-slate-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Learn More
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <StatCard number="5000+" label="Active Players" />
            <StatCard number="500+" label="Coaches" />
            <StatCard number="98%" label="Accuracy Rate" />
            <StatCard number="24/7" label="Support" />
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              About <span className="text-blue-400">Platform</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-slate-300 text-lg leading-relaxed">
                TalentScout is designed to help <span className="text-white font-semibold">players showcase performance</span> and 
                <span className="text-white font-semibold"> coaches analyze progress</span> with real data.
              </p>
              <p className="text-slate-400 leading-relaxed">
                AI-ready stats, performance tracking, video analysis, and comparison system — all in one powerful platform.
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm">
                  Video Analysis
                </span>
                <span className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-300 text-sm">
                  Performance Tracking
                </span>
                <span className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm">
                  AI Insights
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <TrendingUp className="w-16 h-16 text-blue-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Data-Driven Decisions</h3>
                <p className="text-slate-300">
                  Make informed choices with comprehensive analytics and real-time performance metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Platform <span className="text-blue-400">Features</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 mx-auto rounded-full mb-6" />
            <p className="text-slate-400 max-w-2xl mx-auto">
              Everything you need to elevate your sports performance and coaching experience
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Video className="w-10 h-10" />} 
              title="Video Uploads"
              desc="Players upload their match clips. Coach reviews performance easily with frame-by-frame analysis."
              gradient="from-blue-500/20 to-cyan-500/20"
              borderColor="border-blue-500/30"
            />

            <FeatureCard 
              icon={<BarChart className="w-10 h-10" />} 
              title="Performance Analytics"
              desc="Graph-based speed, stamina & strength insights with AI-powered recommendations."
              gradient="from-emerald-500/20 to-green-500/20"
              borderColor="border-emerald-500/30"
            />

            <FeatureCard 
              icon={<Users className="w-10 h-10" />} 
              title="Player Comparison"
              desc="Compare players side-by-side with advanced metrics and historical data analysis."
              gradient="from-purple-500/20 to-pink-500/20"
              borderColor="border-purple-500/30"
            />

            <FeatureCard 
              icon={<ShieldCheck className="w-10 h-10" />} 
              title="Coach Management"
              desc="Coach dashboard for monitoring players deeply with customizable tracking parameters."
              gradient="from-orange-500/20 to-red-500/20"
              borderColor="border-orange-500/30"
            />

            <FeatureCard 
              icon={<LayoutDashboard className="w-10 h-10" />} 
              title="Admin Panel"
              desc="Manage all users, coaches, performance data & roles from one centralized hub."
              gradient="from-indigo-500/20 to-blue-500/20"
              borderColor="border-indigo-500/30"
            />

            <FeatureCard 
              icon={<Mail className="w-10 h-10" />} 
              title="Notifications"
              desc="Email alerts and real-time updates for players & coaches on important milestones."
              gradient="from-teal-500/20 to-cyan-500/20"
              borderColor="border-teal-500/30"
            />
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <Award className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Contact <span className="text-blue-400">Us</span>
            </h2>

            <p className="text-slate-300 max-w-xl mx-auto mb-8 text-lg">
              Need help or want to collaborate? Our team is ready to assist you.
            </p>

            <a
              href="mailto:support@talentscout.com"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 text-lg font-semibold"
            >
              <Mail className="w-5 h-5" />
              support@talentscout.com
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Hexagon className="w-8 h-8 text-blue-500 fill-blue-500/20" />
              <span className="text-lg font-bold">
                TALENT<span className="text-blue-500">SCOUT</span>
              </span>
            </div>

            <div className="text-slate-400 text-sm">
              © {new Date().getFullYear()} TalentScout. All Rights Reserved.
            </div>

            <div className="flex gap-6 text-slate-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* STAT CARD COMPONENT */
function StatCard({ number, label }) {
  return (
    <div className="text-center group">
      <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
        {number}
      </div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );
}

/* FEATURE CARD COMPONENT */
function FeatureCard({ icon, title, desc, gradient, borderColor }) {
  return (
    <div className={`group relative bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border ${borderColor} hover:border-opacity-60 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl overflow-hidden`}>
      {/* Gradient background on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`} />
      
      <div className="relative z-10">
        <div className="text-blue-400 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 inline-block">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
          {desc}
        </p>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}