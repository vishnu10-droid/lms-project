import React from "react";
import { NavLink } from "react-router-dom";

const linkClass =
  "block px-4 py-2 rounded-lg font-medium hover:bg-blue-100 transition";

export default function SettingsSidebar() {
  return (
    <div className="w-64 bg-white shadow-md p-5 space-y-2">
      <h2 className="text-xl font-bold mb-4">Settings</h2>

      <NavLink
        to="/admin/settings/appearance"
        className={({ isActive }) =>
          isActive ? linkClass + " bg-blue-200" : linkClass
        }
      >
        Appearance
      </NavLink>

      <NavLink
        to="/admin/settings/general"
        className={({ isActive }) =>
          isActive ? linkClass + " bg-blue-200" : linkClass
        }
      >
        General
      </NavLink>

      <NavLink
        to="/admin/settings/admin-controls"
        className={({ isActive }) =>
          isActive ? linkClass + " bg-blue-200" : linkClass
        }
      >
        Admin Controls
      </NavLink>

      <NavLink
        to="/admin/settings/course-controls"
        className={({ isActive }) =>
          isActive ? linkClass + " bg-blue-200" : linkClass
        }
      >
        Course Controls
      </NavLink>

      <NavLink
        to="/admin/settings/notifications"
        className={({ isActive }) =>
          isActive ? linkClass + " bg-blue-200" : linkClass
        }
      >
        Notification Controls
      </NavLink>
    </div>
  );
}
