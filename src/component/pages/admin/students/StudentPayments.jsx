import React, { useState, useMemo } from 'react';
import {
  Search, Plus, Mail, Phone, ChevronLeft, ChevronRight, 
  Edit2, Trash2, Eye, X, Check, BookOpen, AlertCircle, 
  Download, Trash, Filter, Calendar, TrendingUp, Users, 
  DollarSign, ArrowUpRight, MoreVertical
} from "lucide-react";

// Colors & Constants
const statusColors = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
  Inactive: "bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400",
  Overdue: "bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400",
  Graduated: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
};

// Initial Dynamic Data Generator
const initialStudents = Array.from({ length: 32 }, (_, i) => {
  const status = ["Active", "Inactive", "Overdue", "Graduated"][Math.floor(Math.random() * 4)];
  const joinedDate = new Date(2025, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
  return {
    id: `STU-${2401 + i}`,
    name: ["Arjun Mehta", "Sana Khan", "Rahul Sharma", "Priya Das", "Vikram Singh", "Ananya Iyer"][i % 6] + " " + (i + 1),
    email: `student${i + 1}@lms.edu`,
    phone: `+91 98765-${10000 + i}`,
    courses: Math.floor(Math.random() * 8) + 1,
    status,
    balance: status === "Overdue" ? Math.floor(Math.random() * 5000) + 1000 : 0,
    totalPaid: Math.floor(Math.random() * 15000) + 2000,
    joined: joinedDate.toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' }),
    joinedRaw: joinedDate,
    avatar: "ST"
  };
});

export default function Students() {
  const [studentList, setStudentList] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const PAGE_SIZE = 8;

  // --- ADVANCED FILTER LOGIC ---
  const filtered = useMemo(() => {
    return studentList.filter((s) => {
      const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.id.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || s.status === statusFilter;
      
      let matchesDate = true;
      const today = new Date();
      if (dateFilter === "Last 30 Days") {
        const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
        matchesDate = s.joinedRaw >= thirtyDaysAgo;
      }
      
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [studentList, search, statusFilter, dateFilter]);

  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);

  // --- ACTIONS ---
  const exportToCSV = () => {
    const csvRows = [
      ["ID", "Name", "Email", "Status", "Joined", "Balance"].join(","),
      ...filtered.map(s => [s.id, s.name, s.email, s.status, s.joined, s.balance].join(","))
    ].join("\n");
    const blob = new Blob([csvRows], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Students_Data.csv`;
    a.click();
  };

  const deleteSelected = () => {
    if(confirm(`Delete ${selectedIds.length} students?`)) {
      setStudentList(prev => prev.filter(s => !selectedIds.includes(s.id)));
      setSelectedIds([]);
    }
  };

  return (
    <div className="p-6 space-y-8 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      
      {/* --- QUICK STATS SECTION --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Active", val: studentList.filter(s=>s.status==="Active").length, icon: Users, color: "text-blue-600" },
          { label: "Revenue", val: "₹" + studentList.reduce((acc, s)=>acc + s.totalPaid, 0).toLocaleString(), icon: DollarSign, color: "text-emerald-600" },
          { label: "Avg Courses", val: (studentList.reduce((acc,s)=>acc+s.courses, 0)/studentList.length).toFixed(1), icon: BookOpen, color: "text-violet-600" },
          { label: "Fees Pending", val: "₹" + studentList.reduce((acc, s)=>acc + s.balance, 0).toLocaleString(), icon: AlertCircle, color: "text-rose-600" }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <h3 className="text-2xl font-black mt-1">{stat.val}</h3>
            </div>
            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 ${stat.color}`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* --- HEADER & CONTROLS --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Student Directory</h2>
          <p className="text-slate-500">Manage and monitor student enrollments</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={exportToCSV} className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
            <Plus size={18} /> Add New Student
          </button>
        </div>
      </div>

      {/* --- ADVANCED FILTERS BAR --- */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, ID or email..." 
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border-none outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <select 
          className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border-none outline-none font-medium text-sm cursor-pointer"
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Overdue">Overdue</option>
          <option value="Graduated">Graduated</option>
        </select>

        <select 
          className="px-4 py-2.5 bg-slate-50 dark:bg-slate-950 rounded-xl border-none outline-none font-medium text-sm cursor-pointer"
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="All Time">All Time</option>
          <option value="Last 30 Days">Last 30 Days</option>
          <option value="This Year">This Year</option>
        </select>

        {selectedIds.length > 0 && (
          <button onClick={deleteSelected} className="flex items-center gap-2 px-4 py-2.5 bg-rose-500 text-white rounded-xl font-bold text-sm animate-in zoom-in-95">
            <Trash size={16} /> Delete ({selectedIds.length})
          </button>
        )}
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase text-[11px] font-black tracking-widest">
                <th className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    onChange={(e) => setSelectedIds(e.target.checked ? paginated.map(s=>s.id) : [])}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-4">Student Details</th>
                <th className="px-6 py-4">Courses</th>
                <th className="px-6 py-4">Joining Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginated.map((student) => (
                <tr key={student.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-5">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(student.id)}
                      onChange={() => setSelectedIds(prev => prev.includes(student.id) ? prev.filter(id => id !== student.id) : [...prev, student.id])}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                        {student.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white leading-tight">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.id} • {student.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-full max-w-[60px] bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(student.courses/8)*100}%` }} />
                      </div>
                      <span className="text-xs font-bold">{student.courses}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-medium">{student.joined}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${statusColors[student.status]}`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400"><Edit2 size={16}/></button>
                      <button className="p-2 hover:bg-rose-100 dark:hover:bg-rose-500/20 rounded-lg text-rose-500"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- PAGINATION --- */}
        <div className="p-6 bg-slate-50/50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Showing {paginated.length} of {filtered.length} Results
          </p>
          <div className="flex gap-2">
            <button 
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:bg-white dark:hover:bg-slate-900 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 disabled:opacity-30 hover:bg-white dark:hover:bg-slate-900 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
