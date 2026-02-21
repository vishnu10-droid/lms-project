import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Archive, Search, Plus } from 'lucide-react';   // ✅ FIXED IMPORTS

const CourseAdd = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
    resource: '',
    imageUrl: '',
    playlistLink: '',
    price: 0,
    category: 'Development',
    level: 'Beginner',
    isFeatured: false,
    tags: ''
  });

  const [search, setSearch] = useState("");  // ✅ FIXED search state

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse({
      ...course,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6  min-h-screens font-sans text-slate-900">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="absolute -top-10 -right-10 w-60 h-60 bg-indigo-500/30 rounded-full blur-3xl"
        />

        {/* Left Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <motion.h1
            initial={{ x: -25 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 60 }}
            className="text-4xl font-extrabold tracking-tight bg-gradient-to-r 
                       from-blue-500 via-indigo-500 to-purple-600 bg-clip-text 
                       text-transparent drop-shadow-lg"
          >
            Course Management
          </motion.h1>

          <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mt-1">
            Admin Mode
          </p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search name..."
            className="pl-10 pr-4 py-2.5 bg-white border-none rounded-2xl shadow-sm 
                       focus:ring-2 focus:ring-indigo-500 w-full md:w-64 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Add Button */}
        {/* <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-2.5 rounded-2xl shadow-lg shadow-indigo-200 transition-all">
          <Plus size={24} /> 
        </button> */}

      </div>

      {/* FORM START */}
      <div className="max-w-7xl mx-auto">

        <form className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
          <div className="p-8 space-y-8">

            {/* Section 1 */}
            <section>
              <h3 className="text-lg font-bold text-indigo-600 mb-4 border-b pb-2">
                1. Basic Details
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-lg p-2 
                               focus:border-indigo-500 outline-none transition"
                    placeholder="e.g., Master React in 30 Days"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-lg p-2 
                               focus:border-indigo-500 outline-none"
                    placeholder="Detailed syllabus..."
                  ></textarea>
                </div>

              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h3 className="text-lg font-bold text-indigo-600 mb-4 border-b pb-2">
                2. Classification & Pricing
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-lg p-2"
                    placeholder="0 for Free"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-lg p-2"
                  >
                    <option>Development</option>
                    <option>Design</option>
                    <option>Business</option>
                    <option>Marketing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    name="level"
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-lg p-2"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                  </select>
                </div>

              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h3 className="text-lg font-bold text-indigo-600 mb-4 border-b pb-2">
                3. Media & Assets
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Thumbnail URL
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-lg p-2"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Playlist Link
                  </label>
                  <input
                    type="text"
                    name="playlistLink"
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-lg p-2"
                    placeholder="YouTube/Vimeo Link"
                  />
                </div>

              </div>
            </section>

            {/* Section 4 */}
            <section className="bg-slate-50 p-4 rounded-xl">

              <div className="flex flex-wrap items-center justify-between gap-4">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-indigo-600 
                                  peer-checked:after:translate-x-full after:content-[''] 
                                  after:absolute after:top-[2px] after:left-[2px] 
                                  after:bg-white after:border-gray-300 after:border
                                  after:rounded-full after:h-5 after:w-5 after:transition-all">
                  </div>
                  <span className="ml-3 text-sm font-bold text-slate-700">
                    Feature on Homepage
                  </span>
                </label>

                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Search Tags
                  </label>
                  <input
                    type="text"
                    name="tags"
                    onChange={handleChange}
                    className="w-full border-2 border-slate-200 rounded-lg p-2"
                    placeholder="React, Frontend, WebDev (comma separated)"
                  />
                </div>

              </div>
            </section>

          </div>

          {/* FOOTER */}
          <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              className="px-6 py-2 font-semibold text-slate-600 hover:text-slate-800 transition"
            >
              Discard
            </button>

            <button
              type="submit"
              className="px-10 py-2 bg-indigo-600 text-white font-bold rounded-lg 
                         hover:bg-indigo-700 shadow-md active:scale-95 transition"
            >
              Save & Publish
            </button>
          </div>

        </form>
      </div>

    </div>
  );
};

export default CourseAdd;