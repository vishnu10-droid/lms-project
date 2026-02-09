import React, { useState } from "react";

export default function AdminStudents() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Amit Sharma",
      email: "amit@example.com",
      pic: "https://i.pravatar.cc/150?img=1",
      courses: ["Math", "Science"],
      subscribed: true,
      joinedDate: "2025-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya@example.com",
      pic: "https://i.pravatar.cc/150?img=2",
      courses: ["English", "History"],
      subscribed: false,
      joinedDate: "2025-02-10",
      status: "inactive",
    },
    {
      id: 3,
      name: "Rohit Singh",
      email: "rohit@example.com",
      pic: "https://i.pravatar.cc/150?img=3",
      courses: ["Physics"],
      subscribed: true,
      joinedDate: "2024-12-05",
      status: "active",
    },
    {
      id: 4,
      name: "Sana Khan",
      email: "sana@example.com",
      pic: "https://i.pravatar.cc/150?img=4",
      courses: ["Biology"],
      subscribed: false,
      joinedDate: "2025-01-20",
      status: "active",
    },
    {
      id: 5,
      name: "Vikas Yadav",
      email: "vikas@example.com",
      pic: "https://i.pravatar.cc/150?img=5",
      courses: ["Computer", "Math"],
      subscribed: true,
      joinedDate: "2024-11-30",
      status: "inactive",
    },
    {
      id: 6,
      name: "Neha Gupta",
      email: "neha@example.com",
      pic: "https://i.pravatar.cc/150?img=6",
      courses: ["Chemistry"],
      subscribed: false,
      joinedDate: "2025-02-01",
      status: "active",
    },
    {
      id: 7,
      name: "Ankit Mehra",
      email: "ankit@example.com",
      pic: "https://i.pravatar.cc/150?img=7",
      courses: ["AI", "Data Science"],
      subscribed: true,
      joinedDate: "2025-01-05",
      status: "active",
    },
    {
      id: 8,
      name: "Simran Kaur",
      email: "simran@example.com",
      pic: "https://i.pravatar.cc/150?img=8",
      courses: ["Python", "UI/UX"],
      subscribed: false,
      joinedDate: "2024-10-15",
      status: "inactive",
    },
    {
      id: 9,
      name: "Karthik Nair",
      email: "karthik@example.com",
      pic: "https://i.pravatar.cc/150?img=9",
      courses: ["React", "JavaScript"],
      subscribed: true,
      joinedDate: "2025-01-28",
      status: "active",
    },
    {
      id: 10,
      name: "Jasmin Ali",
      email: "jasmin@example.com",
      pic: "https://i.pravatar.cc/150?img=11",
      courses: ["Business"],
      subscribed: false,
      joinedDate: "2025-02-05",
      status: "active",
    },
    {
      id: 11,
      name: "Arun Kumar",
      email: "arun@example.com",
      pic: "https://i.pravatar.cc/150?img=12",
      courses: ["C++", "DSA"],
      subscribed: true,
      joinedDate: "2024-09-20",
      status: "active",
    },
    {
      id: 12,
      name: "Pooja Patel",
      email: "pooja@example.com",
      pic: "https://i.pravatar.cc/150?img=13",
      courses: ["Marketing"],
      subscribed: false,
      joinedDate: "2025-01-12",
      status: "inactive",
    },
    // ... (keeping same data)
  ]);

  const [search, setSearch] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterSubscription, setFilterSubscription] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [editingStudent, setEditingStudent] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);

  const filteredStudents = students.filter((student) => {
    const matchSearch =
      student.name.toLowerCase().includes(search.toLowerCase()) ||
      student.email.toLowerCase().includes(search.toLowerCase());
    const matchCourse =
      filterCourse === "all" ||
      student.courses.some((c) =>
        c.toLowerCase().includes(filterCourse.toLowerCase()),
      );
    const matchSub =
      filterSubscription === "all" ||
      (filterSubscription === "subscribed" && student.subscribed) ||
      (filterSubscription === "unsubscribed" && !student.subscribed);
    const matchStatus =
      filterStatus === "all" || student.status === filterStatus;
    return matchSearch && matchCourse && matchSub && matchStatus;
  });

  // Toggle selection
  const toggleSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const toggleAll = () => {
    if (selectedIds.length === filteredStudents.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredStudents.map((s) => s.id));
    }
  };

  // Bulk actions with selection
  const bulkSubscribe = () => {
    setStudents(
      students.map((student) =>
        selectedIds.includes(student.id)
          ? { ...student, subscribed: true }
          : student,
      ),
    );
    setSelectedIds([]);
  };

  const bulkDelete = () => {
    setStudents(
      students.map((student) =>
        selectedIds.includes(student.id)
          ? { ...student, status: "deleted" }
          : student,
      ),
    );
    setSelectedIds([]);
  };

  const toggleSubscription = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, subscribed: !student.subscribed }
          : student,
      ),
    );
  };

  const deleteStudent = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status: "deleted" } : student,
      ),
    );
  };

  const restoreStudent = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, status: "active" } : student,
      ),
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Students</h1>
        <div className="flex gap-2">
          <button
            onClick={bulkSubscribe}
            disabled={selectedIds.length === 0}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-1.5 rounded-md text-sm font-medium disabled:cursor-not-allowed"
          >
            Subscribe ({selectedIds.length})
          </button>
          <button
            onClick={bulkDelete}
            disabled={selectedIds.length === 0}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-4 py-1.5 rounded-md text-sm font-medium disabled:cursor-not-allowed"
          >
            Delete ({selectedIds.length})
          </button>
        </div>
      </div>

      {/* Compact Filters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6 p-4 bg-white rounded-xl shadow-sm border">
        <input
          className="border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500 focus:border-transparent"
          placeholder="Search name/email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-md p-2 text-sm"
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
        >
          <option>All Courses</option>
          <option>Math</option>
          <option>React</option>
          <option>Python</option>
          <option>AI</option>
        </select>
        <select
          className="border border-gray-300 rounded-md p-2 text-sm"
          value={filterSubscription}
          onChange={(e) => setFilterSubscription(e.target.value)}
        >
          <option>All Subs</option>
          <option>Subscribed</option>
          <option>Unsubscribed</option>
        </select>
        <select
          className="border border-gray-300 rounded-md p-2 text-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Deleted</option>
        </select>
      </div>

      {/* 🔥 COMPACT STUDENT CARDS */}
      <div className="space-y-3">
        {filteredStudents.map((student) => (
          <div
            key={student.id}
            className={`flex items-center p-4 rounded-lg border shadow-sm hover:shadow-md transition-all ${
              student.status === "deleted"
                ? "bg-gray-50 border-gray-200"
                : student.status === "inactive"
                  ? "bg-yellow-50 border-yellow-200"
                  : "bg-white border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={selectedIds.includes(student.id)}
              onChange={() => toggleSelection(student.id)}
              className="w-4 h-4 text-blue-600 rounded mr-3"
            />

            {/* Profile Pic */}
            <img
              src={student.pic}
              alt={student.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm mr-3 flex-shrink-0"
            />

            {/* Student Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-sm text-gray-900 truncate max-w-[140px]">
                  {student.name}
                </h3>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full whitespace-nowrap">
                  #{student.id.toString().padStart(3, "0")}
                </span>
              </div>

              {/* Email & Status */}
              <div className="flex items-center gap-3 text-xs mb-1">
                <span className="text-gray-600 truncate max-w-[180px] font-mono">
                  {student.email}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    student.subscribed
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {student.subscribed ? "SUB" : "NO"}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    student.status === "active"
                      ? "bg-green-100 text-green-800"
                      : student.status === "inactive"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {student.status.slice(0, 3).toUpperCase()}
                </span>
              </div>

              {/* Courses - Compact */}
              <div className="flex flex-wrap gap-1">
                {student.courses.slice(0, 2).map((course, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded-full"
                  >
                    {course}
                  </span>
                ))}
                {student.courses.length > 2 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                    +{student.courses.length - 2}
                  </span>
                )}
              </div>
            </div>

            {/* Actions - Compact */}
            <div className="flex items-center gap-1 ml-3 flex-shrink-0">
              <button
                onClick={() => toggleSubscription(student.id)}
                className={`px-3 py-1 rounded-md text-xs font-semibold text-white transition-all ${
                  student.subscribed
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {student.subscribed ? "UNSUB" : "SUB"}
              </button>

              <button
                onClick={() => setEditingStudent(student)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-semibold"
              >
                EDIT
              </button>

              {student.status === "deleted" ? (
                <button
                  onClick={() => restoreStudent(student.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-md text-xs font-semibold"
                >
                  RESTORE
                </button>
              ) : (
                <button
                  onClick={() => deleteStudent(student.id)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-xs font-semibold"
                >
                  DELETE
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-3">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-base font-medium text-gray-900 mb-1">
              No students found
            </h3>
            <p className="text-sm text-gray-500">Adjust filters or search</p>
          </div>
        )}
      </div>

      {/* Select All Header */}
      {filteredStudents.length > 0 && (
        <div className="mt-4 p-3 bg-blue-50 border rounded-lg text-sm text-blue-800">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={
                selectedIds.length === filteredStudents.length &&
                filteredStudents.length > 0
              }
              onChange={toggleAll}
              className="w-4 h-4 text-blue-600 rounded"
            />
            Select All ({selectedIds.length}/{filteredStudents.length})
          </label>
        </div>
      )}

      {/* Compact Edit Modal */}
      {editingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full max-h-[80vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-5">
              Edit #{editingStudent.id.toString().padStart(3, "0")}
            </h2>
            <div className="space-y-3 mb-5">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  defaultValue={editingStudent.name}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue={editingStudent.email}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  defaultValue={editingStudent.status}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-semibold"
                onClick={() => setEditingStudent(null)}
              >
                Save
              </button>
              <button
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md text-sm font-semibold"
                onClick={() => setEditingStudent(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
