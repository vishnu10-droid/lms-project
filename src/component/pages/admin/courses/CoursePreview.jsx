import React from "react";
import { Star, BookOpen, Clock, PlayCircle, CheckCircle } from "lucide-react";

export default function CoursePreview() {
  return (
    <div className="text-white">

      {/* BANNER */}
      <div className="relative w-full h-64 rounded-3xl overflow-hidden shadow-xl">
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
          alt="course banner"
          className="w-full h-full object-cover opacity-70"
        />

        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute bottom-6 left-10">
          <h1 className="text-4xl font-bold">Full Stack Web Development</h1>
          <p className="text-gray-300 mt-2">Become a professional developer from scratch</p>

          <div className="flex items-center gap-3 mt-3">
            <span className="flex items-center gap-1 text-yellow-400">
              <Star size={18} /> 4.8
            </span>
            <span className="text-gray-300">• 12,983 students</span>
          </div>
        </div>
      </div>

      {/* COURSE INFO */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-8">

          {/* About Course */}
          <section className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">About This Course</h2>
            <p className="text-gray-300 leading-relaxed">
              This course takes you from beginner to professional full-stack developer.
              You’ll learn HTML, CSS, JavaScript, React, Node.js, MongoDB, and more.
            </p>
          </section>

          {/* What You Will Learn */}
          <section className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">What You Will Learn</h2>

            <ul className="space-y-2 text-gray-300">
              {[
                "Understand HTML, CSS & JavaScript deeply",
                "Build full-stack applications",
                "Master React.js & Node.js",
                "Work with MongoDB & REST APIs",
                "Deploy apps professionally",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400" /> {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Curriculum */}
          <section className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>

            <div className="space-y-4">
              {[
                {
                  chapter: "Introduction to Web Development",
                  lessons: [
                    "How the Web Works",
                    "Frontend vs Backend",
                    "HTML Basics",
                  ],
                },
                {
                  chapter: "JavaScript Mastery",
                  lessons: [
                    "Variables & Data Types",
                    "Functions & Scope",
                    "DOM Manipulation",
                  ],
                },
                {
                  chapter: "React.js Essentials",
                  lessons: ["Components", "Hooks", "State Management"],
                },
              ].map((section, i) => (
                <div key={i} className="bg-black/20 p-4 rounded-xl border border-white/10">
                  <p className="font-semibold text-lg mb-2">{section.chapter}</p>

                  {section.lessons.map((lesson, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 text-gray-300 py-1"
                    >
                      <PlayCircle size={16} className="text-indigo-400" />
                      {lesson}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-6">

          {/* Course Card */}
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-3">Course Details</h3>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-300">
                <BookOpen size={18} className="text-indigo-400" />
                42 Lessons
              </div>

              <div className="flex items-center gap-2 text-gray-300">
                <Clock size={18} className="text-indigo-400" />
                18 hours total
              </div>
            </div>

            <h2 className="text-3xl font-bold mt-6 mb-4">$49.99</h2>

            <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl shadow-lg text-white font-semibold transition">
              Enroll Now
            </button>
          </div>

          {/* Instructor */}
          <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl">
            <h3 className="text-xl font-bold mb-4">Instructor</h3>

            <div className="flex items-center gap-4">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="instructor"
                className="w-14 h-14 rounded-xl"
              />

              <div>
                <p className="text-lg font-semibold">Michael Johnson</p>
                <p className="text-gray-400 text-sm">Senior Full Stack Developer</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
