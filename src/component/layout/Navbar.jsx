import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  Bell,
  Mail,
  ChevronDown,
  User,
  LogOut,
  Settings,
} from "lucide-react";

export default function Navbar({ title = "Dashboard" }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div
      className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 
                 px-6 py-4 flex items-center justify-between sticky top-0 z-40"
    >
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
          {title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your e-learning platform easily
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="relative hidden md:block">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search courses, students, instructors..."
            className="w-72 pl-11 pr-4 py-2.5 rounded-full border border-gray-300 dark:border-gray-700
                       bg-gray-50 dark:bg-gray-800 dark:text-gray-100 text-sm focus:bg-white dark:focus:bg-gray-800 focus:outline-none 
                       focus:ring-2 focus:ring-indigo-500 shadow-sm transition"
          />
        </div>

        {/* Notifications */}
        <NavLink
          to="/admin/notifications"
          className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Bell className="text-gray-600 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white 
                           text-[10px] px-1.5 rounded-full">
            3
          </span>
        </NavLink>

        {/* Messages */}
        <NavLink
          to="/admin/notifications"
          className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        >
          <Mail className="text-gray-600 dark:text-gray-300" />
          <span className="absolute -top-1 -right-1 bg-blue-500 text-white 
                           text-[10px] px-1.5 rounded-full">
            5
          </span>
        </NavLink>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-9 h-9 rounded-full ring-2 ring-indigo-500"
            />
            <ChevronDown size={18} className="text-gray-700 dark:text-gray-300" />
          </button>

          {open && (
            <div
              className="absolute right-0 mt-3 w-52 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800
                         rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                <p className="font-semibold text-gray-900 dark:text-gray-100">Admin User</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">admin@email.com</p>
              </div>

              <NavLink
                to="/admin/profile"
                className="flex items-center gap-2 px-4 py-2.5 
                           hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-gray-700 dark:text-gray-200"
              >
                <User size={16} /> Profile
              </NavLink>

              <NavLink
                to="/admin/settings"
                className="flex items-center gap-2 px-4 py-2.5 
                           hover:bg-gray-100 dark:hover:bg-gray-800 w-full text-gray-700 dark:text-gray-200"
              >
                <Settings size={16} /> Settings
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 
                           text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
