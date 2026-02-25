import { useState } from "react";
import { ChevronLeft, Minus } from "lucide-react";
import { PERMISSION_GROUPS } from "./PermissionGroups";

export default function AddRole({ onBack, onCreate }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    permissions: [],
    active: true,
  });

  // Toggle Single Permission
  const togglePermission = (perm) => {
    setForm((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(perm)
        ? prev.permissions.filter((p) => p !== perm)
        : [...prev.permissions, perm],
    }));
  };

  // Toggle Complete Group
  const toggleGroup = (group) => {
    const items = PERMISSION_GROUPS[group];
    const hasAll = items.every((i) => form.permissions.includes(i));

    setForm((prev) => ({
      ...prev,
      permissions: hasAll
        ? prev.permissions.filter((p) => !items.includes(p))
        : [...prev.permissions, ...items],
    }));
  };

  // Toggle ALL Permissions
  const toggleAll = () => {
    const allPermissions = Object.values(PERMISSION_GROUPS).flat();
    const hasAll = allPermissions.every((p) =>
      form.permissions.includes(p)
    );

    setForm({
      ...form,
      permissions: hasAll ? [] : allPermissions,
    });
  };

  // Submit
  const handleCreate = () => {
    if (!form.name.trim()) {
      alert("Role name is required");
      return;
    }
    onCreate(form); // Send to RolesPage.jsx
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200"
        >
          <ChevronLeft />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Add New Role</h1>
          <p className="text-gray-600">Create a new role with permissions</p>
        </div>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">

        {/* ROLE NAME */}
        <div className="mb-5">
          <label className="font-semibold">Role Name *</label>
          <input
            type="text"
            placeholder="Enter role name..."
            className="w-full mt-2 px-4 py-3 border rounded-xl bg-gray-50"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* DESCRIPTION */}
        <div className="mb-5">
          <label className="font-semibold">Description</label>
          <textarea
            placeholder="Write description..."
            className="w-full mt-2 px-4 py-3 border rounded-xl bg-gray-50"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* ACTIVE */}
        <div className="mb-6 flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.active}
            onChange={() =>
              setForm({ ...form, active: !form.active })
            }
          />
          <span className="font-semibold">Active</span>
        </div>

        {/* PERMISSIONS */}
        <h2 className="font-bold mb-3">Permissions</h2>

        {/* Select All Permissions */}
        <div
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg cursor-pointer"
          onClick={toggleAll}
        >
          <Minus className="w-4 h-4" />
          <span>Select All Permissions</span>
        </div>

        {/* GROUPS */}
        <div className="mt-5 space-y-6">
          {Object.keys(PERMISSION_GROUPS).map((group) => (
            <div key={group}>

              {/* GROUP HEADER */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => toggleGroup(group)}
              >
                <input
                  type="checkbox"
                  readOnly
                  checked={PERMISSION_GROUPS[group].every((perm) =>
                    form.permissions.includes(perm)
                  )}
                />
                <h3 className="font-semibold">{group}</h3>
              </div>

              {/* GROUP PERMISSIONS */}
              <div className="ml-7 mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                {PERMISSION_GROUPS[group].map((perm) => (
                  <label
                    key={perm}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      checked={form.permissions.includes(perm)}
                      onChange={() => togglePermission(perm)}
                    />
                    {perm}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleCreate}
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
          >
            Create Role
          </button>

          <button
            onClick={onBack}
            className="px-6 py-3 bg-gray-200 rounded-xl hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}