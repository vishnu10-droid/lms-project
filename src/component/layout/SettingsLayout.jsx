import React from "react";
import { Outlet } from "react-router-dom";
import SettingsSidebar from "../pages/admin/Setting/SettingsSidebar";

export default function SettingsLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <SettingsSidebar />

      <div className="flex-1 p-6">
        <Outlet />
      </div>
    </div>
  );
}
