import React, { useState } from "react";
import {
  BarChart3,
  Users,
  BookOpen,
  DollarSign,
  TrendingUp,
  Download,
  Calendar,
  Filter
} from "lucide-react";

/* ---------------- SAMPLE DATA ---------------- */

const summaryData = [
  { title: "Total Students", value: 15420, icon: Users, color: "from-indigo-500 to-purple-500" },
  { title: "Active Courses", value: 128, icon: BookOpen, color: "from-emerald-500 to-teal-500" },
  { title: "Monthly Revenue", value: "$48,500", icon: DollarSign, color: "from-pink-500 to-rose-500" },
  { title: "Completion Rate", value: "82%", icon: TrendingUp, color: "from-yellow-400 to-orange-500" }
];

const coursePerformance = [
  { name: "React Masterclass", progress: 92 },
  { name: "Python for Beginners", progress: 85 },
  { name: "UI/UX Design Bootcamp", progress: 78 },
  { name: "Data Science Pro", progress: 88 }
];

const students = [
  { name: "Rahul Kumar", course: "React Masterclass", progress: 90 },
  { name: "Ananya Sharma", course: "Python for Beginners", progress: 82 },
  { name: "Amit Singh", course: "UI/UX Design", progress: 75 },
  { name: "Neha Verma", course: "Data Science Pro", progress: 88 }
];

/* ---------------- COMPONENT ---------------- */

export default function Reports() {
  const [range, setRange] = useState("This Month");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Reports & Analytics</h1>
          <p className="text-slate-500">Track performance and growth</p>
        </div>

        <div className="flex gap-3 mt-4 md:mt-0">
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="px-4 py-2 rounded-xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-400"
          >
            <option>This Week</option>
            <option>This Month</option>
            <option>This Year</option>
          </select>

          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white shadow hover:bg-indigo-700">
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {summaryData.map((item, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl text-white shadow-lg bg-gradient-to-r ${item.color}`}
          >
            <div className="flex items-center justify-between">
              <item.icon size={28} />
              <BarChart3 />
            </div>
            <h3 className="mt-6 text-lg">{item.title}</h3>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>

      {/* COURSE PERFORMANCE */}
      <div className="bg-white rounded-2xl shadow p-6 mb-10">
        <h2 className="text-xl font-semibold mb-6">Course Performance</h2>

        <div className="space-y-5">
          {coursePerformance.map((course, i) => (
            <div key={i}>
              <div className="flex justify-between mb-1">
                <span className="font-medium">{course.name}</span>
                <span>{course.progress}%</span>
              </div>

              <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  style={{ width: `${course.progress}%` }}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-700"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STUDENT ENGAGEMENT */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Student Engagement</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 border-b">
                <th className="py-3">Student</th>
                <th>Course</th>
                <th>Progress</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s, i) => (
                <tr key={i} className="border-b last:border-none">
                  <td className="py-3 font-medium">{s.name}</td>
                  <td>{s.course}</td>
                  <td>
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm">
                      {s.progress}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
