import React from 'react';
import { Code2, Trophy, Sparkles } from 'lucide-react';

const TopNav = ({ progress }) => {
  return (
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
          <span className="text-blue-400">{progress}%</span>
        </div>
        <div className="h-2 w-full bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
          <div 
              className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full transition-all duration-1000" 
              style={{ width: `${progress}%` }}
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
  );
};

export default TopNav;