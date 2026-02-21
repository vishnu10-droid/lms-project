import React, { useEffect, useState } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell
} from "recharts";

import {
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  GraduationCap
} from "lucide-react";

/* ------------------ SAMPLE DATA ------------------ */

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 15000 },
  { month: "Apr", revenue: 22000 },
  { month: "May", revenue: 26000 },
  { month: "Jun", revenue: 30000 }
];

const enrollmentsData = [
  { month: "Jan", students: 200 },
  { month: "Feb", students: 350 },
  { month: "Mar", students: 280 },
  { month: "Apr", students: 420 },
  { month: "May", students: 500 },
  { month: "Jun", students: 610 }
];

const courseCategoryData = [
  { name: "Development", value: 45 },
  { name: "Design", value: 20 },
  { name: "Marketing", value: 15 },
  { name: "Business", value: 20 }
];

const topCourses = [
  { title: "React Masterclass", students: 1200, revenue: 24000 },
  { title: "UI/UX Bootcamp", students: 860, revenue: 17000 },
  { title: "Python for Beginners", students: 990, revenue: 19800 },
  { title: "Digital Marketing Pro", students: 720, revenue: 14400 }
];

const COLORS = ["#6366F1", "#22C55E", "#F97316", "#E11D48"];

/* ------------------ COMPONENT ------------------ */

export default function AdminAnalytics() {
  const [filter, setFilter] = useState("monthly");
  const [isDark, setIsDark] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      label: "Total Revenue",
      value: "$128,000",
      icon: <DollarSign size={28} />,
      color: "bg-indigo-500"
    },
    {
      label: "Total Students",
      value: "12,540",
      icon: <Users size={28} />,
      color: "bg-green-500"
    },
    {
      label: "Total Courses",
      value: "320",
      icon: <BookOpen size={28} />,
      color: "bg-orange-500"
    },
    {
      label: "Course Completions",
      value: "8,430",
      icon: <GraduationCap size={28} />,
      color: "bg-pink-500"
    }
  ];

  return (
    <div className="p-6 space-y-8 text-slate-900 dark:text-slate-100">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-500 dark:text-slate-400">
            Platform performance overview
          </p>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-slate-300 bg-white rounded-lg px-4 py-2 text-slate-800 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-white dark:bg-slate-900 rounded-xl shadow p-6 flex items-center gap-4 border border-slate-100 dark:border-slate-700"
          >
            <div className={`${item.color} text-white p-4 rounded-xl`}>
              {item.icon}
            </div>
            <div>
              <p className="text-gray-500 dark:text-slate-400">{item.label}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Revenue Line Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow border border-slate-100 dark:border-slate-700">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={18} /> Revenue Growth
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#334155" : "#e2e8f0"}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
              />
              <YAxis tick={{ fill: isDark ? "#94a3b8" : "#64748b" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#0f172a" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                  borderRadius: "12px",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366F1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Enrollments Bar Chart */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow border border-slate-100 dark:border-slate-700">
          <h3 className="font-semibold mb-4">Student Enrollments</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={enrollmentsData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={isDark ? "#334155" : "#e2e8f0"}
              />
              <XAxis
                dataKey="month"
                tick={{ fill: isDark ? "#94a3b8" : "#64748b" }}
              />
              <YAxis tick={{ fill: isDark ? "#94a3b8" : "#64748b" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#0f172a" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                  borderRadius: "12px",
                }}
              />
              <Bar dataKey="students" fill="#22C55E" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* CATEGORY PIE + TOP COURSES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Course Category Distribution */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow border border-slate-100 dark:border-slate-700">
          <h3 className="font-semibold mb-4">Course Categories</h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseCategoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {courseCategoryData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#0f172a" : "#ffffff",
                  borderColor: isDark ? "#334155" : "#e2e8f0",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                  borderRadius: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top Courses Table */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow border border-slate-100 dark:border-slate-700">
          <h3 className="font-semibold mb-4">Top Performing Courses</h3>

          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-200 dark:border-slate-700">
                <th className="py-2">Course</th>
                <th>Students</th>
                <th>Revenue</th>
              </tr>
            </thead>

            <tbody>
              {topCourses.map((course, i) => (
                <tr
                  key={i}
                  className="border-b border-slate-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800/60"
                >
                  <td className="py-2">{course.title}</td>
                  <td>{course.students}</td>
                  <td>${course.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
