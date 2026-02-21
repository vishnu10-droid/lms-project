import React, { useState, useMemo } from "react";
import { 
  Search, Phone, MapPin, Mail, CheckCircle2, 
  Trash2, AlertCircle, Edit3, MoreVertical, 
  Plus, Users, UserCheck, UserMinus, Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminStudents = () => {
  // 1. Expanded State Management
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

  // 2. Dynamic Derived Data (Stats)
  const stats = useMemo(() => ({
    total: students.length,
    active: students.filter(s => s.status === 'active').length,
    inactive: students.filter(s => s.status === 'inactive').length,
  }), [students]);

  // 3. Filtering Logic
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || student.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const deleteStudent = (id) => {
    if(window.confirm("Are you sure you want to remove this student?")) {
      setStudents(students.filter(s => s.id !== id));
    }
  };
const navigator=useNavigate()
  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 p-4 md:p-10 font-sans text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Student Directory</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Manage, filter, and monitor student enrollments.</p>
          </div>
          <button onClick={()=>navigator("/admin/students/form")} className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30">
            <Plus size={18} /> Add New Student
          </button>
        </div>

        {/* --- STATS CARDS --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard icon={<Users className="text-indigo-600" />} label="Total Students" value={stats.total} color="bg-indigo-50" />
          <StatCard icon={<UserCheck className="text-emerald-600" />} label="Active Now" value={stats.active} color="bg-emerald-50" />
          <StatCard icon={<UserMinus className="text-amber-600" />} label="Inactive" value={stats.inactive} color="bg-amber-50" />
        </div>

        {/* --- CONTROLS SECTION --- */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={18} />
            <input 
              type="text"
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2 w-full md:w-auto">
            <Filter size={16} className="text-slate-400 dark:text-slate-500 mr-1" />
            <select 
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
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
        {filteredStudents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} onDelete={deleteStudent} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
            <div className="bg-slate-100 dark:bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-slate-400 dark:text-slate-500" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">No students found</h3>
            <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filter settings.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS FOR CLEANER CODE ---

const StatCard = ({ icon, label, value, color }) => (
  <div className={`flex items-center gap-4 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm`}>
    <div className={`p-3 rounded-xl ${color}`}>{icon}</div>
    <div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  </div>
);

const StudentCard = ({ student, onDelete }) => (
  <div className="group relative bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm hover:shadow-xl hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300">
    <div className="flex items-start gap-4">
      {/* Avatar */}
      <div className="relative">
        <img
          src={student.pic}
          alt={student.name}
          className="w-14 h-14 rounded-2xl object-cover ring-4 ring-slate-50 dark:ring-slate-800"
        />
        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center shadow-sm ${
          student.status === "active" ? "bg-emerald-500" : "bg-amber-500"
        }`}>
          {student.status === "active" ? 
            <CheckCircle2 size={10} className="text-white" /> : 
            <AlertCircle size={10} className="text-white" />
          }
        </div>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 truncate">{student.name}</h3>
          <button className="text-slate-300 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
        
        <div className="mt-2 space-y-1">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <Mail size={13} className="shrink-0" /> <span className="truncate">{student.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Phone size={13} className="shrink-0 text-indigo-500" /> {student.mobile}
          </div>
        </div>
      </div>
    </div>

    {/* Footer Info */}
    <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-700 flex items-center justify-between">
      <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500">
        <MapPin size={12} /> {student.address}
      </div>
      <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-tight">
        {student.courses[0]}
      </span>
    </div>

    {/* Hover Actions Sidebar (Slide-in effect) */}
    <div className="absolute inset-y-0 right-0 w-12 bg-slate-900 dark:bg-slate-800 rounded-r-2xl translate-x-full group-hover:translate-x-0 transition-transform duration-300 flex flex-col items-center justify-center gap-5 opacity-0 group-hover:opacity-100">
      <button className="text-white hover:text-indigo-400 transition-all transform hover:scale-110">
        <Edit3 size={18} />
      </button>
      <button 
        onClick={() => onDelete(student.id)}
        className="text-rose-400 hover:text-rose-200 transition-all transform hover:scale-110"
      >
        <Trash2 size={18} />
      </button>
    </div>
  </div>
);

export default AdminStudents;
