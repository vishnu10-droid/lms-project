import React from "react";
import { PlusCircle, Search, Edit, Trash2, BookOpen } from "lucide-react";

const courseList = [
  {
    id: 1,
    title: "Full Stack Web Development",
    category: "Development",
    students: 1243,
    price: "$49.99",
    status: "Active",
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    students: 832,
    price: "$29.99",
    status: "Active",
  },
  {
    id: 3,
    title: "Python for Beginners",
    category: "Programming",
    students: 2103,
    price: "Free",
    status: "Draft",
  },
];

export default function Courses() {
  return (
    <div className="w-full">

      {/* PAGE HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Course Management</h1>
          <p className="text-gray-400 mt-1">Manage, edit and organize all your courses</p>
        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-xl text-white flex items-center gap-2 shadow-lg transition">
          <PlusCircle size={20} /> Add New Course
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-3 max-w-md mb-6">
        <Search size={18} className="text-gray-400" />
        <input
          className="w-full bg-transparent outline-none text-sm"
          placeholder="Search courses..."
        />
      </div>

      {/* TABLE */}
      <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-xl overflow-hidden">
        
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
            {courseList.map((course) => (
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
    </div>
  );
}
