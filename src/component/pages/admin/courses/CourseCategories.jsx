import React, { useState, useMemo, useEffect } from "react";
import {
  Search, Star, Clock, Users, Filter, BookOpen,
  Heart, PlayCircle, SlidersHorizontal
} from "lucide-react";

/* ---------------- COURSE DATA ---------------- */
/* ---------------- ENHANCED DATA WITH REAL IMAGES ---------------- */

const coursesData = [
  {
    id: 1,
    title: "Complete React Developer 2024",
    category: "Web Development",
    instructor: "John Doe",
    price: 999,
    rating: 4.8,
    reviews: 450,
    students: 12500,
    level: "Beginner",
    duration: "24h 30m",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    bestSeller: true
  },
  {
    id: 2,
    title: "Advanced JavaScript Mastery",
    category: "Web Development",
    instructor: "Sarah Smith",
    price: 799,
    rating: 4.9,
    reviews: 890,
    students: 9800,
    level: "Intermediate",
    duration: "18h",
    image: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?auto=format&fit=crop&w=800&q=80",
    bestSeller: false
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    instructor: "Alex Brown",
    price: 0,
    rating: 4.5,
    reviews: 120,
    students: 5600,
    level: "Beginner",
    duration: "10h",
    image: "https://tse3.mm.bing.net/th/id/OIP.YjqhyIF-Lp_1V381ygEsYgHaEK?pid=Api&P=0&h=180",
    bestSeller: false
  },
  {
    id: 4,
    title: "Python for Data Science",
    category: "Data Science",
    instructor: "Dr. Angela Yu",
    price: 1299,
    rating: 4.7,
    reviews: 2100,
    students: 45000,
    level: "Intermediate",
    duration: "32h",
    image: "https://tse3.mm.bing.net/th/id/OIP.D6tfFbO6NwOV6EKwrivaFQHaEK?pid=Api&P=0&h=180",
    bestSeller: true
  },
  {
    id: 5,
    title: "Docker & Kubernetes: The Practical Guide",
    category: "DevOps",
    instructor: "Maximilian Schwarz",
    price: 1499,
    rating: 4.8,
    reviews: 3200,
    students: 18400,
    level: "Advanced",
    duration: "22h",
    image: "https://tse3.mm.bing.net/th/id/OIP.2yUtt-hSLXgEkNKJ6QhvCwHaEU?pid=Api&P=0&h=180",
    bestSeller: true
  },
  {
    id: 6,
    title: "iOS 17 & Swift Development",
    category: "Mobile Dev",
    instructor: "Philipp Lackner",
    price: 1899,
    rating: 4.6,
    reviews: 150,
    students: 2300,
    level: "Beginner",
    duration: "45h",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    bestSeller: false
  },
  {
    id: 7,
    title: "Ethical Hacking: Zero to Mastery",
    category: "Cybersecurity",
    instructor: "Andrei Neagoie",
    price: 1199,
    rating: 4.9,
    reviews: 5600,
    students: 29000,
    level: "Intermediate",
    duration: "28h",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    bestSeller: true
  },
  {
    id: 8,
    title: "Machine Learning with PyTorch",
    category: "Data Science",
    instructor: "Daniel Bourke",
    price: 2499,
    rating: 4.7,
    reviews: 430,
    students: 8200,
    level: "Advanced",
    duration: "52h",
    image: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&w=800&q=80",
    bestSeller: false
  }
];

/* ---------------- COMPONENT ---------------- */

const CourseCategoryPage = () => {

  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const categories = ["All", ...new Set(coursesData.map(c => c.category))];

  const filteredCourses = useMemo(() => {
    let result = coursesData.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = level === "All" || course.level === level;
      const matchesCategory = category === "All" || course.category === category;
      return matchesSearch && matchesLevel && matchesCategory;
    });

    if (sort === "priceLow") result.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") result.sort((a, b) => b.price - a.price);
    if (sort === "rating") result.sort((a, b) => b.rating - a.rating);

    return result;
  }, [search, level, category, sort]);

  const toggleWishlist = (id) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">

{/* ---------------- HERO ---------------- */}

<div className="max-w-7xl mx-auto mb-10">
  <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-3xl p-10 text-white shadow-xl">
    <h1 className="text-4xl font-extrabold">Explore Top Courses</h1>
    <p className="text-indigo-100 mt-2 max-w-xl">
      Upgrade your skills with expert-led courses & real-world projects.
    </p>
  </div>
</div>

{/* ---------------- FILTER BAR ---------------- */}

<div className="max-w-7xl mx-auto flex flex-wrap gap-4 mb-8 items-center">

<div className="relative flex-1">
<Search className="absolute left-3 top-3 text-slate-400" size={18}/>
<input
  value={search}
  onChange={(e)=>setSearch(e.target.value)}
  placeholder="Search courses..."
  className="w-full pl-10 pr-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500"
/>
</div>

<select className="p-3 rounded-xl border" value={category} onChange={(e)=>setCategory(e.target.value)}>
{categories.map(c=><option key={c}>{c}</option>)}
</select>

<select className="p-3 rounded-xl border" value={level} onChange={(e)=>setLevel(e.target.value)}>
{["All","Beginner","Intermediate","Advanced"].map(l=><option key={l}>{l}</option>)}
</select>

<select className="p-3 rounded-xl border" value={sort} onChange={(e)=>setSort(e.target.value)}>
<option value="popular">Most Popular</option>
<option value="rating">Highest Rated</option>
<option value="priceLow">Lowest Price</option>
<option value="priceHigh">Highest Price</option>
</select>

</div>

{/* ---------------- COURSES GRID ---------------- */}

<div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

{loading ? (
  [...Array(6)].map((_,i)=>(
    <div key={i} className="h-80 bg-slate-200 rounded-xl animate-pulse"></div>
  ))
) : filteredCourses.length ? filteredCourses.map(course => (

<div key={course.id}
className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group">

{/* IMAGE */}
<div className="relative h-48 overflow-hidden">
<img
  src={course.image}
  loading="lazy"
  onError={(e)=>e.target.src="https://via.placeholder.com/800x500?text=Course"}
  className="w-full h-full object-cover group-hover:scale-110 transition"
/>

{/* Hover Overlay */}
<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition">
<button className="bg-white p-2 rounded-full">
<PlayCircle/>
</button>
<button
onClick={()=>toggleWishlist(course.id)}
className="bg-white p-2 rounded-full">
<Heart className={wishlist.includes(course.id)?"fill-red-500 text-red-500":""}/>
</button>
</div>

{course.bestSeller && (
<span className="absolute top-3 left-3 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
BESTSELLER
</span>
)}
</div>

{/* CONTENT */}
<div className="p-5 space-y-3">

<span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
{course.category}
</span>

<h3 className="font-bold text-lg line-clamp-2">{course.title}</h3>
<p className="text-sm text-slate-500">{course.instructor}</p>

<div className="flex items-center gap-2">
<span className="font-bold text-amber-500">{course.rating}</span>
<div className="flex text-amber-400">
{[...Array(5)].map((_,i)=>(
<Star key={i} size={14} fill={i<Math.floor(course.rating)?"currentColor":"none"} />
))}
</div>
<span className="text-xs text-slate-400">({course.reviews})</span>
</div>

<div className="flex justify-between text-xs text-slate-500">
<span className="flex items-center gap-1"><Clock size={14}/>{course.duration}</span>
<span className="flex items-center gap-1"><Users size={14}/>{course.students}</span>
</div>

<div className="flex justify-between items-center pt-3 border-t">
<span className="text-xl font-bold">
{course.price===0?"Free":`₹${course.price}`}
</span>
<button className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700">
Enroll Now
</button>
</div>

</div>
</div>

)) : (

<div className="col-span-full text-center py-20">
<BookOpen size={60} className="mx-auto text-slate-300"/>
<h3 className="text-xl font-bold mt-4">No Courses Found</h3>
<p className="text-slate-500">Try different filters</p>
</div>

)}

</div>

</div>
);
};

export default CourseCategoryPage;
