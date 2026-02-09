import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Star,
  Users,
  BookOpen,
  DollarSign,
  MessageCircle,
  UserPlus,
  Linkedin,
  Twitter,
  Github,
  PlayCircle,
  Award
} from "lucide-react";

/* ---------------- DATA ---------------- */

const instructor = {
  name: "John Anderson",
  title: "Senior Web Development Instructor",
  bio: "I help students master web development with real-world projects and modern technologies.",
  avatar:
    "https://tse2.mm.bing.net/th/id/OIP.U0lavRZhl9Y5-e_-UiptAwHaHa?pid=Api&P=0&h=180",
  rating: 4.8,
  reviews: 1240,
  students: 35600,
  courses: 18,
  earnings: 125000,
  skills: ["React", "JavaScript", "Node.js", "Tailwind", "Next.js"]
};

const courses = [
  {
    id: 1,
    title: "Complete React Masterclass",
    students: 12500,
    rating: 4.9,
    price: 49,
    image:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee"
  },
  {
    id: 2,
    title: "JavaScript from Zero to Hero",
    students: 10200,
    rating: 4.7,
    price: 39,
    image:
      "https://tse2.mm.bing.net/th/id/OIP.Gf4YfYLdOCCG3RikV_uLAQHaD4?pid=Api&P=0&h=180"
  }
];

const reviews = [
  {
    id: 1,
    name: "Rahul Kumar",
    rating: 5,
    comment: "Excellent explanation and practical examples."
  },
  {
    id: 2,
    name: "Anita Sharma",
    rating: 4,
    comment: "Very helpful and easy to understand."
  }
];

/* ---------------- COMPONENT ---------------- */

export default function InstructorProfile() {
  const [tab, setTab] = useState("about");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl p-8 flex flex-col md:flex-row gap-8"
        >
          <img
            src={instructor.avatar}
            className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500"
          />

          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold">{instructor.name}</h1>
            <p className="text-gray-500">{instructor.title}</p>

            <div className="flex items-center gap-2">
              <Star className="text-yellow-400" />
              <span className="font-semibold">{instructor.rating}</span>
              <span className="text-gray-400">
                ({instructor.reviews} reviews)
              </span>
            </div>

            <p className="text-gray-600">{instructor.bio}</p>

            {/* Skills */}
            <div className="flex flex-wrap gap-2">
              {instructor.skills.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-full"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button className="flex items-center gap-2 px-5 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">
                <UserPlus size={18} /> Follow
              </button>
              <button className="flex items-center gap-2 px-5 py-2 border rounded-xl hover:bg-gray-100">
                <MessageCircle size={18} /> Message
              </button>
            </div>

            {/* Social */}
            <div className="flex gap-4 pt-2 text-gray-500">
              <Linkedin />
              <Twitter />
              <Github />
            </div>
          </div>
        </motion.div>

        {/* ================= STATS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={<Users />} label="Students" value={instructor.students} />
          <StatCard icon={<BookOpen />} label="Courses" value={instructor.courses} />
          <StatCard icon={<Award />} label="Rating" value={instructor.rating} />
          <StatCard icon={<DollarSign />} label="Earnings" value={`$${instructor.earnings}`} />
        </div>

        {/* ================= TABS ================= */}
        <div className="bg-white rounded-2xl shadow-xl">
          <div className="flex border-b">
            {["about", "courses", "reviews"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-4 font-semibold capitalize ${
                  tab === t
                    ? "border-b-4 border-indigo-600 text-indigo-600"
                    : "text-gray-500"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="p-6">

            {/* ABOUT */}
            {tab === "about" && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-gray-600 leading-relaxed"
              >
                {instructor.bio}
                <br /><br />
                Over 10 years of experience building scalable web
                applications and mentoring thousands worldwide.
              </motion.p>
            )}

            {/* COURSES */}
            {tab === "courses" && (
              <div className="grid md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    key={course.id}
                    className="relative group rounded-xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={course.image}
                      className="h-48 w-full object-cover"
                    />

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white">
                      <PlayCircle size={48} />
                      <p className="mt-2">Preview Course</p>
                    </div>

                    <div className="p-4 bg-white">
                      <h3 className="font-semibold">{course.title}</h3>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{course.students} students</span>
                        <span>⭐ {course.rating}</span>
                      </div>
                      <p className="font-bold text-indigo-600">
                        ${course.price}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* REVIEWS */}
            {tab === "reviews" && (
              <div className="space-y-4">
                {reviews.map((r) => (
                  <motion.div
                    key={r.id}
                    whileHover={{ scale: 1.02 }}
                    className="border rounded-xl p-4"
                  >
                    <h4 className="font-semibold">{r.name}</h4>
                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="text-yellow-400 w-4" />
                      ))}
                    </div>
                    <p className="text-gray-600">{r.comment}</p>
                  </motion.div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

/* ---------------- SMALL COMPONENT ---------------- */

function StatCard({ icon, label, value }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow p-4 flex items-center gap-3"
    >
      <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{label}</p>
        <p className="font-bold text-lg">{value}</p>
      </div>
    </motion.div>
  );
}
