import React, { useState } from "react";
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
    <aside className="w-64 h-screen bg-white border-r px-4 py-5 flex flex-col">
      {/* LOGO */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-10 h-10 rounded-lg overflow-hidden shadow">
          <img
            src={logo}
            alt="AI Scholar"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">AI Scholar</h2>
          <p className="text-xs text-gray-500">Admin Portal</p>
        </div>
      </div>

      {/* MENU */}
      <nav className="flex-1 space-y-1 overflow-y-auto pr-1">
        {menu.map((item, i) => {
          const isSubActive =
            item.submenu &&
            item.submenu.some((sub) => location.pathname === sub.path);

          return (
            <div key={i}>
              {!item.submenu && (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg transition
                    ${
                      isActive
                        ? `${item.active} text-white shadow`
                        : `text-gray-700 ${item.hover}`
                    }`
                  }
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-md
                    ${
                      location.pathname === item.path
                        ? "bg-white/20 text-white"
                        : item.text
                    }`}
                  >
                    <item.icon size={18} />
                  </div>
                  <span className="text-sm font-medium">
                    {item.title}
                  </span>
                </NavLink>
              )}

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
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition
                    ${
                      isSubActive
                        ? `${item.active} text-white shadow`
                        : `text-gray-700 ${item.hover}`
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-md
                        ${
                          isSubActive
                            ? "bg-white/20 text-white"
                            : item.text
                        }`}
                      >
                        <item.icon size={18} />
                      </div>
                      <span className="text-sm font-medium">
                        {item.title}
                      </span>
                    </div>

                    <ChevronDown
                      size={16}
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
                    <div className="ml-10 mt-1 space-y-1">
                      {item.submenu.map((sub, j) => (
                        <NavLink
                          key={j}
                          to={sub.path}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-2 py-2 rounded-md transition
                            ${
                              isActive
                                ? `${sub.active} text-white shadow`
                                : `text-gray-700 ${sub.hover}`
                            }`
                          }
                        >
                          <div
                            className={`w-7 h-7 flex items-center justify-center rounded
                            ${
                              location.pathname === sub.path
                                ? "bg-white/20 text-white"
                                : sub.text
                            }`}
                          >
                            <sub.icon size={14} />
                          </div>
                          <span className="text-xs">
                            {sub.title}
                          </span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}