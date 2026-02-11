import React, { useState } from 'react';
import { 
  Play, CheckCircle, FileText, Download, Globe, Clock, 
  Code2, Database, Layout, Server, BookOpen, ExternalLink 
} from 'lucide-react';

const VideoPlayer = () => {
  // 1. Specialized Full-Stack Course Data
  const courseData = {
    title: "Mastering Full-Stack Web Development 2026",
    instructor: "Angela Yu",
    description: "Go from zero to a professional Full-Stack developer. You will learn the 'Big Three': React for the Frontend, Node.js for the Backend, and MongoDB for the Database. This course includes 5 real-world projects, including a SaaS Dashboard and a Social Media API.",
    rating: 4.9,
    lastUpdated: "Feb 2026",
    language: "English",
    // Documentation/Reading Materials
    docs: [
      { title: "React Hooks Cheat Sheet", type: "PDF", link: "#" },
      { title: "REST API Best Practices", type: "Markdown", link: "#" },
      { title: "Database Schema Design Guide", type: "PDF", link: "#" }
    ],
    curriculum: [
      { 
        id: 1, 
        title: "Frontend: Advanced React Patterns", 
        duration: "15:20", 
        completed: true, 
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4", // Sample Tech Video
        content: "Detailed breakdown of useMemo, useCallback, and custom hooks for performance optimization."
      },
      { 
        id: 2, 
        title: "Backend: Building Scalable Node.js APIs", 
        duration: "22:45", 
        completed: true, 
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4", 
        content: "Setting up Express middleware, JWT authentication, and error handling for production."
      },
      { 
        id: 3, 
        title: "Database: MongoDB Aggregation Pipelines", 
        duration: "18:10", 
        completed: false, 
        videoUrl: "https://vjs.zencdn.net/v/oceans.mp4",
        content: "Mastering complex queries and data transformation directly within the database layer."
      },
      { 
        id: 4, 
        title: "Deployment: Docker & CI/CD Pipelines", 
        duration: "30:00", 
        completed: false, 
        videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
        content: "Containerizing your MERN app and deploying it to AWS using GitHub Actions."
      },
    ]
  };

  const [activeVideo, setActiveVideo] = useState(courseData.curriculum[0]);
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans">
      {/* HEADER */}
      <nav className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-500/20">
            <Code2 size={24} className="text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm md:text-lg text-white leading-none">{courseData.title}</h1>
            <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Module: {activeVideo.title.split(':')[0]}</p>
          </div>
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto flex flex-col lg:flex-row">
        
        {/* LEFT SIDE: PLAYER & DOCS */}
        <div className="flex-1 lg:max-w-[75%] border-r border-slate-800">
          {/* Video Container */}
          <div className="relative aspect-video bg-black group">
            <video 
              key={activeVideo.id}
              controls 
              className="w-full h-full"
              autoPlay
            >
              <source src={activeVideo.videoUrl} type="video/mp4" />
            </video>
          </div>

          {/* Details Section */}
          <div className="p-6 md:p-10 bg-[#0f172a]">
            <div className="flex gap-6 border-b border-slate-800 mb-8 overflow-x-auto no-scrollbar">
              {[
                {id: 'overview', label: 'Overview', icon: BookOpen},
                {id: 'docs', label: 'Documentation', icon: FileText},
                {id: 'resources', label: 'Project Files', icon: Download},
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 pb-4 text-sm font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id ? 'border-b-2 border-blue-500 text-blue-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              {activeTab === 'overview' && (
                <div className="max-w-4xl">
                  <h2 className="text-2xl font-bold text-white mb-4">{activeVideo.title}</h2>
                  <p className="text-slate-400 leading-relaxed text-lg mb-8">{activeVideo.content}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-slate-800 pt-8">
                    <div className="bg-slate-800/40 p-4 rounded-xl">
                      <Clock className="text-blue-400 mb-2" size={20} />
                      <span className="block text-xs text-slate-500 uppercase font-bold">Last Updated</span>
                      <span className="text-sm text-white">{courseData.lastUpdated}</span>
                    </div>
                    <div className="bg-slate-800/40 p-4 rounded-xl">
                      <Globe className="text-green-400 mb-2" size={20} />
                      <span className="block text-xs text-slate-500 uppercase font-bold">Language</span>
                      <span className="text-sm text-white">{courseData.language}</span>
                    </div>
                    <div className="bg-slate-800/40 p-4 rounded-xl">
                      <Layout className="text-purple-400 mb-2" size={20} />
                      <span className="block text-xs text-slate-500 uppercase font-bold">Certificate</span>
                      <span className="text-sm text-white">Professional Grade</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courseData.docs.map((doc, i) => (
                    <a key={i} href={doc.link} className="group p-5 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-blue-500 hover:bg-slate-800 transition-all flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <FileText size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-white">{doc.title}</h4>
                          <span className="text-xs text-slate-500 font-medium tracking-wide uppercase">{doc.type} Guide</span>
                        </div>
                      </div>
                      <ExternalLink size={18} className="text-slate-600 group-hover:text-blue-400" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: COURSE CONTENT */}
        <div className="w-full lg:w-[25%] bg-[#1e293b] overflow-y-auto lg:h-[calc(100vh-73px)]">
          <div className="p-6 bg-[#1e293b] border-b border-slate-700 sticky top-0 z-10">
            <h3 className="text-white font-bold flex items-center justify-between">
              Course Content
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[10px] rounded-md uppercase font-black">MERN STACK</span>
            </h3>
          </div>
          
          <div className="flex flex-col">
            {courseData.curriculum.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveVideo(item)}
                className={`group flex items-start gap-4 p-5 text-left border-b border-slate-700/50 transition-all ${
                  activeVideo.id === item.id ? 'bg-blue-600/10 border-l-4 border-l-blue-500' : 'hover:bg-slate-800'
                }`}
              >
                <div className="mt-1">
                  {item.completed ? (
                    <CheckCircle size={18} className="text-emerald-400" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-slate-600 flex items-center justify-center text-[10px] text-slate-500 font-bold group-hover:border-blue-400 group-hover:text-blue-400 transition-colors">
                      {index + 1}
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold mb-1 ${activeVideo.id === item.id ? 'text-blue-400' : 'text-slate-300'}`}>
                    {item.title}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[11px] text-slate-500">
                      <Play size={10} /> {item.duration}
                    </span>
                    {index === 2 && <Database size={12} className="text-amber-500" />}
                    {index === 1 && <Server size={12} className="text-emerald-500" />}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPlayer;