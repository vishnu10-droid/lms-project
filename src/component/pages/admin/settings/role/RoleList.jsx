import { useState } from "react";
import { Plus, Search } from "lucide-react";
import RoleCard from "./RoleCard";

export default function RoleList({ roles, setRoles, onAdd, onEdit }) {
  const [search, setSearch] = useState("");

  const filtered = roles.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const deleteRole = (id) => {
    setRoles(roles.filter((r) => r.id !== id));
  };

  return (
    <div className="p-6">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Roles</h1>
          <p className="text-gray-500">Manage LMS access roles</p>
        </div>

        <button
          onClick={onAdd}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow"
        >
          <Plus size={18} />
          Add Role
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

      {/* ROLE CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((role) => (
          <RoleCard
            key={role.id}
            role={role}
            onEdit={() => onEdit(role)}
            onDelete={deleteRole}
          />
        ))}
      </div>

    </div>
  );
}