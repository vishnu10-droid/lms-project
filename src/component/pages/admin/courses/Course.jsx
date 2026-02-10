import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, PlayCircle, BookOpen, MoreVertical, Plus, Star } from 'lucide-react';

const Course = () => {
  const Navi = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const courses = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 1,
    title: i % 3 === 0 ? "Advanced UI/UX Motion Design" : "Mastering React Architecture",
    description: "Master the art of building scalable, high-performance applications with modern professional patterns.",
    imageUrl: `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60`,
    category: i % 2 === 0 ? "Development" : "Design",
    price: i % 3 === 0 ? "Free" : "$49.99",
    level: "Intermediate",
    rating: 4.8
  }));

  return (
    <div   className="min-h-screen bg-[#f8fafc] p-6 md:p-10 font-sans ">
      {/* --- HEADER SECTION --- */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Courses Library</h1>
            <p className="text-slate-500 mt-1">Manage and monitor your educational content</p>
          </div>
          <button 
            onClick={() => Navi('/admin/courses/add')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-200"
          >
            <Plus size={20} /> Add New Course
          </button>
        </div>

        {/* --- SEARCH & FILTER BAR --- */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by course name, instructor, or tags..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition text-slate-600"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-3 bg-slate-50 border-none rounded-xl text-slate-600 font-medium outline-none cursor-pointer">
              <option>All Categories</option>
              <option>Development</option>
              <option>Design</option>
            </select>
            <button className="p-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 transition">
              <Filter size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* --- ENHANCED COURSE GRID --- */}
      <div onClick={() => Navi('/admin/courses/Playlist')} className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="group relative bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 flex flex-col overflow-hidden">
            
            {/* Image Header */}
            <div className="relative h-52 overflow-hidden">
              <img 
                src={course.imageUrl} 
                alt={course.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="backdrop-blur-md bg-white/20 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-white/30">
                  {course.category}
                </span>
              </div>

              <div className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <button className="bg-white p-2 rounded-xl shadow-xl text-slate-700 hover:text-indigo-600">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-1 text-amber-500 mb-2">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-bold text-slate-700">{course.rating}</span>
                <span className="text-slate-400 text-[10px] font-medium">(1.2k reviews)</span>
              </div>

              <h3 className="text-lg font-bold text-slate-800 leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                {course.title}
              </h3>
              
              <p className="text-slate-500 text-sm line-clamp-2 leading-relaxed mb-6">
                {course.description}
              </p>

              {/* Meta Info Bar */}
              <div className="mt-auto grid grid-cols-2 gap-4 border-t border-slate-50 pt-4">
                <div className="flex items-center gap-2 text-slate-500">
                  <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                    <PlayCircle size={16} />
                  </div>
                  <span className="text-xs font-bold">12 Lessons</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
                    <BookOpen size={16} />
                  </div>
                  <span className="text-xs font-bold">{course.level}</span>
                </div>
              </div>
            </div>

            {/* Admin Quick Footer */}
            <div className="px-6 py-4 bg-slate-50/50 flex items-center justify-between border-t border-slate-100">
              <span className="text-xl font-black text-slate-900">{course.price}</span>
              <div className="flex gap-2">
                <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all shadow-sm">
                  Edit
                </button>
                <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200">
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Course;