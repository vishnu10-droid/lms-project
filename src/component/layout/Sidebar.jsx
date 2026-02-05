import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Users, GraduationCap,
  MessageSquare, Settings, BarChart, ClipboardList,
  Bell, ChevronLeft, ChevronRight, ChevronDown, LogOut, Search,
  TrendingUp, PlayCircle, MoreVertical, Star, ArrowUpRight, DollarSign
} from "lucide-react";

import {
  LineChart, Line, ResponsiveContainer,
  XAxis, Tooltip, AreaChart, Area
} from "recharts";

/* ---------------- DATA ---------------- */

const revenueData = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 6800 },
  { month: "Mar", revenue: 7500 },
  { month: "Apr", revenue: 9200 },
  { month: "May", revenue: 10500 },
  { month: "Jun", revenue: 14800 },
];

const menus = [
  { name: "Dashboard", icon: LayoutDashboard, color: "from-blue-400 to-indigo-600" },
  { name: "Courses", icon: BookOpen, color: "from-fuchsia-500 to-purple-600", submenu: ["All Courses", "Live Classes", "Curriculum"] },
  { name: "Students", icon: Users, color: "from-emerald-400 to-cyan-500", submenu: ["Enrollments", "Attendance"] },
  { name: "Assessments", icon: ClipboardList, color: "from-amber-400 to-orange-500", submenu: ["Quizzes", "Results"] },
  { name: "Messages", icon: MessageSquare, color: "from-rose-400 to-red-500", badge: 5 },
  { name: "Analytics", icon: BarChart, color: "from-violet-500 to-fuchsia-500" },
  { name: "Settings", icon: Settings, color: "from-slate-400 to-slate-600" },
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function LuxuryFullPage() {
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState("Dashboard");
  const [openMenu, setOpenMenu] = useState(null);

  return (
    <div className="flex h-screen bg-[#02040a] text-slate-200 overflow-hidden selection:bg-indigo-500/30 font-sans relative">
      
      {/* --- ELITE DYNAMIC BACKGROUND SYSTEM --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Animated Orbs */}
        <motion.div 
          animate={{ x: [0, 80, 0], y: [0, 40, 0], scale: [1, 1.1, 1] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] bg-indigo-600/20 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ x: [0, -60, 0], y: [0, 80, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[15%] -right-[5%] w-[50%] h-[50%] bg-purple-600/15 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1] }} 
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[15%] left-[15%] w-[45%] h-[45%] bg-blue-600/10 blur-[140px] rounded-full" 
        />
        
        {/* Fine Grain Texture */}
        <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* ================= SIDEBAR ================= */}
      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 280 : 96 }}
        className="relative z-50 h-[96vh] my-[2vh] ml-[2vh] bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.4)] ring-1 ring-inset ring-white/5"
      >
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-16 bg-[#0f172a] border border-white/10 text-slate-400 hover:text-white p-1.5 rounded-full shadow-2xl z-50 transition-all hover:scale-110"
        >
          {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>

        <div className="h-24 flex items-center px-7 shrink-0">
          <div className="relative flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <span className="font-black text-white text-lg tracking-tighter">AS</span>
            </div>
            {isOpen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col">
                <span className="font-bold text-lg leading-none text-white tracking-tight">Scholars</span>
                <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.2em]">Academy</span>
              </motion.div>
            )}
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar pt-4">
          {menus.map((item) => {
            const Icon = item.icon;
            const isActive = active === item.name;
            return (
              <div key={item.name}>
                <button
                  onClick={() => {
                    setActive(item.name);
                    if (item.submenu) setOpenMenu(openMenu === item.name ? null : item.name);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all duration-300 group
                    ${isActive ? "bg-white/10 text-white ring-1 ring-white/10" : "text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl transition-all duration-500 ${isActive ? `bg-gradient-to-br ${item.color} text-white shadow-lg` : "bg-slate-800/40"}`}>
                      <Icon size={18} />
                    </div>
                    {isOpen && <span className="text-sm font-semibold tracking-wide">{item.name}</span>}
                  </div>
                  {isOpen && (item.badge || item.submenu) && (
                    <div className="flex items-center gap-2">
                      {item.badge && <span className="bg-indigo-500 text-[10px] px-2 py-0.5 rounded-lg text-white font-bold">{item.badge}</span>}
                      {item.submenu && <ChevronDown size={14} className={`transition-transform duration-300 ${openMenu === item.name ? 'rotate-180' : ''}`} />}
                    </div>
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && openMenu === item.name && item.submenu && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="ml-11 mt-1 space-y-1 border-l border-white/5 overflow-hidden">
                      {item.submenu.map((sub) => (
                        <div key={sub} className="text-xs text-slate-500 hover:text-indigo-400 py-2 pl-5 cursor-pointer transition-all hover:translate-x-1">{sub}</div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <div className={`flex items-center bg-black/20 p-3 rounded-2xl border border-white/5 ${isOpen ? "gap-4" : "justify-center"}`}>
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" className="w-10 h-10 rounded-xl border border-white/10" alt="user" />
            {isOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">Alex Sterling</p>
                <p className="text-[10px] text-indigo-400 font-bold tracking-widest opacity-70">ADMIN</p>
              </div>
            )}
            {isOpen && <LogOut size={16} className="text-slate-600 hover:text-rose-500 cursor-pointer transition-colors" />}
          </div>
        </div>
      </motion.aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 flex flex-col min-w-0 py-[2vh] pr-[2vh] relative z-10">
        <div className="h-full bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[3rem] flex flex-col overflow-hidden shadow-2xl ring-1 ring-inset ring-white/5">
          
          {/* HEADER */}
          <header className="h-24 flex items-center justify-between px-10 shrink-0 border-b border-white/5 bg-white/[0.01]">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-white uppercase italic">Dashboard</h1>
              <p className="text-[10px] text-slate-500 font-bold tracking-[0.3em] uppercase mt-1 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                Live Network Status
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-3 bg-black/20 border border-white/5 rounded-2xl px-5 py-2.5 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
                <Search size={16} className="text-slate-500" />
                <input type="text" placeholder="Search data..." className="bg-transparent text-sm outline-none w-48 text-white" />
              </div>
              <div className="bg-white/5 p-3 rounded-2xl text-slate-400 border border-white/10 hover:bg-white/10 cursor-pointer transition-all">
                <Bell size={18} />
              </div>
              <button className="bg-gradient-to-r from-indigo-500 to-violet-600 text-white px-6 py-3 rounded-2xl text-xs font-black shadow-[0_10px_25px_rgba(79,70,229,0.3)] hover:scale-105 transition-all">
                NEW REPORT
              </button>
            </div>
          </header>

          {/* DASHBOARD BODY */}
          <div className="flex-1 overflow-y-auto p-10 custom-scrollbar space-y-10">
            
            {/* KPI GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <KPICard icon={DollarSign} label="Monthly Revenue" value="$245.8k" trend="+24%" color="indigo" />
              <KPICard icon={Users} label="New Students" value="1,240" trend="+12%" color="emerald" />
              <KPICard icon={BookOpen} label="Course Assets" value="185" trend="+05%" color="pink" />
              <KPICard icon={Star} label="Satisfaction" value="99.2%" trend="Top 1%" color="amber" />
            </div>

            {/* CHARTS SECTION */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              <div className="xl:col-span-2 bg-black/30 border border-white/5 rounded-[2.5rem] p-8 ring-1 ring-inset ring-white/[0.02]">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-bold text-white tracking-tight">Financial Performance</h3>
                  <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
                    <button className="text-[10px] px-4 py-1.5 bg-white/10 text-white font-black rounded-lg">6M</button>
                    <button className="text-[10px] px-4 py-1.5 text-slate-500 hover:text-white transition-colors">1Y</button>
                  </div>
                </div>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="month" stroke="#334155" fontSize={11} axisLine={false} tickLine={false} dy={10} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }} 
                        itemStyle={{ color: '#fff' }}
                      />
                      <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fill="url(#colorRev)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-black/30 border border-white/5 rounded-[2.5rem] p-8 ring-1 ring-inset ring-white/[0.02]">
                <h3 className="text-lg font-bold text-white mb-6">Trending Courses</h3>
                <div className="space-y-4">
                  {["Quantum Computing", "Generative AI", "Cyber Security", "FinTech"].map((course, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 rounded-2xl group hover:border-indigo-500/50 transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                           <PlayCircle size={20} />
                        </div>
                        <span className="text-sm font-bold">{course}</span>
                      </div>
                      <ArrowUpRight size={16} className="text-slate-600 group-hover:text-white" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TABLE SECTION */}
            <div className="bg-black/30 border border-white/5 rounded-[2.5rem] p-8 overflow-hidden shadow-inner">
              <h3 className="text-lg font-bold text-white mb-6 italic">High-Value Enrollments</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-slate-600 border-b border-white/5 text-[10px] uppercase tracking-[0.2em] font-black">
                    <tr>
                      <th className="pb-6">Student Entity</th>
                      <th className="pb-6 text-center">Module</th>
                      <th className="pb-6 text-center">Status</th>
                      <th className="pb-6 text-right">Investment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[
                      { name: "Morgan, Alex", course: "GenAI Masterclass", status: "Verified", price: "$1,200" },
                      { name: "Lee, Sophia", course: "UX Strategy", status: "Verified", price: "$850" },
                      { name: "Carter, John", course: "Blockchain", status: "Processing", price: "$990" }
                    ].map((row, i) => (
                      <tr key={i} className="group hover:bg-white/[0.01] transition-all">
                        <td className="py-6 font-bold text-white tracking-wide">{row.name}</td>
                        <td className="py-6 text-center text-slate-400 font-medium">{row.course}</td>
                        <td className="py-6 text-center">
                          <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter ${row.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                            {row.status}
                          </span>
                        </td>
                        <td className="py-6 text-right font-mono text-indigo-400 font-black">{row.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 20px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}

function KPICard({ icon: Icon, label, value, trend, color }) {
  const themes = {
    indigo: "from-indigo-600/20 border-indigo-500/20 text-indigo-400",
    emerald: "from-emerald-600/20 border-emerald-500/20 text-emerald-400",
    pink: "from-pink-600/20 border-pink-500/20 text-pink-400",
    amber: "from-amber-600/20 border-amber-500/20 text-amber-400"
  };
  return (
    <div className={`p-8 rounded-[2.5rem] border bg-gradient-to-br to-transparent ${themes[color]} group hover:-translate-y-1 transition-all duration-500 shadow-xl ring-1 ring-inset ring-white/[0.02]`}>
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:rotate-12 transition-all">
          <Icon size={24} />
        </div>
        <span className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-lg text-white shadow-lg">{trend}</span>
      </div>
      <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-2">{label}</p>
      <h3 className="text-3xl font-black text-white tracking-tighter">{value}</h3>
    </div>
  );
}

