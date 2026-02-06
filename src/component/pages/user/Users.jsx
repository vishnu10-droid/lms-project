import React, { useState } from "react";
import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2
} from "lucide-react";

/* ---------------- Dummy Users Data ---------------- */

const USERS = [
  {
    id: 1,
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    role: "student",
    status: "active"
  },
  {
    id: 2,
    name: "Anjali Sharma",
    email: "anjali@gmail.com",
    role: "instructor",
    status: "active"
  },
  {
    id: 3,
    name: "Admin User",
    email: "admin@gmail.com",
    role: "admin",
    status: "blocked"
  }
];

/* ---------------- Component ---------------- */

export default function Users() {

  const [users, setUsers] = useState(USERS);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  /* FILTER LOGIC */
  const filteredUsers = users.filter(user => {
    const matchSearch =
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());

    const matchRole =
      roleFilter === "all" || user.role === roleFilter;

    return matchSearch && matchRole;
  });

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id));
  };

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>

        <button className="bg-indigo-600 px-4 py-2 rounded-lg flex items-center gap-2">
          <Plus size={18} /> Add User
        </button>
      </div>

      {/* SEARCH & FILTER */}
      <div className="flex gap-4 mb-5">

        <div className="flex items-center bg-slate-800 rounded-lg px-3 w-72">
          <Search size={16} />
          <input
            placeholder="Search user..."
            className="bg-transparent outline-none p-2 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="bg-slate-800 p-2 rounded-lg"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>

      </div>

      {/* USERS TABLE */}
      <div className="bg-slate-800 rounded-xl overflow-hidden">

        <table className="w-full text-sm">
          <thead className="bg-slate-700 text-gray-300">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map(user => (
              <tr
                key={user.id}
                className="border-t border-slate-700 hover:bg-slate-700/40"
              >
                <td className="p-3">{user.name}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs
                    ${user.status === "active"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"}`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="flex gap-2 py-2">

                  <button className="p-1 hover:text-indigo-400">
                    <Eye size={16} />
                  </button>

                  <button className="p-1 hover:text-yellow-400">
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="p-1 hover:text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>

                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}
