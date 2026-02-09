import React, { useState } from "react";
import { 
  Search, Phone, MapPin, Mail, CheckCircle, 
  Trash2, XCircle, Edit3, MoreVertical, Globe 
} from "lucide-react";

const AdminStudents = () => {
  const [students] = useState([
    { id: 1, name: "Amit Sharma", email: "amit.s@edu.com", mobile: "+91 98765-43210", address: "New Delhi, DL", pic: "https://i.pravatar.cc/150?img=1", courses: ["Math", "Science"], status: "active" },
    { id: 2, name: "Priya Verma", email: "priya.v@edu.com", mobile: "+91 88776-55443", address: "Mumbai, MH", pic: "https://i.pravatar.cc/150?img=5", courses: ["English"], status: "inactive" },
    { id: 3, name: "Rohit Singh", email: "rohit.ai@edu.com", mobile: "+91 77665-99880", address: "Bangalore, KA", pic: "https://i.pravatar.cc/150?img=3", courses: ["Physics"], status: "active" },
    { id: 4, name: "Sana Khan", email: "sana.dev@edu.com", mobile: "+91 99001-12233", address: "Hyderabad, TS", pic: "https://i.pravatar.cc/150?img=9", courses: ["Biology"], status: "active" },
    { id: 5, name: "Vikas Yadav", email: "vikas.y@edu.com", mobile: "+91 91223-34455", address: "Pune, MH", pic: "https://i.pravatar.cc/150?img=12", courses: ["Computer"], status: "inactive" },
    { id: 6, name: "Neha Gupta", email: "neha.g@edu.com", mobile: "+91 88990-01122", address: "Kolkata, WB", pic: "https://i.pravatar.cc/150?img=16", courses: ["UI/UX"], status: "active" },
    // ... rest of the 12 students
  ]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* 🚀 3-COLUMN COMPACT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student) => (
            <div
              key={student.id}
              style={{ height: "100px" }}
              className="group relative flex items-center bg-white rounded-xl border border-slate-200 py-3 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all overflow-hidden"
            >
              {/* Left: Avatar with Status Indicator */}
              <div className="relative flex-shrink-0 mr-4">
                <img
                  src={student.pic}
                  alt={student.name}
                  className="ring-slate-50"
                />
                <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                  student.status === "active" ? "bg-emerald-500" : "bg-amber-500"
                }`}>
                  {student.status === "active" ? 
                    <CheckCircle size={8} className="text-white" /> : 
                    <XCircle size={8} className="text-white" />
                  }
                </div>
              </div>

              {/* Middle: Core Information */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-[13px] font-black text-slate-800 truncate leading-tight">
                    {student.name}
                  </h3>
                  {/* <span className="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-1.5 rounded">
                    #{student.id}
                  </span> */}
                </div>

                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 truncate font-medium">
                    <Mail size={10} className="text-slate-400" /> {student.email}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-700 font-bold">
                    <Phone size={10} className="text-indigo-400" /> {student.mobile}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-500 truncate">
                    <MapPin size={10} className="text-slate-400" /> {student.address}
                  </div>
                </div>
              </div>

              {/* Course Badge (Bottom Right) */}
              <div className="absolute bottom-2 right-3">
                <span className="text-[8px] font-black tracking-tighter text-slate-400 border border-slate-100 px-1.5 py-0.5 rounded bg-slate-50 uppercase">
                  {student.courses[0]}
                </span>
              </div>

              {/* Hover Sidebar Actions */}
              <div className="absolute right-0 top-0 bottom-0 w-10 bg-slate-900 translate-x-full group-hover:translate-x-0 transition-transform duration-200 flex flex-col items-center justify-center gap-3">
                <button className="text-white hover:text-indigo-400 transition-colors">
                  <Edit3 size={14} />
                </button>
                <button className="text-rose-400 hover:text-rose-200 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
              
              {/* Subtle visual cue for more actions */}
              <div className="group-hover:hidden absolute right-1 top-1/2 -translate-y-1/2 text-slate-300">
                <MoreVertical size={14} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminStudents;