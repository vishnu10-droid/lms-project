import React, { useState, useMemo } from "react";

// --- UPDATED DATA WITH COURSES ---
const INITIAL_STUDENTS = [
  { id: 1, name: "Amit Sharma", course: "Web Development", email: "amit@example.com", totalFee: 5000, paid: 5000, balance: 0, status: "Fully Paid" },
  { id: 2, name: "Priya Verma", course: "Data Science", email: "priya@example.com", totalFee: 5000, paid: 2000, balance: 3000, status: "Partial" },
  { id: 3, name: "Rohit Singh", course: "UI/UX Design", email: "rohit@example.com", totalFee: 4500, paid: 4500, balance: 0, status: "Fully Paid" },
  { id: 4, name: "Sana Khan", course: "Digital Marketing", email: "sana@example.com", totalFee: 6000, paid: 0, balance: 6000, status: "Unpaid" },
  { id: 5, name: "Vikas Yadav", course: "Cyber Security", email: "vikas@example.com", totalFee: 5000, paid: 5000, balance: 0, status: "Fully Paid" },
  { id: 6, name: "Neha Gupta", course: "Web Development", email: "neha@example.com", totalFee: 5500, paid: 2500, balance: 3000, status: "Partial" },
  { id: 7, name: "Ankit Mehra", course: "Data Science", email: "ankit@example.com", totalFee: 7000, paid: 7000, balance: 0, status: "Fully Paid" },
  { id: 8, name: "Simran Kaur", course: "UI/UX Design", email: "simran@example.com", totalFee: 4000, paid: 1000, balance: 3000, status: "Partial" },
  { id: 9, name: "Karthik Nair", course: "Digital Marketing", email: "karthik@example.com", totalFee: 5000, paid: 5000, balance: 0, status: "Fully Paid" },
  { id: 10, name: "Jasmin Ali", course: "Cyber Security", email: "jasmin@example.com", totalFee: 6500, paid: 0, balance: 6500, status: "Unpaid" },
  { id: 11, name: "Arun Kumar", course: "Web Development", email: "arun@example.com", totalFee: 8000, paid: 4000, balance: 4000, status: "Partial" },
  { id: 12, name: "Pooja Patel", course: "Data Science", email: "pooja@example.com", totalFee: 5000, paid: 5000, balance: 0, status: "Fully Paid" },
  { id: 13, name: "Rahul Mishra", course: "UI/UX Design", email: "rahul@example.com", totalFee: 7500, paid: 7500, balance: 0, status: "Fully Paid" },
  { id: 14, name: "Divya Sharma", course: "Digital Marketing", email: "divya@example.com", totalFee: 5500, paid: 1000, balance: 4500, status: "Partial" },
  { id: 15, name: "Kunal Roy", course: "Cyber Security", email: "kunal@example.com", totalFee: 9000, paid: 0, balance: 9000, status: "Unpaid" },
  { id: 16, name: "Ishaan Dev", course: "Web Development", email: "ishaan@example.com", totalFee: 5000, paid: 5000, balance: 0, status: "Fully Paid" },
  { id: 17, name: "Meera Joshi", course: "Data Science", email: "meera@example.com", totalFee: 4800, paid: 2400, balance: 2400, status: "Partial" },
  { id: 18, name: "Siddharth Rao", course: "UI/UX Design", email: "sid@example.com", totalFee: 6200, paid: 0, balance: 6200, status: "Unpaid" },
  { id: 19, name: "Tanya Bajaj", course: "Digital Marketing", email: "tanya@example.com", totalFee: 5500, paid: 5500, balance: 0, status: "Fully Paid" },
  { id: 20, name: "Yash Chopra", course: "Cyber Security", email: "yash@example.com", totalFee: 7200, paid: 3600, balance: 3600, status: "Partial" },
];

// --- HELPER: COURSE STYLE ---
const getCourseStyle = (course) => {
  const map = {
    "Web Development": "bg-blue-100 text-blue-700",
    "Data Science": "bg-purple-100 text-purple-700",
    "UI/UX Design": "bg-pink-100 text-pink-700",
    "Digital Marketing": "bg-orange-100 text-orange-700",
    "Cyber Security": "bg-slate-100 text-slate-700",
  };
  return map[course] || "bg-gray-100 text-gray-700";
};

export default function StudentPayments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");

  // Filter Logic: Now filters by Name OR Course
  const filteredData = useMemo(() => {
    return INITIAL_STUDENTS.filter(s => {
      const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCourse = filterCourse === "all" || s.course === filterCourse;
      return matchesSearch && matchesCourse;
    });
  }, [searchTerm, filterCourse]);

  // Unique Courses for the dropdown
  const courseList = ["Web Development", "Data Science", "UI/UX Design", "Digital Marketing", "Cyber Security"];

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      
      {/* Dashboard Summary Header */}
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-4xl font-black text-gray-900 tracking-tight">Financial Ledger</h1>
        <p className="text-gray-500 mt-2">Managing payments across {courseList.length} different programs</p>
      </div>

      {/* Filter Controls */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input 
            type="text" 
            placeholder="Search student name..." 
            className="w-full bg-gray-50 border-none rounded-2xl pl-10 pr-4 py-4 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select 
          className="bg-gray-50 border-none rounded-2xl px-6 py-4 outline-none cursor-pointer font-bold text-gray-600 appearance-none min-w-[200px]"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        >
          <option value="all">All Courses</option>
          {courseList.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Student List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredData.map((student) => (
          <div key={student.id} className="bg-white p-5 rounded-3xl border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-6 hover:shadow-xl hover:scale-[1.01] transition-all">
            
            {/* Left: Info */}
            <div className="flex items-center gap-5 w-full lg:w-1/3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-100">
                {student.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h4 className="font-black text-gray-900 truncate">{student.name}</h4>
                <div className={`inline-block px-3 py-1 rounded-lg text-[10px] font-bold mt-1 uppercase ${getCourseStyle(student.course)}`}>
                  {student.course}
                </div>
              </div>
            </div>

            {/* Middle: Money */}
            <div className="flex flex-1 justify-around w-full items-center text-center px-4">
              <div>
                <p className="text-[10px] uppercase font-black text-gray-400 mb-1">Total Due</p>
                <p className="font-bold text-gray-900 text-lg">₹{student.totalFee.toLocaleString()}</p>
              </div>
              <div className="h-8 w-[1px] bg-gray-100 hidden sm:block" />
              <div>
                <p className="text-[10px] uppercase font-black text-gray-400 mb-1">Paid</p>
                <p className="font-bold text-emerald-500 text-lg">₹{student.paid.toLocaleString()}</p>
              </div>
              <div className="h-8 w-[1px] bg-gray-100 hidden sm:block" />
              <div>
                <p className="text-[10px] uppercase font-black text-gray-400 mb-1">Balance</p>
                <p className={`font-bold text-lg ${student.balance > 0 ? 'text-rose-500' : 'text-gray-300'}`}>
                  ₹{student.balance.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Right: Status & Actions */}
            <div className="flex items-center gap-4 w-full lg:w-auto justify-end">
              <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                student.status === "Fully Paid" ? "bg-green-100 text-green-600" :
                student.status === "Partial" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"
              }`}>
                {student.status}
              </span>
              <button className="p-3 bg-gray-900 text-white rounded-xl hover:bg-gray-700 transition-colors shadow-md">
                📄
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-32">
          <div className="text-6xl mb-4 text-gray-200">📂</div>
          <h3 className="text-xl font-bold text-gray-400">No students found in this course.</h3>
        </div>
      )}

    </div>
  );
}