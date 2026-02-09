import React, { useState, useEffect } from 'react';

const StudentList = () => {
  // Sample data for 20 students
  const initialStudents = [
    { id: 1, name: "Rahul Sharma", course: "Web Development", subscription: "Premium", paymentStatus: "Paid", email: "rahul@example.com" },
    { id: 2, name: "Priya Patel", course: "Data Science", subscription: "Basic", paymentStatus: "Pending", email: "priya@example.com" },
    { id: 3, name: "Amit Kumar", course: "Mobile App Dev", subscription: "Premium", paymentStatus: "Paid", email: "amit@example.com" },
    { id: 4, name: "Neha Gupta", course: "UI/UX Design", subscription: "Pro", paymentStatus: "Paid", email: "neha@example.com" },
    { id: 5, name: "Vikram Singh", course: "Web Development", subscription: "Basic", paymentStatus: "Paid", email: "vikram@example.com" },
    { id: 6, name: "Anita Joshi", course: "Data Science", subscription: "Premium", paymentStatus: "Overdue", email: "anita@example.com" },
    { id: 7, name: "Rohan Mehta", course: "Cybersecurity", subscription: "Pro", paymentStatus: "Paid", email: "rohan@example.com" },
    { id: 8, name: "Sneha Reddy", course: "Mobile App Dev", subscription: "Basic", paymentStatus: "Pending", email: "sneha@example.com" },
    { id: 9, name: "Karan Malhotra", course: "UI/UX Design", subscription: "Premium", paymentStatus: "Paid", email: "karan@example.com" },
    { id: 10, name: "Divya Rani", course: "Web Development", subscription: "Pro", paymentStatus: "Paid", email: "divya@example.com" },
    { id: 11, name: "Suresh Yadav", course: "Data Science", subscription: "Basic", paymentStatus: "Paid", email: "suresh@example.com" },
    { id: 12, name: "Meera Nair", course: "Cybersecurity", subscription: "Premium", paymentStatus: "Pending", email: "meera@example.com" },
    { id: 13, name: "Arjun Bose", course: "Mobile App Dev", subscription: "Pro", paymentStatus: "Paid", email: "arjun@example.com" },
    { id: 14, name: "Pooja Desai", course: "UI/UX Design", subscription: "Basic", paymentStatus: "Overdue", email: "pooja@example.com" },
    { id: 15, name: "Nikhil Verma", course: "Web Development", subscription: "Premium", paymentStatus: "Paid", email: "nikhil@example.com" },
    { id: 16, name: "Riya Kapoor", course: "Data Science", subscription: "Pro", paymentStatus: "Paid", email: "riya@example.com" },
    { id: 17, name: "Gopal Mishra", course: "Cybersecurity", subscription: "Basic", paymentStatus: "Pending", email: "gopal@example.com" },
    { id: 18, name: "Tara Singh", course: "Mobile App Dev", subscription: "Premium", paymentStatus: "Paid", email: "tara@example.com" },
    { id: 19, name: "Vishal Rao", course: "UI/UX Design", subscription: "Pro", paymentStatus: "Paid", email: "vishal@example.com" },
    { id: 20, name: "Lakshmi Menon", course: "Web Development", subscription: "Basic", paymentStatus: "Paid", email: "lakshmi@example.com" }
  ];

  const [students] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Filter students based on search and filter type
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.subscription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterType === 'all' || 
                         (filterType === 'course' && student.course === searchTerm) ||
                         (filterType === 'subscription' && student.subscription === searchTerm) ||
                         (filterType === 'payment' && student.paymentStatus === searchTerm);

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Student Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Manage your students, courses, and subscriptions
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-8 mb-8 border border-white/50">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative w-full lg:w-1/3">
              <input
                type="text"
                placeholder="Search students, courses, subscriptions..."
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 transition-all duration-300 bg-white/50 backdrop-blur-sm shadow-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-end">
              {['all', 'course', 'subscription', 'payment'].map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setFilterType(type);
                    setSearchTerm(type === 'all' ? '' : searchTerm);
                  }}
                  className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                    filterType === type
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 transform scale-105'
                      : 'bg-white/50 hover:bg-white text-gray-700 hover:shadow-md hover:scale-105 border border-gray-200/50'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        </div>

        {/* Student Cards Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${filteredStudents.length === 0 ? 'justify-items-center' : ''}`}>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <div key={student.id} className="group bg-white/70 backdrop-blur-xl rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-white/50 overflow-hidden">
                {/* Profile Image */}
                <div className="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-500"></div>
                  <div className="absolute -bottom-12 left-6 w-24 h-24 bg-white rounded-full shadow-2xl border-4 border-white p-1">
                    <div className="w-full h-full rounded-full bg-gradient-to-r from-gray-300 to-gray-400"></div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-8 pt-16 relative -mt-16">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {student.name}
                  </h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332-.477-4.5-1.253" />
                        </svg>
                      </span>
                      <span>{student.course}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <span className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center mr-3">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </span>
                      <span>{student.subscription}</span>
                    </div>

                    <div className={`inline-flex px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor(student.paymentStatus)}`}>
                      {student.paymentStatus}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{student.email}</span>
                    <button className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl font-medium hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-24">
              <div className="w-24 h-24 bg-gray-100 rounded-3xl mx-auto mb-6 flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No students found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
