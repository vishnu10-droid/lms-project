import React from "react";
import { BarChart3, Users, BookOpen, DollarSign, Activity, Star } from "lucide-react";

export default function AdminReports() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">

      {/* HEADER */}
      <h1 className="text-4xl font-extrabold text-center text-indigo-900 mb-10 tracking-tight">
        Admin Reports
      </h1>

      {/* CONTAINER */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-10 shadow-2xl border border-indigo-100 space-y-16">

        {/* ================= OVERVIEW ================= */}
        <section>
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Platform Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Total Students", value: "15,420", color: "from-indigo-500 to-blue-600" },
              { label: "Active Students", value: "8,923", color: "from-green-500 to-emerald-600" },
              { label: "Total Courses", value: "128", color: "from-orange-500 to-amber-500" },
              { label: "Revenue", value: "$48,500", color: "from-purple-500 to-pink-600" },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-6 text-white rounded-2xl shadow-lg bg-gradient-to-r ${item.color}
                hover:shadow-xl hover:scale-105 transition-all duration-300`}
              >
                <p className="opacity-80 text-sm">{item.label}</p>
                <h3 className="text-3xl font-extrabold">{item.value}</h3>
              </div>
            ))}
          </div>

          {/* MINI GRAPH */}
          <div className="mt-8 p-6 bg-gray-50 border rounded-2xl shadow-inner">
            <p className="text-gray-600 mb-2">Monthly Growth</p>
            <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 rounded-full w-[70%]" />
            </div>
          </div>
        </section>

        {/* ================= COURSES ================= */}
        <section>
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Top Performing Courses</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "React Masterclass", students: 1247, rating: 4.9 },
              { title: "Python Bootcamp", students: 892, rating: 4.8 },
              { title: "Data Science Pro", students: 1103, rating: 4.7 },
              { title: "UI/UX Design", students: 634, rating: 4.9 },
            ].map((course, i) => (
              <div
                key={i}
                className="p-6 bg-gradient-to-br from-indigo-50 to-white border rounded-2xl shadow-md hover:shadow-xl transition-all"
              >
                <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-900">
                  <Star size={20} className="text-yellow-400" />
                  {course.title}
                </h3>
                <p className="text-gray-700 mt-2">Students: {course.students}</p>
                <p className="text-gray-700">Rating: {course.rating}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= STUDENTS ================= */}
        <section>
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Students Overview</h2>
          <p className="text-gray-600 text-lg">
            Detailed student analytics will be added soon.
          </p>
        </section>

        {/* ================= REVENUE ================= */}
        <section>
          <h2 className="text-3xl font-bold text-indigo-900 mb-4">Revenue Metrics</h2>

          <p className="text-gray-700 text-lg mb-6">
            Current Month Revenue:
            <span className="text-green-600 font-bold"> $48,500</span>
          </p>

          <div className="p-6 border rounded-2xl bg-gray-50 shadow-inner">
            <p className="text-gray-600 mb-2">Revenue Progress</p>
            <div className="h-3 bg-gray-300 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full w-[78%]" />
            </div>
          </div>
        </section>

        {/* ================= ACTIVITY ================= */}
        <section>
          <h2 className="text-3xl font-bold text-indigo-900 mb-6">Recent Activity</h2>

          <div className="space-y-3">
            {[
              "Arjun enrolled in React Masterclass",
              "Priya completed Python Bootcamp",
              "Neha purchased a course worth $299",
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 border bg-gray-50 rounded-2xl hover:bg-indigo-50 hover:border-indigo-200 transition-all"
              >
                {item}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
