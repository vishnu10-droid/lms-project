import React, { useState, useMemo, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import {
  Code2,
  Palette,
  LineChart,
  Globe,
  Cpu,
  Music2,
  Search,
  Play,
  Star,
  ChevronRight,
  Clock,
  Users,
  Sparkles,
  LayoutGrid,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------------- MOCK DATA ---------------- */

const CATEGORIES = [
  {
    id: 1,
    title: "Full-Stack Architecture",
    subtitle: "MERN & Next.js Mastery",
    icon: Code2,
    count: "42 Modules",
    level: "Advanced",
    rating: 4.9,
    students: "12.5k",
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/20",
    group: "Development",
  },
  {
    id: 2,
    title: "Digital Product Design",
    subtitle: "UI/UX & Design Systems",
    icon: Palette,
    count: "35 Modules",
    level: "Intermediate",
    rating: 4.8,
    students: "8.2k",
    color: "from-fuchsia-500 to-pink-500",
    shadow: "shadow-fuchsia-500/20",
    group: "Design",
  },
  {
    id: 3,
    title: "Growth Marketing",
    subtitle: "SEO, Ads & Analytics",
    icon: LineChart,
    count: "28 Modules",
    level: "Beginner",
    rating: 4.7,
    students: "5.1k",
    color: "from-emerald-400 to-teal-500",
    shadow: "shadow-emerald-500/20",
    group: "Business",
  },
];

const FILTERS = ["All", "Development", "Design", "Business"];

/* ---------------- CARD COMPONENT ---------------- */

const Card = ({ item, onClick }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]));
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]));

  const sheenGradient = useMotionTemplate`radial-gradient(
    600px circle at ${useTransform(x, [-0.5, 0.5], ["0%", "100%"])} ${useTransform(
    y,
    [-0.5, 0.5],
    ["0%", "100%"]
  )},
    rgba(255,255,255,0.15),
    transparent 40%
  )`;

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(item)}
      whileHover={{ scale: 1.03 }}
      className="group relative h-[360px] w-full cursor-pointer"
    >
      <div className="relative h-full w-full rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">

        {/* Sheen */}
        <motion.div
          style={{ background: sheenGradient }}
          className="absolute inset-0 pointer-events-none"
        />

        {/* Top */}
        <div>
          <div className="flex justify-between items-start mb-6">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white`}
            >
              <item.icon size={22} />
            </div>
            <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
              <Star size={12} className="text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-bold text-slate-700">
                {item.rating}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 mb-1">
            {item.title}
          </h3>
          <p className="text-slate-500 text-sm">{item.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 my-6">
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Clock size={12} />
              <span className="text-[10px] uppercase font-bold">
                Duration
              </span>
            </div>
            <span className="text-slate-800 font-semibold text-sm">
              12 Weeks
            </span>
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-400 mb-1">
              <Users size={12} />
              <span className="text-[10px] uppercase font-bold">
                Students
              </span>
            </div>
            <span className="text-slate-800 font-semibold text-sm">
              {item.students}
            </span>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex items-center justify-between border-t pt-4">
          <span className="text-sm text-slate-600">{item.count}</span>
          <button className="flex items-center gap-1 text-sm font-bold text-indigo-600">
            Explore <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ---------------- MAIN PAGE ---------------- */

const ELearningDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const filteredCourses = useMemo(() => {
    return CATEGORIES.filter((cat) => {
      const matchFilter =
        activeFilter === "All" || cat.group === activeFilter;
      const matchSearch = cat.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [activeFilter, searchQuery]);

  const Navi= useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100 text-slate-900 font-sans overflow-x-hidden">

      {/* Soft Light Background Blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-200/40 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-pink-200/40 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Hero */}
        <div className="mb-14">
          <h1 className="text-5xl font-bold mb-6">
            Master the skills of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500">
              tomorrow.
            </span>
          </h1>

          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 pl-10 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-10">
          {FILTERS.map((filter) => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition ${
                activeFilter === filter
                  ? "bg-indigo-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
           
        <div  onClick={()=> Navi("/admin/Course/Categories/Fullstack")}  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredCourses.map((course) => (
            <Card key={course.id} item={course} onClick={setSelectedCourse} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ELearningDashboard;
