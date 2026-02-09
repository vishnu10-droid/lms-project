import React from "react";
import { 
  Star, 
  Users, 
  BookOpen, 
  MoreHorizontal, 
  Mail, 
  ShieldCheck,
  ArrowUpRight
} from "lucide-react";

const TEACHERS = [
  { id: 1, name: "Ankit Sharma", subject: "Full Stack Dev", rating: 4.8, students: "1.2k", courses: 12, pic: "https://i.pravatar.cc/150?u=1" },
  { id: 2, name: "Sneha Rao", subject: "UI/UX Design", rating: 4.9, students: "850", courses: 8, pic: "https://i.pravatar.cc/150?u=2" },
  { id: 3, name: "Rahul Verma", subject: "Data Science", rating: 4.7, students: "2.1k", courses: 15, pic: "https://i.pravatar.cc/150?u=3" },
  { id: 4, name: "Priya Singh", subject: "Marketing", rating: 4.6, students: "1.1k", courses: 9, pic: "https://i.pravatar.cc/150?u=4" },
];

export default function TeacherGrid() {
  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Expert Instructors</h1>
            <p className="text-slate-500 text-sm font-medium">Manage your global teaching faculty</p>
          </div>
          <button className="text-indigo-600 font-bold text-sm flex items-center gap-1 hover:underline">
            View All <ArrowUpRight size={16} />
          </button>
        </div>

        {/* 🚀 4-COLUMN GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEACHERS.map((teacher) => (
            <div 
              key={teacher.id} 
              className="group bg-white rounded-[2rem] border border-slate-100 p-5 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Action & ID */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black bg-slate-100 text-slate-500 px-2 py-1 rounded-lg uppercase tracking-widest">
                  ID: #{teacher.id.toString().padStart(3, '0')}
                </span>
                <button className="text-slate-300 hover:text-slate-600 transition-colors">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Profile Image & Status */}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img 
                    src={teacher.pic} 
                    alt={teacher.name} 
                    className="w-24 h-24 rounded-[2rem] object-cover ring-4 ring-indigo-50 group-hover:ring-indigo-100 transition-all"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-1.5 rounded-xl border-4 border-white shadow-sm">
                    <ShieldCheck size={12} className="text-white" />
                  </div>
                </div>

                <h3 className="text-lg font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                  {teacher.name}
                </h3>
                <p className="text-indigo-500 font-bold text-[11px] uppercase tracking-tighter mt-1">
                  {teacher.subject}
                </p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-2 my-5 py-3 border-y border-slate-50">
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Rating</p>
                  <p className="text-xs font-black text-slate-700 flex items-center justify-center gap-0.5">
                    <Star size={10} className="fill-amber-400 text-amber-400" /> {teacher.rating}
                  </p>
                </div>
                <div className="text-center border-x border-slate-50">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Students</p>
                  <p className="text-xs font-black text-slate-700 flex items-center justify-center gap-0.5">
                    <Users size={10} className="text-indigo-400" /> {teacher.students}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Courses</p>
                  <p className="text-xs font-black text-slate-700 flex items-center justify-center gap-0.5">
                    <BookOpen size={10} className="text-indigo-400" /> {teacher.courses}
                  </p>
                </div>
              </div>

              {/* Quick Contact Button */}
              <button className="w-full bg-slate-900 text-white py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-indigo-600 transition-all">
                <Mail size={14} /> Send Message
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}