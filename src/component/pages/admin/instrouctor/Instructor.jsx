import React, { useState, useMemo } from "react";
import { 
  Star, Users, BookOpen, MoreHorizontal, Mail, 
  ShieldCheck, ArrowUpRight, Search, Filter,
  TrendingUp, Award, Clock, X, Plus, ChevronRight
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced Data Set
const INITIAL_TEACHERS = [
  { id: 1, name: "Ankit Sharma", subject: "Full Stack Dev", rating: 4.8, students: 1200, courses: 12, performance: 92, status: "Online", pic: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Sneha Rao", subject: "UI/UX Design", rating: 4.9, students: 850, courses: 8, performance: 98, status: "Offline", pic: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Rahul Verma", subject: "Data Science", rating: 4.7, students: 2100, courses: 15, performance: 85, status: "Online", pic: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Priya Singh", subject: "Marketing", rating: 4.6, students: 1100, courses: 9, performance: 89, status: "Away", pic: "https://i.pravatar.cc/150?u=4" },
  { id: 5, name: "Vikram Goel", subject: "Cyber Security", rating: 4.9, students: 540, courses: 5, performance: 95, status: "Online", pic: "https://i.pravatar.cc/150?u=5" },
  { id: 6, name: "Ishita Dutta", subject: "UI/UX Design", rating: 4.5, students: 920, courses: 11, performance: 82, status: "Online", pic: "https://i.pravatar.cc/150?u=6" },
];

export default function TeacherGrid() {
  const [teachers] = useState(INITIAL_TEACHERS);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const categories = ["All", ...new Set(teachers.map(t => t.subject))];

  // Logic: Filtering
  const filteredTeachers = useMemo(() => {
    return teachers.filter(t => {
      const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
      const matchesCat = activeCategory === "All" || t.subject === activeCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, activeCategory, teachers]);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 min-h-screens text-slate-900font-sans">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
         



            <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        className="absolute -top-10 -right-10 w-60 h-60 bg-indigo-500/30 rounded-full blur-3xl"
      />

      {/* Header Parallax */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <motion.h1
          initial={{ x: -25 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 60 }}
          className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent drop-shadow-lg"
        >
         Faculty Management
        </motion.h1>

        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
     Monitor and manage instructor performance
        </p>
      </motion.div>
       <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search name..." 
                  className="pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 w-full md:w-64 transition-all"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
             <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-2xl shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 transition-all">
               <Plus size={24} />
             </button>
                 </div>
      <div className="max-w-7xl mx-auto">
        
        {/* --- STATS SUMMARY --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <QuickStat icon={<Users className="text-blue-600"/>} label="Total Faculty" value={teachers.length} bg="bg-blue-50" />
          <QuickStat icon={<Award className="text-amber-600"/>} label="Avg Rating" value="4.8" bg="bg-amber-50" />
          <QuickStat icon={<TrendingUp className="text-emerald-600"/>} label="Total Students" value="6.4k" bg="bg-emerald-50" />
          <QuickStat icon={<Clock className="text-purple-600"/>} label="Live Lessons" value="24" bg="bg-purple-50" />
        </div>

        {/* --- HEADER & FILTERS --- */}
     

        {/* Simple Header */}
    


        {/* --- CATEGORY CHIPS --- */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat 
                ? "bg-slate-900 text-white shadow-lg" 
                : "bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* --- TEACHER GRID --- */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode='popLayout'>
            {filteredTeachers.map((teacher) => (
              <TeacherCard 
                key={teacher.id} 
                teacher={teacher} 
                onClick={() => setSelectedTeacher(teacher)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- DETAIL DRAWER / MODAL --- */}
      <AnimatePresence>
        {selectedTeacher && (
          <DetailModal 
            teacher={selectedTeacher} 
            onClose={() => setSelectedTeacher(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---

function QuickStat({ icon, label, value, bg }) {
  return (
    <div className={`p-5 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-4`}>
      <div className={`p-3 rounded-2xl ${bg}`}>{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{label}</p>
        <p className="text-xl font-black text-slate-900 dark:text-slate-100">{value}</p>
      </div>
    </div>
  );
}

function TeacherCard({ teacher, onClick }) {
  const statusColors = {
    Online: "bg-emerald-500",
    Offline: "bg-slate-300",
    Away: "bg-amber-500"
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -10 }}
      className="group bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-2xl transition-all duration-300 cursor-pointer relative"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-6">
        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter flex items-center gap-1.5 ${statusColors[teacher.status]} text-white`}>
          <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" /> {teacher.status}
        </div>
        <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-300 dark:text-slate-500 group-hover:text-indigo-600 transition-colors">
          <ArrowUpRight size={18} />
        </div>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="relative mb-4">
          <img 
            src={teacher.pic} 
            alt={teacher.name} 
            className="w-24 h-24 rounded-[2rem] object-cover ring-8 ring-slate-50 dark:ring-slate-800 group-hover:ring-indigo-50 dark:group-hover:ring-indigo-900/40 transition-all"
          />
          <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 p-1 rounded-xl shadow-md">
            <ShieldCheck size={18} className="text-indigo-600 fill-indigo-50" />
          </div>
        </div>
        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100 tracking-tight">{teacher.name}</h3>
        <p className="text-indigo-500 font-bold text-[10px] uppercase tracking-widest mt-1">{teacher.subject}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Satisfaction</p>
          <p className="text-xs font-black text-slate-700 dark:text-slate-300">{teacher.performance}%</p>
        </div>
        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${teacher.performance}%` }}
            className="h-full bg-indigo-500"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50 dark:border-slate-700">
        <div className="flex items-center gap-1 text-amber-500">
          <Star size={14} className="fill-current" />
          <span className="text-xs font-black text-slate-700 dark:text-slate-300">{teacher.rating}</span>
        </div>
        <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500">
          <Users size={14} />
          <span className="text-xs font-bold">{teacher.students}</span>
        </div>
      </div>
    </motion.div>
  );
}

function DetailModal({ teacher, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end p-4 bg-slate-900/40 backdrop-blur-sm">
      <motion.div 
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        className="bg-white dark:bg-slate-900 w-full max-w-md h-full rounded-[3rem] shadow-2xl p-8 overflow-y-auto border border-slate-200 dark:border-slate-700"
      >
        <div className="flex justify-between items-center mb-8">
          <button onClick={onClose} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
            <X size={20} />
          </button>
          <button className="text-indigo-600 font-bold text-sm">Edit Profile</button>
        </div>

        <div className="text-center mb-10">
          <img src={teacher.pic} className="w-32 h-32 rounded-[3rem] mx-auto mb-4 ring-8 ring-indigo-50 dark:ring-indigo-900/40" />
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100">{teacher.name}</h2>
          <p className="text-indigo-600 font-bold tracking-widest uppercase text-xs mt-2">{teacher.subject}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] text-center">
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{teacher.courses}</p>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Courses</p>
          </div>
          <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] text-center">
            <p className="text-2xl font-black text-slate-900 dark:text-slate-100">{teacher.rating}</p>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Rating</p>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest text-xs">Recent Performance</h4>
          {[
            { label: "Content Quality", val: "94%" },
            { label: "Response Time", val: "2.4h" },
            { label: "Student Growth", val: "+12%" }
          ].map((item, i) => (
            <div key={i} className="flex justify-between items-center p-4 border border-slate-100 dark:border-slate-700 rounded-2xl">
              <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{item.label}</span>
              <span className="text-sm font-black text-indigo-600">{item.val}</span>
            </div>
          ))}
        </div>

        <button className="w-full bg-slate-900 dark:bg-slate-700 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest mt-10 hover:bg-indigo-600 transition-all shadow-xl shadow-slate-200 dark:shadow-slate-950">
          Download Full Report
        </button>
      </motion.div>
    </div>
  );
}
