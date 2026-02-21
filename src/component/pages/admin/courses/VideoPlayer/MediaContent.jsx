import React, { useState } from 'react';
import { 
  Maximize2, Save, Trash2, Clock, Trophy, FileText, 
  MessageSquare, PlayCircle, Download, Zap, Settings 
} from 'lucide-react';

const MediaContent = ({ 
  videoRef, activeVideo, isFocusMode, setIsFocusMode, 
  activeTab, setActiveTab, notes, currentNote, setCurrentNote, addNote, setNotes 
}) => {
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);

  // Helper to format video time (e.g., 125 -> "02:05")
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddNote = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (!currentNote.trim()) return;
      
      const currentTime = videoRef.current ? videoRef.current.currentTime : 0;
      
      addNote({
        id: Date.now(),
        text: currentNote,
        time: formatTime(currentTime),
        seconds: currentTime
      });
      setCurrentNote('');
    }
  };

  const changePlaybackRate = (rate) => {
    setPlaybackRate(rate);
    if (videoRef.current) videoRef.current.playbackRate = rate;
    setShowSpeedMenu(false);
  };

  const seekTo = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play();
    }
  };

  return (
    <div className={`transition-all duration-500 flex flex-col h-full bg-slate-950 overflow-y-auto no-scrollbar ${isFocusMode ? 'lg:w-0 lg:opacity-0' : 'flex-1'}`}>
      
      {/* --- Video Player Section --- */}
      <div className="w-full bg-black aspect-video relative group border-b border-slate-800 shadow-2xl">
        <video 
          ref={videoRef}
          key={activeVideo.id}
          controls 
          className="w-full h-full object-contain"
          poster={activeVideo.thumbnail}
        >
          <source src={activeVideo.videoUrl} type="video/mp4" />
        </video>
        
        {/* Top Overlay Controls */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="relative">
             <button 
              onClick={() => setShowSpeedMenu(!showSpeedMenu)}
              className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-blue-600 transition-colors flex items-center gap-1 text-xs font-bold"
            >
              <Zap size={16} className={playbackRate > 1 ? "text-yellow-400" : ""} />
              {playbackRate}x
            </button>
            
            {showSpeedMenu && (
              <div className="absolute top-full mt-2 right-0 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden shadow-xl z-50">
                {[1, 1.25, 1.5, 2].map((rate) => (
                  <button 
                    key={rate}
                    onClick={() => changePlaybackRate(rate)}
                    className="block w-full px-6 py-2 text-sm text-slate-300 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          <button 
            onClick={() => setIsFocusMode(true)}
            className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-blue-600 hover:scale-110 transition-all"
          >
            <Maximize2 size={20} />
          </button>
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-6 lg:p-10 max-w-5xl mx-auto w-full">
        
        {/* Navigation Tabs */}
        <div className="flex gap-8 border-b border-slate-800 mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'overview', icon: <PlayCircle size={18}/>, label: 'Overview' },
            { id: 'notes', icon: <FileText size={18}/>, label: 'Notes' },
            { id: 'resources', icon: <Download size={18}/>, label: 'Resources' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`pb-4 text-sm font-bold transition-all flex items-center gap-2 relative ${
                activeTab === tab.id ? 'text-blue-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.icon}
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
              )}
            </button>
          ))}
        </div>

        {/* Tab Content Rendering */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
          
          {/* Notes Tab */}
          {activeTab === 'notes' && (
            <div className="space-y-6">
              <div className="flex gap-3 p-1.5 bg-slate-900 rounded-2xl border border-slate-800 focus-within:ring-2 ring-blue-500/20 transition-all">
                <input 
                  type="text" 
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  onKeyDown={handleAddNote}
                  placeholder="Capture a thought at this moment..." 
                  className="flex-1 bg-transparent px-4 py-3 focus:outline-none text-slate-200 placeholder:text-slate-600"
                />
                <button 
                  onClick={handleAddNote}
                  className="bg-blue-600 px-6 py-2 rounded-xl hover:bg-blue-500 transition-all text-white font-bold flex items-center gap-2"
                >
                  <Save size={18} />
                  <span>Save</span>
                </button>
              </div>

              <div className="grid gap-3">
                {notes.length === 0 ? (
                  <div className="text-center py-20 bg-slate-900/20 border-2 border-dashed border-slate-800 rounded-3xl">
                    <FileText size={40} className="mx-auto text-slate-700 mb-4" />
                    <p className="text-slate-500 font-medium">No notes for this lesson yet.</p>
                  </div>
                ) : (
                  notes.map(note => (
                    <div key={note.id} className="group p-4 bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 rounded-2xl flex justify-between items-start transition-all">
                      <div className="flex gap-4">
                        <button 
                          onClick={() => seekTo(note.seconds)}
                          className="mt-0.5 text-xs font-mono bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg hover:bg-blue-500 hover:text-white transition-all whitespace-nowrap"
                        >
                          {note.time}
                        </button>
                        <p className="text-slate-300 leading-relaxed">{note.text}</p>
                      </div>
                      <button 
                        onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
                        className="text-slate-600 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="grid sm:grid-cols-2 gap-4">
              {activeVideo.resources?.map((res, index) => (
                <a 
                  key={index}
                  href={res.url} 
                  className="flex items-center justify-between p-5 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 hover:border-blue-500/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <Download size={20} />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{res.name}</p>
                      <p className="text-slate-500 text-xs">{res.size}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="max-w-4xl">
              <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
                {activeVideo.title}
              </h1>
              <div className="flex flex-wrap gap-4 mb-8">
                 <div className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                    <Clock size={16} className="text-blue-400"/>
                    <span className="text-sm font-bold text-slate-300">{activeVideo.duration}</span>
                 </div>
                 <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                    <Trophy size={16} className="text-emerald-400"/>
                    <span className="text-sm font-bold text-emerald-400">{activeVideo.xp} XP</span>
                 </div>
                 <div className="flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-xl border border-purple-500/20">
                    <Settings size={16} className="text-purple-400"/>
                    <span className="text-sm font-bold text-purple-400">Intermediate</span>
                 </div>
              </div>
              <p className="text-slate-400 text-lg leading-loose">
                {activeVideo.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MediaContent;
