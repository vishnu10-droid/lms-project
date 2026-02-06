import React, { useState } from "react";
import {
  Mail,
  User,
  BookOpen,
  DollarSign,
  Clock,
  Star,
  ArrowLeft,
  CheckCircle,
  XCircle
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

export default function InstructorProfile() {

  const [instructor, setInstructor] = useState(INSTRUCTOR_DATA);
  const navigate = useNavigate();

  const toggleStatus = () => {
    setInstructor({
      ...instructor,
      status: instructor.status === "active" ? "blocked" : "active"
    });
  };

  return (
    <div className="p-6 text-white">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft size={18} /> Back
      </button>

      {/* PROFILE HEADER */}
      <div className="bg-slate-800 p-6 rounded-xl flex items-center gap-6 mb-6">

        <img
          src={instructor.avatar}
          className="w-24 h-24 rounded-full"
          alt="instructor"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{instructor.name}</h1>

          <p className="text-gray-400 flex items-center gap-2">
            <Mail size={14} /> {instructor.email}
          </p>

          <p className="text-gray-400 flex items-center gap-2">
            <Clock size={14} /> Joined: {instructor.joined}
          </p>

          <p className="text-gray-400 flex items-center gap-2">
            <Star size={14} /> Rating: {instructor.rating}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span
            className={`px-3 py-1 rounded text-sm text-center
            ${instructor.status === "active"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"}`}
          >
            {instructor.status}
          </span>

          <button
            onClick={toggleStatus}
            className="bg-indigo-600 px-3 py-1 rounded"
          >
            {instructor.status === "active"
              ? "Block Instructor"
              : "Unblock Instructor"}
          </button>
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <StatCard
          title="Total Students"
          value={instructor.totalStudents}
          icon={User}
        />

        <StatCard
          title="Total Courses"
          value={instructor.courses.length}
          icon={BookOpen}
        />

        <StatCard
          title="Total Earnings"
          value={instructor.totalEarnings}
          icon={DollarSign}
        />

      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* SKILLS */}
        <div className="bg-slate-800 p-5 rounded-xl">
          <h2 className="font-semibold mb-4">Expertise / Skills</h2>

          <div className="flex flex-wrap gap-2">
            {instructor.skills.map((skill, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-indigo-500/20 text-indigo-400 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* COURSES CREATED */}
        <div className="bg-slate-800 p-5 rounded-xl">

          <h2 className="font-semibold mb-4">Courses Created</h2>

          <table className="w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="text-left">Course</th>
                <th>Students</th>
                <th>Price</th>
              </tr>
            </thead>

            <tbody>
              {instructor.courses.map((c, i) => (
                <tr key={i} className="border-t border-slate-700">
                  <td className="py-2">{c.title}</td>
                  <td>{c.students}</td>
                  <td>{c.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* PAYOUT HISTORY */}
        <div className="bg-slate-800 p-5 rounded-xl lg:col-span-2">

          <h2 className="font-semibold mb-4">Payout History</h2>

          <table className="w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="text-left">Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {instructor.payouts.map(p => (
                <tr key={p.id} className="border-t border-slate-700">
                  <td className="py-2">{p.amount}</td>
                  <td>{p.date}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs
                      ${p.status === "paid"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"}`}
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
    <div className="bg-slate-800 p-4 rounded-xl flex justify-between items-center">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
      </div>

      <div className="p-3 bg-indigo-600 rounded-lg">
        <Icon size={20} />
      </div>
    </div>
  );
}
