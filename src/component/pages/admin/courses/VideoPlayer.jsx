import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, CheckCircle, FileText, Download, Globe, Clock, 
  Code2, Database, Layout, Server, BookOpen, ExternalLink,
  MessageSquare, Send, Terminal, Settings, Sidebar, 
  MoreVertical, ThumbsUp, HelpCircle, Bot, PenTool,
  Maximize2, Sparkles, Trophy, Save, Trash2
} from 'lucide-react';

const EnhancedLearningPlatform = () => {
  // --- STATE ---
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarTab, setSidebarTab] = useState('compiler');
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [code, setCode] = useState(`// Task: Create a function that greets the user\nfunction welcome(name) {\n  return "Welcome to DevMastery, " + name + "!";\n}\n\nconsole.log(welcome("Student"));`);
  const [output, setOutput] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  
  const videoRef = useRef(null);

  // --- DATA ---
  const courseData = {
    title: "Mastering Full-Stack Web Development 2026",
    progress: 68,
    curriculum: [
      { id: 1, title: "01. Advanced React Patterns", duration: "15:20", completed: true, xp: 150 },
      { id: 2, title: "02. Building Scalable Node APIs", duration: "22:45", completed: true, xp: 200 },
      { id: 3, title: "03. MongoDB Aggregation Pipelines", duration: "18:10", completed: false, xp: 250 },
    ]
  };

  const [activeVideo, setActiveVideo] = useState(courseData.curriculum[2]);

  // --- LOGIC ---
  const runCode = () => {
    setOutput(["Compiling environment...", "Running main.js...", "> Output: Welcome to DevMastery, Student!", "> Process finished with exit code 0"]);
  };

  const addNote = () => {
    if (!currentNote.trim()) return;
    const timestamp = videoRef.current ? Math.floor(videoRef.current.currentTime) : 0;
    const timeString = new Date(timestamp * 1000).toISOString().substr(14, 5);
    setNotes([{ id: Date.now(), text: currentNote, time: timeString }, ...notes]);
    setCurrentNote("");
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans flex flex-col overflow-hidden">
      
      {/* --- TOP NAVIGATION: Gamified --- */}
      <nav className="h-16 border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur-md flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-gradient-to-tr from-blue-600 to-cyan-400 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
              <Code2 size={22} className="text-white" />
            </div>
            <h1 className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              DEV<span className="text-blue-500 font-black">AI</span>
            </h1>
          </div>
          
          <div className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-slate-900/50 rounded-full border border-slate-800">
            <Trophy size={14} className="text-yellow-500" />
            <span className="text-xs font-bold text-slate-300">Level 12</span>
            <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-500 w-[70%]" />
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-12 hidden md:block">
          <div className="flex justify-between text-[10px] mb-1 font-bold text-slate-500 uppercase">
            <span>Course Completion</span>
            <span className="text-blue-400">{courseData.progress}%</span>
          </div>
          <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
            <div 
                className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-1000" 
                style={{ width: `${courseData.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-600/20">
            <Sparkles size={16} /> Upgrade Pro
          </button>
          <div className="h-9 w-9 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full border-2 border-slate-700 flex items-center justify-center font-bold text-xs text-white">JP</div>
        </div>
      </nav>

      {/* --- MAIN WORKSPACE --- */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* LEFT SIDE: Content focus */}
        <div className={`transition-all duration-500 flex flex-col h-full overflow-y-auto ${isFocusMode ? 'lg:w-0 lg:opacity-0' : 'flex-1'}`}>
          
          <div className="w-full bg-black aspect-video relative group">
            <video 
              ref={videoRef}
              key={activeVideo.id}
              controls 
              className="w-full h-full object-contain"
              poster="https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2000"
            >
              <source src={activeVideo.videoUrl} type="video/mp4" />
            </video>
            <button 
              onClick={() => setIsFocusMode(true)}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-blue-600"
              title="Enter Focus Mode"
            >
              <Maximize2 size={20} />
            </button>
          </div>

          <div className="p-6 lg:p-8">
            <div className="flex gap-6 border-b border-slate-800 mb-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
              {['Overview', 'Notes', 'Resources', 'Q&A'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`pb-4 text-sm font-bold transition-all relative ${
                    activeTab === tab.toLowerCase() ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {tab}
                  {activeTab === tab.toLowerCase() && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content: Notes logic solves student problem of forgetting lecture points */}
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              {activeTab === 'notes' && (
                <div className="space-y-6">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={currentNote}
                      onChange={(e) => setCurrentNote(e.target.value)}
                      placeholder="Take a timestamped note..." 
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-all"
                    />
                    <button onClick={addNote} className="bg-slate-800 p-3 rounded-xl hover:bg-blue-600 transition-colors">
                      <Save size={20} />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {notes.map(note => (
                      <div key={note.id} className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl flex justify-between items-center group">
                        <div className="flex gap-3 items-center">
                          <span className="text-xs font-mono bg-blue-500/20 text-blue-400 px-2 py-1 rounded-md">{note.time}</span>
                          <p className="text-sm text-slate-300">{note.text}</p>
                        </div>
                        <button className="text-slate-600 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{activeVideo.title}</h2>
                  <div className="flex gap-4 mb-6 text-xs font-medium text-slate-500">
                     <span className="flex items-center gap-1"><Clock size={14}/> {activeVideo.duration}</span>
                     <span className="flex items-center gap-1 text-emerald-400"><Trophy size={14}/> {activeVideo.xp} XP Available</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed max-w-3xl">
                    In this lesson, we dive deep into {activeVideo.title}. Students will understand the underlying architecture and best practices used in industry-standard production apps.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Interactive Tools */}
        <div className={`transition-all duration-500 bg-[#0f172a] border-l border-slate-800/60 flex flex-col ${isFocusMode ? 'w-full' : 'w-full lg:w-[500px]'}`}>
          
          <div className="flex bg-[#0f172a] p-1 border-b border-slate-800">
            {[
              { id: 'compiler', icon: Terminal, label: 'IDE' },
              { id: 'curriculum', icon: Sidebar, label: 'Course' },
              { id: 'ai', icon: Bot, label: 'DevAI' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSidebarTab(tab.id)}
                className={`flex-1 py-3 flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-wider transition-all rounded-lg ${
                  sidebarTab === tab.id ? 'bg-blue-600/10 text-blue-400' : 'text-slate-500 hover:bg-slate-800/50'
                }`}
              >
                <tab.icon size={16} /> {tab.label}
              </button>
            ))}
            {isFocusMode && (
              <button onClick={() => setIsFocusMode(false)} className="px-4 text-slate-400 hover:text-white transition-colors">
                Exit Focus
              </button>
            )}
          </div>

          <div className="flex-1 flex flex-col overflow-hidden">
            {sidebarTab === 'compiler' && (
              <div className="flex-1 flex flex-col bg-[#050a18]">
                <div className="flex items-center justify-between px-4 py-2 bg-[#0a1120] border-b border-slate-800/50">
                  <div className="flex items-center gap-4">
                     <span className="text-[10px] font-mono text-slate-500">main.js</span>
                     <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                     </div>
                  </div>
                  <button 
                    onClick={runCode}
                    className="flex items-center gap-2 px-4 py-1 bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-black rounded-md transition-all shadow-lg shadow-blue-600/10"
                  >
                    <Play size={12} fill="currentColor" /> RUN SCRIPT
                  </button>
                </div>
                
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 bg-transparent text-blue-100/90 p-6 font-mono text-sm resize-none outline-none leading-relaxed selection:bg-blue-500/30"
                  spellCheck="false"
                />

                <div className="h-40 bg-[#020617] border-t border-slate-800 p-4 font-mono text-xs">
                  <p className="text-slate-500 mb-2 uppercase text-[10px] font-bold tracking-widest">System Output</p>
                  <div className="space-y-1 overflow-y-auto h-full pb-4">
                    {output.map((line, i) => (
                      <div key={i} className={line.startsWith('>') ? 'text-emerald-400' : 'text-slate-400'}>
                        {line}
                      </div>
                    ))}
                    {output.length === 0 && <span className="text-slate-700">Waiting for execution...</span>}
                  </div>
                </div>
              </div>
            )}

            {sidebarTab === 'curriculum' && (
              <div className="flex-1 overflow-y-auto">
                {courseData.curriculum.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveVideo(item)}
                    className={`w-full flex items-center gap-4 p-5 text-left border-b border-slate-800/30 transition-all ${
                      activeVideo.id === item.id ? 'bg-blue-600/5 border-l-2 border-blue-500' : 'hover:bg-slate-800/30'
                    }`}
                  >
                    {item.completed ? (
                      <div className="bg-emerald-500/10 p-1.5 rounded-full"><CheckCircle size={16} className="text-emerald-500" /></div>
                    ) : (
                      <div className="w-8 h-8 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">{index + 1}</div>
                    )}
                    <div className="flex-1">
                      <p className={`text-sm font-bold ${activeVideo.id === item.id ? 'text-blue-400' : 'text-slate-300'}`}>{item.title}</p>
                      <span className="text-[10px] text-slate-500 uppercase tracking-tight">{item.duration} • {item.xp} XP</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {sidebarTab === 'ai' && (
              <div className="flex-1 flex flex-col p-6 items-center justify-center text-center">
                 <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 animate-pulse" />
                    <Bot size={60} className="text-blue-400 relative z-10" />
                 </div>
                 <h3 className="text-xl font-bold mb-2">DevMaster AI</h3>
                 <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                   I can explain the code at <span className="text-blue-400">04:20</span> or help you debug the `welcome` function in your editor.
                 </p>
                 <div className="w-full flex gap-2">
                    <input placeholder="Ask me anything..." className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500" />
                    <button className="bg-blue-600 p-2 rounded-lg"><Send size={18}/></button>
                 </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EnhancedLearningPlatform;