import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  GraduationCap,
  ClipboardList,
  MessageSquare,
  BarChart,
  Settings,
  Bell,
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
} from "lucide-react";

/* ------------ MENU DATA ------------ */

const menus = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },

  {
    name: "Courses",
    icon: BookOpen,
    submenu: [
      { name: "All Courses", path: "/courses" },
      { name: "Add Course", path: "/courses/create" },
      { name: "Live Classes", path: "/courses/live" }
    ]
  },
{
  name: "Users",
  path: "/users",   // 👈 add this
  icon: Users,
  submenu: [
    { name: "Students", path: "/users/students" },
    { name: "Instructors", path: "/users/instructors" },
    { name: "Admins", path: "/users/admins" }
  ]
},


  { name: "Analytics", path: "/analytics", icon: BarChart },
  { name: "Enrollments", path: "/enrollments", icon: ClipboardList },
  { name: "Messages", path: "/messages", icon: MessageSquare },
  { name: "Notifications", path: "/notifications", icon: Bell },
  { name: "Certificates", path: "/certificates", icon: Award },
  { name: "Settings", path: "/settings", icon: Settings }
];

/* ------------ SIDEBAR ------------ */

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const isSubmenuActive = (submenu) =>
    submenu?.some(sub => location.pathname.startsWith(sub.path));

  useEffect(() => {
    menus.forEach(item => {
      if (isSubmenuActive(item.submenu)) {
        setOpenMenu(item.name);
      }
    });
  }, [location.pathname]);

  return (
    <motion.aside
      animate={{ width: isOpen ? 230 : 75 }}
      className="h-screen bg-gradient-to-b from-[#0f172a] to-[#020617] 
                 text-white flex flex-col shadow-2xl relative"
    >
      {/* TOGGLE */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-6 bg-indigo-500 p-1.5 rounded-full shadow-md"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* LOGO */}
      <div className="p-4 flex items-center gap-2">
        <div className="w-9 h-9 bg-gradient-to-tr from-indigo-500 to-purple-600 
                        rounded-lg flex items-center justify-center font-bold">
          LMS
        </div>
        {isOpen && (
          <span className="font-semibold tracking-wide
                         text-transparent bg-clip-text
                         bg-gradient-to-r from-indigo-400 to-purple-400">
            Admin
          </span>
        )}
      </div>

      {/* MENU */}
      <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
        {menus.map(item => {
          const Icon = item.icon;
          const active = item.submenu
            ? isSubmenuActive(item.submenu)
            : location.pathname === item.path;

          return (
            <div key={item.name}>
              {/* MAIN ITEM */}
              <button
                onClick={() =>
                  item.submenu &&
                  setOpenMenu(openMenu === item.name ? null : item.name)
                }
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm
                transition-all duration-300
                ${
                  active
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md"
                    : "hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg ${
                      active ? "bg-black/20" : "bg-white/5"
                    }`}
                  >
                    <Icon size={16} />
                  </div>

                  {isOpen && (
                    item.submenu ? (
                      <span>{item.name}</span>
                    ) : (
                      <NavLink to={item.path}>{item.name}</NavLink>
                    )
                  )}
                </div>

                {isOpen && item.submenu && (
                  <ChevronDown
                    size={14}
                    className={`transition ${
                      openMenu === item.name ? "rotate-180" : ""
                    }`}
                  />
                )}
              </button>

              {/* SUBMENU */}
              <AnimatePresence>
                {isOpen && openMenu === item.name && item.submenu && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-10 mt-1 space-y-1"
                  >
                    {item.submenu.map(sub => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        className="block text-xs text-gray-400 
                                   hover:text-indigo-400 transition"
                      >
                        • {sub.name}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* PROFILE */}
      <div className="p-3 border-t border-white/10 flex items-center gap-3">
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin"
          className="w-8 h-8 rounded-full"
          alt="Admin"
        />

        {isOpen && <p className="text-sm text-gray-300">Admin</p>}

        <LogOut
          size={16}
          className="ml-auto text-red-400 hover:text-red-500 cursor-pointer"
        />
      </div>
    </motion.aside>
  );
}
