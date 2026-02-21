import { useState, useMemo } from "react";
import {
  ChevronLeft, ChevronRight, Plus, X, Users, Video,
  FileText, Check, Calendar as CalIcon, Target, Trash2, Search, Download, AlertCircle, Edit3, Clock, Layout
} from "lucide-react";
import { motion } from "framer-motion"; // Dynamic Animations

// Types and Config
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const eventTypes = [
  { label: "Lecture", color: "bg-blue-500/15 text-blue-600 border-blue-200" },
  { label: "Lab", color: "bg-emerald-500/15 text-emerald-600 border-emerald-200" },
  { label: "Exam", color: "bg-rose-500/15 text-rose-600 border-rose-200" },
  { label: "Workshop", color: "bg-amber-500/15 text-amber-600 border-amber-200" },
];

const typeStyle = {
  Lecture: "bg-blue-500/10 text-blue-600 border-blue-200 hover:bg-blue-500/20",
  Lab: "bg-emerald-500/10 text-emerald-600 border-emerald-200 hover:bg-emerald-500/20",
  Exam: "bg-rose-500/10 text-rose-600 border-rose-200 hover:bg-rose-500/20",
  Workshop: "bg-amber-500/10 text-amber-600 border-amber-200 hover:bg-amber-500/20",
};

const initialEvents = [
  { id: 1, title: "ML Fundamentals", date: new Date(2026, 1, 23), time: "09:00", duration: "2h", type: "Lecture", instructor: "Dr. Sarah Chen" },
  { id: 2, title: "React Patterns Lab", date: new Date(2026, 1, 25), time: "14:00", duration: "3h", type: "Lab", instructor: "Marcus Johnson" },
  { id: 3, title: "Data Science Midterm", date: new Date(2026, 1, 27), time: "10:00", duration: "2.5h", type: "Exam", instructor: "Priya Patel" },
  { id: 4, title: "UI/UX Workshop", date: new Date(2026, 1, 21), time: "11:00", duration: "4h", type: "Workshop", instructor: "Emma Wilson" },
  { id: 5, title: "Cloud Computing", date: new Date(2026, 1, 24), time: "10:00", duration: "1h", type: "Lecture", instructor: "Dr. Singh" },
];

export default function Schedule() {
  const realToday = new Date();
  const [viewDate, setViewDate] = useState(new Date(realToday.getFullYear(), realToday.getMonth(), 1));
  const [events, setEvents] = useState(initialEvents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", type: "Lecture", instructor: "" });

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthProgress = Math.round((realToday.getDate() / daysInMonth) * 100);

  const calDays = useMemo(() => {
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(new Date(year, month, d));
    return days;
  }, [year, month, firstDay, daysInMonth]);

  const filteredEvents = events.filter(e =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getEventsForDay = (d) => filteredEvents.filter(e => e.date.toDateString() === d.toDateString());

  const addEvent = () => {
    if (!newEvent.title || !newEvent.date) return;
    const dateObj = new Date(newEvent.date);
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
   
    if (isEditing) {
      setEvents(events.map(e => e.id === isEditing ? { ...newEvent, id: isEditing, date: dateObj, duration: newEvent.duration || "1h" } : e));
    } else {
      setEvents([...events, { id: Date.now(), ...newEvent, date: dateObj, duration: "1h" }]);
    }
    setShowAddModal(false);
    setIsEditing(null);
    setNewEvent({ title: "", date: "", time: "", type: "Lecture", instructor: "" });
  };

  const handleEditClick = (event) => {
    const formattedDate = event.date.toISOString().split('T')[0];
    setNewEvent({ ...event, date: formattedDate });
    setIsEditing(event.id);
    setSelectedEvent(null);
    setShowAddModal(true);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6 bg-slate-50/50 min-h-screens text-slate-900">
      {/* Dynamic Background Shapes */}
      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
       
        {/* Header Section */}
        {/* ========== NEW ATTRACTIVE PARALLAX HEADER ========== */}
<header className=" flex-col md:flex-row  justify-between gap-4 mb-8">

  {/* Floating Glow (Parallax) */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    className="absolute -top-14 -right-14 w-56 h-56 bg-indigo-500/30 
               rounded-full blur-3xl"
  />

  {/* Header Content */}
  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-20">

    {/* Left — Title + Subtitle */}
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="space-y-2"
    >
      <motion.h1
        initial={{ x: -25 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 60 }}
        className="text-4xl font-extrabold tracking-tight 
                   bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 
                   bg-clip-text text-transparent drop-shadow-lg"
      >
        Workforce Planner
      </motion.h1>

      <p className="text-sm text-slate-600 font-medium">
        Precision academic management system
      </p>
    </motion.div>

    {/* Search + Button */}
    <div className="flex flex-wrap items-center gap-4 bg-white/60 backdrop-blur-xl 
                    p-3 rounded-3xl border border-white shadow-xl shadow-slate-200/50">

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 
                           text-slate-400 group-focus-within:text-blue-500 transition" />
        <input
          type="text"
          placeholder="Search resources..."
          className="pl-11 pr-6 py-3 bg-white border-none rounded-[1.8rem] text-sm 
                     focus:ring-2 focus:ring-blue-500/20 outline-none transition-all 
                     w-64 shadow-inner"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Add Event Button */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        onClick={() => { 
            setIsEditing(null); 
            setNewEvent({ title: "", date: "", time: "", type: "Lecture", instructor: "" }); 
            setShowAddModal(true); 
        }}
        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700
                 text-white px-8 py-3 rounded-[1.8rem] font-bold text-sm 
                 shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all"
      >
        <Plus className="w-4 h-4" /> New Event
      </motion.button>

    </div>
  </div>
</header>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Calendar View */}
          <div className="xl:col-span-3 bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-2xl shadow-slate-200/60 overflow-hidden animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="flex items-center justify-between p-8 border-b border-slate-50 bg-gradient-to-b from-white to-transparent">
              <div className="flex items-center gap-8">
                <div className="space-y-1">
                   <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                    {MONTHS[month]} <span className="text-blue-600/30">{year}</span>
                  </h2>
                </div>
                <div className="flex bg-slate-100/50 backdrop-blur-sm rounded-2xl p-1.5 border border-slate-200/50">
                  <button onClick={() => setViewDate(new Date(year, month - 1, 1))} className="p-2.5 hover:bg-white rounded-xl transition-all hover:shadow-md active:scale-90"><ChevronLeft className="w-5 h-5 text-slate-600" /></button>
                  <button onClick={() => setViewDate(new Date(year, month + 1, 1))} className="p-2.5 hover:bg-white rounded-xl transition-all hover:shadow-md active:scale-90"><ChevronRight className="w-5 h-5 text-slate-600" /></button>
                </div>
              </div>
              <button onClick={() => setViewDate(new Date(realToday.getFullYear(), realToday.getMonth(), 1))} className="group flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl font-black text-xs hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                <Target className="w-4 h-4 group-hover:rotate-12 transition-transform" /> TODAY
              </button>
            </div>

            <div className="grid grid-cols-7 bg-slate-50/30 backdrop-blur-md">
              {DAYS.map(d => (
                <div key={d} className="py-4 text-center text-[11px] font-black text-slate-400 uppercase tracking-[0.25em]">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 border-t border-slate-50">
              {calDays.map((d, i) => {
                const isToday = d && d.toDateString() === realToday.toDateString();
                const dayEvents = d ? getEventsForDay(d) : [];
                const hasExam = dayEvents.some(e => e.type === "Exam");

                return (
                  <div key={i} className={`group/cell min-h-[120px] p-3 border-b border-r border-slate-50 transition-all duration-500 ${d ? "bg-white hover:bg-blue-50/30" : "bg-slate-50/20"}`}>
                    {d && (
                      <div className="h-full flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                          <span className={`flex items-center justify-center w-8 h-8 text-xs font-black rounded-xl transition-all duration-500 ${isToday ? "bg-blue-600 text-white shadow-xl shadow-blue-300 ring-4 ring-blue-50" : "text-slate-400 group-hover/cell:text-blue-600"}`}>
                            {d.getDate()}
                          </span>
                          {hasExam && (
                            <div className="relative">
                               <div className="absolute inset-0 bg-rose-500 animate-ping rounded-full opacity-20" />
                               <AlertCircle className="w-4 h-4 text-rose-500 relative z-10" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          {dayEvents.slice(0, 2).map(e => (
                            <button key={e.id} onClick={() => setSelectedEvent(e)}
                                    className={`w-full text-left text-[10px] font-bold px-3 py-1.5 rounded-xl border transition-all truncate animate-in slide-in-from-left-2 ${typeStyle[e.type]}`}>
                              {e.title}
                            </button>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="flex items-center gap-1.5 pl-1">
                              <span className="w-1 h-1 rounded-full bg-slate-300" />
                              <p className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">+{dayEvents.length - 2} more</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000">
            {/* Circular Progress */}
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50 text-center relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative inline-flex items-center justify-center mb-4 scale-110">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                  <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent"
                    strokeDasharray={251.2} strokeDashoffset={251.2 - (251.2 * monthProgress) / 100}
                    className="text-blue-600 transition-all duration-1000 ease-out" strokeLinecap="round" />
                </svg>
                <span className="absolute text-xl font-black text-slate-800">{monthProgress}%</span>
              </div>
              <h3 className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Completion Rate</h3>
            </div>

            {/* Saved Events List */}
            <div className="bg-white/70 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/50 flex flex-col h-[400px]">
              <h3 className="font-black text-slate-800 text-xs mb-6 uppercase tracking-widest flex items-center gap-3 px-2">
                <span className="p-2 bg-slate-100 rounded-lg"><Clock className="w-3 h-3 text-blue-600" /></span>
                Agenda List
              </h3>
              <div className="space-y-4 overflow-y-auto pr-2 flex-1 custom-scrollbar">
                {events.length === 0 ? (
                  <div className="text-center py-12">
                     <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                        <CalIcon className="w-5 h-5 text-slate-300" />
                     </div>
                     <p className="text-[10px] text-slate-400 font-bold uppercase">Empty Schedule</p>
                  </div>
                ) : (
                  events.sort((a,b) => a.date - b.date).map((e, idx) => (
                    <div
                      key={e.id}
                      onClick={() => setSelectedEvent(e)}
                      style={{ animationDelay: `${idx * 100}ms` }}
                      className="group cursor-pointer p-4 rounded-3xl bg-white border border-slate-100 hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300 animate-in slide-in-from-bottom-2"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[8px] font-black uppercase px-2.5 py-1 rounded-full ${typeStyle[e.type].split(' ')[0]} ${typeStyle[e.type].split(' ')[1]}`}>
                          {e.type}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">{e.time}</span>
                      </div>
                      <h4 className="text-[12px] font-black text-slate-800 truncate transition-colors group-hover:text-blue-600">{e.title}</h4>
                      <p className="text-[10px] text-slate-400 font-medium mt-1 flex items-center gap-1">
                        <Users className="w-2.5 h-2.5" /> {e.instructor}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white rounded-[3rem] w-full max-w-sm overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] animate-in zoom-in-95 duration-300 border border-white">
            <div className={`p-10 ${typeStyle[selectedEvent.type]} border-none relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <button onClick={() => setSelectedEvent(null)} className="absolute top-8 right-8 p-2.5 bg-white/20 hover:bg-white/40 rounded-full backdrop-blur-md transition-all"><X className="w-4 h-4 text-slate-900" /></button>
              <span className="px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm text-[10px] font-black uppercase tracking-widest text-slate-900">{selectedEvent.type}</span>
              <h3 className="text-4xl font-black mt-8 leading-tight text-slate-900 tracking-tighter">{selectedEvent.title}</h3>
            </div>
            <div className="p-10 space-y-8 bg-white">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Time Slot</p>
                  <p className="text-md font-black text-slate-800">{selectedEvent.time}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Length</p>
                  <p className="text-md font-black text-slate-800">{selectedEvent.duration}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Lead Professional</p>
                <p className="text-md font-black text-slate-800">{selectedEvent.instructor}</p>
              </div>
             
              <div className="flex flex-col gap-3 pt-4">
                <button onClick={() => handleEditClick(selectedEvent)} className="w-full flex items-center justify-center gap-2 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all">
                  <Edit3 className="w-4 h-4" /> Edit Details
                </button>
                <button onClick={() => { setEvents(events.filter(e => e.id !== selectedEvent.id)); setSelectedEvent(null); }} className="w-full flex items-center justify-center gap-2 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-xs hover:bg-rose-100 transition-all">
                  <Trash2 className="w-4 h-4" /> Cancel Session
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Modal Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out forwards; }
      `}</style>

      {/* Add Modal remains functionally the same but with enhanced 3.0 styling */}
      {showAddModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white rounded-[3rem] w-full max-w-md shadow-2xl border border-white animate-in slide-in-from-bottom-8 duration-500">
             <div className="px-10 py-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
               <h2 className="text-2xl font-black text-slate-900 tracking-tight">{isEditing ? "Modify Event" : "Create Event"}</h2>
               <button onClick={() => { setShowAddModal(false); setIsEditing(null); }} className="p-3 bg-white hover:bg-rose-50 hover:text-rose-500 rounded-2xl shadow-sm transition-all"><X className="w-5 h-5" /></button>
             </div>
             <div className="p-10 space-y-6">
               <div className="space-y-2">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Title</label>
                 <input type="text" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} placeholder="Session name..." className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-500/20 focus:bg-white rounded-[1.5rem] text-sm outline-none transition-all" />
               </div>
               <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Date</label>
                   <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-[1.5rem] text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Start</label>
                   <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({...newEvent, time: e.target.value})} className="w-full p-4 bg-slate-50 border-none rounded-[1.5rem] text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional</label>
                 <input type="text" value={newEvent.instructor} onChange={(e) => setNewEvent({...newEvent, instructor: e.target.value})} placeholder="Lead name..." className="w-full p-4 bg-slate-50 border-none rounded-[1.5rem] text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
               </div>
               <div className="flex flex-wrap gap-2 pt-2">
                 {eventTypes.map(t => (
                   <button key={t.label} onClick={() => setNewEvent({...newEvent, type: t.label})}
                           className={`py-2.5 px-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${newEvent.type === t.label ? t.color + " border-current scale-105" : "bg-slate-50 border-transparent text-slate-400"}`}>
                     {t.label}
                   </button>
                 ))}
               </div>
               <button onClick={addEvent} className="w-full py-5 bg-slate-900 text-white rounded-[1.8rem] font-black text-sm shadow-2xl hover:bg-blue-600 hover:-translate-y-1 transition-all mt-6 active:scale-95">
                 {isEditing ? "Update Schedule" : "Finalize Event"}
               </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
}