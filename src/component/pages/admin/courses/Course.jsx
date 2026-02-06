import React, { useState } from "react";
import {
  Search,
  Star,
  Clock,
  Users,
  BookOpen,
  FilterX
} from "lucide-react";

/* ---------------- SAMPLE COURSE DATA ---------------- */

const coursesData = [
  {
    id: 1,
    title: "Complete React Development",
    category: "Web Development",
    instructor: "John Doe",
    price: "$49",
    rating: 4.8,
    students: 1200,
    duration: "12h 30m",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=800&q=80" // React / JS
  },
  {
    id: 2,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    instructor: "Sarah Smith",
    price: "$39",
    rating: 4.6,
    students: 980,
    duration: "9h 15m",
    image: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?auto=format&fit=crop&w=800&q=80" // UI/UX
  },
  {
    id: 3,
    title: "Python for Data Science",
    category: "Data Science",
    instructor: "Michael Brown",
    price: "$59",
    rating: 4.9,
    students: 2100,
    duration: "14h 10m",
    image: "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?auto=format&fit=crop&w=800&q=80" // Python
  },
  {
    id: 4,
    title: "Digital Marketing Mastery",
    category: "Marketing",
    instructor: "Emma Wilson",
    price: "$45",
    rating: 4.7,
    students: 1500,
    duration: "10h 40m",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=800&q=80" // Marketing
  },
  {
    id: 5,
    title: "Advanced Node.js Backend",
    category: "Web Development",
    instructor: "Alex Rivers",
    price: "$55",
    rating: 4.8,
    students: 850,
    duration: "15h 20m",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=800&q=80" // Backend / Node
  },
  {
    id: 6,
    title: "Mobile App Design",
    category: "Design",
    instructor: "Leo Garcia",
    price: "$34",
    rating: 4.5,
    students: 720,
    duration: "8h 45m",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=800&q=80" // Mobile UI
  },
  {
    id: 7,
    title: "Machine Learning A-Z",
    category: "Data Science",
    instructor: "Dr. Angela Yu",
    price: "$69",
    rating: 4.9,
    students: 3400,
    duration: "22h 10m",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80" // AI / ML
  },
  {
    id: 8,
    title: "Social Media Strategy",
    category: "Marketing",
    instructor: "Chris Do",
    price: "$29",
    rating: 4.4,
    students: 1100,
    duration: "6h 30m",
    image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?auto=format&fit=crop&w=800&q=80" // Social Media
  }
];


/* ---------------- COMPONENT ---------------- */

const AllCourses = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", ...new Set(coursesData.map(c => c.category))];

  const filteredCourses = coursesData.filter(course => {
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || course.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans text-gray-900">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <h1 className="text-3xl font-bold tracking-tight">All Courses</h1>
        <p className="text-gray-500 mt-1">
          Explore our expert-led courses and upgrade your skills.
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for a course..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="bg-white border border-gray-200 rounded-xl px-4 py-3 md:w-64 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-sm text-blue-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
                      {course.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h2 className="font-bold text-lg leading-snug mb-1 group-hover:text-blue-600 transition-colors h-14 line-clamp-2">
                    {course.title}
                  </h2>
                  <p className="text-sm text-gray-500 mb-4">By {course.instructor}</p>

                  {/* Meta Icons Row */}
                  <div className="flex items-center justify-between py-3 border-t border-gray-50 text-gray-500 text-xs">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-400 fill-yellow-400" />
                      <span className="font-medium text-gray-700">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{course.duration}</span>
                    </div>
                  </div>

                  {/* Footer Price & Action */}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-extrabold text-gray-900">
                      {course.price}
                    </span>
                    <button className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-md shadow-blue-100">
                      <BookOpen size={18} />
                      <span className="text-sm font-semibold">Enroll</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="bg-gray-50 p-4 rounded-full mb-4">
              <FilterX size={48} className="text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700">No courses found</h3>
            <p className="text-gray-400">Try adjusting your search or category filters.</p>
            <button 
              onClick={() => {setSearch(""); setCategory("All");}}
              className="mt-4 text-blue-600 font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCourses;