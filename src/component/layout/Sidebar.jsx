import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  BarChart2,
  FileText,
  Users,
  Clipboard,
  Settings,
  LogOut,
  BookOpen,
  GraduationCap,
  Megaphone,
  Award,
  LifeBuoy,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menuName) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  return (
    <aside className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      
      {/* Header */}
      <div className="text-2xl font-bold p-4 bg-indigo-600">Admin Panel</div>

      <nav className="flex-1 p-3 space-y-1">

        {/* Dashboard */}
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded 
            ${isActive ? "bg-white text-gray-900 font-semibold" : "text-white"}
            hover:bg-white hover:text-gray-900`
          }
        >
          <Home size={20} />
          Dashboard
        </NavLink>

        {/* Reports */}
        <NavLink
          to="/admin/reports"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded 
            ${isActive ? "bg-white text-gray-900 font-semibold" : "text-white"}
            hover:bg-white hover:text-gray-900`
          }
        >
          <BarChart2 size={20} />
          Reports
        </NavLink>

        {/* ========================= */}
        {/* DROPDOWN: COURSES */}
        {/* ========================= */}
        <div>
          <button
            onClick={() => toggleDropdown("courses")}
            className="flex items-center justify-between w-full p-3 rounded hover:bg-white hover:text-gray-900 transition"
          >
            <span className="flex items-center gap-3">
              <BookOpen size={20} />
              Courses
            </span>
            {openDropdown === "courses" ? <ChevronDown /> : <ChevronRight />}
          </button>

          {openDropdown === "courses" && (
            <div className="ml-8 mt-1 space-y-1 text-sm animate-fadeIn">
              <NavLink to="/admin/courses/all" className="block hover:text-indigo-300">All Courses</NavLink>
              <NavLink to="/admin/courses/add" className="block hover:text-indigo-300">Add New Course</NavLink>
              <NavLink to="/admin/categories" className="block hover:text-indigo-300">Course Categories</NavLink>
              <NavLink to="/admin/modules" className="block hover:text-indigo-300">Modules & Lessons</NavLink>
            </div>
          )}
        </div>

        {/* ========================= */}
        {/* DROPDOWN: STUDENTS */}
        {/* ========================= */}
        <div>
          <button
            onClick={() => toggleDropdown("students")}
            className="flex items-center justify-between w-full p-3 rounded hover:bg-white hover:text-gray-900 transition"
          >
            <span className="flex items-center gap-3">
              <Users size={20} />
              Students
            </span>
            {openDropdown === "students" ? <ChevronDown /> : <ChevronRight />}
          </button>

          {openDropdown === "students" && (
            <div className="ml-8 mt-1 space-y-1 text-sm">
              <NavLink to="/admin/students/list" className="block hover:text-indigo-300">Student List</NavLink>
              <NavLink to="/admin/students/enrollments" className="block hover:text-indigo-300">Enrollments</NavLink>
              <NavLink to="/admin/students/progress" className="block hover:text-indigo-300">Progress Tracking</NavLink>
              <NavLink to="/admin/students/attendance" className="block hover:text-indigo-300">Attendance</NavLink>
            </div>
          )}
        </div>

        {/* Exams */}
        <NavLink
          to="/admin/exams"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded 
            ${isActive ? "bg-white text-gray-900 font-semibold" : "text-white"}
            hover:bg-white hover:text-gray-900`
          }
        >
          <FileText size={20} />
          Exams
        </NavLink>

        {/* Certificates */}
        <NavLink
          to="/admin/certificates"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded 
            ${isActive ? "bg-white text-gray-900 font-semibold" : "text-white"}
            hover:bg-white hover:text-gray-900`
          }
        >
          <Award size={20} />
          Certificates
        </NavLink>

        {/* Announcements */}
        <NavLink
          to="/admin/announcements"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded 
            ${isActive ? "bg-white text-gray-900 font-semibold" : "text-white"}
            hover:bg-white hover:text-gray-900`
          }
        >
          <Megaphone size={20} />
          Announcements
        </NavLink>

        {/* Support */}
        <NavLink
          to="/admin/support"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded 
            ${isActive ? "bg-white text-gray-900 font-semibold" : "text-white"}
            hover:bg-white hover:text-gray-900`
          }
        >
          <LifeBuoy size={20} />
          Support Tickets
        </NavLink>

        {/* Settings */}
        <div>
          <button
            onClick={() => toggleDropdown("settings")}
            className="flex items-center justify-between w-full p-3 rounded hover:bg-white hover:text-gray-900 transition"
          >
            <span className="flex items-center gap-3">
              <Settings size={20} />
              Settings
            </span>
            {openDropdown === "settings" ? <ChevronDown /> : <ChevronRight />}
          </button>

          {openDropdown === "settings" && (
            <div className="ml-8 mt-1 space-y-1 text-sm">
              <NavLink to="/admin/profile" className="block hover:text-indigo-300">Profile Settings</NavLink>
              <NavLink to="/admin/roles" className="block hover:text-indigo-300">Roles & Permissions</NavLink>
              <NavLink to="/admin/system" className="block hover:text-indigo-300">System Settings</NavLink>
            </div>
          )}
        </div>

      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-gray-700">
        <button className="flex items-center gap-3 w-full p-3 rounded hover:bg-white hover:text-red-600 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
};

export default Sidebar;
