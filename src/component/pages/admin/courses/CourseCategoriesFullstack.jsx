import React from 'react';
import { Star, Users, PlayCircle, Award, X } from 'lucide-react';
import { nav } from 'framer-motion/client';
import { useNavigate } from 'react-router-dom';

const CourseCategoriesFullstack = () => {
  // 1. Enhanced Mock Data
  const courses = Array.from({ length: 12 }).map((_, index) => ({
    id: index + 1,
    title: [
      "Full-Stack Web Development BootCamp", 
      "Python for Data Science & AI", 
      "UI/UX Design Masterclass 2024", 
      "Machine Learning A-Z: Hands-On"
    ][index % 4] + ` - Batch ${Math.floor(index / 4) + 1}`,
    instructor: "Angela Yu",
    rating: (4.5 + Math.random() * 0.5).toFixed(1),
    reviews: Math.floor(Math.random() * 2000) + 500,
    price: (Math.random() * (99 - 49) + 49).toFixed(2),
    oldPrice: "129.99",
    level: "Beginner",
    isBestseller: index % 3 === 0, // Dynamic badge
    category: "Software Engineering",
    image: `https://picsum.photos/seed/${index + 120}/600/400`
  }));
  const nav =useNavigate();

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">
              Our Top <span className="text-blue-600">Full-Stack</span> Courses
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl">
              Join 12,000+ students learning the most in-demand technical skills from industry experts.
            </p>
          </div>
          <button className="hidden md:block text-blue-600 font-bold hover:text-blue-800 transition-colors">
            See all categories →
          </button>
        </div>

        {/* 2. Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-300"
            >
              {/* Card Image Area */}
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                
                {/* Dynamic Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <span className="bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-blue-700 shadow-sm">
                    {course.category}
                  </span>
                  {course.isBestseller && (
                    <span className="bg-amber-400 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider text-amber-900 shadow-sm flex items-center gap-1">
                      <Award size={12} /> Bestseller
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content Area */}
              <div className="p-5 flex flex-col flex-1">
                {/* Title & Instructor */}
                <div className="flex-1">
                  <h3 className="text-md font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    by <span className="font-medium text-gray-700">{course.instructor}</span>
                  </p>

                  {/* Rating Logic */}
                  <div className="flex items-center mt-3 gap-1.5">
                    <span className="text-amber-600 font-black text-sm">{course.rating}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          fill={i < Math.floor(course.rating) ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs font-medium">
                      ({course.reviews.toLocaleString()})
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gray-100 my-4" />

                {/* Bottom Section: Price & CTA */}
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through">${course.oldPrice}</span>
                    <span className="text-xl font-black text-gray-900">${course.price}</span>
                  </div>
                  <button onClick={() => nav("/admin/Course/video/player")} className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95 group/btn">
                    <PlayCircle size={22} className="group-hover/btn:scale-110 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer/Pagination */}
        <div className="mt-16 text-center">
          <button className="group px-10 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-2xl hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm hover:shadow-md">
            Browse All Courses 
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default CourseCategoriesFullstack;