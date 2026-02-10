import React, { useState } from "react";
import { 
  User, Shield, Mail, MapPin, Edit3, Key, LogOut, Bell, Activity, 
  CheckCircle2, Lock, Smartphone, Camera, ChevronRight, Save, X 
} from "lucide-react";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Manage Admin Data in State
  const [adminData, setAdminData] = useState({
    name: "Dr. Vikram Sethi",
    role: "Super Administrator",
    email: "vikram.sethi@lms-edu.com",
    location: "New Delhi, India",
    avatar: "VS"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto">
        
        {/* 👤 Header Section */}
        <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-slate-100 mb-8 relative overflow-hidden">
          {/* Decorative Background Element */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Avatar with Camera Overlay */}
            <div className="relative group">
              <div className="w-28 h-28 bg-indigo-600 rounded-3xl flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-indigo-100">
                {adminData.avatar}
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 bg-white rounded-xl shadow-md border border-slate-100 text-indigo-600 hover:scale-110 transition">
                <Camera size={16} />
              </button>
            </div>

            {/* Profile Info or Edit Inputs */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-3">
                  <input 
                    name="name" value={adminData.name} onChange={handleInputChange}
                    className="block w-full text-2xl font-bold border-b-2 border-indigo-500 outline-none bg-transparent"
                  />
                  <input 
                    name="email" value={adminData.email} onChange={handleInputChange}
                    className="block w-full text-slate-500 border-b border-slate-200 outline-none bg-transparent"
                  />
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                    <h1 className="text-2xl font-extrabold">{adminData.name}</h1>
                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-indigo-100 flex items-center gap-1">
                      <Shield size={12} /> {adminData.role}
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 text-sm font-medium">
                    <p className="flex items-center gap-1.5"><Mail size={16} /> {adminData.email}</p>
                    <p className="flex items-center gap-1.5"><MapPin size={16} /> {adminData.location}</p>
                  </div>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold transition-all ${
                  isEditing ? "bg-emerald-600 text-white shadow-emerald-100" : "bg-slate-900 text-white shadow-slate-200"
                } shadow-lg hover:-translate-y-0.5`}
              >
                {isEditing ? <><Save size={18} /> Save</> : <><Edit3 size={18} /> Edit</>}
              </button>
              {isEditing && (
                 <button onClick={() => setIsEditing(false)} className="p-2.5 bg-slate-100 text-slate-500 rounded-2xl hover:bg-slate-200">
                    <X size={20} />
                 </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 🔐 Sidebar: Security Cards */}
          <div className="space-y-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Lock size={18} className="text-indigo-600" /> Security
              </h3>
              <div className="space-y-2">
                <SecurityButton icon={<Key size={16}/>} label="Change Password" />
                <SecurityButton icon={<Smartphone size={16}/>} label="2FA Authentication" status="ACTIVE" />
              </div>
            </div>

            <div className="bg-indigo-600 rounded-[2rem] p-6 text-white shadow-xl shadow-indigo-100">
              <h3 className="font-bold mb-4">Quick Stats</h3>
              <div className="space-y-4 opacity-90 text-sm">
                <div className="flex justify-between"><span>Students Managed</span> <span className="font-bold">12,402</span></div>
                <div className="flex justify-between"><span>Courses Live</span> <span className="font-bold">48</span></div>
                <div className="flex justify-between"><span>Revenue (MoM)</span> <span className="font-bold">+$4.2k</span></div>
              </div>
            </div>
          </div>

          {/* 📉 Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 min-h-[400px]">
              {/* Navigation Tabs */}
              <div className="flex gap-8 border-b border-slate-100 mb-6">
                {["Overview", "Activity Log"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab.toLowerCase())}
                    className={`pb-3 text-sm font-bold transition-all relative ${
                      activeTab === tab.toLowerCase() ? "text-indigo-600" : "text-slate-400"
                    }`}
                  >
                    {tab}
                    {activeTab === tab.toLowerCase() && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-full"></div>}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              {activeTab === "overview" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
                  <StatCard label="Admin Level" value="10" badge="Super" />
                  <StatCard label="Total Approvals" value="842" badge="Active" />
                  <div className="md:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Last System Entry</h4>
                    <p className="text-sm font-medium text-slate-700">Today at 10:45 AM from New Delhi, India (Chrome/Win11)</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 animate-in slide-in-from-bottom-2 duration-300">
                  <ActivityItem title="Updated Physics Course" time="2 hours ago" />
                  <ActivityItem title="Approved Teacher #210" time="5 hours ago" />
                  <ActivityItem title="System Backup Complete" time="Yesterday" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

/* --- Smaller Reusable Components --- */

const SecurityButton = ({ icon, label, status }) => (
  <button className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-indigo-50 rounded-2xl transition group text-left">
    <div className="flex items-center gap-3">
      <span className="text-slate-400 group-hover:text-indigo-600 transition">{icon}</span>
      <span className="text-sm font-semibold text-slate-700">{label}</span>
    </div>
    {status ? (
      <span className="text-[9px] font-black bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md">{status}</span>
    ) : (
      <ChevronRight size={14} className="text-slate-300" />
    )}
  </button>
);

const StatCard = ({ label, value, badge }) => (
  <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
    <div className="flex items-center gap-2">
      <p className="text-2xl font-black text-slate-800">{value}</p>
      <span className="text-[9px] font-bold bg-white text-indigo-600 border border-indigo-100 px-1.5 py-0.5 rounded">{badge}</span>
    </div>
  </div>
);

const ActivityItem = ({ title, time }) => (
  <div className="flex items-center gap-4 p-3 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition">
    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
      <Activity size={18} />
    </div>
    <div>
      <p className="text-sm font-bold text-slate-800">{title}</p>
      <p className="text-[11px] text-slate-400 font-medium">{time}</p>
    </div>
  </div>
);

export default AdminProfile;