import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Shield, 
  Trash2, 
  LogOut, 
  Search, 
  LayoutDashboard, 
  UserCog, 
  Trophy,
  ChevronDown,
  AlertCircle
} from "lucide-react";

// --- MOCK API (For Preview Purposes) ---
// In your real app, replace `api` calls with your actual axios import
const api = {
  get: async (url) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            { _id: 1, name: "John Doe", email: "john@example.com", role: "player" },
            { _id: 2, name: "Sarah Smith", email: "sarah@coach.com", role: "coach" },
            { _id: 3, name: "Admin User", email: "admin@system.com", role: "admin" },
            { _id: 4, name: "Mike Tyson", email: "mike@boxer.com", role: "player" },
            { _id: 5, name: "Serena W.", email: "serena@tennis.com", role: "player" },
          ]
        });
      }, 800);
    });
  },
  patch: async (url, data) => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  },
  delete: async (url) => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
};

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
      setMsg("Error loading users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const changeRole = async (id, role) => {
    // Optimistic UI update
    const originalUsers = [...users];
    setUsers(users.map(u => u._id === id ? { ...u, role } : u));
    
    try {
      await api.patch(`/admin/users/${id}/role`, { role });
      setMsg(`Role updated to ${role}`);
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.log(err);
      setUsers(originalUsers); // Revert on error
      setMsg("Failed to update role");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      setMsg("User deleted successfully");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      console.log(err);
      setMsg("Failed to delete user");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Filter users based on search
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleColor = (role) => {
    switch(role) {
      case 'admin': return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case 'coach': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden p-6 md:p-10">
      
      {/* ANIMATED BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-900" />
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-400" />
              Admin Dashboard
            </h1>
            <p className="text-slate-400 mt-1">Manage users, roles, and platform settings</p>
          </div>
          
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800/50 hover:bg-red-500/10 border border-slate-700 hover:border-red-500/50 text-slate-300 hover:text-red-400 rounded-xl transition-all duration-300 group"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-white">{users.length}</h3>
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Players</p>
              <h3 className="text-2xl font-bold text-white">{users.filter(u => u.role === 'player').length}</h3>
            </div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-6 rounded-2xl flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
              <UserCog className="w-6 h-6" />
            </div>
            <div>
              <p className="text-slate-400 text-sm">Coaches/Admins</p>
              <h3 className="text-2xl font-bold text-white">{users.filter(u => u.role !== 'player').length}</h3>
            </div>
          </div>
        </div>

        {/* FEEDBACK MESSAGE */}
        {msg && (
          <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center gap-3 text-blue-400 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5" />
            {msg}
          </div>
        )}

        {/* MAIN TABLE SECTION */}
        <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Toolbar */}
          <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-slate-400" />
              User Management
            </h2>
            
            {/* Search Input */}
            <div className="relative w-full sm:w-72 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 group-focus-within:text-blue-400 transition-colors">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-6 font-medium">User</th>
                  <th className="p-6 font-medium">Role</th>
                  <th className="p-6 font-medium">Status</th>
                  <th className="p-6 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-500">
                      <div className="flex justify-center items-center gap-2">
                        <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
                        Loading data...
                      </div>
                    </td>
                  </tr>
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-500">
                      No users found matching "{searchTerm}"
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u._id} className="group hover:bg-slate-800/30 transition-colors">
                      {/* Name & Email */}
                      <td className="p-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-blue-900/20">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-semibold text-slate-200">{u.name}</div>
                            <div className="text-sm text-slate-500">{u.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Role Selector */}
                      <td className="p-6">
                        <div className="relative inline-block">
                          <select
                            value={u.role}
                            onChange={(e) => changeRole(u._id, e.target.value)}
                            className={`appearance-none pl-3 pr-8 py-1.5 rounded-lg text-xs font-medium border bg-opacity-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all ${getRoleColor(u.role)}`}
                          >
                            <option value="player" className="bg-slate-800 text-slate-200">Player</option>
                            <option value="coach" className="bg-slate-800 text-slate-200">Coach</option>
                            <option value="admin" className="bg-slate-800 text-slate-200">Admin</option>
                          </select>
                          <ChevronDown className={`w-3 h-3 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50 ${getRoleColor(u.role).split(' ')[0]}`} />
                        </div>
                      </td>

                      {/* Status (Mock) */}
                      <td className="p-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                          Active
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-6 text-right">
                        <button
                          onClick={() => deleteUser(u._id)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}