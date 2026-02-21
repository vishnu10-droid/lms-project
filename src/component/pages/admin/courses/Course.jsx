import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  PlayCircle,
  Plus,
  Star,
  Zap,
  ChevronDown,
  MoreHorizontal
} from 'lucide-react';

const Course  = () => {
  const Navi = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const courses = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i + 1,
        title:
          i % 3 === 0
            ? 'Advanced UI/UX Motion'
            : i % 2 === 0
            ? 'Full-Stack React'
            : 'Digital Product Management',
        instructor: i % 2 === 0 ? 'Sarah Jenkins' : 'Alex Rivera',
        instructorAvatar: `https://i.pravatar.cc/150?u=${i}`,
        description:
          'Master building scalable apps with modern patterns and architecture.', // Shortened text slightly for demo
        imageUrl:
          i % 2 === 0
            ? `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60`
            : `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60`,
        category: i % 2 === 0 ? 'Development' : 'Design',
        price: i % 3 === 0 ? 'Free' : '$49',
        duration: '6h 30m',
        level: i % 3 === 0 ? 'Advanced' : 'Intermediate',
        rating: 4.8,
        lessons: 24,
      })),
    []
  );

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pb-20 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-72 bg-gradient-to-b from-indigo-50/60 dark:from-indigo-950/40 to-transparent -z-10" />

      {/* Container max-width adjusted */}
      <div className="w-full max-w-[1400px] mx-auto px-6 pt-10">

        {/* HEADER - Compact */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100">
              Courses Library
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-1">
              Manage and monitor your curriculum.
            </p>
          </div>

          <button
            onClick={() => Navi('/admin/courses/add')}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/30 hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-300 text-sm"
          >
            <Plus size={18} />
            New Course
          </button>
        </div>

        {/* SEARCH & FILTER - Compact */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1 group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 transition-colors"
              size={16}
            />
            <input
              type="text"
              placeholder="Search courses..."
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
            >
              <option value="All">All Categories</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
            </select>
            <ChevronDown
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
              size={14}
            />
          </div>
        </div>

        {/* GRID LAYOUT - Changed to 4 columns (xl:grid-cols-4) and reduced gap */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => Navi('/admin/courses/Playlist')}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700
              shadow-sm dark:shadow-black/30 hover:shadow-xl hover:shadow-indigo-500/10
              hover:-translate-y-1 transition-all duration-300 ease-out
              cursor-pointer overflow-hidden flex flex-col h-full relative"
            >
              
              {/* IMAGE - Aspect Video (16:9) reduces height significantly */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={course.imageUrl}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 dark:bg-black/20 group-hover:bg-black/0 transition-colors" />
                
                {/* Floating Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 shadow-sm backdrop-blur-sm">
                    {course.category}
                  </span>
                </div>
              </div>

              {/* CARD BODY - Reduced Padding */}
              <div className="p-4 flex flex-col flex-1">
                
                {/* Top Row: Rating & Level */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">
                      {course.rating}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${course.level === 'Advanced' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300' : 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300'}`}>
                    {course.level}
                  </div>
                </div>

                {/* Title - Smaller text */}
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 leading-tight mb-1.5 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                  {course.title}
                </h3>

                {/* Description - Line clamp 2 to limit height */}
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-4 line-clamp-2">
                  {course.description}
                </p>

                {/* FOOTER - Compact */}
                <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={course.instructorAvatar}
                      alt="Instructor"
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 leading-none">
                        {course.instructor}
                      </span>
                    </div>
                  </div>
                  
                  <span className="text-indigo-600 dark:text-indigo-300 font-bold text-xs bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-lg">
                    {course.price}
                  </span>
                </div>

                {/* Hover Action - Overlay Button (Optional style) or Bottom Slide */}
                {/* This approach keeps the card height static but shows the button over the content on hover */}
                <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                   <button className="bg-slate-900 dark:bg-slate-700 text-white p-2 rounded-full shadow-lg hover:bg-indigo-600 transition-colors">
                      <PlayCircle size={16} />
                   </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Course;
