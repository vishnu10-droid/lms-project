import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  BookOpen,
  DollarSign,
  MessageCircle,
  UserPlus,
  Linkedin,
  Twitter,
  Github,
  PlayCircle,
  Award,
  Globe
} from "lucide-react";

/* ---------------- DATA ---------------- */

const instructor = {
  name: "John Anderson",
  title: "Senior Web Development Instructor",
  bio: "I help students master web development with real-world projects and modern technologies.",
  avatar: "https://i.pravatar.cc/150?u=john", // Updated to a reliable placeholder
  rating: 4.8,
  reviews: 1240,
  students: 35600,
  courses: 18,
  earnings: 125000,
  skills: ["React", "JavaScript", "Node.js", "Tailwind", "Next.js"]
};

const courses = [
  { id: 1, title: "React Masterclass", students: 12500, rating: 4.9, price: 49, image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400" },
  { id: 2, title: "JS Zero to Hero", students: 10200, rating: 4.7, price: 39, image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400" },
  { id: 3, title: "Advanced Node.js", students: 8400, rating: 4.8, price: 59, image: "https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?w=400" },
  { id: 4, title: "Tailwind CSS Pro", students: 5100, rating: 4.9, price: 29, image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400" }
];

const reviews = [
  { id: 1, name: "Rahul Kumar", rating: 5, comment: "Excellent explanation and practical examples." },
  { id: 2, name: "Anita Sharma", rating: 4, comment: "Very helpful and easy to understand." }
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function InstructorProfile() {
  const [tab, setTab] = useState("about");

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* ================= HEADER ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row gap-8"
        >
          <div className="relative group">
            <img
              src={instructor.avatar}
              className="w-32 h-32 md:w-40 md:h-40 rounded-2xl object-cover ring-4 ring-indigo-50 shadow-lg"
              alt="Avatar"
            />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 p-1.5 rounded-lg border-2 border-white shadow-sm">
              <CheckCircle size={14} className="text-white" />
            </div>
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 leading-tight">{instructor.name}</h1>
              <p className="text-indigo-600 font-bold text-sm uppercase tracking-wider">{instructor.title}</p>
            </div>

            <div className="flex items-center gap-3 py-1 px-3 bg-slate-50 rounded-lg w-fit">
              <div className="flex text-yellow-400"><Star size={16} fill="currentColor" /></div>
              <span className="font-black text-slate-800">{instructor.rating}</span>
              <span className="text-slate-400 text-sm font-medium">({instructor.reviews} reviews)</span>
            </div>

            <p className="text-slate-500 text-sm md:text-base max-w-2xl">{instructor.bio}</p>

            <div className="flex flex-wrap gap-2">
              {instructor.skills.map((s) => (
                <span key={s} className="px-3 py-1 text-xs font-bold bg-white text-slate-600 border border-slate-200 rounded-lg">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-indigo-600 transition-all">
                <UserPlus size={18} /> Follow
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 transition-all">
                <MessageCircle size={18} /> Message
              </button>
              <div className="flex items-center gap-4 px-4 text-slate-400">
                 <Linkedin size={20} className="hover:text-indigo-600 cursor-pointer" />
                 <Twitter size={20} className="hover:text-sky-500 cursor-pointer" />
                 <Github size={20} className="hover:text-slate-900 cursor-pointer" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= 🚀 4-COLUMN STATS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Users size={20}/>} label="Total Students" value={instructor.students.toLocaleString()} color="bg-blue-50 text-blue-600" />
          <StatCard icon={<BookOpen size={20}/>} label="Active Courses" value={instructor.courses} color="bg-indigo-50 text-indigo-600" />
          <StatCard icon={<Award size={20}/>} label="Avg Rating" value={instructor.rating} color="bg-amber-50 text-amber-600" />
          <StatCard icon={<DollarSign size={20}/>} label="Instructor Revenue" value={`$${instructor.earnings.toLocaleString()}`} color="bg-emerald-50 text-emerald-600" />
        </div>

        {/* ================= TABS SECTION ================= */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {["about", "courses", "reviews"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-8 py-4 text-sm font-black uppercase tracking-widest transition-all ${
                  tab === t ? "bg-white border-t-2 border-indigo-600 text-indigo-600" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-8">
            {tab === "about" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <h2 className="text-xl font-black text-slate-800">Biography</h2>
                <p className="text-slate-500 leading-relaxed max-w-4xl">{instructor.bio} Over 10 years of experience building scalable applications.</p>
              </motion.div>
            )}

            {/* ================= 🚀 4-COLUMN COURSES GRID ================= */}
            {tab === "courses" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map((course) => (
                  <motion.div
                    whileHover={{ y: -5 }}
                    key={course.id}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden group shadow-sm"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={course.title} />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <PlayCircle size={40} className="text-white" />
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{course.title}</h3>
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                        <span className="flex items-center gap-1"><Users size={12}/> {course.students}</span>
                        <span className="text-amber-500 flex items-center gap-1">★ {course.rating}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                         <span className="text-lg font-black text-indigo-600">${course.price}</span>
                         <button className="p-2 bg-slate-50 rounded-lg text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <BookOpen size={16} />
                         </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {tab === "reviews" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/30">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-slate-800">{r.name}</h4>
                      <div className="flex text-amber-400">
                        {[...Array(r.rating)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 italic">"{r.comment}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ---------------- UPDATED SMALL COMPONENT ---------------- */

function StatCard({ icon, label, value, color }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex items-center gap-4"
    >
      <div className={`p-3 rounded-xl ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">{label}</p>
        <p className="font-black text-xl text-slate-800 leading-none mt-1">{value}</p>
      </div>
    </motion.div>
  );
}

// Simple Helper Component
function CheckCircle({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}