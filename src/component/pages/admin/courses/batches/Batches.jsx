import React, { useState, useMemo } from 'react';
import { Users, Clock, PlusCircle, CheckCircle, Search, Plus, LayoutGrid } from 'lucide-react';

const AddBatches = () => {
  const initialCourses = [
    { id: 1, title: "Full Stack Web Development", category: "Programming", duration: "6 Months", students: 120, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80" },
    { id: 2, title: "Advanced UI/UX Design", category: "Design", duration: "3 Months", students: 85, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "Data Science Masters", category: "Data Science", duration: "8 Months", students: 200, image: "https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&w=400&q=80" },
    { id: 4, title: "Digital Marketing Pro", category: "Marketing", duration: "4 Months", students: 150, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [addedCourses, setAddedCourses] = useState([]);

  // Filtering Logic
  const filteredCourses = initialCourses.filter(course =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddCourse = (courseId) => {
    if (!addedCourses.includes(courseId)) {
      setAddedCourses([...addedCourses, courseId]);
    }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      
      {/* --- TOP HEADER SECTION --- */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800 flex items-center gap-2">
            <LayoutGrid className="text-indigo-600" />
            Batch Management
          </h1>
          <p className="text-gray-500 mt-1">Select courses and create custom learning batches.</p>
        </div>

        {/* TOP BUTTON: Add New Batch */}
        <button 
          onClick={() => alert("Redirecting to Batch Creation Form...")}
          className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all active:scale-95"
        >
          <Plus size={20} strokeWidth={3} />
          Create New Batch
        </button>
      </div>

      {/* --- SEARCH BAR --- */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="Search courses to add..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* --- COURSE GRID --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden group">
            <div className="relative h-44">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold text-indigo-700 uppercase">
                {course.category}
              </div>
            </div>

            <div className="p-5 flex-grow">
              <h3 className="text-lg font-bold text-gray-800 mb-4 line-clamp-2">{course.title}</h3>
              <div className="flex items-center justify-between text-gray-500 text-xs">
                <div className="flex items-center gap-1"><Clock size={14} /> {course.duration}</div>
                <div className="flex items-center gap-1"><Users size={14} /> {course.students}</div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-50">
              <button
                onClick={() => handleAddCourse(course.id)}
                disabled={addedCourses.includes(course.id)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all ${
                  addedCourses.includes(course.id)
                    ? 'bg-emerald-50 text-emerald-600 cursor-default'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white'
                }`}
              >
                {addedCourses.includes(course.id) ? (
                  <><CheckCircle size={18} /> Added</>
                ) : (
                  <><PlusCircle size={18} /> Add to Batch</>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* --- STICKY SELECTION BAR --- */}
      {addedCourses.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-max bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between gap-8 z-50 border border-gray-700 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3">
            <span className="bg-indigo-500 h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold">
              {addedCourses.length}
            </span>
            <p className="text-sm font-medium hidden md:block">Courses ready for the new batch</p>
          </div>
          <button className="bg-indigo-500 hover:bg-indigo-400 px-6 py-2 rounded-xl text-sm font-bold transition">
            Finalize Batch
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBatches;