import React, { useState } from "react";
import { PlusCircle, Search, Edit, Trash2, BookOpen, X, Star, CheckCircle, PlayCircle, Users, BarChart } from "lucide-react";

// IMPORT YOUR COURSE DATA
import coursesList from "./coursesList";
import coursePreview from "./CoursePreview";

export default function CoursesPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className="text-white">

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold">Courses Dashboard</h1>
          <p className="text-gray-400 mt-1">Manage, preview and organize all your courses</p>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl text-white flex items-center gap-2 shadow-lg transition"
        >
          <PlusCircle size={20} /> Add New Course
        </button>
      </div>

      {/* OVERVIEW CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-lg">Total Courses</h2>
          <p className="text-3xl font-bold mt-2">{coursesList.length}</p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-lg">Active Students</h2>
          <p className="text-3xl font-bold mt-2">8,432</p>
        </div>

        <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg">
          <h2 className="text-lg">Completed Courses</h2>
          <p className="text-3xl font-bold mt-2">342</p>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-3 max-w-md mb-8">
        <Search size={18} className="text-gray-400" />
        <input
          className="w-full bg-transparent outline-none text-sm"
          placeholder="Search courses..."
        />
      </div>

      {/* COURSE TABLE */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl overflow-hidden mb-10">
        <table className="w-full text-left">
          <thead className="bg-white/10 text-gray-300 text-sm uppercase tracking-wide">
            <tr>
              <th className="py-3 px-6">Course</th>
              <th className="px-6">Category</th>
              <th className="px-6">Students</th>
              <th className="px-6">Price</th>
              <th className="px-6">Status</th>
              <th className="px-6 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {coursesList.map((course) => (
              <tr
                key={course.id}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="py-3 px-6 flex items-center gap-3">
                  <BookOpen size={18} className="text-indigo-400" />
                  <span className="font-semibold">{course.title}</span>
                </td>

                <td className="px-6 text-gray-300">{course.category}</td>
                <td className="px-6">{course.students}</td>
                <td className="px-6 text-indigo-300 font-bold">{course.price}</td>

                <td className="px-6">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.status === "Active"
                        ? "bg-green-600/30 text-green-400"
                        : "bg-yellow-600/30 text-yellow-400"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>

                <td className="px-6 text-center">
                  <div className="flex justify-center gap-4">
                    <Edit
                      size={18}
                      onClick={() => setShowEditForm(true)}
                      className="text-blue-400 hover:text-blue-500 cursor-pointer"
                    />
                    <Trash2
                      size={18}
                      className="text-red-400 hover:text-red-500 cursor-pointer"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* COURSE PREVIEW */}
      <section className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-4">Course Preview</h2>

        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={coursePreview.banner}
            alt="preview"
            className="w-full md:w-72 h-48 rounded-xl object-cover"
          />

          <div>
            <h3 className="text-2xl font-bold">{coursePreview.title}</h3>
            <p className="text-gray-300 mt-2">{coursePreview.description}</p>

            <div className="flex items-center gap-2 mt-3 text-yellow-400">
              <Star size={18} />
              {coursePreview.rating} ⭐
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTERS SECTION */}
      <section className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-4">Course Chapters</h2>

        <div className="space-y-3">
          {coursePreview.chapters.map((chapter, i) => (
            <div key={i} className="p-4 bg-black/20 border border-white/10 rounded-xl">
              <p className="font-semibold text-lg mb-2">{chapter.title}</p>
              {chapter.lessons.map((lesson, idx) => (
                <div key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                  <PlayCircle size={16} className="text-indigo-400" /> {lesson}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* STUDENTS SECTION */}
      <section className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Users size={20} /> Enrolled Students
        </h2>

        <ul className="space-y-2 text-gray-300">
          {coursePreview.students.map((user, i) => (
            <li key={i} className="p-3 bg-black/20 rounded-xl border border-white/10">
              {user}
            </li>
          ))}
        </ul>
      </section>

      {/* ASSESSMENTS SECTION */}
      <section className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-4">Assessments</h2>
        <ul className="space-y-2 text-gray-300">
          {coursePreview.assessments.map((a, i) => (
            <li key={i} className="p-3 bg-black/20 rounded-xl border border-white/10">
              {a}
            </li>
          ))}
        </ul>
      </section>

      {/* ANALYTICS SECTION */}
      <section className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <BarChart size={20} /> Analytics
        </h2>

        <img
          src="https://assets-global.website-files.com/638dfa6a79140bece5979203/6403543e911e7a9c26566bfa_chart-01.png"
          alt="chart"
          className="rounded-xl opacity-80"
        />
      </section>

      {/* INSTRUCTOR SECTION */}
      <section className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-4">Instructor</h2>

        <div className="flex items-center gap-4">
          <img
            src={coursePreview.instructor.image}
            className="w-16 h-16 object-cover rounded-xl"
            alt="Instructor"
          />

          <div>
            <p className="text-lg font-semibold">{coursePreview.instructor.name}</p>
            <p className="text-gray-400 text-sm">{coursePreview.instructor.role}</p>
          </div>
        </div>
      </section>

      {/* ADD COURSE FORM (MODAL UI ONLY) */}
      {showAddForm && (
        <AddCourseModal onClose={() => setShowAddForm(false)} />
      )}

      {/* EDIT COURSE FORM (MODAL UI ONLY) */}
      {showEditForm && (
        <EditCourseModal onClose={() => setShowEditForm(false)} />
      )}
    </div>
  );
}

function AddCourseModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex justify-center items-center">
      <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl w-full max-w-lg">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Course</h2>
          <X size={20} onClick={onClose} className="cursor-pointer" />
        </div>

        <form className="space-y-4">
          <input className="w-full bg-white/5 p-3 rounded-xl outline-none" placeholder="Course Title" />
          <input className="w-full bg-white/5 p-3 rounded-xl outline-none" placeholder="Category" />
          <input className="w-full bg-white/5 p-3 rounded-xl outline-none" placeholder="Price" />
          <textarea className="w-full bg-white/5 p-3 rounded-xl outline-none" placeholder="Description"></textarea>

          <button className="w-full bg-indigo-600 py-3 rounded-xl">Create Course</button>
        </form>
      </div>
    </div>
  );
}

function EditCourseModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xl flex justify-center items-center">
      <div className="bg-white/10 p-6 rounded-2xl border border-white/10 shadow-xl w-full max-w-lg">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Edit Course</h2>
          <X size={20} onClick={onClose} className="cursor-pointer" />
        </div>

        <form className="space-y-4">
          <input className="w-full bg-white/5 p-3 rounded-xl outline-none" placeholder="Course Title" />
          <input className="w-full bg-white/5 p-3 rounded-xl outline-none" placeholder="Category" />
          <input className="w-full bg-white/5 p-3 rounded-xl outline-none" placeholder="Price" />
          <textarea className="w-full bg-white/5 p-3 rounded-xl outline-none" placeholder="Description"></textarea>

          <button className="w-full bg-indigo-600 py-3 rounded-xl">Save Changes</button>
        </form>
      </div>
    </div>
  );
}
