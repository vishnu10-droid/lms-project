import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  XCircle 
} from "lucide-react";

const enrollmentsData = [
  { id: "#ENR-9041", student: "Rahul Sharma", course: "React for Beginners", date: "2024-05-20", amount: "₹4,999", status: "Completed" },
  { id: "#ENR-9042", student: "Sneha Kapoor", course: "UI/UX Advanced", date: "2024-05-18", amount: "₹8,500", status: "Active" },
  { id: "#ENR-9043", student: "Amit Verma", course: "Node.js Backend", date: "2024-05-15", amount: "₹6,200", status: "Pending" },
  { id: "#ENR-9044", student: "Priya Das", course: "Fullstack Bootcamp", date: "2024-05-12", amount: "₹12,000", status: "Refunded" },
];

const StatusBadge = ({ status }) => {
  const styles = {
    Active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    Refunded: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status}
    </span>
  );
};

export default function Enrollments() {
  return (
    <div className="p-8 bg-[#0f172a] min-h-screen text-white">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold italic tracking-tight underline decoration-indigo-500 underline-offset-8">Enrollments</h1>
          <p className="text-slate-400 text-sm mt-2">Manage and track student course registrations.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-slate-800 px-4 py-2 rounded-lg text-sm hover:bg-slate-700 transition">
            <Download size={16} /> Export CSV
          </button>
          <button className="bg-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-500 transition">
            + New Enrollment
          </button>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-[#1e293b] p-4 rounded-t-2xl border-x border-t border-slate-800 flex flex-wrap gap-4">
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input 
            type="text" 
            placeholder="Search student or course..." 
            className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-900 border border-slate-700 p-2 rounded-xl text-slate-400 hover:text-white">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-[#1e293b] rounded-b-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Order ID</th>
                <th className="px-6 py-4 font-semibold">Student</th>
                <th className="px-6 py-4 font-semibold">Course</th>
                <th className="px-6 py-4 font-semibold">Enrolled Date</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {enrollmentsData.map((enr) => (
                <tr key={enr.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="px-6 py-4 text-sm font-mono text-indigo-400">{enr.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">
                        {enr.student.charAt(0)}
                      </div>
                      <span className="text-sm font-medium">{enr.student}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">{enr.course}</td>
                  <td className="px-6 py-4 text-sm text-slate-400">{enr.date}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-200">{enr.amount}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={enr.status} />
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-slate-500 hover:text-white transition">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-4 border-t border-slate-800 flex justify-between items-center text-sm text-slate-400">
          <span>Showing 1 to 4 of 50 entries</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-slate-900 rounded border border-slate-700 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded">1</button>
            <button className="px-3 py-1 bg-slate-900 rounded border border-slate-700">2</button>
            <button className="px-3 py-1 bg-slate-900 rounded border border-slate-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}