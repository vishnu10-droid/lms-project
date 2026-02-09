import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  Bell, Mail, FileText, AlertTriangle, CheckCircle, MoreVertical, 
  Trash2, RefreshCw, Eye, Archive, ChevronRight, X, Search, Filter, 
  Inbox, User, Clock, Download, Reply, ExternalLink, Shield, Zap
} from 'lucide-react';

const PRIORITY_STYLES = {
  urgent: 'bg-red-50 text-red-700 border-red-100 ring-red-500/20 shadow-red-500/10',
  high: 'bg-orange-50 text-orange-700 border-orange-100 ring-orange-500/20 shadow-orange-500/10',
  medium: 'bg-amber-50 text-amber-700 border-amber-100 ring-amber-500/20 shadow-amber-500/10',
  low: 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/20 shadow-emerald-500/10'
};

const TYPE_ICONS = {
  Email: <Mail className="text-blue-500" size={20} />,
  Report: <FileText className="text-purple-500" size={20} />,
  Alert: <AlertTriangle className="text-amber-500" size={20} />,
  System: <Shield className="text-indigo-500" size={20} />,
  Payment: <Zap className="text-emerald-500" size={20} />
};

const AdminNotifications = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingNotif, setViewingNotif] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');

  // Enhanced dataset with 12+ realistic notifications
  const [notifications, setNotifications] = useState([
    { 
      id: 1, type: 'Email', sender: 'Arjun Mehta', subject: '🚨 Course Access Issue - React Module Blocked', 
      time: '2 mins ago', status: 'unread', priority: 'urgent', 
      preview: 'Cannot access React module despite Stripe payment confirmation...', 
      content: 'Dear Admin, I paid ₹2999 for Full Stack React course but webhook failed. Order #ORD-45678. Please help!',
      avatar: 'A'
    },
    { 
      id: 2, type: 'Payment', sender: 'Stripe Payments', subject: '💰 Payment Refund Processed', 
      time: '5 mins ago', status: 'unread', priority: 'high', 
      preview: '₹1,499 refunded to Sophia Chen - UI/UX Design Course', 
      content: 'Automatic refund processed for failed course access. Transaction ID: txn_89f2k3m',
      avatar: 'S'
    },
    { 
      id: 3, type: 'Alert', sender: 'Security Bot', subject: '🔒 7 Failed Login Attempts - STU-009', 
      time: '12 mins ago', status: 'unread', priority: 'urgent', 
      preview: 'IP 192.168.1.45 blocked for 24hrs - Multiple brute force attempts', 
      content: 'Security protocol activated. Temporary IP blacklist enforced.',
      avatar: '🔒'
    },
    { 
      id: 4, type: 'Email', sender: 'Priya Sharma', subject: '📚 Certificate Not Received - Data Science', 
      time: '25 mins ago', status: 'unread', priority: 'high', 
      preview: 'Completed course but certificate link expired in email', 
      content: 'I scored 92% in Data Science Bootcamp. Please regenerate certificate link.',
      avatar: 'P'
    },
    { 
      id: 5, type: 'Report', sender: 'Analytics Dashboard', subject: '📊 January 2026 Enrollment Report Ready', 
      time: '1 hour ago', status: 'read', priority: 'medium', 
      preview: '12,847 enrollments | +23% YoY | 89% completion rate', 
      content: 'Download detailed PDF report with cohort analysis and revenue breakdown.',
      avatar: '📊',
      hasAttachment: true
    },
    { 
      id: 6, type: 'Email', sender: 'Rahul Patel', subject: '⚠️ Assignment Deadline Extension Request', 
      time: '2 hours ago', status: 'unread', priority: 'medium', 
      preview: 'Requesting 3-day extension for Machine Learning Project #ML-2026', 
      content: 'Medical emergency - need extension till Feb 12th. Current submission due tomorrow.',
      avatar: 'R'
    },
    { 
      id: 7, type: 'System', sender: 'Auto-Grader', subject: '✅ 247 Projects Graded Automatically', 
      time: '3 hours ago', status: 'read', priority: 'low', 
      preview: 'Web Dev Batch #WD-26 | Avg: 87.4% | 18 manual reviews needed', 
      content: 'Batch grading complete. Review flagged submissions in Admin Panel.',
      avatar: '✅'
    },
    { 
      id: 8, type: 'Email', sender: 'Anita Kaur', subject: '💳 Payment Failed - 3DS Verification', 
      time: '4 hours ago', status: 'unread', priority: 'high', 
      preview: 'Razorpay payment failed for DevOps Certification - needs admin approval', 
      content: 'User attempted payment 3x but 3DS verification failed. Manual approval required.',
      avatar: 'A'
    },
    { 
      id: 9, type: 'Payment', sender: 'Razorpay', subject: '🎉 ₹2.4L Revenue Today - Record High!', 
      time: '5 hours ago', status: 'read', priority: 'low', 
      preview: '124 enrollments | Top course: Full Stack React | 67% from mobile', 
      content: 'Daily revenue milestone achieved. Continue promoting React courses.',
      avatar: '💰'
    },
    { 
      id: 10, type: 'Alert', sender: 'Database Monitor', subject: '💾 Backup Completed - 4.2GB', 
      time: '6 hours ago', status: 'read', priority: 'low', 
      preview: 'Daily backup verification: 100% integrity check passed', 
      content: 'All user data, courses, and certificates safely backed up to S3.',
      avatar: '💾'
    },
    { 
      id: 11, type: 'Email', sender: 'Vikram Singh', subject: '❓ Quiz Score Dispute - Python 101', 
      time: 'Yesterday', status: 'unread', priority: 'medium', 
      preview: 'Scored 78% but answer marked wrong despite being correct', 
      content: 'Question #12 on list comprehensions was marked wrong. Please review.',
      avatar: 'V'
    },
    { 
      id: 12, type: 'Report', sender: 'Student Support', subject: '📈 Support Tickets: 23 Open', 
      time: 'Yesterday', status: 'unread', priority: 'high', 
      preview: 'Top issues: Course access (12), Payments (7), Certificates (4)', 
      content: 'High priority tickets need attention. Average resolution time: 4.2hrs.',
      avatar: '📞'
    },
    { 
      id: 13, type: 'System', sender: 'CDN Monitor', subject: '⚡ Video Streaming Optimized', 
      time: '2 days ago', status: 'read', priority: 'low', 
      preview: 'Cloudflare cache hit ratio improved to 92% | 30% bandwidth saved', 
      content: 'Video delivery optimized. Course streaming now 2x faster globally.',
      avatar: '⚡'
    }
  ]);

  // Auto-archive old notifications (cleanup)
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotifications(prev => prev.map(n => 
        n.time.includes('days ago') ? { ...n, isArchived: true } : n
      ));
    }, 30000);
    return () => clearTimeout(timer);
  }, []);

  const filteredNotifs = useMemo(() => {
    return notifications.filter(n => {
      const matchesTab = activeTab === 'All' || n.type === activeTab;
      const matchesSearch = !searchTerm || 
        n.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
        n.sender.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = filterPriority === 'all' || n.priority === filterPriority;
      return matchesTab && matchesSearch && matchesPriority && !n.isArchived;
    });
  }, [notifications, activeTab, searchTerm, filterPriority]);

  const unreadCount = useMemo(() => 
    notifications.filter(n => n.status === 'unread' && !n.isArchived).length, 
  [notifications]);

  const handleBulkAction = useCallback((action) => {
    setIsLoading(true);
    setTimeout(() => {
      setNotifications(prev => prev.map(n => {
        if (selectedIds.has(n.id) && !n.isArchived) {
          if (action === 'read') return { ...n, status: 'read' };
          if (action === 'archive') return { ...n, isArchived: true };
        }
        return n;
      }));
      setSelectedIds(new Set());
      setIsLoading(false);
    }, 600);
  }, [selectedIds]);

  const toggleSelect = useCallback((e, id) => {
    e.stopPropagation();
    setSelectedIds(prev => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  }, []);

  const markAsRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, status: 'read' } : n
    ));
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* ✨ Hero Header */}
        <header className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBvcGFjaXR5PSIwLjA1Ij48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIxMCIgZmlsbD0id2hpdGUiLz48L2c+PC9zdmc+')] opacity-20 animate-pulse" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-16 w-16 drop-shadow-2xl" />
                <div className="absolute -top-1 -right-1 h-6 w-6 bg-red-500 border-4 border-white rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
                  {unreadCount}
                </div>
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                  Notification Center
                </h1>
                <p className="mt-2 opacity-90 text-lg">{unreadCount} unread alerts across all systems</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsLoading(true) && setTimeout(()=>setIsLoading(false), 800)}
                className="group p-3 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                disabled={isLoading}
              >
                <RefreshCw size={20} className={`${isLoading ? "animate-spin" : "group-hover:rotate-12"} text-white transition-all`} />
              </button>
              <button className="group bg-white/20 backdrop-blur-sm px-6 py-3 rounded-2xl font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105 flex items-center gap-2 shadow-2xl">
                <Archive size={18} className="group-hover:scale-110 transition-transform" />
                View Archives
              </button>
            </div>
          </div>
        </header>

        {/* 🎛️ Advanced Toolbar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 mb-8 sticky-top  z-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input 
                placeholder="🔍 Search emails, senders, or subjects..."
                className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-slate-50 to-indigo-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-indigo-500/20 focus:border-transparent transition-all shadow-inner"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              {/* Priority Filter */}
              <div className="relative">
                <select 
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-sm appearance-none bg-no-repeat bg-right pr-10"
                  style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")` }}
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Tabs */}
              <div className="flex bg-gradient-to-r from-slate-100 to-indigo-100 p-1 rounded-2xl shadow-inner">
                {['All', 'Email', 'Payment', 'Alert', 'Report', 'System'].map(tab => {
                  const count = tab === 'All' ? filteredNotifs.length : notifications.filter(n => n.type === tab && !n.isArchived).length;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-indigo-500/25 scale-105'
                          : 'text-slate-600 hover:text-slate-900 hover:scale-105 hover:shadow-md bg-white/50'
                      }`}
                    >
                      {tab}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-black/10 backdrop-blur-sm font-bold">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedIds.size > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-200 flex items-center gap-3 bg-indigo-50/50 rounded-2xl p-4 animate-in slide-in-from-top-2">
              <span className="text-lg font-black text-indigo-700 bg-indigo-100 px-4 py-2 rounded-2xl shadow-lg">
                {selectedIds.size} Selected
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => handleBulkAction('read')} className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 shadow-lg transition-all hover:scale-105 flex items-center gap-1.5">
                  <CheckCircle size={18} />
                  Mark Read
                </button>
                <button onClick={() => handleBulkAction('archive')} className="p-2.5 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 shadow-md transition-all hover:scale-105">
                  <Archive size={18} />
                  Archive
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 📱 Notifications Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
          {filteredNotifs.map((n) => (
            <div 
              key={n.id}
              onClick={() => setViewingNotif(n)}
              className={`group relative overflow-hidden rounded-3xl border-2 transition-all duration-300 cursor-pointer hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] bg-white/70 backdrop-blur-xl ${
                n.status === 'unread' 
                  ? 'border-indigo-300 bg-gradient-to-br from-indigo-50/90 via-blue-50/80 to-purple-50/70 shadow-xl shadow-indigo-200/50 ring-2 ring-indigo-200/50' 
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              {/* Selection & Icon */}
              <div className="absolute left-4 top-4 z-10 flex items-center gap-3">
                <input 
                  type="checkbox" 
                  checked={selectedIds.has(n.id)}
                  onClick={(e) => toggleSelect(e, n.id)}
                  className="w-6 h-6 rounded-xl border-2 border-slate-300 text-indigo-600 focus:ring-indigo-500 shadow-md transition-all hover:scale-110 cursor-pointer"
                />
                <div className={`p-3.5 rounded-2xl shadow-lg border backdrop-blur-sm transition-all group-hover:scale-110 ${
                  n.status === 'unread' ? 'bg-indigo-500/10 border-indigo-200 shadow-indigo-200/30' : 'bg-slate-100 border-slate-200'
                }`}>
                  {TYPE_ICONS[n.type] || TYPE_ICONS.Email}
                </div>
              </div>

              {/* Content */}
              <div className="pl-28 pr-6 pb-6 pt-4 ml-4">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`px-3 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider shadow-md border ${PRIORITY_STYLES[n.priority]} transform scale-95 group-hover:scale-100 transition-all`}>
                    {n.priority}
                  </span>
                  <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                    <Clock size={12} />
                    {n.time}
                  </span>
                </div>
                
                <h3 className="text-lg font-black text-slate-900 leading-tight mb-2 pr-8 line-clamp-2 group-hover:line-clamp-none">
                  {n.subject}
                </h3>
                
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-3">{n.preview}</p>
                
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-bold text-white text-sm shadow-lg">
                    {n.avatar}
                  </div>
                  <span className="font-semibold text-slate-800">{n.sender}</span>
                  {n.hasAttachment && (
                    <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                      <Download size={12} />
                      <span>PDF</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <button 
                  onClick={(e) => { e.stopPropagation(); markAsRead(n.id); }}
                  className="p-2.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                  title="Mark as read"
                >
                  <CheckCircle size={16} />
                </button>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
              </div>

              {/* Unread indicator */}
              {n.status === 'unread' && (
                <div className="absolute left-2 top-2 w-2 h-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full shadow-lg border-4 border-white animate-ping" />
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredNotifs.length === 0 && (
          <div className="text-center py-24 rounded-3xl bg-white/50 backdrop-blur-2xl border-2 border-dashed border-slate-200 shadow-2xl">
            <div className="w-28 h-28 bg-gradient-to-br from-slate-100 to-indigo-100 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-xl">
              <Inbox className="w-16 h-16 text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-3">Inbox is Empty</h3>
            <p className="text-slate-500 text-lg mb-8 max-w-md mx-auto">
              Everything is perfectly up to date! 🎉 New notifications will appear here automatically.
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-lg rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto">
              <RefreshCw size={20} className="animate-spin" />
              Refresh Notifications
            </button>
          </div>
        )}
      </div>

      {/* 🖥️ Slide-over Detail Modal */}
      {viewingNotif && (
        <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex justify-end p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-lg bg-gradient-to-b from-white to-slate-50 shadow-2xl rounded-3xl overflow-hidden animate-in slide-in-from-right duration-500 max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-slate-200 p-6">
              <button 
                onClick={() => setViewingNotif(null)} 
                className="p-2 hover:bg-slate-100 rounded-2xl transition-all group float-right"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform" />
              </button>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-black mb-6 shadow-lg border ${PRIORITY_STYLES[viewingNotif.priority]}`}>
                <div className="w-3 h-3 rounded-full bg-current animate-pulse" />
                {viewingNotif.priority.toUpperCase()} PRIORITY
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <h2 className="text-3xl font-black text-slate-900 leading-tight mb-4">{viewingNotif.subject}</h2>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-indigo-50 rounded-3xl">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <span className="text-2xl font-black text-white">{viewingNotif.avatar}</span>
                  </div>
                  <div>
                    <p className="text-xl font-bold text-slate-900">{viewingNotif.sender}</p>
                    <p className="text-slate-500 flex items-center gap-2">
                      <Clock size={16} />
                      {viewingNotif.time} • {viewingNotif.type}
                    </p>
                  </div>
                </div>
              </div>

              <div className="prose prose-slate max-w-none">
                <div className="bg-gradient-to-r from-slate-50 to-indigo-50 p-8 rounded-3xl shadow-inner border border-slate-200">
                  <p className="text-lg leading-relaxed whitespace-pre-wrap text-slate-800">
                    "{viewingNotif.content}"
                  </p>
                </div>
              </div>

              {viewingNotif.hasAttachment && (
                <button className="w-full flex items-center justify-center gap-3 p-4 bg-blue-500 text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-2xl hover:scale-105">
                  <Download size={20} />
                  Download Report PDF
                  <ExternalLink size={16} />
                </button>
              )}

              <div className="flex gap-4 pt-4 border-t border-slate-200">
                <button className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black py-4 px-6 rounded-2xl hover:shadow-2xl hover:scale-105 transition-all shadow-lg">
                  <Reply size={20} className="inline mr-2" />
                  Reply to {viewingNotif.sender.split(' ')[0]}
                </button>
                <button className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all shadow-md hover:shadow-lg hover:scale-105">
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNotifications;
