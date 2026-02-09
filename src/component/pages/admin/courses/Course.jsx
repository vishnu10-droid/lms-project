import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  Search, Star, Clock, Users, FilterX, Sparkles, Play, Heart, 
  GraduationCap, Grid, List, X, Trophy, ShieldCheck, ChevronRight,
  Code, Brain, PenTool, Lock, Cloud, Megaphone, ShoppingBag
} from "lucide-react";

// --- Data Configuration ---
const COURSE_LIBRARY = [
  { title: "React 19 & Next.js 15 Masterclass", category: "Web Development", imgId: "photo-1633356122544-f134324a6cee", instructor: "John Doe" },
  { title: "Full-Stack TypeScript Bootcamp", category: "Web Development", imgId: "photo-1516116216624-53e697fedbea", instructor: "Sarah Chen" },
  { title: "Advanced Neural Networks for AI", category: "Data Science", imgId: "photo-1677442136019-21780ecad995", instructor: "David Kim" },
  { title: "Modern UI/UX Design Systems", category: "Design", imgId: "photo-1586717791821-3f44a563eb4c", instructor: "Gary Simon" },
  { title: "Ethical Hacking: Zero to Hero", category: "Cybersecurity", imgId: "photo-1550751827-4bd374c3f58b", instructor: "Kevin Mitnick" },
  { title: "AWS Solutions Architect 2026", category: "Cloud", imgId: "photo-1451187580459-43490279c0fa", instructor: "Guru Dev" },
  { title: "SEO & Growth Hacking Mastery", category: "Marketing", imgId: "photo-1571171637578-41bc2dd41cd2", instructor: "Neil Patel" },
  { title: "DevOps: Docker & Terraform", category: "Cloud", imgId: "photo-1605745341112-85968b19335b", instructor: "Linus T." },
];

const CATEGORY_STYLES = {
  "Web Development": { icon: Code, grad: "from-blue-500 to-indigo-600" },
  "Data Science": { icon: Brain, grad: "from-emerald-500 to-teal-600" },
  "Design": { icon: PenTool, grad: "from-purple-500 to-pink-600" },
  "Cybersecurity": { icon: Lock, grad: "from-slate-700 to-slate-900" },
  "Cloud": { icon: Cloud, grad: "from-cyan-500 to-blue-600" },
  "Marketing": { icon: Megaphone, grad: "from-orange-500 to-red-600" }
};

const coursesData = COURSE_LIBRARY.map((course, i) => {
  const style = CATEGORY_STYLES[course.category] || CATEGORY_STYLES["Web Development"];
  return {
    ...course,
    id: i + 1,
    price: 49 + (i * 15),
    originalPrice: 199,
    rating: (4.7 + Math.random() * 0.3).toFixed(1),
    students: Math.floor(Math.random() * 15000 + 3000),
    duration: `${12 + (i % 4)}h 30m`,
    level: ["Beginner", "Intermediate", "Advanced"][i % 3],
    image: `https://images.unsplash.com/${course.imgId}?auto=format&fit=crop&q=80&w=800`,
    gradient: style.grad,
    Icon: style.icon,
    bestseller: i % 3 === 0
  };
});

/* ------------------ REUSABLE COMPONENTS ------------------ */

const CourseCard = ({ course, viewMode, isFavorite, onToggleFavorite, onClick }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    whileHover={{ y: -10 }}
    className={`group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl transition-all duration-500 ${
      viewMode === 'list' ? 'flex flex-row h-64' : 'flex flex-col'
    }`}
  >
    <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-2/5' : 'h-56'}`}>
      <img src={course.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
      <button 
        onClick={(e) => { e.stopPropagation(); onToggleFavorite(course.id); }}
        className={`absolute top-5 right-5 p-3 rounded-2xl backdrop-blur-md transition-all ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-white/20 text-white hover:bg-white hover:text-red-500'
        }`}
      >
        <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
      </button>
      {course.bestseller && (
        <div className="absolute bottom-5 left-5 bg-amber-400 text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-lg">
          <Trophy size={12} /> BESTSELLER
        </div>
      )}
    </div>

    <div className="p-8 flex flex-col justify-between flex-1">
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className={`p-1.5 rounded-lg bg-gradient-to-br ${course.gradient} text-white shadow-md`}>
            <course.Icon size={14} />
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{course.category}</span>
        </div>
        <h3 className="text-xl font-bold text-slate-800 line-clamp-2 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
          {course.title}
        </h3>
      </div>
      <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-4">
        <div className="flex flex-col">
          <span className="text-2xl font-black text-slate-900">${course.price}</span>
          <span className="text-xs text-amber-500 font-bold flex items-center gap-1"><Star size={12} fill="currentColor"/> {course.rating}</span>
        </div>
        <button onClick={() => onClick(course)} className="p-4 bg-slate-900 text-white rounded-2xl hover:bg-blue-600 transition-all shadow-lg active:scale-95">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  </motion.div>
);

/* ------------------ MAIN PLATFORM ------------------ */

export default function UltimateLearningPlatform() {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState(new Set());
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const categories = ["All", ...Object.keys(CATEGORY_STYLES)];

  const filteredCourses = useMemo(() => {
    return coursesData.filter(c => 
      (activeCategory === "All" || c.category === activeCategory) &&
      (c.title.toLowerCase().includes(search.toLowerCase()))
    );
  }, [search, activeCategory]);

  const toggleFavorite = (id) => {
    const next = new Set(favorites);
    next.has(id) ? next.delete(id) : next.add(id);
    setFavorites(next);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      
      {/* --- DYNAMIC FLOATING NAVBAR --- */}
      <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-10 ${isScrolled ? "py-4" : "py-8"}`}>
        <div className={`max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-[2.5rem] transition-all duration-500 ${
          isScrolled ? "bg-white/80 backdrop-blur-2xl shadow-2xl shadow-slate-200/50 border border-white/50" : "bg-transparent"
        }`}>
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:rotate-6 transition-transform">
              <GraduationCap size={26} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tighter">EDU<span className="text-blue-600">FLUX</span></span>
          </div>

          {/* Nav Search - Hidden on Mobile */}
          <div className="hidden lg:flex flex-1 max-w-md mx-10 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Quick find..."
              className="w-full pl-12 pr-4 py-2.5 bg-slate-100/50 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/10 transition-all text-sm font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            <button className="p-3 text-slate-500 hover:bg-slate-100 rounded-2xl transition-all relative">
              <ShoppingBag size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-11 h-11 rounded-2xl border-2 border-white shadow-sm overflow-hidden bg-slate-200">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-20 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <header className="mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black tracking-widest uppercase mb-6">
              <Sparkles size={14} /> The Future of Learning
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.85]">
              Master your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">Potential.</span>
            </h1>
            <p className="text-slate-500 text-xl font-medium leading-relaxed">
              Handcrafted courses designed by industry titans. Transition from novice to world-class expert with EDUFLUX.
            </p>
          </motion.div>
        </header>

        {/* --- DYNAMIC TOOLBAR --- */}
        <div className="sticky top-28 z-40 mb-12 bg-white/40 backdrop-blur-md p-2 rounded-[2rem] border border-white/40 shadow-xl shadow-slate-200/40 flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar p-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-[1.2rem] font-black text-[11px] uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeCategory === cat ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-white hover:text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 p-1">
            <button onClick={() => setViewMode("grid")} className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-white shadow-md text-blue-600' : 'text-slate-300'}`}><Grid size={20}/></button>
            <button onClick={() => setViewMode("list")} className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-white shadow-md text-blue-600' : 'text-slate-300'}`}><List size={20}/></button>
          </div>
        </div>

        {/* --- GRID --- */}
        <LayoutGroup>
          <motion.div layout className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} course={course} viewMode={viewMode}
                  isFavorite={favorites.has(course.id)}
                  onToggleFavorite={toggleFavorite}
                  onClick={setSelectedCourse}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-40 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <FilterX size={64} className="mx-auto text-slate-200 mb-4" />
            <h3 className="text-2xl font-black text-slate-800">No results found</h3>
          </div>
        )}
      </main>

      {/* --- DETAIL MODAL --- */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-xl"
            onClick={() => setSelectedCourse(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }} animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-5xl rounded-[3.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row relative"
              onClick={e => e.stopPropagation()}
            >
              <button onClick={() => setSelectedCourse(null)} className="absolute top-8 right-8 z-10 p-2 bg-black/5 hover:bg-black/10 rounded-full transition-all">
                <X size={24}/>
              </button>

              <div className="md:w-1/2 relative min-h-[400px] bg-slate-100">
                <img src={selectedCourse.image} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <motion.button whileHover={{ scale: 1.1 }} className="w-24 h-24 bg-white/20 backdrop-blur-3xl border border-white/40 rounded-full flex items-center justify-center text-white">
                    <Play size={40} fill="currentColor" />
                  </motion.button>
                </div>
              </div>

              <div className="md:w-1/2 p-12 lg:p-16 flex flex-col justify-center">
                <span className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-black text-white bg-gradient-to-r ${selectedCourse.gradient} mb-6`}>
                  {selectedCourse.category}
                </span>
                <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">{selectedCourse.title}</h2>
                <div className="flex gap-6 mb-10 text-slate-500 font-bold text-sm">
                  <span className="flex items-center gap-2"><Clock size={18} className="text-blue-500"/> {selectedCourse.duration}</span>
                  <span className="flex items-center gap-2"><Users size={18} className="text-purple-500"/> {selectedCourse.students.toLocaleString()}</span>
                </div>
                <p className="text-slate-500 text-lg leading-relaxed mb-10">Learn from <span className="text-slate-900 font-bold">{selectedCourse.instructor}</span> in this exclusive masterclass designed for high-performance individuals.</p>
                <div className="flex gap-4">
                  <button className="flex-1 py-5 bg-blue-600 text-white rounded-3xl font-black text-xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                    Enroll for ${selectedCourse.price}
                  </button>
                  <button className="p-5 bg-slate-100 rounded-3xl text-slate-600 hover:bg-red-50 hover:text-red-500 transition-all">
                    <Heart size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden opacity-40">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[120px]" />
      </div>
    </div>
  );
}