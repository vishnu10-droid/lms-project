import React, { useState, useMemo } from "react";
import {
  Search,
  Phone,
  MapPin,
  Mail,
  CheckCircle2,
  Trash2,
  AlertCircle,
  Edit3,
  MoreVertical,
  Plus,
  Users,
  UserCheck,
  UserMinus,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const AdminStudents = () => {
  const navigate = useNavigate();

  // 1. Initial State
  const [students, setStudents] = useState([
    { id: 1, name: "Amit Sharma", email: "amit.s@edu.com", mobile: "+91 98765-43210", address: "New Delhi, DL", pic: "https://i.pravatar.cc/150?img=1", courses: ["Math"], status: "active" },
    { id: 2, name: "Priya Verma", email: "priya.v@edu.com", mobile: "+91 88776-55443", address: "Mumbai, MH", pic: "https://i.pravatar.cc/150?img=5", courses: ["English"], status: "inactive" },
    { id: 3, name: "Rohit Singh", email: "rohit.ai@edu.com", mobile: "+91 77665-99880", address: "Bangalore, KA", pic: "https://i.pravatar.cc/150?img=3", courses: ["Physics"], status: "active" },
    { id: 4, name: "Sana Khan", email: "sana.dev@edu.com", mobile: "+91 99001-12233", address: "Hyderabad, TS", pic: "https://i.pravatar.cc/150?img=9", courses: ["Biology"], status: "active" },
    { id: 5, name: "Vikas Yadav", email: "vikas.y@edu.com", mobile: "+91 91223-34455", address: "Pune, MH", pic: "https://i.pravatar.cc/150?img=12", courses: ["Computer"], status: "inactive" },
    { id: 6, name: "Neha Gupta", email: "neha.g@edu.com", mobile: "+91 88990-01122", address: "Kolkata, WB", pic: "https://i.pravatar.cc/150?img=16", courses: ["UI/UX"], status: "active" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // 2. Dynamic Stats (Fixed dependencies)
  const stats = useMemo(() => ({
    total: students.length,
    active: students.filter((s) => s.status === "active").length,
    inactive: students.filter((s) => s.status === "inactive").length,
  }), [students]);

  // 3. Filtering Logic (Fixed: Using single searchTerm)
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const deleteStudent = (id) => {
    if (window.confirm("Are you sure you want to remove this student?")) {
      setStudents(students.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50/50 text-slate-900 min-h-screen">
      
      {/* --- HEADER SECTION --- */}
      <header className="relative space-y-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          className="absolute -top-14 -right-14 w-56 h-56 bg-indigo-500/30 rounded-full blur-3xl"
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-20">
          <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
              Student Directory
            </h1>
            <p className="text-sm text-slate-600 font-medium">Manage, filter, and monitor student enrollments.</p>
          </motion.div>

          <div className="flex flex-wrap items-center gap-4">
             {/* Main Add Button at Top */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/admin/students/form")}
              className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-indigo-100 transition-all"
            >
              <Plus size={18} /> Add New Student
            </motion.button>
          </div>
        </div>
      </header>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={<Users className="text-indigo-600" />} label="Total Students" value={stats.total} color="bg-indigo-50" />
        <StatCard icon={<UserCheck className="text-emerald-600" />} label="Active Now" value={stats.active} color="bg-emerald-50" />
        <StatCard icon={<UserMinus className="text-amber-600" />} label="Inactive" value={stats.inactive} color="bg-amber-50" />
      </div>

      {/* --- CONTROLS SECTION --- */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 text-slate-800 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter size={16} className="text-slate-400 mr-1" />
          <select 
            className="bg-slate-50 border border-slate-200 text-slate-600 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* --- STUDENT GRID --- */}
      <div className="relative">
        <AnimatePresence mode="popLayout">
          {filteredStudents.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <StudentCard key={student.id} student={student} onDelete={deleteStudent} />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300"
            >
              <Search className="text-slate-300 mx-auto mb-4" size={48} />
              <h3 className="text-lg font-semibold text-slate-900">No students found</h3>
              <p className="text-slate-500">Try adjusting your search or filter settings.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const StatCard = ({ icon, label, value, color }) => (
  <motion.div whileHover={{ y: -5 }} className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-white shadow-sm">
    <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
    <div>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  </motion.div>
);

const StudentCard = ({ student, onDelete }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    className="group relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
  >
    <div className="flex items-start gap-4">
      <div className="relative">
        <img src={student.pic} alt={student.name} className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50" />
        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center ${
          student.status === "active" ? "bg-emerald-500" : "bg-amber-500"
        }`}>
          {student.status === "active" ? <CheckCircle2 size={10} className="text-white" /> : <AlertCircle size={10} className="text-white" />}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 truncate">{student.name}</h3>
          <MoreVertical size={18} className="text-slate-300 group-hover:text-slate-500 cursor-pointer" />
        </div>
        <div className="mt-2 space-y-1 text-xs text-slate-500">
          <div className="flex items-center gap-2 truncate"><Mail size={13} /> {student.email}</div>
          <div className="flex items-center gap-2 font-semibold text-slate-700"><Phone size={13} className="text-indigo-500" /> {student.mobile}</div>
        </div>
      </div>
    </div>

    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium">
        <MapPin size={12} /> {student.address}
      </div>
      <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-indigo-50 text-indigo-600 uppercase tracking-tight">
        {student.courses[0]}
      </span>
    </div>

    {/* Fixed Hover Actions */}
    <div className="absolute inset-y-0 right-0 w-12 bg-slate-900 rounded-r-2xl translate-x-full group-hover:translate-x-0 transition-transform duration-300 flex flex-col items-center justify-center gap-6 opacity-0 group-hover:opacity-100 z-30">
      <button className="text-white hover:text-indigo-400 transition-transform hover:scale-125"><Edit3 size={18} /></button>
      <button onClick={() => onDelete(student.id)} className="text-rose-400 hover:text-rose-200 transition-transform hover:scale-125"><Trash2 size={18} /></button>
    </div>
  </motion.div>
);

export default AdminStudents;