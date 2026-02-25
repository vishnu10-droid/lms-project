import { useState } from "react";
import { ShieldCheck, Plus, Search } from "lucide-react";

export default function Role() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Admin",
      description: "Admin all permissions",
      permissions: 27,
    },
    {
      id: 2,
      name: "Instructor",
      description: "Instructor teaching permissions",
      permissions: 12,
    },
    {
      id: 3,
      name: "Student",
      description: "Basic student access",
      permissions: 5,
    },
    {
      id: 4,
      name: "Employee",
      description: "Employee work related permissions",
      permissions: 9,
    },
  ]);

  const [search, setSearch] = useState("");

  const filteredRoles = roles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Franchise Roles</h1>
          <p className="text-slate-500">
            Create roles and assign permissions to employees
          </p>
        </div>

        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow">
          <Plus size={18} />
          Add Role
        </button>
      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search roles..."
            className="w-full pl-12 pr-4 py-3 border rounded-xl bg-white shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* ROLE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div
            key={role.id}
            className="bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            {/* Badge */}
            <div className="flex items-center gap-3 mb-3">
              <div className="p-3 bg-green-100 rounded-xl">
                <ShieldCheck className="text-green-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{role.name}</h2>
                <p className="text-sm text-slate-500">
                  {role.permissions} permissions
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-500 text-sm mb-4">{role.description}</p>

            {/* Buttons */}
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