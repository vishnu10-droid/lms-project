import React, { useState, useMemo } from "react";
import {
  BarChart3, Users, BookOpen, DollarSign, TrendingUp, Download, Calendar,
  Filter, Clock, Activity, GraduationCap, Award, LineChart, PieChart,
  ArrowUpRight, ArrowDown, Zap, Star, FileText, Shield, Database,
  GraduationCap as Hat, Target, MessageCircle, Phone, MapPin
} from "lucide-react";

const AdminReports = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('month');
  const [isExporting, setIsExporting] = useState(false);

  // Comprehensive platform data
  const platformData = useMemo(() => ({
    // Overview Metrics
    overview: {
      totalStudents: 15420,
      activeStudents: 8923,
      totalCourses: 128,
      totalRevenue: 48500,
      completionRate: 82.4,
      supportTickets: 23,
      instructorCount: 67,
      platformUptime: 99.8
    },
    
    // Revenue breakdown
    revenue: {
      courses: 38500,
      subscriptions: 8200,
      certifications: 1800
    },
    
    // Team members
    team: [
      { id: 1, name: "Priya Sharma", role: "Platform Admin", avatar: "PS", status: "active", performance: 98 },
      { id: 2, name: "Rahul Mehta", role: "Lead Instructor", avatar: "RM", status: "active", performance: 95 },
      { id: 3, name: "Anita Kaur", role: "Support Lead", avatar: "AK", status: "active", performance: 92 },
      { id: 4, name: "Vikram Singh", role: "DevOps Engineer", avatar: "VS", status: "away", performance: 89 },
      { id: 5, name: "Neha Patel", role: "Content Manager", avatar: "NP", status: "active", performance: 94 }
    ],
    
    // Course analytics
    courses: [
      { name: "React Masterclass", students: 1247, revenue: 28500, rating: 4.9, completion: 92 },
      { name: "Python Bootcamp", students: 892, revenue: 21400, rating: 4.8, completion: 85 },
      { name: "Data Science Pro", students: 1103, revenue: 19800, rating: 4.7, completion: 88 },
      { name: "UI/UX Design", students: 634, revenue: 12600, rating: 4.9, completion: 78 }
    ],
    
    // Recent activity
    activity: [
      { type: "enrollment", user: "Arjun K.", course: "React Masterclass", time: "2 min ago" },
      { type: "completion", user: "Priya S.", course: "Python Bootcamp", time: "5 min ago" },
      { type: "ticket", user: "Amit R.", issue: "Course access", time: "12 min ago" },
      { type: "payment", user: "Neha V.", amount: "$299", time: "18 min ago" }
    ]
  }), []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'revenue', label: 'Revenue', icon: DollarSign },
    { id: 'team', label: 'Team', icon: Users },
    { id: 'activity', label: 'Activity', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* 🔝 Header Section */}
        <div className="mb-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl text-white relative overflow-hidden">
                <BarChart3 size={32} />
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 bg-clip-text text-transparent">
                  Admin Reports
                </h1>
                <p className="text-xl text-slate-600 mt-2">Complete platform analytics & insights</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-white/50">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2.5 rounded-2xl text-sm font-bold transition-all flex items-center gap-2 shadow-sm ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25 scale-105'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-md hover:scale-[1.02]'
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>

              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2.5 bg-white/80 backdrop-blur-sm shadow-xl border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 font-semibold"
              >
                <option>30 Days</option>
                <option>90 Days</option>
                <option>6 Months</option>
                <option>Year</option>
              </select>

              <button 
                className="group flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300"
                onClick={() => setIsExporting(true)}
              >
                <Download size={18} className="group-hover:animate-bounce" />
                Export Full Report
              </button>
            </div>
          </div>
        </div>

        {/* 📊 Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Sidebar - Key Metrics */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Platform Health */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                Platform Health
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-600">Uptime</span>
                  <span className="font-black text-2xl text-emerald-600">99.8%</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-[99.8%]" />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl p-6 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-black">{platformData.overview.supportTickets}</div>
                  <div className="text-sm opacity-90">Open Tickets</div>
                </div>
                <div>
                  <div className="text-2xl font-black">{platformData.overview.instructorCount}</div>
                  <div className="text-sm opacity-90">Instructors</div>
                </div>
              </div>
            </div>

            {/* Revenue Breakdown */}
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 border border-white/50">
              <h4 className="font-bold text-slate-900 mb-4">Revenue Sources</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Courses</span>
                  <div className="text-right">
                    <div className="font-bold text-emerald-600">${platformData.revenue.courses.toLocaleString()}</div>
                    <div className="text-xs text-slate-500">79%</div>
                  </div>
                </div>
                <div className="h-2 bg-slate-200 rounded-full">
                  <div className="h-full bg-emerald-500 rounded-full w-[79%]" />
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subscriptions</span>
                  <span>${platformData.revenue.subscriptions.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Certifications</span>
                  <span>${platformData.revenue.certifications.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            
            {activeTab === 'overview' && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  {/* KPI Cards */}
                  <div className="group p-6 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <Users size={28} />
                      <ArrowUpRight className="text-emerald-300" size={20} />
                    </div>
                    <div>
                      <p className="text-slate-200">Total Students</p>
                      <p className="text-3xl font-black">{platformData.overview.totalStudents.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="group p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <BookOpen size={28} />
                      <ArrowUpRight className="text-emerald-300" size={20} />
                    </div>
                    <div>
                      <p className="text-slate-200">Active Courses</p>
                      <p className="text-3xl font-black">{platformData.overview.totalCourses}</p>
                    </div>
                  </div>

                  <div className="group p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 text-white hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <DollarSign size={28} />
                      <ArrowUpRight className="text-emerald-300" size={20} />
                    </div>
                    <div>
                      <p className="text-slate-200">Monthly Revenue</p>
                      <p className="text-3xl font-black">${platformData.overview.totalRevenue.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="group p-6 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-600 text-white hover:scale-105 transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <TrendingUp size={28} />
                      <ArrowUpRight className="text-emerald-300" size={20} />
                    </div>
                    <div>
                      <p className="text-slate-200">Completion Rate</p>
                      <p className="text-3xl font-black">{platformData.overview.completionRate}%</p>
                    </div>
                  </div>
                </div>

                {/* Revenue Trend Chart */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-black mb-6">Revenue Growth</h3>
                    <div className="space-y-4">
                      {Array.from({length: 6}, (_, i) => ({
                        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i],
                        revenue: 25000 + i * 4500
                      })).map((item, i) => (
                        <div key={i} className="flex items-end gap-4 h-20">
                          <span className="w-12 text-right font-semibold text-slate-700">{item.month}</span>
                          <div className="flex-1 bg-slate-200 rounded-xl overflow-hidden h-12 shadow-inner">
                            <div 
                              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center text-xs font-bold text-white"
                              style={{ width: `${Math.min(100, (item.revenue / 40000) * 100)}%` }}
                            />
                          </div>
                          <span className="font-black">${item.revenue.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
                <h3 className="text-2xl font-black mb-8">Team Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {platformData.team.map(member => (
                    <div key={member.id} className="group flex items-center gap-4 p-6 rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all bg-gradient-to-r from-slate-50 to-indigo-50 border hover:border-indigo-200 cursor-pointer">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-lg ${
                        member.status === 'active' 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white' 
                          : 'bg-slate-200 text-slate-600'
                      }`}>
                        {member.avatar}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-900">{member.name}</h4>
                        <p className="text-sm text-slate-600">{member.role}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-emerald-600">{member.performance}%</div>
                        <div className="w-full bg-slate-200 rounded-full h-2 mt-2">
                          <div className="bg-emerald-500 h-full rounded-full" style={{width: `${member.performance}%`}} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'courses' && (
              <div>
                <h3 className="text-2xl font-black mb-6">Top Performing Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {platformData.courses.map((course, i) => (
                    <div key={i} className="group p-8 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:scale-105 shadow-2xl hover:shadow-3xl transition-all">
                      <div className="flex items-start justify-between mb-6">
                        <h4 className="text-xl font-bold">{course.name}</h4>
                        <Star className="text-amber-400" size={24} />
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>Students</span>
                          <span className="font-bold">{course.students.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Revenue</span>
                          <span className="font-bold">${course.revenue.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Rating</span>
                          <span className="font-bold">{course.rating}</span>
                        </div>
                        <div className="w-full bg-white/20 backdrop-blur-sm rounded-2xl h-3 overflow-hidden">
                          <div className="h-full bg-white rounded-2xl" style={{width: `${course.completion}%`}} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 📈 Recent Activity Feed */}
        <div className="mt-12 bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
          <h3 className="text-2xl font-black mb-6">Recent Platform Activity</h3>
          <div className="space-y-4">
            {platformData.activity.map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all group">
                <div className={`p-3 rounded-2xl shadow-md ${
                  item.type === 'enrollment' ? 'bg-emerald-500' :
                  item.type === 'completion' ? 'bg-indigo-500' :
                  item.type === 'ticket' ? 'bg-amber-500' : 'bg-purple-500'
                } text-white`}>
                  {item.type === 'enrollment' && <Users size={18} />}
                  {item.type === 'completion' && <Award size={18} />}
                  {item.type === 'ticket' && <MessageCircle size={18} />}
                  {item.type === 'payment' && <DollarSign size={18} />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">{item.user} {item.type === 'enrollment' ? 'enrolled in' : item.type === 'completion' ? 'completed' : item.type === 'payment' ? 'paid' : 'opened ticket for'} {item.course || item.issue}</p>
                  <p className="text-sm text-slate-500">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
