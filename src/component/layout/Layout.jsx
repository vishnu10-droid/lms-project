import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  return (
<<<<<<< HEAD
    <div className="flex min-h-screen bg-[#0a0f1f] text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div
        className="flex-1 h-screen overflow-y-auto p-8 bg-gradient-to-br from-[#0c1226] to-[#070b16]
        rounded-l-[3rem] shadow-inner border-l border-white/10 mx-[2vh] my-[2vh]"
      >
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </div>
=======
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
>>>>>>> ae36658bedd84ffcd1a6a798881832e50857c122
    </div>
  );
}
