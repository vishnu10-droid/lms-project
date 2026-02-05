import React, { useState } from "react";
import { Plus, Edit, Trash2, Search, X } from "lucide-react";

export default function Courses() {
  // -----------------------
  // State
  // -----------------------
  const [courses, setCourses] = useState([
    { id: 1, title: "React Basics", instructor: "John Doe", price: 49, status: "Published" },
    { id: 2, title: "Node.js Mastery", instructor: "Alex Smith", price: 59, status: "Draft" },
  ]);

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [form, setForm] = useState({
    title: "",
    instructor: "",
    price: "",
    status: "Draft",
  });

  // -----------------------
  // Functions
  // -----------------------
  const openAddModal = () => {
    setEditingCourse(null);
    setForm({ title: "", instructor: "", price: "", status: "Draft" });
    setShowModal(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setForm(course);
    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveCourse = () => {
    if (editingCourse) {
      setCourses(
        courses.map((c) =>
          c.id === editingCourse.id ? { ...editingCourse, ...form } : c
        )
      );
    } else {
      setCourses([...courses, { id: Date.now(), ...form }]);
    }
    setShowModal(false);
  };

  const deleteCourse = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  const filteredCourses = courses.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  // -----------------------
  // UI
  // -----------------------
  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses Management</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={18} /> Add Course
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-3 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 pr-3 py-2 border rounded-lg w-full"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Instructor</th>
              <th className="p-3 text-left">Price ($)</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCourses.map((course) => (
              <tr key={course.id} className="border-t">
                <td className="p-3">{course.title}</td>
                <td className="p-3">{course.instructor}</td>
                <td className="p-3">{course.price}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      course.status === "Published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {course.status}
                  </span>
                </td>

                <td className="p-3 flex justify-center gap-3">
                  <button
                    onClick={() => openEditModal(course)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={18} />
                  </button>

                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

            {filteredCourses.length === 0 && (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editingCourse ? "Edit Course" : "Add Course"}
              </h2>
              <button onClick={() => setShowModal(false)}>
                <X />
              </button>
            </div>

            <div className="space-y-4">
              <input
                name="title"
                placeholder="Course Title"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                name="instructor"
                placeholder="Instructor Name"
                value={form.instructor}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <input
                type="number"
                name="price"
                placeholder="Price"
                value={form.price}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>

              <button
                onClick={saveCourse}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Save Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
