import React, { useState } from "react";
import {
  Mail,
  User,
  BookOpen,
  DollarSign,
  Clock,
  Star,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------------- DUMMY DATA ---------------- */

const INSTRUCTOR_DATA = {
  id: 1,
  name: "Ankit Sharma",
  email: "ankit@gmail.com",
  avatar: "https://i.pravatar.cc/150?img=32",
  status: "active",
  joined: "2024-03-12",
  rating: 4.6,
  totalStudents: 1240,
  totalEarnings: "$18,500",

  skills: ["React", "Node.js", "MongoDB", "Express", "JavaScript"],

  courses: [
    { title: "React Mastery", students: 540, price: "$49" },
    { title: "Node.js Bootcamp", students: 420, price: "$39" },
    { title: "Full Stack MERN", students: 280, price: "$59" }
  ],

  payouts: [
    { id: 1, amount: "$500", date: "2024-09-01", status: "paid" },
    { id: 2, amount: "$700", date: "2024-10-10", status: "paid" },
    { id: 3, amount: "$300", date: "2024-11-02", status: "pending" }
  ]
};

/* ---------------- COMPONENT ---------------- */

export default function Instructorid() {
  const [instructor, setInstructor] = useState(INSTRUCTOR_DATA);
  const navigate = useNavigate();

  const toggleStatus = () => {
    setInstructor({
      ...instructor,
      status: instructor.status === "active" ? "blocked" : "active"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* HEADER */}
      <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl shadow-lg flex flex-col md:flex-row gap-6 items-center">

        <img
          src={instructor.avatar}
          className="w-28 h-28 rounded-full ring-4 ring-indigo-500 object-cover"
        />

        <div className="flex-1 space-y-2">
          <h1 className="text-2xl font-bold">{instructor.name}</h1>

          <p className="text-gray-500 flex items-center gap-2">
            <Mail size={14} /> {instructor.email}
          </p>

          <div className="flex flex-wrap gap-4 text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={14} /> {instructor.joined}
            </span>
            <span className="flex items-center gap-1">
              <Star size={14} /> {instructor.rating}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">

          <span
            className={`px-4 py-1 rounded-full text-sm text-center
            ${instructor.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"}`}
          >
            {instructor.status}
          </span>

          <button
            onClick={toggleStatus}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            {instructor.status === "active"
              ? "Block Instructor"
              : "Unblock Instructor"}
          </button>

        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 my-8">
        <StatCard title="Students" value={instructor.totalStudents} icon={User} />
        <StatCard title="Courses" value={instructor.courses.length} icon={BookOpen} />
        <StatCard title="Earnings" value={instructor.totalEarnings} icon={DollarSign} />
      </div>

      {/* GRID */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* SKILLS */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">
          <h2 className="font-semibold mb-4">Skills</h2>

          <div className="flex flex-wrap gap-2">
            {instructor.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* COURSES */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition">

          <h2 className="font-semibold mb-4">Courses Created</h2>

          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="text-left">Course</th>
                <th>Students</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {instructor.courses.map((c, i) => (
                <tr key={i} className="border-t">
                  <td className="py-2">{c.title}</td>
                  <td>{c.students}</td>
                  <td className="font-semibold text-indigo-600">{c.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* PAYOUTS */}
        <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition lg:col-span-2">

          <h2 className="font-semibold mb-4">Payout History</h2>

          <table className="w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="text-left">Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {instructor.payouts.map(p => (
                <tr key={p.id} className="border-t">
                  <td className="py-2 font-medium">{p.amount}</td>
                  <td>{p.date}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-xs
                      ${p.status === "paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"}`}
                    >
                      {p.status}
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

/* ---------------- SMALL COMPONENT ---------------- */

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex justify-between items-center hover:shadow-xl transition">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>

      <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
        <Icon size={22} />
      </div>
    </div>
  );
}
