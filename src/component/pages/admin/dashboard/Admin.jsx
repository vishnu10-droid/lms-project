import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid, AreaChart, Area,
  PieChart, Pie, Cell
} from "recharts";
import {
  Users, BookOpen, GraduationCap, DollarSign, TrendingUp,
  PlusCircle, UserPlus, Megaphone, CheckCircle, Clock, 
  Activity, Award, Zap, Shield, Search, Bell, Menu
} from "lucide-react";

/* ------------------ ENHANCED DATA ------------------ */
const initialStats = [
  { title: "Total Students", value: "12,540", change: "+18%", icon: <Users />, color: "from-blue-600 to-cyan-500", status: "up" },
  { title: "Monthly Revenue", value: "₹1.28Cr", change: "+24%", icon: <DollarSign />, color: "from-emerald-600 to-teal-500", status: "up" },
  { title: "Active Courses", value: "860", change: "+12%", icon: <BookOpen />, color: "from-violet-600 to-purple-500", status: "up" },
  { title: "Retention Rate", value: "94.2%", change: "+5%", icon: <Activity />, color: "from-orange-600 to-amber-500", status: "up" },
];

const enrollmentTrends = [
  { month: "Jan", students: 4000, revenue: 2400 },
  { month: "Feb", students: 3000, revenue: 1398 },
  { month: "Mar", students: 2000, revenue: 9800 },
  { month: "Apr", students: 2780, revenue: 3908 },
  { month: "May", students: 1890, revenue: 4800 },
  { month: "Jun", students: 2390, revenue: 3800 },
  { month: "Jul", students: 3490, revenue: 4300 },
];

export default function ModernAdminDashboard() {
  const [stats] = useState(initialStats);
  const MotionDiv = motion.div;
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-indigo-100 dark:selection:bg-indigo-900/40 transition-colors duration-300">
      
      <main className="p-4 sm:p-8 max-w-[1600px] mx-auto space-y-8">
        
        {/* 👋 WELCOME HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <MotionDiv initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-1">Overview Dashboard</h2>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Good Morning, Chief! </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Here's what is happening with your platform today.</p>
          </MotionDiv>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Download CSV</button>
            <button className="flex-1 md:flex-none px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:bg-indigo-700 transition-all">Create Report</button>
          </div>
        </header>

        {/* 📊 KPI GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <MotionDiv
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                  {React.cloneElement(stat.icon, { size: 22 })}
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg">{stat.change}</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">{stat.title}</p>
              <h3 className="text-3xl font-black text-slate-900 dark:text-slate-100">{stat.value}</h3>
            </MotionDiv>
          ))}
        </section>

        {/* 📈 MAIN CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* REVENUE AREA CHART */}
          <MotionDiv 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm"
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Revenue Stream</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Comparison between Students vs Revenue</p>
              </div>
              <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button className="px-4 py-1.5 bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-300 rounded-lg text-xs font-bold shadow-sm">Monthly</button>
                <button className="px-4 py-1.5 text-slate-500 dark:text-slate-400 rounded-lg text-xs font-bold">Yearly</button>
              </div>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={enrollmentTrends}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#f1f5f9"} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12, fontWeight: 600}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: isDark ? "#94a3b8" : "#64748b", fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                      backgroundColor: isDark ? "#0f172a" : "#ffffff",
                      color: isDark ? "#e2e8f0" : "#0f172a",
                    }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorRev)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </MotionDiv>

          {/* ⚡ QUICK ACTIONS VERTICAL LIST */}
          <div className="space-y-6">
             <div className="bg-indigo-600 rounded-[2rem] p-8 text-white shadow-2xl shadow-indigo-200 dark:shadow-indigo-900/30 relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold mb-2">Platform Power-up</h3>
                  <p className="text-indigo-100 text-sm mb-6">Create a new marketing campaign or onboard new staff instantly.</p>
                  <button className="w-full bg-white text-indigo-600 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-50 transition-all">
                    <PlusCircle size={18} /> Launch Campaign
                  </button>
                </div>
                <Zap className="absolute -bottom-4 -right-4 text-indigo-500 opacity-20" size={120} />
             </div>

             <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-[2rem] p-6 shadow-sm">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
                   <Clock size={18} className="text-indigo-600" /> System Logs
                </h3>
                <div className="space-y-4">
                  {[
                    { msg: "New Instructor Signup", time: "2m ago", color: "bg-blue-500" },
                    { msg: "Server Scaled Up (Auto)", time: "15m ago", color: "bg-emerald-500" },
                    { msg: "Payment Gateway Refreshed", time: "1h ago", color: "bg-amber-500" }
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-slate-50 dark:border-slate-700 pb-3 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${log.color}`}></div>
                        <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{log.msg}</p>
                      </div>
                      <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-tighter">{log.time}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>

        </div>

        {/* 🏆 BOTTOM CARDS */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm col-span-1 md:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Top Performing Instructors</h3>
                <button className="text-indigo-600 text-xs font-bold hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-widest border-b border-slate-50 dark:border-slate-700">
                      <th className="pb-3 font-black">Instructor</th>
                      <th className="pb-3 font-black">Course</th>
                      <th className="pb-3 font-black">Students</th>
                      <th className="pb-3 font-black">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                    {[1, 2, 3].map((_, i) => (
                      <tr key={i} className="group">
                        <td className="py-4 flex items-center gap-3">
                          <img src={`https://i.pravatar.cc/150?img=${i+10}`} className="w-8 h-8 rounded-full" alt="user" />
                          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Dr. Sarah Jenkins</span>
                        </td>
                        <td className="py-4 text-sm text-slate-500 dark:text-slate-400 font-medium">Advanced React Patterns</td>
                        <td className="py-4 text-sm font-bold text-slate-800 dark:text-slate-200">2,405</td>
                        <td className="py-4">
                           <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                             <Award size={14} fill="currentColor" /> 4.9
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
           
           <div className="bg-slate-900 p-8 rounded-[2rem] text-white flex flex-col justify-center relative overflow-hidden">
              <Shield size={40} className="text-indigo-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">Security Shield Active</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">Your platform is currently protected against SQL injections and DDoS attacks. 0 threats detected in 24h.</p>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }} 
                  animate={{ width: "100%" }} 
                  transition={{ duration: 2, repeat: Infinity }}
                  className="h-full bg-indigo-500"
                />
              </div>
              <p className="text-[10px] mt-4 text-slate-500 font-black uppercase tracking-[0.2em]">Status: Optimal</p>
           </div>
        </section>

      </main>
    </div>
  );
}
