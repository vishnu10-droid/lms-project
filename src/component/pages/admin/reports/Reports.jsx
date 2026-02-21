

import React, { useState } from "react";
import { motion } from "framer-motion"; // Dynamic Animations
import {
  TrendingUp, Users, DollarSign, Download,
  ArrowUpRight, Award, Star
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

// --- Data Constants (Original) ---
const enrollmentData = [
  { month: "Jan", enrollments: 320, completions: 210, dropouts: 45 },
  { month: "Feb", enrollments: 410, completions: 280, dropouts: 38 },
  { month: "Mar", enrollments: 380, completions: 260, dropouts: 42 },
  { month: "Apr", enrollments: 520, completions: 380, dropouts: 35 },
  { month: "May", enrollments: 490, completions: 350, dropouts: 40 },
  { month: "Jun", enrollments: 600, completions: 445, dropouts: 32 },
  { month: "Jul", enrollments: 570, completions: 420, dropouts: 36 },
  { month: "Aug", enrollments: 680, completions: 510, dropouts: 28 },
  { month: "Sep", enrollments: 640, completions: 480, dropouts: 31 },
  { month: "Oct", enrollments: 750, completions: 580, dropouts: 25 },
  { month: "Nov", enrollments: 820, completions: 630, dropouts: 22 },
  { month: "Dec", enrollments: 900, completions: 710, dropouts: 18 },
];

const revenueVsTarget = [
  { month: "Jan", revenue: 42000, target: 40000 },
  { month: "Feb", revenue: 51000, target: 45000 },
  { month: "Mar", revenue: 47000, target: 50000 },
  { month: "Apr", revenue: 63000, target: 55000 },
  { month: "May", revenue: 58000, target: 60000 },
  { month: "Jun", revenue: 72000, target: 65000 },
  { month: "Jul", revenue: 68000, target: 70000 },
  { month: "Aug", revenue: 81000, target: 75000 },
  { month: "Sep", revenue: 76000, target: 80000 },
  { month: "Oct", revenue: 89000, target: 85000 },
  { month: "Nov", revenue: 94000, target: 90000 },
  { month: "Dec", revenue: 102000, target: 95000 },
];

const categoryDistribution = [
  { name: "Machine Learning", value: 35, color: "#3b82f6" },
  { name: "Web Development", value: 28, color: "#10b981" },
  { name: "Data Science", value: 18, color: "#f59e0b" },
  { name: "Design", value: 12, color: "#8b5cf6" },
  { name: "Others", value: 7, color: "#6b7280" },
];

const topPerformers = [
  { name: "Sarah Chen", course: "Machine Learning", score: 98, revenue: "$8,420", students: 342 },
  { name: "Marcus Johnson", course: "React Patterns", score: 96, revenue: "$6,180", students: 278 },
  { name: "Priya Patel", course: "Data Science", score: 94, revenue: "$11,240", students: 410 },
  { name: "Emma Wilson", course: "UI/UX Design", score: 93, revenue: "$5,360", students: 215 },
  { name: "David Kim", course: "Node.js", score: 91, revenue: "$7,890", students: 298 },
];

const kpis = [
  { label: "Total Revenue", value: "$843,000", change: "+24.8%", positive: true, icon: DollarSign, color: "blue" },
  { label: "Total Enrollments", value: "6,480", change: "+18.2%", positive: true, icon: Users, color: "indigo" },
  { label: "Completion Rate", value: "76.4%", change: "+3.1%", positive: true, icon: TrendingUp, color: "green" },
  { label: "Avg. Rating", value: "4.78", change: "+0.12", positive: true, icon: Star, color: "orange" },
];

const kpiColorClasses = {
  blue: "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300",
  indigo: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300",
  green: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-300",
  orange: "bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300",
};

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { staggerChildren: 0.1, duration: 0.5 } 
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 }
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-gray-200 dark:border-slate-700 rounded-xl p-3 shadow-2xl text-xs">
        <p className="font-bold text-gray-900 dark:text-slate-100 mb-2 border-b border-gray-200 dark:border-slate-700 pb-1">{label}</p>
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 rounded-full" style={{ background: p.color || p.fill }} />
            <span className="text-gray-600 dark:text-slate-300 font-medium">
              {p.name}: <span className="text-gray-900 dark:text-slate-100 font-bold">
                {typeof p.value === "number" && p.value > 1000 ? `$${p.value.toLocaleString()}` : p.value.toLocaleString()}
              </span>
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Reports() {
  const [exportFormat] = useState("csv");
  const MotionDiv = motion.div;
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  React.useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <MotionDiv 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      className="p-6 bg-slate-50 dark:bg-slate-950 min-h-screen space-y-8 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      
              <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  className="absolute -top-10 -right-10 w-60 h-60 bg-indigo-500/30 rounded-full blur-3xl"
                />
          
                {/* Header Parallax */}
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10"
                >
                  <motion.h1
                    initial={{ x: -25 }}
                    animate={{ x: 0 }}
                    transition={{ type: "spring", stiffness: 60 }}
                    className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg"
                  >
                    Reports & Analytics
                  </motion.h1>
          
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
                    Insights and growth tracking dashboard
                  </p>
                </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all"
          >
            <Download className="w-4 h-4" /> Export {exportFormat.toUpperCase()}
          </motion.button>
        </div>



      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi) => (
          <motion.div 
            key={kpi.label} 
            variants={itemVariants}
            whileHover={{
              y: -5,
              boxShadow: isDark
                ? "0 20px 25px -5px rgb(0 0 0 / 0.45)"
                : "0 20px 25px -5px rgb(0 0 0 / 0.1)",
            }}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group transition-all"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-full -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-500" />
            <div className="flex items-center justify-between mb-4 relative">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${kpiColorClasses[kpi.color]}`}>
                <kpi.icon className="w-6 h-6" />
              </div>
              <motion.span 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }}
                className="flex items-center gap-1 text-xs font-bold px-2 py-1 bg-green-50 text-green-600 rounded-full"
              >
                <ArrowUpRight className="w-3 h-3" />{kpi.change}
              </motion.span>
            </div>
            <p className="text-xs text-slate-400 dark:text-slate-500 font-bold tracking-wide uppercase">{kpi.label}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100 mt-1">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Enrollment Trends</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Growth analysis over 12 months</p>
            </div>
            <Award className="w-5 h-5 text-blue-500 opacity-50" />
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentData}>
                <defs>
                  <linearGradient id="enGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#f1f5f9"} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600, fill: isDark ? "#94a3b8" : "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: isDark ? "#94a3b8" : "#94a3b8" }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} />
                <Area 
                  type="monotone" 
                  dataKey="enrollments" 
                  stroke="#3b82f6" 
                  strokeWidth={4} 
                  fill="url(#enGrad)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Revenue Performance</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Actual revenue vs Monthly target</p>
            </div>
            <DollarSign className="w-5 h-5 text-green-500 opacity-50" />
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueVsTarget} barGap={10}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? "#334155" : "#f1f5f9"} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fontWeight: 600, fill: isDark ? "#94a3b8" : "#94a3b8" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fontWeight: 600, fill: isDark ? "#94a3b8" : "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="revenue" 
                  fill="#3b82f6" 
                  radius={[6, 6, 0, 0]} 
                  maxBarSize={15} 
                  animationBegin={500}
                />
                <Bar 
                  dataKey="target" 
                  fill={isDark ? "#334155" : "#e2e8f0"} 
                  radius={[6, 6, 0, 0]} 
                  maxBarSize={15} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">Course Mix</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mb-6">Enrollment distribution</p>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie 
                  data={categoryDistribution} 
                  cx="50%" cy="50%" 
                  innerRadius={60} 
                  outerRadius={85} 
                  paddingAngle={8} 
                  dataKey="value"
                  animationBegin={800}
                >
                  {categoryDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {categoryDistribution.map((c) => (
              <div key={c.name} className="flex flex-col p-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full shadow-sm" style={{ background: c.color }} />
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase truncate">{c.name}</span>
                </div>
                <span className="text-sm font-black text-slate-800 dark:text-slate-100">{c.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-50 dark:border-slate-700 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Top Instructors</h2>
              <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Performance leaderboard</p>
            </div>
            <button className="text-xs font-bold text-blue-600 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-slate-400 dark:text-slate-500 text-[10px] uppercase tracking-widest font-black">
                  <th className="px-6 py-4">Instructor</th>
                  <th className="px-4 py-4">Course</th>
                  <th className="px-4 py-4">Rating</th>
                  <th className="px-4 py-4">Revenue</th>
                  <th className="px-4 py-4 text-right">Students</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                {topPerformers.map((p) => (
                  <motion.tr 
                    key={p.name} 
                    className="group hover:bg-slate-50/80 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-400 flex items-center justify-center text-white text-xs font-black shadow-md shadow-blue-100 group-hover:scale-110 transition-transform">
                          {p.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{p.name}</p>
                          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">TOP PERFORMER</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300 truncate inline-block max-w-[120px]">
                        {p.course}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-slate-100 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }} 
                            animate={{ width: `${p.score}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-full bg-orange-400" 
                          />
                        </div>
                        <span className="text-[11px] font-black text-slate-800 dark:text-slate-200">{p.score}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-xs font-black text-green-600">{p.revenue}</td>
                    <td className="px-4 py-4 text-xs font-black text-slate-800 dark:text-slate-200 text-right">{p.students.toLocaleString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </MotionDiv>
  );
}
