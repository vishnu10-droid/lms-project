import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar"; // ✅ Correct spelling
import FloatThemeButton from "../common/FloatThemeButton";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <Sidebar />
      <div className="flex flex-col flex-1 h-screen">
        <Navbar title="Dashboard" />
        <main className="flex-1 overflow-y-auto p-3">
          <div
            className="
              max-w-7xl mx-auto
              bg-white
              rounded-2xl
              shadow-md
              border border-gray-200
              p-4
              min-h-[85vh]
            "
          >
            <Outlet />
            <FloatThemeButton/>
          </div>
        </main>
      </div>
    </div>
  );
}
