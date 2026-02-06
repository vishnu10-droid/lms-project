import React, { useState } from "react";
import {
  Bell,
  Search,
  CheckCircle,
  BookOpen,
  DollarSign,
  Users
} from "lucide-react";

/* ---------------- DUMMY DATA ---------------- */

const NOTIFICATIONS_DATA = [
  {
    id: 1,
    title: "New Student Registered",
    message: "Rahul Kumar has created an account.",
    type: "system",
    time: "2 min ago",
    read: false
  },
  {
    id: 2,
    title: "Course Purchased",
    message: "Anjali bought React Mastery.",
    type: "payment",
    time: "1 hour ago",
    read: false
  },
  {
    id: 3,
    title: "New Course Submitted",
    message: "Instructor submitted Node Bootcamp.",
    type: "course",
    time: "Yesterday",
    read: true
  }
];

/* ---------------- COMPONENT ---------------- */

export default function Notifications() {

  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  /* FILTERED DATA */
  const filtered = notifications.filter(n => {

    const matchSearch =
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "all" ||
      (filter === "unread" && !n.read) ||
      n.type === filter;

    return matchSearch && matchFilter;
  });

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-2xl font-bold">Notifications</h1>

        <button
          onClick={markAllRead}
          className="bg-indigo-600 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <CheckCircle size={18}/> Mark all as read
        </button>

      </div>

      {/* SEARCH */}
      <div className="flex items-center bg-slate-800 rounded-lg px-3 w-72 mb-4">
        <Search size={16}/>
        <input
          placeholder="Search notifications..."
          className="bg-transparent outline-none p-2 w-full"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />
      </div>

      {/* FILTER TABS */}
      <div className="flex gap-3 mb-5">

        {["all","unread","system","course","payment"].map(tab => (
          <button
            key={tab}
            onClick={()=>setFilter(tab)}
            className={`px-4 py-1 rounded-full text-sm capitalize
            ${filter===tab
              ? "bg-indigo-600"
              : "bg-slate-800 hover:bg-slate-700"}`}
          >
            {tab}
          </button>
        ))}

      </div>

      {/* LIST */}
      <div className="bg-slate-800 rounded-xl divide-y divide-slate-700">

        {filtered.map(n => (
          <div
            key={n.id}
            className={`p-4 flex items-start gap-4
            ${!n.read ? "bg-slate-700/40" : ""}`}
          >

            {/* ICON */}
            <div className="p-2 rounded-lg bg-indigo-600">
              {n.type === "system" && <Users size={18}/>}
              {n.type === "course" && <BookOpen size={18}/>}
              {n.type === "payment" && <DollarSign size={18}/>}
            </div>

            {/* CONTENT */}
            <div className="flex-1">
              <h3 className="font-semibold">{n.title}</h3>
              <p className="text-sm text-gray-400">{n.message}</p>
              <p className="text-xs text-gray-500 mt-1">{n.time}</p>
            </div>

            {!n.read && (
              <span className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></span>
            )}

          </div>
        ))}

        {filtered.length === 0 && (
          <p className="p-4 text-center text-gray-400">
            No notifications found.
          </p>
        )}

      </div>

    </div>
  );
}
