import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, Star, Clock, Users, BookOpen, 
  Heart, PlayCircle, Sparkles, ShoppingCart,
  ChevronRight, LayoutGrid, List, Filter,
  ArrowUpRight, Award, Zap
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

/* ---------------- DATA & CONFIG ---------------- */

const categoryConfig = [
  { name: "Web Development", icon: "🌐", color: "from-blue-500 to-cyan-400", count: 124 },
  { name: "Design", icon: "🎨", color: "from-pink-500 to-rose-400", count: 85 },
  { name: "Data Science", icon: "📊", color: "from-purple-500 to-indigo-400", count: 92 },
  { name: "DevOps", icon: "♾️", color: "from-orange-500 to-amber-400", count: 45 },
  { name: "Mobile Dev", icon: "📱", color: "from-green-500 to-emerald-400", count: 67 },
  { name: "Cybersecurity", icon: "🛡️", color: "from-red-500 to-orange-400", count: 38 },
];

const coursesData = [
  { id: 1, title: "Complete React Developer 2026", category: "Web Development", instructor: "John Doe", price: 999, rating: 4.8, reviews: 450, students: 12500, level: "Beginner", duration: "24h 30m", image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80", bestSeller: true, trend: "Hot" },
  { id: 2, title: "Advanced JavaScript Mastery", category: "Web Development", instructor: "Sarah Smith", price: 799, rating: 4.9, reviews: 890, students: 9800, level: "Intermediate", duration: "18h", image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80", bestSeller: false },
  { id: 3, title: "UI/UX Design Fundamentals", category: "Design", instructor: "Alex Brown", price: 0, rating: 4.5, reviews: 120, students: 5600, level: "Beginner", duration: "10h", image: "https://images.unsplash.com/photo-1586717791821-3f44a563dc4c?auto=format&fit=crop&w=800&q=80", bestSeller: false },
  { id: 4, title: "Python for Data Science", category: "Data Science", instructor: "Dr. Angela Yu", price: 1299, rating: 4.7, reviews: 2100, students: 45000, level: "Intermediate", duration: "32h", image: "https://images.unsplash.com/photo-1551288049-bbbda536ad0a?auto=format&fit=crop&w=800&q=80", bestSeller: true, trend: "Trending" },
  { id: 5, title: "Docker & Kubernetes Guide", category: "DevOps", instructor: "Max Schwarz", price: 1499, rating: 4.8, reviews: 3200, students: 18400, level: "Advanced", duration: "22h", image: "https://images.unsplash.com/photo-1605745341112-85968b193ef5?auto=format&fit=crop&w=800&q=80", bestSeller: true },
  { id: 6, title: "iOS 17 & Swift Development", category: "Mobile Dev", instructor: "Philipp Lackner", price: 1899, rating: 4.6, reviews: 150, students: 2300, level: "Beginner", duration: "45h", image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80", bestSeller: false },
];

/* ---------------- MAIN COMPONENT ---------------- */

const CourseCategoryPage = () => {
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };

  }, []);

  const filteredCourses = useMemo(() => {
    return coursesData.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = level === "All" || course.level === level;
      const matchesCategory = category === "All" || course.category === category;
      return matchesSearch && matchesLevel && matchesCategory;
    }).sort((a, b) => {
      if (sort === "priceLow") return a.price - b.price;
      if (sort === "priceHigh") return b.price - a.price;
      if (sort === "rating") return b.rating - a.rating;
      return 0;
    });
  }, [search, level, category, sort]);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 pb-20 selection:bg-indigo-100 selection:text-indigo-700">
      


      <main className="max-w-7xl mx-auto px-6 pt-28">
        
        {/* 2. MODERN HERO */}
        <header className="mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-900 rounded-[3.5rem] p-12 lg:p-16 text-white relative overflow-hidden group"
          >
            <div className="relative z-10 lg:w-3/5">
              <motion.div 
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-indigo-300 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase mb-8"
              >
                <Zap size={14} className="fill-current" />
                Special Offer: 50% Off New Courses
              </motion.div>
              <h1 className="text-6xl lg:text-7xl font-black mb-8 leading-[1.1] tracking-tight">
                Master your <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Creative Craft.</span>
              </h1>
              <p className="text-slate-400 text-xl max-w-md leading-relaxed mb-10">
                Join 2M+ learners today and build the portfolio of your dreams with expert-led paths.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold transition-all flex items-center gap-2 shadow-xl shadow-indigo-600/20">
                  Browse Courses <ArrowUpRight size={20}/>
                </button>
                <button className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-2xl font-bold transition-all">
                  Try for Free
                </button>
              </div>
            </div>

            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-1/2 h-full">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-10 right-10 w-64 h-64 border border-indigo-500/20 rounded-full"
              />
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-20 right-40 w-32 h-32 bg-indigo-500/20 blur-[80px] rounded-full"
              />
            </div>
          </motion.div>
        </header>

        {/* 3. CATEGORY BENTO */}
        <section className="mb-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl font-black tracking-tight mb-2">Explore Skills</h2>
              <div className="h-1.5 w-12 bg-indigo-600 rounded-full" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <motion.button 
              whileHover={{ y: -5 }}
              onClick={() => setCategory("All")}
              className={`group p-6 rounded-[2.5rem] border-2 transition-all flex flex-col items-center justify-center gap-4 ${
                category === "All" ? "border-indigo-600 bg-indigo-50 shadow-2xl shadow-indigo-100" : "border-white bg-white hover:border-indigo-100 shadow-sm"
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${category === "All" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400 group-hover:bg-indigo-100"}`}>
                <LayoutGrid size={24}/>
              </div>
              <span className="font-bold text-sm">All Paths</span>
            </motion.button>

            {categoryConfig.map((cat) => (
              <motion.button 
                key={cat.name}
                whileHover={{ y: -5 }}
                onClick={() => setCategory(cat.name)}
                className={`group p-6 rounded-[2.5rem] border-2 transition-all flex flex-col items-center justify-center gap-4 ${
                  category === cat.name ? "border-indigo-600 bg-indigo-50 shadow-2xl shadow-indigo-100" : "border-white bg-white hover:border-indigo-100 shadow-sm"
                }`}
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${cat.color} text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-black/5`}>
                  {cat.icon}
                </div>
                <span className="font-bold text-sm whitespace-nowrap">{cat.name}</span>
              </motion.button>
            ))}
          </div>
        </section>

        {/* 4. MAIN LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Enhanced Sidebar */}
          <aside className="lg:w-72">
            <div className="sticky top-32 space-y-8">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
                <h4 className="flex items-center gap-2 font-black uppercase tracking-widest text-xs text-slate-400 mb-8">
                  <Filter size={14}/> Difficulty
                </h4>
                <div className="space-y-5">
                  {["All", "Beginner", "Intermediate", "Advanced"].map(l => (
                    <label key={l} className="flex items-center gap-4 cursor-pointer group">
                      <div className="relative flex items-center justify-center">
                        <input 
                          type="radio" name="level" checked={level === l} 
                          onChange={() => setLevel(l)}
                          className="peer appearance-none w-6 h-6 border-2 border-slate-200 rounded-lg checked:border-indigo-600 transition-all"
                        />
                        <div className="absolute w-2.5 h-2.5 bg-indigo-600 rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className={`font-bold transition-colors ${level === l ? 'text-indigo-600' : 'text-slate-500 group-hover:text-slate-900'}`}>{l}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-[2.5rem] text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                <Award className="absolute -bottom-4 -right-4 w-24 h-24 text-white/10 rotate-12" />
                <h4 className="font-bold text-xl mb-3">Premium Pass</h4>
                <p className="text-indigo-100 text-sm leading-relaxed mb-6">Get unlimited access to all 5,000+ courses and certifications.</p>
                <button className="w-full bg-white text-indigo-600 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:shadow-lg transition-all active:scale-95">Upgrade Now</button>
              </div>
            </div>
          </aside>

          {/* Dynamic Grid Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black">{filteredCourses.length} <span className="text-slate-400 font-medium">results</span></h3>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-400">Sort by:</span>
                <select 
                  value={sort} 
                  onChange={(e)=>setSort(e.target.value)}
                  className="bg-white border-none shadow-sm rounded-xl text-sm font-bold py-2.5 px-4 focus:ring-2 focus:ring-indigo-500 outline-none"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated more data</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
              </div>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatePresence mode="popLayout">
                {loading ? (
                  [...Array(4)].map((_, i) => (
                    <div key={i} className="h-[450px] bg-white rounded-[3rem] border border-slate-100 p-6 space-y-4 animate-pulse">
                      <div className="w-full h-56 bg-slate-100 rounded-3xl" />
                      <div className="h-4 w-1/3 bg-slate-100 rounded-full" />
                      <div className="h-8 w-full bg-slate-100 rounded-full" />
                      <div className="h-4 w-2/3 bg-slate-100 rounded-full" />
                    </div>
                  ))
                ) : filteredCourses.map((course) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    key={course.id}
                    className="group bg-white rounded-[3rem] border border-slate-100 overflow-hidden hover:shadow-3xl hover:shadow-indigo-500/10 transition-all duration-500 flex flex-col"
                  >
                    <div className="relative h-64 m-4 overflow-hidden rounded-[2rem]">
                      <img src={course.image} className="w-full h-full object-cover transition duration-1000 group-hover:scale-110" alt={course.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold flex items-center gap-2 shadow-2xl"
                        >
                          <PlayCircle size={20} className="text-indigo-600"/> Watch Preview
                        </motion.button>
                      </div>
                      
                      <div className="absolute top-4 left-4 flex gap-2">
                        {course.bestSeller && <span className="bg-amber-400 text-amber-950 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase shadow-lg shadow-amber-400/20">Bestseller</span>}
                        {course.trend && <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase shadow-lg shadow-indigo-600/20">{course.trend}</span>}
                      </div>

                      <button 
                        onClick={() => toggleWishlist(course.id)}
                        className={`absolute top-4 right-4 p-3 rounded-2xl backdrop-blur-md transition-all ${
                          wishlist.includes(course.id) ? "bg-rose-500 text-white" : "bg-white/20 text-white hover:bg-white hover:text-rose-500"
                        }`}
                      >
                        <Heart size={20} className={wishlist.includes(course.id) ? "fill-current" : ""} />
                      </button>
                    </div>

                    <div className="px-8 pb-8 flex-1 flex flex-col">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest px-3 py-1.5 bg-indigo-50 rounded-lg">
                          {course.category}
                        </span>
                        <div className="flex items-center gap-1.5 bg-amber-50 text-amber-600 px-2 py-1 rounded-lg font-bold text-sm">
                          <Star size={14} fill="currentColor"/> {course.rating}
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-black mb-4 line-clamp-2 leading-tight group-hover:text-indigo-600 transition-colors">
                        {course.title}
                      </h3>

                      <div className="flex items-center gap-5 text-slate-400 text-sm mb-auto font-bold">
                        <span className="flex items-center gap-2"><Clock size={16}/> {course.duration}</span>
                        <span className="flex items-center gap-2"><Users size={16}/> {course.students.toLocaleString()}</span>
                      </div>

                      <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-50">
                        <div>
                          <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">Lifetime Access</p>
                          <span className="text-3xl font-black text-slate-900">{course.price === 0 ? "Free" : `₹${course.price}`}</span>
                        </div>
                        <motion.button 
                          whileHover={{ x: 5 }}
                          className="bg-slate-900 text-white h-14 w-14 rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-colors group/btn shadow-xl shadow-slate-900/10"
                        >
                          <ChevronRight size={24} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseCategoryPage;