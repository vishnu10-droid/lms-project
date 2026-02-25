import { useState } from "react";
import { ChevronLeft, Minus } from "lucide-react";
import { PERMISSION_GROUPS } from "./PermissionGroups";

export default function EditRole({ role, onBack, onUpdate }) {
  const [form, setForm] = useState({
    ...role,
    permissions: [...role.permissions],
  });

  const togglePermission = (perm) => {
    setForm({
      ...form,
      permissions: form.permissions.includes(perm)
        ? form.permissions.filter((p) => p !== perm)
        : [...form.permissions, perm],
    });
  };

  const toggleGroup = (group) => {
    const items = PERMISSION_GROUPS[group];
    const hasAll = items.every((i) => form.permissions.includes(i));

    setForm({
      ...form,
      permissions: hasAll
        ? form.permissions.filter((p) => !items.includes(p))
        : [...form.permissions, ...items],
    });
  };

  const toggleAll = () => {
    const all = Object.values(PERMISSION_GROUPS).flat();
    const hasAll = all.every((p) => form.permissions.includes(p));

    setForm({ ...form, permissions: hasAll ? [] : all });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="p-2 bg-gray-100 rounded-xl"
        >
          <ChevronLeft />
        </button>
        <div>
          <h1 className="text-3xl font-bold">Edit Role</h1>
          <p className="text-gray-500">{role.name}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border shadow">

        {/* Name */}
        <div className="mb-4">
          <label className="font-bold">Role Name *</label>
          <input
            className="w-full border p-3 rounded-xl mt-2"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="font-bold">Description</label>
          <textarea
            className="w-full border p-3 rounded-xl mt-2"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />
        </div>

        {/* Permissions */}
        <h3 className="font-bold mt-6 mb-3">Permissions</h3>

        <div
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg cursor-pointer"
          onClick={toggleAll}
        >
          <Minus /> Select All Permissions
        </div>

        {Object.keys(PERMISSION_GROUPS).map((group) => (
          <div key={group} className="mt-6">
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
              <span className="font-bold">{group}</span>
            </div>

            <div className="ml-7 mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              {PERMISSION_GROUPS[group].map((perm) => (
                <label key={perm} className="flex items-center gap-2">
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

        {/* BUTTONS */}
        <div className="flex gap-3 mt-8">
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-xl"
            onClick={() => onUpdate(form)}
          >
            Update Role
          </button>

          <button
            className="px-6 py-3 bg-gray-300 rounded-xl"
            onClick={onBack}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}