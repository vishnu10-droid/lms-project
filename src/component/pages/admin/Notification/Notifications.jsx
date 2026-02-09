import React, { useState } from "react";
import {
  Bell,
  BookOpen,
  CheckCircle,
  CreditCard,
  MessageCircle,
  AlertTriangle,
  Trash2,
  Star,
  X
} from "lucide-react";

/* ---------------- SAMPLE DATA ---------------- */

const initialNotifications = [
  {
    id: 1,
    title: "New Lesson Added",
    message: "Lesson 5 added in React Mastery Course",
    type: "course",
    unread: true,
    time: "2 min ago",
    important: true
  },
  {
    id: 2,
    title: "Assignment Graded",
    message: "You scored 92% in JavaScript Quiz",
    type: "assignment",
    unread: true,
    time: "30 min ago",
    important: false
  },
  {
    id: 3,
    title: "Payment Successful",
    message: "₹1200 paid for UI/UX Bootcamp",
    type: "payment",
    unread: false,
    time: "2 hrs ago",
    important: false
  },
  {
    id: 4,
    title: "New Message",
    message: "Instructor replied to your doubt",
    type: "message",
    unread: true,
    time: "5 hrs ago",
    important: false
  },
  {
    id: 5,
    title: "System Alert",
    message: "Maintenance scheduled at 2 AM",
    type: "system",
    unread: false,
    time: "Yesterday",
    important: true
  }
];

/* ---------------- ICON MAPPER ---------------- */

const iconMap = {
  course: <BookOpen className="text-indigo-500" size={20} />,
  assignment: <CheckCircle className="text-green-500" size={20} />,
  payment: <CreditCard className="text-emerald-500" size={20} />,
  message: <MessageCircle className="text-blue-500" size={20} />,
  system: <AlertTriangle className="text-rose-500" size={20} />
};

/* ---------------- COMPONENT ---------------- */

export default function NotificationCenter() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => n.unread).length;

  const filtered = notifications.filter(n => {
    if (filter === "unread") return n.unread;
    if (filter === "important") return n.important;
    return true;
  });

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const clearAll = () => setNotifications([]);

  return (
    // Wrapper to make it visible on a blank screen
    <div className="min-h-screen bg-slate-100 flex items-start justify-center p-10">
      
      <div className="relative">
        {/* Bell Icon Trigger */}
        <button
          onClick={() => setOpen(!open)}
          className={`relative p-3 rounded-full transition-all ${
            open ? "bg-indigo-100 text-indigo-600" : "bg-white text-slate-600 hover:bg-slate-50"
          } shadow-sm border border-slate-200`}
        >
          <Bell size={24} />

          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
              {unreadCount}
            </span>
          )}
        </button>

        {/* Dropdown Menu */}
        {open && (
          <>
            {/* Click-away backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setOpen(false)}
            />

            <div className="absolute right-0 mt-3 w-96 bg-white shadow-2xl rounded-2xl overflow-hidden z-50 border border-slate-200 animate-in fade-in zoom-in duration-200 origin-top-right">
              
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b bg-slate-50/50">
                <div>
                  <h3 className="font-bold text-slate-800">Notifications</h3>
                  <p className="text-xs text-slate-500">You have {unreadCount} unread messages</p>
                </div>
                <button
                  onClick={clearAll}
                  className="text-xs font-medium text-rose-500 flex items-center gap-1 hover:bg-rose-50 px-2 py-1 rounded-md transition"
                >
                  <Trash2 size={14} /> Clear All
                </button>
              </div>

              {/* Filters */}
              <div className="flex gap-2 p-3 border-b bg-white">
                {["all", "unread", "important"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all
                    ${
                      filter === tab
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Scrollable List */}
              <div className="max-h-[450px] overflow-y-auto">
                {filtered.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="bg-slate-100 p-3 rounded-full mb-3">
                      <Bell size={24} className="text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-medium">No notifications found</p>
                    <p className="text-xs text-slate-400">Try changing your filters</p>
                  </div>
                ) : (
                  filtered.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => markAsRead(item.id)}
                      className={`flex gap-4 p-4 border-b last:border-0 cursor-pointer transition-colors
                      ${
                        item.unread
                          ? "bg-indigo-50/50 hover:bg-indigo-50"
                          : "bg-white hover:bg-slate-50"
                      }`}
                    >
                      {/* Icon Section */}
                      <div className="flex-shrink-0 mt-1">
                        <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-100">
                          {iconMap[item.type]}
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-0.5">
                          <h4 className={`text-sm font-semibold truncate ${item.unread ? "text-slate-900" : "text-slate-600"}`}>
                            {item.title}
                          </h4>
                          {item.important && (
                            <Star size={14} className="fill-yellow-400 text-yellow-400 flex-shrink-0 ml-2" />
                          )}
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed mb-2">
                          {item.message}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                            {item.time}
                          </span>
                          {item.unread && (
                            <span className="h-2 w-2 bg-indigo-600 rounded-full"></span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div className="p-3 border-top bg-slate-50 text-center">
                <button 
                  onClick={() => setOpen(false)}
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  Close Panel
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}