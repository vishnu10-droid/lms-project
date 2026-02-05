import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useLocation } from "react-router-dom";

import {
<<<<<<< HEAD
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  BarChart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LogOut,
=======
  LayoutDashboard, BookOpen, Users, ClipboardList,
  MessageSquare, BarChart, Settings, ChevronLeft,
  ChevronRight, ChevronDown, LogOut
>>>>>>> ae36658bedd84ffcd1a6a798881832e50857c122
} from "lucide-react";
import { useNavigate } from "react-router-dom";

<<<<<<< HEAD
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
=======
/* ---------------- MENU CONFIG ---------------- */

const menus = [
  { name: "Dashboard", 
    icon: LayoutDashboard,
     route: "/dashboard" },

  {
    name: "Courses",
    icon: BookOpen,
    route: "/courses",
    submenu: [
      { label: "Course List", route: "/courses/list" },
      { label: "Course Page", route: "/courses/page" },
      { label: "Course Preview", route: "/courses/preview" }
    ]
  },

  {
    name: "Students",
    icon: Users,
    route: "/students",
    submenu: [
      { label: "Enrollments", route: "/students/enrollments" },
      { label: "Attendance", route: "/students/attendance" }
    ]
  },

  {
    name: "Assessments",
    icon: ClipboardList,
    route: "/assessments",
    submenu: [
      { label: "Quizzes", route: "/assessments/quizzes" },
      { label: "Results", route: "/assessments/results" }
    ]
  },

  { name: "Messages", icon: MessageSquare, route: "/messages", badge: 5 },
  { name: "Analytics", icon: BarChart, route: "/analytics" },
  { name: "Settings", icon: Settings, route: "/settings" }
];

/* ---------------- COMPONENT ---------------- */

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [active, setActive] = useState("Dashboard");
  const [openMenu, setOpenMenu] = useState(null);

  const navigate = useNavigate();

  /* ---------------- HANDLERS ---------------- */

  const handleMainClick = (item) => {
    setActive(item.name);

    if (item.submenu) {
      setOpenMenu(openMenu === item.name ? null : item.name);
      navigate(item.route);
    } else {
      setOpenMenu(null);
      navigate(item.route);
    }
  };

  const handleSubClick = (parent, sub) => {
    setActive(parent);
    navigate(sub.route);
  };

  /* ---------------- RENDER ---------------- */

  return (
    <motion.aside
      animate={{ width: isOpen ? 280 : 96 }}
      className="relative z-50 h-[96vh] my-[2vh] ml-[2vh] bg-[#0c1017] border border-white/10 rounded-[2.5rem] flex flex-col"
    >
      {/* Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute -right-3 top-16 bg-[#0f172a] border border-white/10 p-1.5 rounded-full"
      >
        {isOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
      </button>

      {/* Brand */}
      <div
        onClick={() => navigate("/dashboard")}
        className="h-24 flex items-center px-7 gap-3 cursor-pointer"
      >
        <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center">
          <span className="text-white font-black">AS</span>
        </div>
        {isOpen && (
          <div>
            <p className="font-bold text-white">Scholars</p>
            <p className="text-[10px] text-indigo-400 tracking-widest">ACADEMY</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        {menus.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.name;

          return (
            <div key={item.name}>
              <button
                onClick={() => handleMainClick(item)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl
                  ${isActive ? "bg-white/10 text-white" : "text-slate-400 hover:bg-white/5"}`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} />
                  {isOpen && <span>{item.name}</span>}
                </div>
                {isOpen && item.submenu && (
                  <ChevronDown
                    size={14}
                    className={openMenu === item.name ? "rotate-180" : ""}
                  />
                )}
              </button>

              <AnimatePresence>
                {isOpen && openMenu === item.name && item.submenu && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-8 mt-1 space-y-1"
                  >
                    {item.submenu.map((sub) => (
                      <button
                        key={sub.label}
                        onClick={() => handleSubClick(item.name, sub)}
                        className="block w-full text-left text-xs text-slate-400 hover:text-indigo-400 py-1"
                      >
                        {sub.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="p-4 mt-auto">
        <div className={`flex items-center gap-3 ${!isOpen && "justify-center"}`}>
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
            className="w-10 h-10 rounded-xl"
            alt="user"
          />
          {isOpen && (
            <>
              <div className="flex-1">
                <p className="text-sm font-bold text-white">Alex Sterling</p>
                <p className="text-xs text-indigo-400">ADMIN</p>
              </div>
              <LogOut
                onClick={() => navigate("/login")}
                className="cursor-pointer hover:text-rose-500"
                size={16}
              />
            </>
          )}
>>>>>>> ae36658bedd84ffcd1a6a798881832e50857c122
        </div>
      </div>
    </motion.aside>
  );
}
