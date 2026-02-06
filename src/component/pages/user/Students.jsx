import React, { useState } from "react";
import {
  Mail,
  User,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------------- DUMMY STUDENT DATA ---------------- */

const STUDENT = {
  id: 1,
  name: "Rahul Kumar",
  email: "rahul@gmail.com",
  avatar: "https://i.pravatar.cc/150?img=12",
  status: "active",
  joined: "2024-06-12",

  courses: [
    { title: "React Mastery", progress: 70 },
    { title: "Node.js Bootcamp", progress: 40 },
    { title: "MongoDB Basics", progress: 100 }
  ],

  payments: [
    { id: 1, course: "React Mastery", amount: "$49", date: "2024-09-01" },
    { id: 2, course: "Node.js Bootcamp", amount: "$39", date: "2024-10-15" }
  ]
};

/* ---------------- COMPONENT ---------------- */

export default function StudentProfile() {

  const [student, setStudent] = useState(STUDENT);
  const navigate = useNavigate();

  const toggleStatus = () => {
    setStudent({
      ...student,
      status: student.status === "active" ? "blocked" : "active"
    });
  };

  return (
    <div className="p-6 text-white">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-4"
      >
        <ArrowLeft size={18}/> Back
      </button>

      {/* PROFILE HEADER */}
      <div className="bg-slate-800 p-6 rounded-xl flex items-center gap-6 mb-6">

        <img
          src={student.avatar}
          className="w-24 h-24 rounded-full"
          alt="student"
        />

        <div className="flex-1">
          <h1 className="text-2xl font-bold">{student.name}</h1>
          <p className="text-gray-400 flex items-center gap-2">
            <Mail size={14}/> {student.email}
          </p>
          <p className="text-gray-400 flex items-center gap-2">
            <Clock size={14}/> Joined: {student.joined}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span
            className={`px-3 py-1 rounded text-sm text-center
            ${student.status === "active"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"}`}
          >
            {student.status}
          </span>

          <button
            onClick={toggleStatus}
            className="bg-indigo-600 px-3 py-1 rounded"
          >
            {student.status === "active" ? "Block User" : "Unblock User"}
          </button>
        </div>

      </div>

      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* COURSES */}
        <div className="bg-slate-800 p-5 rounded-xl">

          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <BookOpen size={18}/> Enrolled Courses
          </h2>

          {student.courses.map((c, i) => (
            <div key={i} className="mb-4">

              <div className="flex justify-between mb-1">
                <span>{c.title}</span>
                <span>{c.progress}%</span>
              </div>

              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full"
                  style={{ width: `${c.progress}%` }}
                />
              </div>

            </div>
          ))}

        </div>

        {/* PAYMENTS */}
        <div className="bg-slate-800 p-5 rounded-xl">

          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <CheckCircle size={18}/> Payment History
          </h2>

          <table className="w-full text-sm">

            <thead className="text-gray-400">
              <tr>
                <th className="text-left">Course</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {student.payments.map(p => (
                <tr key={p.id} className="border-t border-slate-700">
                  <td className="py-2">{p.course}</td>
                  <td>{p.amount}</td>
                  <td>{p.date}</td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
