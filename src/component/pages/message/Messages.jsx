import React, { useState } from "react";
import {
  Search,
  Send,
  MessageSquare
} from "lucide-react";

/* ---------------- DUMMY DATA ---------------- */

const USERS = [
  {
    id: 1,
    name: "Rahul Kumar",
    role: "Student",
    avatar: "https://i.pravatar.cc/150?img=12",
    unread: 2,
    messages: [
      { from: "user", text: "Hello Sir", time: "10:30 AM" },
      { from: "admin", text: "Hi Rahul, how can I help?", time: "10:31 AM" }
    ]
  },
  {
    id: 2,
    name: "Anjali Sharma",
    role: "Instructor",
    avatar: "https://i.pravatar.cc/150?img=47",
    unread: 0,
    messages: [
      { from: "user", text: "Need course approval", time: "09:00 AM" }
    ]
  }
];

/* ---------------- COMPONENT ---------------- */

export default function Messages() {

  const [users, setUsers] = useState(USERS);
  const [selectedUser, setSelectedUser] = useState(USERS[0]);
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (!text.trim()) return;

    const updated = users.map(u =>
      u.id === selectedUser.id
        ? {
            ...u,
            messages: [
              ...u.messages,
              { from: "admin", text, time: "Now" }
            ]
          }
        : u
    );

    setUsers(updated);
    setSelectedUser(
      updated.find(u => u.id === selectedUser.id)
    );
    setText("");
  };

  return (
    <div className="p-6 text-white h-[calc(100vh-80px)]">

      <h1 className="text-2xl font-bold mb-4">Messages</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">

        {/* LEFT - USERS LIST */}
        <div className="bg-slate-800 rounded-xl p-4 flex flex-col">

          {/* SEARCH */}
          <div className="flex items-center bg-slate-700 rounded-lg px-3 mb-4">
            <Search size={16}/>
            <input
              placeholder="Search user..."
              className="bg-transparent outline-none p-2 w-full"
            />
          </div>

          {/* USERS */}
          <div className="flex-1 overflow-y-auto space-y-2">

            {users.map(u => (
              <div
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer
                  ${selectedUser.id === u.id
                    ? "bg-indigo-600"
                    : "hover:bg-slate-700"}`}
              >
                <img
                  src={u.avatar}
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex-1">
                  <p className="font-semibold">{u.name}</p>
                  <p className="text-xs text-gray-300">{u.role}</p>
                </div>

                {u.unread > 0 && (
                  <span className="bg-red-500 text-xs px-2 py-1 rounded-full">
                    {u.unread}
                  </span>
                )}

              </div>
            ))}

          </div>

        </div>

        {/* RIGHT - CHAT */}
        <div className="bg-slate-800 rounded-xl md:col-span-2 flex flex-col">

          {/* HEADER */}
          <div className="p-4 border-b border-slate-700 flex items-center gap-3">
            <img
              src={selectedUser.avatar}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold">{selectedUser.name}</p>
              <p className="text-xs text-gray-400">{selectedUser.role}</p>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">

            {selectedUser.messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-xs p-3 rounded-lg text-sm
                  ${m.from === "admin"
                    ? "bg-indigo-600 ml-auto"
                    : "bg-slate-700"}`}
              >
                <p>{m.text}</p>
                <p className="text-[10px] text-gray-300 mt-1">
                  {m.time}
                </p>
              </div>
            ))}

          </div>

          {/* INPUT */}
          <div className="p-4 border-t border-slate-700 flex gap-2">

            <input
              placeholder="Type message..."
              className="flex-1 bg-slate-700 rounded-lg px-3 py-2 outline-none"
              value={text}
              onChange={(e)=>setText(e.target.value)}
            />

            <button
              onClick={sendMessage}
              className="bg-indigo-600 px-4 rounded-lg flex items-center"
            >
              <Send size={18}/>
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}
