import React from "react";
import { motion } from "framer-motion";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";

import {
  Users,
  BookOpen,
  GraduationCap,
  DollarSign,
  TrendingUp,
  PlusCircle,
  UserPlus,
  Megaphone,
  CheckCircle
} from "lucide-react";

/* ------------------ DATA ------------------ */

const stats = [
  { title: "Students", value: "12,540", icon: <Users />, color: "bg-indigo-500" },
  { title: "Instructors", value: "320", icon: <GraduationCap />, color: "bg-green-500" },
  { title: "Courses", value: "860", icon: <BookOpen />, color: "bg-orange-500" },
  { title: "Revenue", value: "$128k", icon: <DollarSign />, color: "bg-pink-500" }
];

const enrollmentsData = [
  { month: "Jan", students: 400 },
  { month: "Feb", students: 650 },
  { month: "Mar", students: 600 },
  { month: "Apr", students: 820 },
  { month: "May", students: 980 },
  { month: "Jun", students: 1200 }
];

const revenueData = [
  { month: "Jan", revenue: 12000 },
  { month: "Feb", revenue: 18000 },
  { month: "Mar", revenue: 16000 },
  { month: "Apr", revenue: 24000 },
  { month: "May", revenue: 28000 },
  { month: "Jun", revenue: 32000 }
];

const activities = [
  "Rahul enrolled in React Masterclass",
  "New course submitted: UI/UX Bootcamp",
  "Payment received from Ankit",
  "Python Basics course approved",
  "Neha joined as Instructor"
];

/* ------------------ COMPONENT ------------------ */

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-8">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Admin overview of platform performance</p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-6 rounded-xl shadow flex items-center gap-4"
          >
            <div className={`${item.color} p-4 text-white rounded-xl`}>
              {item.icon}
            </div>
            <div>
              <p className="text-gray-500">{item.title}</p>
              <h2 className="text-2xl font-bold">{item.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Enrollments */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={18} /> Student Enrollments
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line dataKey="students" stroke="#6366F1" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Revenue Trend</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#22C55E" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* QUICK ACTIONS + ACTIVITY */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Quick Actions</h3>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center gap-2 p-3 bg-indigo-500 text-white rounded-lg">
              <PlusCircle size={18} /> Add Course
            </button>
            <button className="flex items-center gap-2 p-3 bg-green-500 text-white rounded-lg">
              <UserPlus size={18} /> Add Instructor
            </button>
            <button className="flex items-center gap-2 p-3 bg-orange-500 text-white rounded-lg">
              <CheckCircle size={18} /> Approve Course
            </button>
            <button className="flex items-center gap-2 p-3 bg-pink-500 text-white rounded-lg">
              <Megaphone size={18} /> Announcement
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold mb-4">Recent Activities</h3>

          <ul className="space-y-3 text-sm">
            {activities.map((item, i) => (
              <li key={i} className="border-b pb-2">
                {item}
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}
