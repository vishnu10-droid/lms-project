import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, PlayCircle, Plus, Star, ChevronDown } from "lucide-react";

const Course = () => {
  const Navi = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const courses = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, i) => ({
        id: i + 1,
        title:
          i % 3 === 0
            ? "Advanced UI/UX Motion"
            : i % 2 === 0
              ? "Full-Stack React"
              : "Digital Product Management",
        instructor: i % 2 === 0 ? "Sarah Jenkins" : "Alex Rivera",
        instructorAvatar: `https://i.pravatar.cc/150?u=${i}`,
        description:
          "Master building scalable apps with modern patterns and architecture.",
        imageUrl:
          i % 2 === 0
            ? `https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60`
            : `https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60`,
        category: i % 2 === 0 ? "Development" : "Design",
        price: i % 3 === 0 ? "Free" : "$49",
        duration: "6h 30m",
        level: i % 3 === 0 ? "Advanced" : "Intermediate",
        rating: 4.8,
        lessons: 24,
      })),
    [],
  );

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 font-sans text-slate-900">
      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 relative">
        {/* Glow Circle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="absolute -top-10 -right-10 w-60 h-60 bg-indigo-500/30 rounded-full blur-3xl"
        />

        {/* Left Text */}
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
            className="text-4xl font-extrabold tracking-tight bg-gradient-to-r 
            from-blue-500 via-indigo-500 to-purple-600 bg-clip-text 
            text-transparent drop-shadow-lg"
          >
            Courses Library
          </motion.h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
            Manage and monitor your curriculum.
          </p>
        </motion.div>

       <motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  onClick={() => Navi("/admin/courses/add")}   // ✅ FIXED
  className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold"
>
  <Plus size={18} /> Add Courses
</motion.button>
      </div>

      {/* ================= SEARCH + FILTER ================= */}
      <div className="flex flex-col md:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1 group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 
            group-focus-within:text-indigo-500 transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="Search courses..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl 
                       outline-none focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 
                       transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2.5 bg-white border border-slate-200 
            text-slate-700 font-bold rounded-xl cursor-pointer outline-none 
            focus:ring-2 focus:ring-indigo-500/10 transition-all text-sm"
          >
            <option value="All">All Categories</option>
            <option value="Development">Development</option>
            <option value="Design">Design</option>
          </select>

          <ChevronDown
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            size={14}
          />
        </div>
      </div>

      {/* ================= COURSES GRID ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => Navi("/admin/courses/playlist")}
            className="group bg-white rounded-2xl border border-slate-200 shadow-sm 
            hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 
            transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full relative"
          >
            {/* IMAGE */}
            <div className="relative aspect-video overflow-hidden">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-105 
                transition-transform duration-500"
              />

              <div className="absolute top-3 left-3">
                <span
                  className="px-2 py-1 rounded-md text-[10px] font-bold uppercase 
                bg-white/90 text-slate-800 shadow-sm backdrop-blur-sm"
                >
                  {course.category}
                </span>
              </div>
            </div>

            {/* BODY */}
            <div className="p-4 flex flex-col flex-1">
              {/* Rating + Level */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star size={12} fill="currentColor" />
                  <span className="text-[11px] font-bold text-slate-700">
                    {course.rating}
                  </span>
                </div>

                <div
                  className={`flex items-center gap-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    course.level === "Advanced"
                      ? "bg-purple-50 text-purple-600"
                      : "bg-blue-50 text-blue-600"
                  }`}
                >
                  {course.level}
                </div>
              </div>

              {/* Title */}
              <h3
                className="text-base font-bold text-slate-800 leading-tight mb-1.5 
                  line-clamp-1 group-hover:text-indigo-600 transition-colors"
              >
                {course.title}
              </h3>

              {/* Description */}
              <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2">
                {course.description}
              </p>

              {/* Instructor */}
              <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={course.instructorAvatar}
                    alt="Instructor"
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-[11px] font-bold text-slate-700 leading-none">
                    {course.instructor}
                  </span>
                </div>

                <span className="text-indigo-600 font-bold text-xs bg-indigo-50 px-2 py-1 rounded-lg">
                  {course.price}
                </span>
              </div>

              {/* Play Button */}
              <div
                className="absolute bottom-4 right-4 translate-y-2 opacity-0 
              group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300"
              >
                <button className="bg-slate-900 text-white p-2 rounded-full shadow-lg hover:bg-indigo-600 transition-colors">
                  <PlayCircle size={16} />
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
