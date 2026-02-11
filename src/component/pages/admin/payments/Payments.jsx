import React, { useState, useMemo } from "react";
import {
  CreditCard, DollarSign, TrendingUp, Search, Download, Filter,
  CheckCircle, XCircle, RefreshCcw, Clock, User, BookOpen
} from "lucide-react";

export default function AdminPayments() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const payments = [
    {
      id: "TXN9087",
      student: "Arjun Mehta",
      course: "React Masterclass",
      amount: 2999,
      method: "UPI",
      status: "Success",
      time: "2 mins ago"
    },
    {
      id: "TXN4421",
      student: "Priya Sharma",
      course: "Python Bootcamp",
      amount: 2499,
      method: "Credit Card",
      status: "Success",
      time: "10 mins ago"
    },
    {
      id: "TXN7711",
      student: "Amit Verma",
      course: "UI/UX Design",
      amount: 1999,
      method: "Wallet",
      status: "Failed",
      time: "20 mins ago"
    },
    {
      id: "TXN5521",
      student: "Neha Patel",
      course: "Data Science Pro",
      amount: 4999,
      method: "Net Banking",
      status: "Refunded",
      time: "1 hr ago"
    }
  ];

  // Filter Logic
  const filteredPayments = useMemo(() => {
    return payments.filter((p) => {
      const matchSearch =
        p.student.toLowerCase().includes(search.toLowerCase()) ||
        p.course.toLowerCase().includes(search.toLowerCase()) ||
        p.id.toLowerCase().includes(search.toLowerCase());

      const matchStatus = statusFilter === "All" || p.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 p-8">

      {/* HEADER */}
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-10 text-center">
        Payments Dashboard
      </h1>

      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-10 shadow-2xl border">

        {/* TOP METRICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg">
            <p className="opacity-80 text-sm">Total Revenue</p>
            <h2 className="text-3xl font-extrabold">₹1,24,540</h2>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
            <p className="opacity-80 text-sm">Successful Payments</p>
            <h2 className="text-3xl font-extrabold">318</h2>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg">
            <p className="opacity-80 text-sm">Refunds & Failures</p>
            <h2 className="text-3xl font-extrabold">21</h2>
          </div>
        </div>

        {/* SEARCH + FILTER BAR */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">

          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              placeholder="Search by student, course, or transaction ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-300 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl bg-slate-50 border-slate-300 border focus:ring-2 focus:ring-indigo-400"
          >
            <option>All</option>
            <option>Success</option>
            <option>Failed</option>
            <option>Refunded</option>
          </select>

          {/* Export Button */}
          <button className="flex items-center gap-2 px-6 py-3 bg-indigo-700 text-white font-semibold rounded-xl shadow hover:bg-indigo-800">
            <Download size={18} /> Export
          </button>
        </div>

        {/* PAYMENT TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
          <tbody>
  {filteredPayments.map((p, index) => (
    <tr
      key={index}
      className="border-b hover:bg-indigo-50 cursor-pointer transition text-sm"
    >
      <td className="py-2 px-3 font-semibold text-slate-700">{p.id}</td>

      <td className="py-2 px-3 flex items-center gap-1">
        <User size={14} className="text-indigo-500" /> 
        <span className="text-sm">{p.student}</span>
      </td>

      <td className="py-2 px-3 flex items-center gap-1">
        <BookOpen size={14} className="text-orange-500" /> 
        <span className="text-sm">{p.course}</span>
      </td>

      <td className="py-2 px-3 font-bold text-slate-900 text-sm">₹{p.amount}</td>

      <td className="py-2 px-3 text-sm">{p.method}</td>

      <td className="py-2 px-3 text-sm">
        {p.status === "Success" && (
          <span className="flex items-center gap-1 text-green-600 font-medium">
            <CheckCircle size={12} /> Success
          </span>
        )}
        {p.status === "Failed" && (
          <span className="flex items-center gap-1 text-red-600 font-medium">
            <XCircle size={12} /> Failed
          </span>
        )}
        {p.status === "Refunded" && (
          <span className="flex items-center gap-1 text-yellow-600 font-medium">
            <RefreshCcw size={12} /> Refunded
          </span>
        )}
      </td>

      <td className="py-2 px-3 text-xs text-slate-500">{p.time}</td>
    </tr>
  ))}
</tbody>


            <tbody>
              {filteredPayments.map((p, index) => (
                <tr
                  key={index}
                  className="border-b hover:bg-indigo-50 cursor-pointer transition"
                >
                  <td className="py-3 px-4 font-semibold text-slate-700">{p.id}</td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <User size={18} className="text-indigo-500" /> {p.student}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <BookOpen size={18} className="text-orange-500" /> {p.course}
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900">₹{p.amount}</td>
                  <td className="py-3 px-4">{p.method}</td>
                  <td className="py-3 px-4">
                    {p.status === "Success" && (
                      <span className="flex items-center gap-1 text-green-600 font-semibold">
                        <CheckCircle size={16} /> Success
                      </span>
                    )}
                    {p.status === "Failed" && (
                      <span className="flex items-center gap-1 text-red-600 font-semibold">
                        <XCircle size={16} /> Failed
                      </span>
                    )}
                    {p.status === "Refunded" && (
                      <span className="flex items-center gap-1 text-yellow-600 font-semibold">
                        <RefreshCcw size={16} /> Refunded
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-500">{p.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
