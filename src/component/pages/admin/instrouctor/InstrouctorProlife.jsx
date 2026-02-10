import React, { useState } from "react";
import { Star, Users, BookOpen, MessageCircle, UserPlus, PlayCircle, CheckCircle } from "lucide-react";

export default function SimpleInstructorProfile() {
  const [tab, setTab] = useState("about");

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* 1. Profile Header Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center">
          <div className="relative">
            <img src="https://i.pravatar.cc/150?u=john" className="w-32 h-32 rounded-full object-cover border-4 border-indigo-50" alt="Instructor" />
            <div className="absolute bottom-1 right-1 bg-green-500 text-white p-1 rounded-full border-2 border-white">
              <CheckCircle size={14} />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-900">John Anderson</h1>
            <p className="text-indigo-600 font-medium">Senior Web Developer</p>
            <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm text-gray-500">
              <Star size={16} className="text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-gray-800">4.8</span>
              <span>(1,240 reviews)</span>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-indigo-700 transition">
                <UserPlus size={18} /> Follow
              </button>
              <button className="border border-gray-200 px-5 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-50 transition">
                <MessageCircle size={18} /> Message
              </button>
            </div>
          </div>
        </div>

        {/* 2. Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatBox icon={<Users />} label="Students" value="35,600" color="text-blue-600" bg="bg-blue-50" />
          <StatBox icon={<BookOpen />} label="Courses" value="18" color="text-indigo-600" bg="bg-indigo-50" />
          <StatBox icon={<Star />} label="Rating" value="4.8" color="text-amber-600" bg="bg-amber-50" />
          <StatBox icon={<PlayCircle />} label="Tutorials" value="150+" color="text-red-600" bg="bg-red-50" />
        </div>

        {/* 3. Tabs Navigation */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex border-b">
            {["about", "courses"].map((t) => (
              <button 
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition ${tab === t ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-400"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-6">
            {tab === "about" ? (
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-800">Biography</h3>
                <p className="text-gray-600 leading-relaxed">
                  John is a senior developer with 10+ years of experience. He specializes in React, Node.js, and helping beginners transition into tech careers through project-based learning.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <CourseItem title="React Masterclass" price="$49" students="12k" img="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400" />
                <CourseItem title="Advanced Node.js" price="$59" students="8k" img="https://images.unsplash.com/photo-1502462041640-b3d7e50d0662?w=400" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Small Reusable Components (Keep code clean) --- */

function StatBox({ icon, label, value, color, bg }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center gap-4">
      <div className={`p-3 rounded-lg ${bg} ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-400 text-xs font-bold uppercase">{label}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}

function CourseItem({ title, price, students, img }) {
  return (
    <div className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition cursor-pointer">
      <img src={img} className="w-20 h-14 rounded-lg object-cover" alt="" />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-800 truncate">{title}</h4>
        <div className="flex items-center justify-between mt-1">
          <span className="text-xs text-gray-500">{students} students</span>
          <span className="text-sm font-bold text-indigo-600">{price}</span>
        </div>
      </div>
    </div>
  );
}