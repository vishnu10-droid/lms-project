import React, { useState } from "react";
import { 
  User, Shield, Mail, Phone, MapPin, Edit3, 
  Key, LogOut, Bell, Globe, Activity, CheckCircle2,
  Lock, Smartphone, Camera,
  ChevronRight
} from "lucide-react";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const adminInfo = {
    name: "Dr. Vikram Sethi",
    role: "Super Administrator",
    email: "vikram.sethi@lms-edu.com",
    phone: "+91 98765-43210",
    location: "New Delhi, India",
    accessLevel: "Level 10 (Full System Access)",
    joined: "January 2024",
    avatar: "VS"
  };

  return (
    <div className="min-h-screen bg-[#fcfdfe] p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* 👤 Profile Header Card */}
        <div className="relative bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 mb-8 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-[2rem] flex items-center justify-center text-4xl font-black text-white shadow-2xl shadow-indigo-200 transition-transform group-hover:scale-105">
                {adminInfo.avatar}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-indigo-600 hover:bg-indigo-50 transition-colors">
                <Camera size={18} />
              </button>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                <h1 className="text-3xl font-black text-slate-900">{adminInfo.name}</h1>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-black uppercase tracking-wider rounded-full border border-indigo-100">
                  <Shield size={12} /> {adminInfo.role}
                </span>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 font-medium">
                <p className="flex items-center gap-1.5"><Mail size={16} /> {adminInfo.email}</p>
                <p className="flex items-center gap-1.5"><MapPin size={16} /> {adminInfo.location}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 transition-all"
              >
                <Edit3 size={18} /> {isEditing ? "Save Profile" : "Edit Profile"}
              </button>
              <button className="p-3 bg-rose-50 text-rose-600 rounded-2xl hover:bg-rose-100 transition-colors">
                <LogOut size={22} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 🔐 Sidebar: Security & Account */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <Lock className="text-indigo-600" size={20} /> Security Settings
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 rounded-2xl group transition-all">
                  <div className="flex items-center gap-3">
                    <Key size={18} className="text-slate-400 group-hover:text-indigo-600" />
                    <span className="text-sm font-bold text-slate-700">Change Password</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-300" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-indigo-50 rounded-2xl group transition-all">
                  <div className="flex items-center gap-3">
                    <Smartphone size={18} className="text-slate-400 group-hover:text-indigo-600" />
                    <span className="text-sm font-bold text-slate-700">2FA Authentication</span>
                  </div>
                  <span className="text-[10px] font-black bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md">ACTIVE</span>
                </button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-200">
              <h3 className="font-black text-xl mb-4">System Access</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-80">Database Admin</span>
                  <CheckCircle2 size={16} className="text-emerald-400" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-80">Revenue Analytics</span>
                  <CheckCircle2 size={16} className="text-emerald-400" />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-80">Course Moderation</span>
                  <CheckCircle2 size={16} className="text-emerald-400" />
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-xs font-medium opacity-60 italic text-center">
                  Permissions managed by Root Owner
                </p>
              </div>
            </div>
          </div>

          {/* 📈 Main Content: Activity & Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <div className="flex gap-6 border-b border-slate-100 mb-8">
                {["Overview", "Activity Log", "Preferences"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-4 text-sm font-black transition-all relative ${
                      activeTab === tab.toLowerCase() ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    {tab}
                    {activeTab === tab.toLowerCase() && (
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>

              {activeTab === "overview" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Actions Taken</p>
                    <p className="text-3xl font-black text-slate-900">1,284</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Admin Level</p>
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-black text-slate-900">10</p>
                      <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">SUPER</span>
                    </div>
                  </div>
                  <div className="md:col-span-2 p-6 bg-indigo-50/50 rounded-3xl border border-indigo-100">
                     <h4 className="font-bold text-indigo-900 mb-2 flex items-center gap-2">
                       <Activity size={18} /> Recent Login Activity
                     </h4>
                     <p className="text-sm text-indigo-700 font-medium">
                       Last login from Chrome on Windows 11 (IP: 103.24.xx.xxx) at 10:45 AM today.
                     </p>
                  </div>
                </div>
              )}

              {activeTab === "activity log" && (
                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                  {[
                    { event: "Approved Refund Request #902", time: "2 hours ago", icon: <DollarSign size={14}/> },
                    { event: "Modified Course: React Masterclass", time: "5 hours ago", icon: <Edit3 size={14}/> },
                    { event: "System Backup Initiated", time: "Yesterday", icon: <Globe size={14}/> },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-colors cursor-default border border-transparent hover:border-slate-100">
                      <div className="w-10 h-10 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center text-indigo-600">
                        <Activity size={18} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800">{log.event}</p>
                        <p className="text-xs text-slate-400 font-medium">{log.time}</p>
                      </div>
                      <button className="text-xs font-bold text-indigo-600 hover:underline">View</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
                <Bell size={20} className="text-indigo-600" /> Notifications Toggle
              </h3>
              <div className="flex flex-wrap gap-4">
                 {["Email Alerts", "System Errors", "Student Queries", "New Payments"].map((item) => (
                   <label key={item} className="flex items-center gap-3 px-4 py-3 bg-slate-50 rounded-2xl cursor-pointer hover:bg-slate-100 transition-all border border-transparent active:scale-95">
                      <input type="checkbox" defaultChecked className="w-5 h-5 rounded-md border-slate-300 text-indigo-600 focus:ring-indigo-500" />
                      <span className="text-sm font-bold text-slate-700">{item}</span>
                   </label>
                 ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;