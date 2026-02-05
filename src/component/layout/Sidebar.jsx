import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  BarChart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
} from "lucide-react";

const menus = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  {
    name: "Courses",
    icon: BookOpen,
    submenu: [
      { name: "All Courses", path: "/courses" },
      { name: "Live Classes", path: "/courses/live" },
      { name: "Curriculum", path: "/courses/curriculum" },
    ],
  },
  { name: "Students", path: "/students", icon: Users },
  { name: "Assessments", path: "/assessments", icon: ClipboardList },
  { name: "Analytics", path: "/analytics", icon: BarChart },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const activeRoute = (path) => location.pathname === path;

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 260 : 90 }}
      transition={{ duration: 0.3 }}
      className="h-[96vh] my-[2vh] ml-[2vh] bg-white/10 backdrop-blur-2xl rounded-3xl 
      border border-white/10 shadow-xl flex flex-col"
    >
      {/* Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-10 bg-black/40 text-white p-1.5 rounded-full"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>

      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex justify-center items-center">
          <span className="font-bold text-lg">AS</span>
        </div>

        {isOpen && (
          <div>
            <p className="font-bold text-lg">Scholars</p>
            <p className="text-xs text-indigo-300">Academy</p>
          </div>
        )}
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menus.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.name}>
              <button
                onClick={() => item.submenu && setOpenMenu(openMenu === item.name ? null : item.name)}
                className={`w-full flex items-center justify-between p-3 rounded-xl transition-all ${
                  activeRoute(item.path) ? "bg-white/20 text-white" : "text-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-700/40">
                    <Icon size={18} />
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
                  <ChevronDown size={16} className={`${openMenu === item.name ? "rotate-180" : ""}`} />
                )}
              </button>

              {/* SUBMENU */}
              <AnimatePresence>
                {isOpen && openMenu === item.name && item.submenu && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="ml-12 border-l border-white/10 pl-4 space-y-1"
                  >
                    {item.submenu.map((sub) => (
                      <NavLink
                        key={sub.name}
                        to={sub.path}
                        className="block py-1 text-sm text-gray-300 hover:text-indigo-300"
                      >
                        {sub.name}
                      </NavLink>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* USER */}
      <div className="p-4">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-black/20">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            alt="user"
            className="w-10 h-10 rounded-xl"
          />

          {isOpen && (
            <div>
              <p className="font-bold text-sm">Alex Sterling</p>
              <p className="text-xs text-indigo-300">ADMIN</p>
            </div>
          )}

          {isOpen && <LogOut size={18} className="text-gray-300 hover:text-red-400" />}
        </div>
      </div>
    </motion.aside>
  );
}
