import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, BookOpen, Users, ClipboardList,
  MessageSquare, BarChart, Settings, ChevronLeft,
  ChevronRight, ChevronDown, LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      { label: "All Courses", route: "/courses/all" },
      { label: "Live Classes", route: "/courses/live" },
      { label: "Curriculum", route: "/courses/curriculum" }
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
        </div>
      </div>
    </motion.aside>
  );
}
