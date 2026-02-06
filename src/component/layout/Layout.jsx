import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";   // ✅ Correct spelling

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">

      {/* Sidebar */}
      <Sidebar />

      {/* Right Side Area */}
      <div className="flex flex-col flex-1 h-screen">

        {/* Navbar Full Top */}
        <Navbar title="Dashboard" />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div
            className="
              max-w-7xl mx-auto
              bg-white
              rounded-2xl
              shadow-md
              border border-gray-200
              p-8
              min-h-[85vh]
            "
          >
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}
