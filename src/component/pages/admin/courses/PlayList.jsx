

import React, { useState } from 'react';
import { 
  PlayCircle, ThumbsUp, Eye, Star, Trash2, Edit, 
  CheckCircle2, MessageSquare, Share2, Bookmark, 
  ChevronRight, Play, FileText, Download, Plus, Settings
} from 'lucide-react';

const PlayList = ({ userRole = 'admin' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentVideo, setCurrentVideo] = useState({
    id: 1,
    title: "01. Introduction to React Hooks & Modern State",
    description: "Deep dive into the world of functional components. We'll cover why hooks were introduced, the rules of hooks, and how to migrate from class components effectively.",
    views: "12,540",
    likes: "1.2K",
    rating: 4.9,
    duration: "15:20",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  });

  const lessons = [
    { id: 1, title: "01. Introduction to React Hooks", views: "12K", duration: "15:20", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&q=80", completed: true },
    { id: 2, title: "02. Deep Dive into useEffect", views: "8K", duration: "22:10", thumbnail: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=200&q=80", completed: true },
    { id: 3, title: "03. Custom Hooks Patterns", views: "5K", duration: "18:45", thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=200&q=80", completed: false },
    { id: 4, title: "04. Context API vs Redux", views: "4.2K", duration: "30:00", thumbnail: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=200&q=80", completed: false },
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* LMS TOP NAVIGATION */}
  
      <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:h-[calc(100vh-64px)]">
        
        {/* MAIN VIDEO AREA (Left 8 Columns) */}
        <main className="lg:col-span-8 overflow-y-auto custom-scrollbar bg-white dark:bg-slate-900 lg:border-r border-slate-200 dark:border-slate-700">
          <div className="aspect-video w-full bg-black shadow-2xl sticky top-0 z-10">
            <iframe className="w-full h-full" src={currentVideo.url} title="LMS Player" frameBorder="0" allowFullScreen></iframe>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">{currentVideo.title}</h2>
                <div className="flex items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5"><Eye size={16} className="text-indigo-500"/> {currentVideo.views} Students</span>
                  <span className="flex items-center gap-1.5"><Star size={16} className="text-yellow-500 fill-yellow-500"/> {currentVideo.rating} Rating</span>
                </div>
              </div>

              {/* ADMIN ACTION GROUP */}
              {(userRole === 'admin' || userRole === 'teacher') && (
                <div className="flex bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-100 dark:border-slate-700 shadow-inner">
                  <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all"><Edit size={14}/> Edit</button>
                  <div className="w-[1px] bg-slate-200 dark:bg-slate-700 mx-1 my-1"></div>
                  <button className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={14}/> Delete</button>
                </div>
              )}
            </div>

            {/* LMS TABS SYSTEM */}
            <div className="flex border-b border-slate-100 dark:border-slate-700 mb-8">
              {['overview', 'resources', 'reviews', 'announcements'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 text-sm font-bold capitalize transition-all relative ${
                    activeTab === tab ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'
                  }`}
                >
                  {tab}
                  {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full"></div>}
                </button>
              ))}
            </div>

            <div className="space-y-6 min-h-[400px]">
              {activeTab === 'overview' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h4 className="font-bold text-lg mb-3">Lesson Description</h4>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-8">{currentVideo.description}</p>
                  
                  {/* Discussion Component */}
                  <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-6 border border-slate-100 dark:border-slate-700">
                    <h4 className="font-bold mb-4 flex items-center gap-2"><MessageSquare size={18}/> Discussion</h4>
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex-shrink-0"></div>
                      <div className="flex-1">
                        <textarea className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ask a question about this lesson..."></textarea>
                        <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md shadow-indigo-100">Post Comment</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in zoom-in-95 duration-300">
                  <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-900 hover:border-indigo-200 dark:hover:border-indigo-400/50 cursor-pointer transition-all shadow-sm group">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-red-50 text-red-500 rounded-xl group-hover:bg-red-500 group-hover:text-white transition-all"><FileText size={20}/></div>
                      <div><p className="text-sm font-bold">Exercise_Files.zip</p><p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">12.5 MB • ZIP Archive</p></div>
                    </div>
                    <Download size={18} className="text-slate-300 dark:text-slate-500"/>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* PLAYLIST SIDEBAR (Right 4 Columns) */}
        <aside className="lg:col-span-4 flex flex-col h-full bg-[#f8fafc] dark:bg-slate-950">
          <div className="p-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-end">
                <div>
                    <h3 className="font-black text-xl text-slate-800 dark:text-slate-100">Course Content</h3>
                    <p className="text-xs text-indigo-600 dark:text-indigo-300 font-bold uppercase tracking-widest mt-1">25% Complete</p>
                </div>
                <Settings size={18} className="text-slate-400 dark:text-slate-500 cursor-pointer hover:rotate-90 transition-all duration-500"/>
            </div>
            <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full mt-4 overflow-hidden">
              <div className="bg-indigo-500 h-full w-1/4 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {lessons.map((lesson) => (
              <div 
                key={lesson.id}
                onClick={() => setCurrentVideo({...currentVideo, id: lesson.id, title: lesson.title})}
                className={`flex gap-4 p-3 rounded-2xl cursor-pointer transition-all duration-300 group ${
                  currentVideo.id === lesson.id 
                  ? 'bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-black/30 ring-1 ring-indigo-100 dark:ring-indigo-400/40' 
                  : 'hover:bg-white dark:hover:bg-slate-900 hover:shadow-md'
                }`}
              >
                <div className="relative flex-shrink-0 overflow-hidden rounded-xl">
                  <img src={lesson.thumbnail} alt="thumb" className="w-24 h-16 object-cover" />
                  <div className={`absolute inset-0 bg-indigo-600/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                    <PlayCircle size={24} className="text-white fill-indigo-600" />
                  </div>
                  {lesson.completed && (
                    <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-0.5 shadow-sm">
                      <CheckCircle2 size={10} strokeWidth={4} />
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col justify-center flex-1 min-w-0">
                  <h4 className={`text-sm font-bold truncate ${currentVideo.id === lesson.id ? 'text-indigo-600 dark:text-indigo-300' : 'text-slate-700 dark:text-slate-200'}`}>
                    {lesson.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-[11px] font-bold text-slate-400 dark:text-slate-500">
                    <span className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded uppercase tracking-tighter">HD</span>
                    <span>{lesson.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Teacher Contact Info (LMS touch) */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-100/50 dark:border-indigo-400/30">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-xs">JD</div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-100">Support Online</p>
                <p className="text-[10px] text-indigo-500 dark:text-indigo-300 font-bold uppercase">Average response: 2h</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PlayList;
