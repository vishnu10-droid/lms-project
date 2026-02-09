import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Highly recommended: npm install framer-motion

const CourseAddPage = () => {
  const [activeTab, setActiveTab] = useState('basics');
  const [isDragging, setIsDragging] = useState(false);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    category: '',
    level: 'beginner',
    price: '',
    thumbnail: null,
    lessons: []
  });

  const fileInputRef = useRef(null);
  const categories = ['Programming', 'Business', 'Mathematics', 'Design', 'Marketing', 'Health'];

  // --- Helpers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseData(prev => ({ ...prev, [name]: value }));
  };

  const handleThumbnailUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setCourseData(prev => ({ ...prev, thumbnail: e.target.result }));
      reader.readAsDataURL(file);
    }
  };

  const addLessons = (files) => {
    const newLessons = Array.from(files).map(file => ({
      id: crypto.randomUUID(),
      name: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
      fileName: file.name,
      size: (file.size / (1024 * 1024)).toFixed(1),
      type: file.type.split('/')[0],
      isPreview: false
    }));
    setCourseData(prev => ({ ...prev, lessons: [...prev.lessons, ...newLessons] }));
  };

  const removeLesson = (id) => {
    setCourseData(prev => ({
      ...prev,
      lessons: prev.lessons.filter(l => l.id !== id)
    }));
  };

  const togglePreview = (id) => {
    setCourseData(prev => ({
      ...prev,
      lessons: prev.lessons.map(l => l.id === id ? { ...l, isPreview: !l.isPreview } : l)
    }));
  };

  // --- UI Components ---
  const FormInput = ({ label, children }) => (
    <div className="group">
      <label className="block text-sm font-bold text-slate-700 mb-2 group-focus-within:text-indigo-600 transition-colors">
        {label}
      </label>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] flex font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col p-8 fixed h-full">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
          </div>
          <span className="text-xl font-bold tracking-tight">Lumina Learn</span>
        </div>
        
        <nav className="space-y-1.5">
          {[
            { id: 'basics', icon: '📝', label: 'Basics' },
            { id: 'media', icon: '🖼️', label: 'Media' },
            { id: 'curriculum', icon: '🎓', label: 'Curriculum' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto p-5 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="flex justify-between items-end mb-2">
            <p className="text-xs font-bold text-slate-500 uppercase">Setup Progress</p>
            <p className="text-xs font-bold text-indigo-600">65%</p>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} className="bg-indigo-500 h-full" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-72 p-6 md:p-12">
        <div className="max-w-5xl mx-auto">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-black text-slate-900 mb-2">Create Course</h1>
              <p className="text-slate-500 font-medium">Step {activeTab === 'basics' ? '1' : activeTab === 'media' ? '2' : '3'} of 3: {activeTab.toUpperCase()}</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="text-slate-600 font-bold hover:text-indigo-600 transition-colors">Drafts</button>
              <button className="px-8 py-3.5 rounded-2xl bg-indigo-600 text-white font-bold shadow-xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all active:scale-95">
                Publish Course
              </button>
            </div>
          </header>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
            <div className="xl:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'basics' && (
                    <section className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-slate-100 space-y-8">
                      <FormInput label="Course Title">
                        <input 
                          type="text" name="title" value={courseData.title} onChange={handleInputChange}
                          className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl transition-all outline-none text-lg font-medium"
                          placeholder="e.g. Advanced Python Patterns"
                        />
                      </FormInput>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormInput label="Category">
                          <select name="category" value={courseData.category} onChange={handleInputChange} className="w-full p-4 bg-slate-50 rounded-2xl outline-none appearance-none border-2 border-transparent focus:border-indigo-500">
                            <option value="">Select Category</option>
                            {categories.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
                          </select>
                        </FormInput>
                        <FormInput label="Price (USD)">
                          <input name="price" type="number" value={courseData.price} onChange={handleInputChange} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500" placeholder="49.99" />
                        </FormInput>
                      </div>

                      <FormInput label="Course Description">
                        <textarea rows="6" name="description" value={courseData.description} onChange={handleInputChange} className="w-full p-4 bg-slate-50 rounded-2xl outline-none border-2 border-transparent focus:border-indigo-500" placeholder="Explain what students will learn..."></textarea>
                      </FormInput>
                    </section>
                  )}

                  {activeTab === 'media' && (
                    <section className="bg-white rounded-[2rem] p-10 shadow-sm border border-slate-100">
                      <h3 className="text-xl font-bold mb-6">Course Thumbnail</h3>
                      <div 
                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(e) => { e.preventDefault(); setIsDragging(false); handleThumbnailUpload(e.dataTransfer.files[0]); }}
                        onClick={() => fileInputRef.current.click()}
                        className={`relative border-3 border-dashed rounded-[2rem] p-12 text-center transition-all cursor-pointer ${isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200 hover:border-indigo-300'}`}
                      >
                        {courseData.thumbnail ? (
                          <div className="relative group overflow-hidden rounded-2xl">
                            <img src={courseData.thumbnail} className="w-full max-h-80 object-cover" alt="Preview" />
                            <div className="absolute inset-0 bg-indigo-600/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <p className="text-white font-bold">Replace Image</p>
                            </div>
                          </div>
                        ) : (
                          <div className="py-10">
                            <div className="w-20 h-20 bg-indigo-100 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
                              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <p className="text-lg font-bold text-slate-700">Drop your image here</p>
                            <p className="text-slate-400">or click to browse from files</p>
                          </div>
                        )}
                        <input type="file" ref={fileInputRef} hidden onChange={(e) => handleThumbnailUpload(e.target.files[0])} accept="image/*" />
                      </div>
                    </section>
                  )}

                  {activeTab === 'curriculum' && (
                    <section className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold">Course Content</h3>
                        <button onClick={() => fileInputRef.current.click()} className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-indigo-600 transition-colors">+ Add File</button>
                      </div>

                      <div className="space-y-4">
                        {courseData.lessons.length > 0 ? (
                          courseData.lessons.map((lesson, idx) => (
                            <motion.div layout key={lesson.id} className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 group">
                              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm font-bold text-indigo-600">{idx + 1}</div>
                              <div className="flex-1">
                                <input 
                                  className="w-full bg-transparent font-bold text-slate-700 outline-none"
                                  value={lesson.name}
                                  onChange={(e) => {
                                    const updated = [...courseData.lessons];
                                    updated[idx].name = e.target.value;
                                    setCourseData({...courseData, lessons: updated});
                                  }}
                                />
                                <div className="flex gap-3 mt-1">
                                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{lesson.type}</span>
                                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{lesson.size} MB</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <button 
                                  onClick={() => togglePreview(lesson.id)}
                                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${lesson.isPreview ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-600'}`}
                                >
                                  {lesson.isPreview ? 'Preview' : 'Locked'}
                                </button>
                                <button onClick={() => removeLesson(lesson.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-center py-16 border-2 border-dashed border-slate-100 rounded-[2rem]">
                            <p className="text-slate-400 font-medium">Your curriculum is empty. Add your first lesson!</p>
                          </div>
                        )}
                      </div>
                      <input type="file" ref={fileInputRef} hidden multiple onChange={(e) => addLessons(e.target.files)} />
                    </section>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Sidebar Preview */}
            <aside className="xl:col-span-1">
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/50 sticky top-12 border border-slate-100">
                <div className="aspect-video bg-slate-100 relative">
                  {courseData.thumbnail ? (
                    <img src={courseData.thumbnail} className="w-full h-full object-cover" alt="Preview" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300 font-bold">No Preview Available</div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-black uppercase text-indigo-600 shadow-sm">Preview Mode</span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-tighter bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded">
                      {courseData.category || 'General'}
                    </span>
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter italic">
                      • {courseData.level}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2">
                    {courseData.title || 'Your Course Title Here'}
                  </h4>
                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Price</p>
                      <p className="text-2xl font-black text-slate-900">${courseData.price || '0.00'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Lessons</p>
                      <p className="text-lg font-bold text-slate-700">{courseData.lessons.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseAddPage;