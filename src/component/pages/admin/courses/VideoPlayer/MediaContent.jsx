import React, { useRef } from 'react';
import { Maximize2, Save, Trash2, Clock, Trophy, FileText, MessageSquare, PlayCircle } from 'lucide-react';

const MediaContent = ({ 
  videoRef, activeVideo, isFocusMode, setIsFocusMode, 
  activeTab, setActiveTab, notes, currentNote, setCurrentNote, addNote, setNotes 
}) => {

  // Helper to format video time (e.g., 125 -> "02:05")
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddNote = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (!currentNote.trim()) return;
      
      const timestamp = videoRef.current ? formatTime(videoRef.current.currentTime) : "00:00";
      const rawSeconds = videoRef.current ? videoRef.current.currentTime : 0;
      
      addNote({
        id: Date.now(),
        text: currentNote,
        time: timestamp,
        seconds: rawSeconds
      });
      setCurrentNote('');
    }
  };

  const seekTo = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className={`transition-all duration-500 flex flex-col h-full bg-slate-950 overflow-y-auto ${isFocusMode ? 'lg:w-0 lg:opacity-0' : 'flex-1'}`}>
      
      {/* Video Player Section */}
      <div className="w-full bg-black aspect-video relative group border-b border-slate-800">
        <video 
          ref={videoRef}
          key={activeVideo.id}
          controls 
          className="w-full h-full object-contain"
          poster={activeVideo.thumbnail || "https://images.unsplash.com/photo-1516116216624-53e697fedbea?q=80&w=2000"}
        >
          <source src={activeVideo.videoUrl} type="video/mp4" />
        </video>
        
        <button 
          onClick={() => setIsFocusMode(true)}
          title="Enter Focus Mode"
          className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-all text-white hover:bg-blue-600 hover:scale-110"
        >
          <Maximize2 size={20} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 lg:p-8 max-w-5xl mx-auto w-full">
        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-slate-800 mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', icon: <PlayCircle size={16}/>, label: 'Overview' },
            { id: 'notes', icon: <FileText size={16}/>, label: 'Notes' },
            { id: 'q&a', icon: <MessageSquare size={16}/>, label: 'Q&A' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-semibold transition-all flex items-center gap-2 relative ${
                activeTab === tab.id ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="flex gap-3 p-1 bg-slate-900 rounded-2xl border border-slate-800 focus-within:border-blue-500/50 transition-colors">
                <input 
                  type="text" 
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  onKeyDown={handleAddNote}
                  placeholder="Take a note at this timestamp..." 
                  className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-slate-200"
                />
                <button 
                  onClick={handleAddNote}
                  className="bg-blue-600 p-3 rounded-xl hover:bg-blue-500 transition-all text-white shadow-lg shadow-blue-900/20"
                >
                  <Save size={20} />
                </button>
              </div>

              <div className="space-y-3">
                {notes.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed border-slate-800 rounded-2xl">
                    <p className="text-slate-500">No notes yet. Start typing to save important moments!</p>
                  </div>
                ) : (
                  notes.map(note => (
                    <div key={note.id} className="p-4 bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-xl flex justify-between items-center group transition-all">
                      <div className="flex gap-4 items-center">
                        <button 
                          onClick={() => seekTo(note.seconds)}
                          className="text-xs font-mono bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-lg hover:bg-blue-500 hover:text-white transition-all flex items-center gap-1"
                        >
                          <Clock size={12} /> {note.time}
                        </button>
                        <p className="text-sm text-slate-300 font-medium">{note.text}</p>
                      </div>
                      <button 
                        onClick={() => deleteNote(note.id)}
                        className="text-slate-600 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="prose prose-invert max-w-none">
              <h2 className="text-3xl font-bold text-white mb-4">{activeVideo.title}</h2>
              <div className="flex gap-6 mb-8 items-center">
                 <span className="flex items-center gap-2 text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full text-xs font-bold border border-slate-800">
                   <Clock size={14} className="text-blue-400"/> {activeVideo.duration}
                 </span>
                 <span className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-500/20">
                   <Trophy size={14}/> {activeVideo.xp} XP Available
                 </span>
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">
                {activeVideo.description || `In this lesson, we dive deep into ${activeVideo.title}. You will learn the core concepts, practical implementations, and industry best practices.`}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaContent;