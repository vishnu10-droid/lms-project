import React, { useState, useEffect } from "react";
import uploadImg from "../../../../assets/upload.png";

import {
  Plus, Trash2, Video, FileText, Layout, Save, Eye, Rocket,
  Upload, Check, DollarSign, Star, GripVertical, BookOpen,
  Award, Globe, Zap, BarChart3, Clock, Users
} from "lucide-react";

/* ---------------- PREMIUM STYLES WITH HOVER ---------------- */

const inputStyle =
  "w-full px-5 py-3.5 rounded-2xl border border-slate-200 bg-white/60 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all placeholder:text-slate-400 font-medium hover:bg-white hover:border-indigo-300";

const btnPrimary =
  "bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:shadow-xl hover:shadow-indigo-300 hover:brightness-110 active:scale-95 transition-all";

const btnSecondary =
  "bg-white border border-slate-200 px-6 py-3.5 rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-50 hover:border-indigo-200 active:scale-95 transition-all shadow-sm";

const cardBase =
  "bg-gradient-to-br from-white via-indigo-50/20 to-violet-50/20 border border-indigo-100/40 rounded-[2.5rem] shadow-[0_25px_80px_-20px_rgba(79,70,229,0.25)]";

const softCard =
  "bg-white/50 border border-slate-200 rounded-3xl shadow-sm transition-all duration-300 hover:bg-white hover:border-indigo-300 hover:shadow-md group";

const statCard =
  "bg-white border border-indigo-50 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-indigo-300 hover:-translate-y-1 cursor-default";

/* ---------------- COMPONENT ---------------- */

export default function AddCourseBuilder() {
  const [step, setStep] = useState(1);
  const [isSaved, setIsSaved] = useState(false);
  const [course, setCourse] = useState({
    title: "", price: "49", category: "Web Development",
    level: "Beginner", description: "", thumbnail: null, preview: null, slug: ""
  });
  const [lessons, setLessons] = useState([{ id: 1, title: "Welcome to the Course", type: "video" }]);
  const [newLesson, setNewLesson] = useState("");

  useEffect(() => {
    const slug = course.title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    setCourse((p) => ({ ...p, slug }));
  }, [course.title]);

  const uploadThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) setCourse({ ...course, preview: URL.createObjectURL(file) });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 text-slate-900 font-sans">
      
      {/* ---------------- TOP BAR ---------------- */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border border-white/20 rounded-3xl p-4 flex justify-between items-center shadow-sm max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2.5 rounded-xl text-white shadow-lg shadow-indigo-200">
            <Layout size={20} />
          </div>
          <div>
            <h2 className="font-bold text-slate-800">Studio Pro</h2>
            <p className="text-[10px] uppercase tracking-wider text-indigo-500 font-bold">Live Editor</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={() => setIsSaved(true)} className={btnSecondary}>
            {isSaved ? <Check size={18} className="text-green-500" /> : <Save size={18} />}
            <span className="hidden sm:inline">{isSaved ? "Saved" : "Save Draft"}</span>
          </button>
          <button className={btnPrimary}>
            <Rocket size={18} />
            <span className="hidden sm:inline">Publish</span>
          </button>
        </div>
      </header>

      {/* ---------------- STATS ---------------- */}
      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 mb-8 max-w-7xl mx-auto">
        {[
          { label: "Current Step", val: `${step}/3`, icon: <BarChart3 size={20}/> },
          { label: "Est. Duration", val: "2.4 hrs", icon: <Clock size={20}/> },
          { label: "Total Modules", val: lessons.length, icon: <BookOpen size={20}/> },
          { label: "Course Tier", val: "Premium", icon: <Award size={20}/> }
        ].map((s, i) => (
          <div key={i} className={`${statCard} p-4 flex items-center gap-4`}>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              {s.icon}
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{s.label}</p>
              <p className="font-bold text-slate-700">{s.val}</p>
            </div>
          </div>
        ))}
      </div>

      <main className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex bg-slate-200/50 backdrop-blur-sm p-1.5 rounded-2xl w-fit">
            {["Basic Info", "Curriculum", "Marketing"].map((s, i) => (
              <button
                key={i}
                onClick={() => setStep(i + 1)}
                className={`px-6 py-2.5 rounded-xl font-bold transition-all duration-300 ${
                  step === i + 1 ? "bg-white text-indigo-600 shadow-sm scale-100" : "text-slate-500 hover:text-indigo-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className={`${cardBase} p-8 backdrop-blur-sm`}>
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <label className="group relative h-64 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer overflow-hidden bg-slate-50 transition-all hover:bg-indigo-50/50 hover:border-indigo-300">
                  {uploadImg ? (
                    <img src={uploadImg} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="Preview"/>
                  ) : (
                    <div className="text-center">
                      <div className="bg-white p-4 rounded-full shadow-sm mb-3 mx-auto w-fit transition-transform group-hover:scale-110">
                        <Upload size={30} className="text-indigo-500" />
                      </div>
                      <p className="text-sm font-bold text-slate-500">Upload Cover Image</p>
                    </div>
                  )}
                  <input hidden type="file" onChange={uploadThumbnail} />
                </label>

                <input className={inputStyle} placeholder="Course Title" value={course.title} onChange={(e) => setCourse({ ...course, title: e.target.value })} />
                <textarea rows="4" className={inputStyle} placeholder="Course Description" value={course.description} onChange={(e) => setCourse({ ...course, description: e.target.value })} />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className={softCard + " p-5"}>
                    <p className="font-bold mb-3 text-sm flex items-center gap-2 text-slate-600"><DollarSign size={16}/> Course Price</p>
                    <input type="number" className={inputStyle} value={course.price} onChange={(e) => setCourse({ ...course, price: e.target.value })} />
                  </div>
                  <div className={softCard + " p-5"}>
                    <p className="font-bold mb-3 text-sm flex items-center gap-2 text-slate-600"><Zap size={16}/> Difficulty Level</p>
                    <select className={inputStyle} value={course.level} onChange={(e) => setCourse({ ...course, level: e.target.value })}>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Expert</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {lessons.map((l, i) => (
                  <div key={l.id} className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-100 transition-all hover:border-indigo-300 hover:shadow-md hover:shadow-indigo-100/50">
                    <GripVertical className="text-slate-300 cursor-grab group-hover:text-indigo-300" />
                    <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                      {l.type === "video" ? <Video size={18}/> : <FileText size={18}/>}
                    </div>
                    <input className="flex-1 bg-transparent outline-none font-bold text-slate-700" value={l.title} onChange={(e) => {
                      const n = [...lessons]; n[i].title = e.target.value; setLessons(n);
                    }} />
                    <button onClick={() => setLessons(lessons.filter((x) => x.id !== l.id))} className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <input className={inputStyle} placeholder="Add new module title..." value={newLesson} onChange={(e) => setNewLesson(e.target.value)} />
                  <button className={btnPrimary} onClick={() => {
                    if (newLesson) {
                      setLessons([...lessons, { id: Date.now(), title: newLesson, type: "video" }]);
                      setNewLesson("");
                    }
                  }}><Plus /> Add</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className={`${softCard} p-6 flex items-center gap-4`}>
                  <div className="p-3 bg-indigo-600 text-white rounded-2xl"><Globe /></div>
                  <div>
                    <p className="font-bold text-slate-700">Public URL</p>
                    <p className="text-indigo-500 font-medium">academy.com/{course.slug || "your-course"}</p>
                  </div>
                </div>
                <div className={`${softCard} p-6 flex justify-between items-center`}>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl"><Star /></div>
                    <div>
                      <p className="font-bold text-slate-700">Featured Course</p>
                      <p className="text-xs text-slate-400 font-medium italic">Boost visibility on the homepage</p>
                    </div>
                  </div>
                  <div className="w-14 h-7 bg-slate-200 rounded-full relative cursor-pointer hover:bg-indigo-200 transition-colors">
                    <div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full shadow-sm" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PREVIEW */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-indigo-100/20 overflow-hidden transition-all hover:shadow-2xl hover:shadow-indigo-200/40">
            <div className="h-52 bg-slate-100 relative group overflow-hidden">
              {course.preview ? (
                <img src={course.preview} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Thumbnail Preview"/>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-300"><Video size={48} /></div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase text-indigo-600 shadow-sm">Preview</div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1.5 text-indigo-500 bg-indigo-50 px-2 py-1 rounded-lg">
                  <Users size={14} /> 0 Students
                </div>
                <div className="flex items-center gap-1.5 text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">
                  <Star size={14} fill="currentColor" /> Brand New
                </div>
              </div>

              <h3 className="text-xl font-black text-slate-800 leading-tight">
                {course.title || "Untitled Course Strategy"}
              </h3>

              <p className="text-slate-400 text-sm line-clamp-2 font-medium">
                {course.description || "Start typing your description to see how it looks to your future students..."}
              </p>

              <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">One-time payment</p>
                  <span className="text-3xl font-black text-indigo-600">${course.price}</span>
                </div>
                <button className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-indigo-600 transition-colors shadow-lg shadow-slate-200">
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}