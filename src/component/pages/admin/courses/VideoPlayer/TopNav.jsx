import React from 'react';
import { Trophy, Sparkles, Bell, LayoutDashboard, ChevronDown } from 'lucide-react';
import logo from "../../../../../assets/fevicon.png";

const TopNav = ({ progress, userLevel = 12, userXP = 70 }) => {
  return (
    <nav className="h-16 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-xl flex items-center justify-between px-6 z-50 sticky top-0">
      
      {/* --- Left Section: Branding & Gamification --- */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-slate-900 p-2 rounded-xl border border-slate-700/50 group-hover:scale-105 transition-transform">
              <img src={logo} alt="AISCHOLAR Logo" className="w-5 h-5 object-contain" />
            </div>
          </div>
          <h1 className="font-bold text-lg tracking-tight hidden sm:block">
            <span className="text-white">AI</span>
            <span className="text-blue-500 font-black">SCHOLAR</span>
          </h1>
        </div>

        {/* User Level Badge */}
        <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 bg-slate-900/80 rounded-full border border-slate-800 shadow-inner">
          <div className="p-1 bg-yellow-500/10 rounded-full">
            <Trophy size={14} className="text-yellow-500" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex justify-between items-center gap-4">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Level {userLevel}</span>
               <span className="text-[10px] font-bold text-yellow-500">{userXP}%</span>
            </div>
            <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 transition-all duration-1000 ease-out" 
                style={{ width: `${userXP}%` }}
              />
            </div>
          </div>
        </div>
      </div>



      {/* --- Right Section: Actions & Profile --- */}
      <div className="flex items-center gap-4">
        {/* Streak/Notifications */}
        <div className="hidden sm:flex items-center gap-2 mr-2">
           <button className="p-2 text-slate-400 hover:text-orange-400 transition-colors relative group">
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-slate-950"></span>
              <Bell size={20} />
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Notifications</span>
           </button>
        </div>

        <button className="hidden sm:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-95">
          <Sparkles size={14} className="animate-pulse" /> Upgrade
        </button>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-2 pl-4 border-l border-slate-800 group cursor-pointer">
          <div className="relative">
            <div className="h-9 w-9 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-xl border border-white/10 flex items-center justify-center font-bold text-xs text-white shadow-lg rotate-3 group-hover:rotate-0 transition-transform">
              JP
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-slate-950 rounded-full"></div>
          </div>
          <ChevronDown size={14} className="text-slate-500 group-hover:text-white transition-colors" />
        </div>
      </div>
    </nav>
  );
};

export default TopNav;