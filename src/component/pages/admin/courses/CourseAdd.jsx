import React, { useState } from 'react';

const CoureseAdd = () => {
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse({ 
      ...course, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-extrabold text-slate-800">Course Management</h1>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Admin Mode</span>
        </div>

        <form className="bg-white shadow-xl rounded-2xl overflow-hidden border border-slate-200">
          <div className="p-8 space-y-8">
            
            {/* --- Section 1: Basic Info --- */}
            <section>
              <h3 className="text-lg font-bold text-indigo-600 mb-4 border-b pb-2">1. Basic Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Course Title</label>
                  <input type="text" name="title" onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-indigo-500 outline-none transition" placeholder="e.g., Master React in 30 Days" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Description</label>
                  <textarea name="description" rows="3" onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2 focus:border-indigo-500 outline-none" placeholder="Detailed syllabus..."></textarea>
                </div>
              </div>
            </section>

            {/* --- Section 2: Admin Extras (New) --- */}
            <section>
              <h3 className="text-lg font-bold text-indigo-600 mb-4 border-b pb-2">2. Classification & Pricing</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Price ($)</label>
                  <input type="number" name="price" onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2" placeholder="0 for Free" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Category</label>
                  <select name="category" onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2">
                    <option>Development</option>
                    <option>Design</option>
                    <option>Business</option>
                    <option>Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Difficulty Level</label>
                  <select name="level" onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Expert</option>
                  </select>
                </div>
              </div>
            </section>

            {/* --- Section 3: Media & Assets --- */}
            <section>
              <h3 className="text-lg font-bold text-indigo-600 mb-4 border-b pb-2">3. Media & Assets</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Thumbnail URL</label>
                  <input type="text" name="imageUrl" onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2" placeholder="https://..." />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Playlist Link</label>
                  <input type="text" name="playlistLink" onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2" placeholder="YouTube/Vimeo Link" />
                </div>
              </div>
            </section>

            {/* --- Section 4: Settings & Visibility --- */}
            <section className="bg-slate-50 p-4 rounded-xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" name="isFeatured" onChange={handleChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                    <span className="ml-3 text-sm font-bold text-slate-700">Feature on Homepage</span>
                  </label>
                </div>
                
                <div className="w-full md:w-1/2">
                  <label className="block text-sm font-bold text-slate-700 mb-1">Search Tags</label>
                  <input type="text" name="tags" onChange={handleChange} className="w-full border-2 border-slate-200 rounded-lg p-2" placeholder="React, Frontend, WebDev (comma separated)" />
                </div>
              </div>
            </section>

          </div>

          <div className="bg-slate-50 p-6 border-t border-slate-200 flex justify-end gap-3">
            <button type="button" className="px-6 py-2 font-semibold text-slate-600 hover:text-slate-800 transition">Discard</button>
            <button type="submit" className="px-10 py-2 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 shadow-md active:transform active:scale-95 transition">Save & Publish</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoureseAdd;