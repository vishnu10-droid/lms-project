import React, { useState } from 'react';
import { Users, Calendar, Clock, BookOpen, PlusCircle, CheckCircle } from 'lucide-react';

const AddBatches = () => {
  // Sample Data: Ye data aap backend API se bhi la sakte hain
  const initialCourses = [
    { id: 1, title: "Full Stack Web Development", category: "Programming", duration: "6 Months", students: 120, image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80" },
    { id: 2, title: "Advanced UI/UX Design", category: "Design", duration: "3 Months", students: 85, image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80" },
    { id: 3, title: "Data Science Masters", category: "Data Science", duration: "8 Months", students: 200, image: "https://images.unsplash.com/photo-1551288049-bbbda5366392?auto=format&fit=crop&w=400&q=80" },
    { id: 4, title: "Digital Marketing Pro", category: "Marketing", duration: "4 Months", students: 150, image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" },
  ];

  const [addedCourses, setAddedCourses] = useState([]);

  // Function to handle adding course to a batch
  const handleAddCourse = (courseId) => {
    if (!addedCourses.includes(courseId)) {
      setAddedCourses([...addedCourses, courseId]);
      // Yahan aap apni API call kar sakte hain: axios.post('/api/add-to-batch', { courseId })
      console.log(`Course ${courseId} added to batch!`);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">Select Courses for New Batch</h1>
        <p className="text-gray-500 mt-2">Choose the courses you want to include in this upcoming academic cycle.</p>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {initialCourses.map((course) => (
          <div 
            key={course.id} 
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 flex flex-col"
          >
            {/* Course Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={course.image} 
                alt={course.title} 
                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {course.category}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-grow">
              <h3 className="text-xl font-bold text-gray-800 mb-2 leading-tight">
                {course.title}
              </h3>
              
              <div className="space-y-2 mt-4">
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={16} className="mr-2 text-indigo-500" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-gray-500 text-sm">
                  <Users size={16} className="mr-2 text-indigo-500" />
                  <span>{course.students} Students Enrolled</span>
                </div>
              </div>
            </div>

            {/* Action Footer */}
            <div className="p-5 bg-gray-50 border-t border-gray-100">
              <button
                onClick={() => handleAddCourse(course.id)}
                disabled={addedCourses.includes(course.id)}
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold transition-all duration-300 ${
                  addedCourses.includes(course.id)
                    ? 'bg-green-100 text-green-600 cursor-default'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-lg shadow-indigo-100'
                }`}
              >
                {addedCourses.includes(course.id) ? (
                  <>
                    <CheckCircle size={20} />
                    Added to Batch
                  </>
                ) : (
                  <>
                    <PlusCircle size={20} />
                    Add Course
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Footer (Sticky) */}
      {addedCourses.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-6 animate-bounce-subtle">
          <p className="font-medium">{addedCourses.length} Course(s) Selected</p>
          <button className="bg-indigo-500 hover:bg-indigo-400 text-white px-6 py-2 rounded-full text-sm font-bold transition">
            Create Batch Now
          </button>
        </div>
      )}
    </div>
  );
};

export default AddBatches;