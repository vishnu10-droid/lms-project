import React, { useState } from "react";
<<<<<<< HEAD
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
=======
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/fevicon.png";

import {
  Home,
  BookOpen,
  Layers,
  PlusCircle,
  Users,
  UserCheck,
  Calendar,
  BarChart3,
  Bell,
  Settings,
  ChevronDown,
  IdCard,
  CreditCard,
  User,
  Phone,
} from "lucide-react";

/* ---------------- COLORS ---------------- */

const COLORS = {
  dashboard: {
    hover: "hover:bg-blue-100",
    active: "bg-blue-500",
    text: "text-blue-600",
  },
  courses: {
    hover: "hover:bg-green-100",
    active: "bg-green-500",
    text: "text-green-600",
  },
  students: {
    hover: "hover:bg-cyan-100",
    active: "bg-cyan-500",
    text: "text-cyan-600",
  },
  instructors: {
    hover: "hover:bg-purple-100",
    active: "bg-purple-500",
    text: "text-purple-600",
  },
  schedule: {
    hover: "hover:bg-orange-100",
    active: "bg-orange-500",
    text: "text-orange-600",
  },
  notifications: {
    hover: "hover:bg-red-100",
    active: "bg-red-500",
    text: "text-red-600",
  },
  reports: {
    hover: "hover:bg-pink-100",
    active: "bg-pink-500",
    text: "text-pink-600",
  },
  settings: {
    hover: "hover:bg-gray-100",
    active: "bg-gray-500",
    text: "text-gray-600",
  },
};

/* ---------------- MENU ---------------- */

const menu = [
  {
    title: "Dashboard",
    icon: Home,
    path: "/",
    ...COLORS.dashboard,
  },

  {
    title: "Courses",
    icon: BookOpen,
    ...COLORS.courses,
    submenu: [
      {
        title: "All Courses",
        icon: BookOpen,
        path: "/admin/courses",
        hover: "hover:bg-emerald-100",
        active: "bg-emerald-500",
        text: "text-emerald-600",
      },
      {
        title: "Add Course",
        icon: PlusCircle,
        path: "/admin/courses/add",
        hover: "hover:bg-teal-100",
        active: "bg-teal-500",
        text: "text-teal-600",
      },
      {
        title: "Categories",
        icon: Layers,
        path: "/admin/categories",
        hover: "hover:bg-lime-100",
        active: "bg-lime-500",
        text: "text-lime-600",
      },
    ],
  },

  {
    title: "Students",
    icon: Users,
    ...COLORS.students,
    submenu: [
      {
        title: "Student ID",
        icon: IdCard,
        path: "/admin/students/id",
        hover: "hover:bg-sky-100",
        active: "bg-sky-500",
        text: "text-sky-600",
      },
      {
        title: "Student Payments",
        icon: CreditCard,
        path: "/admin/students/payments",
        hover: "hover:bg-amber-100",
        active: "bg-amber-500",
        text: "text-amber-600",
      },
    ],
  },

  {
    title: "Instructors",
    icon: UserCheck,
    ...COLORS.instructors,
    submenu: [
      {
        title: "Instructor List",
        icon: Users,
        path: "/admin/instructors",
        hover: "hover:bg-purple-100",
        active: "bg-purple-500",
        text: "text-purple-600",
      },
      {
        title: "View Profile",
        icon: User,
        path: "/admin/instructors/profile",
        hover: "hover:bg-fuchsia-100",
        active: "bg-fuchsia-500",
        text: "text-fuchsia-600",
      },
    ],
  },

  {
    title: "Schedule",
    icon: Calendar,
    path: "/admin/schedule",
    ...COLORS.schedule,
  },

  {
    title: "Notifications",
    icon: Bell,
    path: "/admin/notifications",
    ...COLORS.notifications,
  },

  {
    title: "Reports",
    icon: BarChart3,
    path: "/admin/reports",
    ...COLORS.reports,
  },
   {
    title: "Payment",
    icon: Phone,
    path: "/admin/payment",
    ...COLORS.dashboard,
  },


  {
    title: "Settings",
    icon: Settings,
    path: "/admin/settings",
    ...COLORS.settings,
  },
];

/* ---------------- COMPONENT ---------------- */

export default function Sidebar() {
  const [openCourses, setOpenCourses] = useState(false);
  const [openStudents, setOpenStudents] = useState(false);
  const [openInstructors, setOpenInstructors] = useState(false);

  const location = useLocation();

  return (
    <aside className="w-72 h-screen bg-white border-r px-5 py-6 flex flex-col">
      {/* LOGO */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl overflow-hidden shadow">
          <img
            src={logo}
            alt="AI Scholar"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">AI Scholar</h2>
          <p className="text-sm text-gray-500">Admin Portal</p>
        </div>
      </div>

      {/* MENU (SCROLL ENABLED) */}
      <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
        {menu.map((item, i) => {
          const isSubActive =
            item.submenu &&
            item.submenu.some((sub) => location.pathname === sub.path);

          return (
            <div key={i}>
              {/* NORMAL ITEM */}
              {!item.submenu && (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-xl transition
                    ${
                      isActive
                        ? `${item.active} text-white shadow`
                        : `text-gray-700 ${item.hover}`
                    }`
                  }
                >
                  <div
                    className={`w-10 h-10 flex items-center justify-center rounded-lg
                    ${location.pathname === item.path ? "bg-white/20 text-white" : item.text}`}
                  >
                    <item.icon size={20} />
                  </div>
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              )}

              {/* COURSES DROPDOWN */}
              {item.submenu && (
                <>
                  <button
                    onClick={() => {
                      if (item.title === "Courses")
                        setOpenCourses(!openCourses);
                      if (item.title === "Students")
                        setOpenStudents(!openStudents);
                      if (item.title === "Instructors")
                        setOpenInstructors(!openInstructors);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition
                   ${
                     isSubActive
                       ? `${item.active} text-white shadow`
                       : `text-gray-700 ${item.hover}`
                   }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-lg
                       ${isSubActive ? "bg-white/20 text-white" : item.text}`}
                      >
                        <item.icon size={20} />
                      </div>
                      <span className="font-medium">{item.title}</span>
                    </div>

                    <ChevronDown
                      className={`transition ${
                        (item.title === "Courses" && openCourses) ||
                        (item.title === "Students" && openStudents) ||
                        (item.title === "Instructors" && openInstructors)
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>

                  {((item.title === "Courses" && openCourses) ||
                    (item.title === "Students" && openStudents) ||
                    (item.title === "Instructors" && openInstructors)) && (
                    <div className="ml-12 mt-2 space-y-2">
                      {item.submenu.map((sub, j) => (
                        <NavLink
                          key={j}
                          to={sub.path}
                          className={({ isActive }) =>
                            `flex items-center gap-3 px-3 py-2 rounded-lg transition
                            ${
                              isActive
                                ? `${sub.active} text-white shadow`
                                : `text-gray-700 ${sub.hover}`
                            }`
                          }
                        >
                          <div
                            className={`w-9 h-9 flex items-center justify-center rounded-md
                            ${location.pathname === sub.path ? "bg-white/20 text-white" : sub.text}`}
                          >
                            <sub.icon size={16} />
                          </div>
                          <span className="text-sm">{sub.title}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              )}
>>>>>>> 6451aab61f22b390a8b44176185283f178cc5939
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
<<<<<<< HEAD

      {/* Logout */}
      <div className="p-3 border-t border-gray-700">
        <button className="flex items-center gap-3 w-full p-3 rounded hover:bg-white hover:text-red-600 transition">
          <LogOut size={20} />
          Logout
        </button>
      </div>

=======
>>>>>>> 6451aab61f22b390a8b44176185283f178cc5939
    </aside>
  );
};

export default Sidebar;
