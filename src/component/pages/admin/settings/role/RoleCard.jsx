import { useState } from "react";
import { ShieldCheck, Plus, Search } from "lucide-react";
import { PERMISSION_GROUPS } from "./PermissionGroups";

export default function RolesPage() {
  console.log("RolesPage Loaded"); // DEBUG ONLY

  const defaultRoles = [
    {
      id: 1,
      name: "Admin",
      description: "Admin has full access",
      permissions: Object.values(PERMISSION_GROUPS).flat(),
    },
    {
      id: 2,
      name: "Instructor",
      description: "Manages courses & exams",
      permissions: [
        "View Dashboard",
        "Create Exams",
        "Edit Exams",
        "Evaluate Assignments",
      ],
    },
    {
      id: 3,
      name: "Student",
      description: "Basic student access",
      permissions: ["View Dashboard", "View Courses"],
    },
    {
      id: 4,
      name: "Employee",
      description: "Operational permissions",
      permissions: ["View Dashboard", "View Reports"],
    },
  ];

  const [roles, setRoles] = useState(defaultRoles);
  const [search, setSearch] = useState("");

  const filtered = roles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Roles</h1>
          <p className="text-gray-500">Manage LMS access levels</p>
        </div>

        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow">
          <Plus size={18} /> Add Role
        </button>
      </div>

      {/* SEARCH */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="w-full pl-12 pr-4 py-3 border rounded-xl shadow-sm"
          placeholder="Search roles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* 4 CARDS IN SAME COMPONENT */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((role) => (
          <div
            key={role.id}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* ICON + TITLE */}
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <ShieldCheck className="text-green-600" />
              </div>

              <div>
                <h2 className="text-lg font-bold">{role.name}</h2>
                <p className="text-sm text-gray-500">
                  {role.permissions.length} permissions
                </p>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-500 text-sm mb-4">{role.description}</p>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 bg-green-100 text-green-700 rounded-xl hover:bg-green-200">
                Edit
              </button>

              <button className="flex-1 py-2.5 bg-rose-100 text-rose-600 rounded-xl hover:bg-rose-200">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}