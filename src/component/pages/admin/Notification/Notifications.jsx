import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  Bell, Mail, FileText, AlertTriangle, CheckCircle, 
  Trash2, RefreshCw, Archive, Search, Inbox, Clock, 
  Download, Reply, X, Shield, Zap, ChevronRight
} from 'lucide-react';

// Simplified color palette for better readability
const PRIORITY_THEMES = {
  urgent: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  medium: 'bg-blue-100 text-blue-700',
  low: 'bg-slate-100 text-slate-600'
};

const TYPE_ICONS = {
  Email: <Mail size={18} />,
  Report: <FileText size={18} />,
  Alert: <AlertTriangle size={18} />,
  System: <Shield size={18} />,
  Payment: <Zap size={18} />
};

const AdminNotifications = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingNotif, setViewingNotif] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filterPriority, setFilterPriority] = useState('all');

  // ... (Dataset remains the same as your original code)
  const [notifications, setNotifications] = useState([
    { 
      id: 1, type: 'Email', sender: 'Arjun Mehta', subject: 'Course Access Issue', 
      time: '2 mins ago', status: 'unread', priority: 'urgent', 
      preview: 'Cannot access React module...', 
      content: 'I paid ₹2999 but the module is locked. Order #ORD-45678.',
      avatar: 'A'
    },
    // Adding a few more for the example
    { 
        id: 2, type: 'Payment', sender: 'Stripe', subject: 'Refund Processed', 
        time: '10 mins ago', status: 'read', priority: 'medium', 
        preview: 'Refund for Sophia Chen complete.', 
        content: 'Transaction ID: txn_89f2k3m processed successfully.',
        avatar: 'S'
    }
  ]);

  const filteredNotifs = useMemo(() => {
    return notifications.filter(n => {
      const matchesTab = activeTab === 'All' || n.type === activeTab;
      const matchesSearch = n.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           n.sender.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = filterPriority === 'all' || n.priority === filterPriority;
      return matchesTab && matchesSearch && matchesPriority && !n.isArchived;
    });
  }, [notifications, activeTab, searchTerm, filterPriority]);

  const toggleSelect = (id) => {
    const newSet = new Set(selectedIds);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedIds(newSet);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="max-w-5xl mx-auto p-4 md:p-8">
        
        {/* Simple Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-slate-500">Manage your system alerts and student messages</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm w-fit">
            <Archive size={18} />
            Archived
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                placeholder="Search by sender or subject..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {['All', 'Email', 'Payment', 'Alert', 'System'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                    activeTab === tab ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notification List */}
        <div className="space-y-3">
          {filteredNotifs.length > 0 ? filteredNotifs.map((n) => (
            <div 
              key={n.id}
              onClick={() => setViewingNotif(n)}
              className={`group flex items-center gap-4 p-4 bg-white border rounded-xl cursor-pointer transition-all hover:border-indigo-300 hover:shadow-md ${
                n.status === 'unread' ? 'border-l-4 border-l-indigo-500 border-slate-200' : 'border-slate-200 opacity-80'
              }`}
            >
              <input 
                type="checkbox" 
                checked={selectedIds.has(n.id)}
                onChange={() => toggleSelect(n.id)}
                onClick={(e) => e.stopPropagation()}
                className="w-4 h-4 rounded border-slate-300 text-indigo-600"
              />
              
              <div className="hidden sm:flex w-10 h-10 shrink-0 bg-slate-100 items-center justify-center rounded-full text-slate-600">
                {TYPE_ICONS[n.type]}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-md ${PRIORITY_THEMES[n.priority]}`}>
                    {n.priority}
                  </span>
                  <span className="text-sm font-semibold text-slate-900 truncate">{n.sender}</span>
                  <span className="text-xs text-slate-400 ml-auto flex items-center gap-1">
                    <Clock size={12} /> {n.time}
                  </span>
                </div>
                <h3 className={`text-sm truncate ${n.status === 'unread' ? 'font-bold text-slate-900' : 'font-normal text-slate-600'}`}>
                  {n.subject}
                </h3>
                <p className="text-xs text-slate-500 truncate mt-0.5">{n.preview}</p>
              </div>
              
              <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500" />
            </div>
          )) : (
            <div className="text-center py-20 bg-white border border-dashed border-slate-300 rounded-2xl">
              <Inbox className="mx-auto text-slate-300 mb-4" size={48} />
              <p className="text-slate-500 font-medium">No notifications found</p>
            </div>
          )}
        </div>
      </div>

      {/* Simplified Detail Sidebar */}
      {viewingNotif && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-bold text-lg">Details</h2>
              <button onClick={() => setViewingNotif(null)} className="p-2 hover:bg-slate-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-700 flex items-center justify-center rounded-xl font-bold text-xl">
                  {viewingNotif.avatar}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{viewingNotif.sender}</p>
                  <p className="text-sm text-slate-500">{viewingNotif.type} • {viewingNotif.time}</p>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-4">{viewingNotif.subject}</h3>
              <div className="bg-slate-50 p-4 rounded-xl text-slate-700 leading-relaxed text-sm mb-6">
                {viewingNotif.content}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                  <Reply size={18} /> Reply
                </button>
                <button className="p-2.5 border border-slate-200 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors">
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