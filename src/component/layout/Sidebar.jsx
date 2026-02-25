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
  ShieldCheck,
  HelpCircle,
} from "lucide-react";

/* ---------------- COLORS ---------------- */

const COLORS = {
  dashboard: {
    hover: "hover:bg-blue-100 dark:hover:bg-blue-500/20",
    active: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-300",
  },
  courses: {
    hover: "hover:bg-green-100 dark:hover:bg-green-500/20",
    active: "bg-green-500",
    text: "text-green-600 dark:text-green-300",
  },
  students: {
    hover: "hover:bg-cyan-100 dark:hover:bg-cyan-500/20",
    active: "bg-cyan-500",
    text: "text-cyan-600 dark:text-cyan-300",
  },
  instructors: {
    hover: "hover:bg-purple-100 dark:hover:bg-purple-500/20",
    active: "bg-purple-500",
    text: "text-purple-600 dark:text-purple-300",
  },
  schedule: {
    hover: "hover:bg-orange-100 dark:hover:bg-orange-500/20",
    active: "bg-orange-500",
    text: "text-orange-600 dark:text-orange-300",
  },
  notifications: {
    hover: "hover:bg-red-100 dark:hover:bg-red-500/20",
    active: "bg-red-500",
    text: "text-red-600 dark:text-red-300",
  },
  reports: {
    hover: "hover:bg-pink-100 dark:hover:bg-pink-500/20",
    active: "bg-pink-500",
    text: "text-pink-600 dark:text-pink-300",
  },
  settings: {
    hover: "hover:bg-gray-100 dark:hover:bg-gray-700/60",
    active: "bg-gray-500",
    text: "text-gray-600 dark:text-gray-300",
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
        hover: "hover:bg-emerald-100 dark:hover:bg-emerald-500/20",
        active: "bg-emerald-500",
        text: "text-emerald-600 dark:text-emerald-300",
      },
      {
        title: "Add Course",
        icon: PlusCircle,
        path: "/admin/courses/add",
        hover: "hover:bg-teal-100 dark:hover:bg-teal-500/20",
        active: "bg-teal-500",
        text: "text-teal-600 dark:text-teal-300",
      },
      {
        title: "Categories",
        icon: Layers,
        path: "/admin/categories",
        hover: "hover:bg-lime-100 dark:hover:bg-lime-500/20",
        active: "bg-lime-500",
        text: "text-lime-600 dark:text-lime-300",
      },
      {
        title: "Add Batches",
        icon: Layers,
        path: "/admin/batches",
        hover: "hover:bg-lime-100 dark:hover:bg-lime-500/20",
        active: "bg-lime-500",
        text: "text-lime-600 dark:text-lime-300",
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
        hover: "hover:bg-sky-100 dark:hover:bg-sky-500/20",
        active: "bg-sky-500",
        text: "text-sky-600 dark:text-sky-300",
      },
      {
        title: "Student Payments",
        icon: CreditCard,
        path: "/admin/students/payments",
        hover: "hover:bg-amber-100 dark:hover:bg-amber-500/20",
        active: "bg-amber-500",
        text: "text-amber-600 dark:text-amber-300",
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
        hover: "hover:bg-purple-100 dark:hover:bg-purple-500/20",
        active: "bg-purple-500",
        text: "text-purple-600 dark:text-purple-300",
      },
      {
        title: "View Profile",
        icon: User,
        path: "/admin/instructors/profile",
        hover: "hover:bg-fuchsia-100 dark:hover:bg-fuchsia-500/20",
        active: "bg-fuchsia-500",
        text: "text-fuchsia-600 dark:text-fuchsia-300",
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
    title: "Chats",
    icon: Calendar,
    path: "/admin/chats",
    ...COLORS.schedule,
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
    path: "/admin/PAYMENT",
    ...COLORS.dashboard,
  },
  {
    title: "Settings",
    icon: Settings,
    ...COLORS.settings,

    submenu: [
      {
        title: "Setting",
        icon: Settings,
        path: "/admin/settings",
        hover: "hover:bg-fuchsia-100 dark:hover:bg-fuchsia-500/20",
        active: "bg-fuchsia-500",
        text: "text-fuchsia-600 dark:text-fuchsia-300",
      },
      {
        title: "Roles & Permissions",
        icon: ShieldCheck,
        path: "/admin/role",
        hover: "hover:bg-emerald-100 dark:hover:bg-emerald-500/20",
        active: "bg-emerald-500",
        text: "text-emerald-600 dark:text-emerald-300",
      },
      {
        title: "Help Center",
        icon: HelpCircle,
        path: "/admin/helpcenter",
        hover: "hover:bg-lime-100 dark:hover:bg-lime-500/20",
        active: "bg-lime-500",
        text: "text-lime-600 dark:text-lime-300",
      },
    ],
  },
];

/* ---------------- COMPONENT ---------------- */

export default function Sidebar() {
  const [openCourses, setOpenCourses] = useState(false);
  const [openStudents, setOpenStudents] = useState(false);
  const [openInstructors, setOpenInstructors] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 px-4 py-5 flex flex-col transition-colors duration-300">
      {/* LOGO */}
      <div className="flex items-center gap-2 mb-5">
        <div className="w-10 h-10 rounded-lg overflow-hidden bg-white shadow-sm border border-slate-200 dark:border-slate-600 ring-1 ring-black/5 dark:ring-white/10 transition-all duration-300">
          <img
            src={logo}
            alt="AI Scholar"
            className="w-full h-full object-contain p-1.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.12)] dark:brightness-110 dark:contrast-110"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
            AI Scholar
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Admin Portal
          </p>
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
                        : `text-gray-700 dark:text-gray-300 ${item.hover}`
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
                  <span className="text-sm font-medium">{item.title}</span>
                </NavLink>
              )}

             {item.submenu && (
  <>
    {/* TOGGLE BUTTON */}
    <button
      onClick={() => {
        if (item.title === "Courses") setOpenCourses(!openCourses);
        if (item.title === "Students") setOpenStudents(!openStudents);
        if (item.title === "Instructors") setOpenInstructors(!openInstructors);
        if (item.title === "Settings") setOpenSettings(!openSettings);
      }}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition
        ${
          isSubActive
            ? `${item.active} text-white shadow`
            : `text-gray-700 dark:text-gray-300 ${item.hover}`
        }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 flex items-center justify-center rounded-md
          ${isSubActive ? "bg-white/20 text-white" : item.text}`}
        >
          <item.icon size={18} />
        </div>
        <span className="text-sm font-medium">{item.title}</span>
      </div>

      {/* CHEVRON ROTATE (ALL INCLUDED) */}
      <ChevronDown
        size={16}
        className={`transition ${
          (item.title === "Courses" && openCourses) ||
          (item.title === "Students" && openStudents) ||
          (item.title === "Instructors" && openInstructors) ||
          (item.title === "Settings" && openSettings)
            ? "rotate-180"
            : ""
        }`}
      />
    </button>

    {/* DROPDOWN BOX — ALL IN ONE */}
    {((item.title === "Courses" && openCourses) ||
      (item.title === "Students" && openStudents) ||
      (item.title === "Instructors" && openInstructors) ||
      (item.title === "Settings" && openSettings)) && (
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
                  : `text-gray-700 dark:text-gray-300 ${sub.hover}`
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

            <span className="text-xs">{sub.title}</span>
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
