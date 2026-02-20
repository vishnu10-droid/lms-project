// src/settings/tab/UsersTab.jsx

import React from "react";
import SectionCard from "../SectionCard";
import SettingRow from "../SettingRow";
import ToggleSwitch from "../ToggleSwitch";

export default function UsersTab({ toggles, toggle }) {
  return (
    <SectionCard title="User Management">
      
      <div className="divide-y divide-border">

        <SettingRow label="Email Verification" desc="Users must verify before login">
          <ToggleSwitch checked={toggles.emailVerification} onChange={() => toggle("emailVerification")} />
        </SettingRow>

        <SettingRow label="Role Based Access Control" desc="Enable permission-based roles">
          <ToggleSwitch checked={true} onChange={() => {}} />
        </SettingRow>

      </div>

      <div className="mt-6 space-y-2">
        <p className="uppercase text-xs font-semibold text-muted-foreground">Default Role for New Users</p>

        <div className="grid grid-cols-3 gap-3">
          {["Student", "Instructor", "Admin"].map((role) => (
            <button
              key={role}
              className={`py-2.5 rounded-lg border text-sm font-semibold transition-all 
                ${role === "Student" ? "bg-primary text-primary-foreground border-primary" : "border-border hover:bg-accent"}`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 p-4 bg-muted/40 rounded-xl">
        <p className="text-xs font-semibold text-muted-foreground uppercase">Session Settings</p>

        <div className="space-y-3 mt-2">
          <div>
            <label className="text-xs text-muted-foreground block">Session Timeout (minutes)</label>
            <input type="number" className="form-input max-w-[120px]" defaultValue="30" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground block">Max Login Attempts</label>
            <input type="number" className="form-input max-w-[120px]" defaultValue="5" />
          </div>
        </div>
      </div>

    </SectionCard>
  );
}