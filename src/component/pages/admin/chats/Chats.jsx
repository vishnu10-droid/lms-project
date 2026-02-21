import React, { useState } from 'react';
import { Users, BookOpen, MessageSquare, ArrowLeft, Send, Paperclip } from 'lucide-react';

const ChatSystem = () => {
  // State to track which chat is open
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");

  const chatOptions = [
    { id: 'group', title: "Group Chat", icon: <Users />, color: "bg-blue-500", unread: 5 },
    { id: 'batch', title: "Batch A1 - React", icon: <BookOpen />, color: "bg-green-500", unread: 12 },
    { id: 'instructor', title: "Dr. Sharma (Instructor)", icon: <MessageSquare />, color: "bg-purple-500", unread: 0 },
  ];

  // 1. DASHBOARD VIEW (Cards)
  if (!activeChat) {
    return (
      <div className="p-6 bg-gray-100 dark:bg-slate-950 min-h-screen flex flex-col items-center text-slate-900 dark:text-slate-100">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-slate-100">My Messages</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {chatOptions.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-md hover:shadow-xl transition-all cursor-pointer border-b-4 border-transparent hover:border-slate-400 dark:hover:border-slate-500 relative group"
            >
              {chat.unread > 0 && (
                <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-bounce">
                  {chat.unread}
                </span>
              )}
              <div className={`${chat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                {React.cloneElement(chat.icon, { size: 32 })}
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">{chat.title}</h2>
              <p className="text-gray-500 dark:text-slate-400 mt-2">Click karke chat shuru karein...</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 2. CHAT WINDOW VIEW
  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 sticky top-0 z-10 shadow-sm">
        <button 
          onClick={() => setActiveChat(null)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full mr-3"
        >
          <ArrowLeft size={24} />
        </button>
        <div className={`${activeChat.color} w-10 h-10 rounded-full flex items-center justify-center text-white mr-3`}>
          {React.cloneElement(activeChat.icon, { size: 20 })}
        </div>
        <div>
          <h3 className="font-bold text-gray-800 dark:text-slate-100">{activeChat.title}</h3>
          <p className="text-xs text-green-500 font-medium italic">Online</p>
        </div>
      </div>

      {/* Messages Area (Dummy) */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-900/40 space-y-4">
        <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm max-w-[80%] self-start border border-gray-100 dark:border-slate-700">
          <p className="text-sm text-gray-800 dark:text-slate-100 font-medium mb-1 text-blue-600 dark:text-blue-400">System</p>
          <p className="text-gray-700 dark:text-slate-300">Welcome to {activeChat.title}! Aap yahan apne sawal pooch sakte hain.</p>
        </div>
        {/* Placeholder for real messages */}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex items-center gap-3">
        <button className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300">
          <Paperclip size={20} />
        </button>
        <input 
          type="text" 
          placeholder="Message likhein..." 
          className="flex-1 bg-gray-100 dark:bg-slate-800 border-none rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button 
          className={`${activeChat.color} text-white p-2 rounded-full hover:opacity-90 transition-opacity`}
          onClick={() => { alert(`Sent: ${message}`); setMessage(""); }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatSystem;
