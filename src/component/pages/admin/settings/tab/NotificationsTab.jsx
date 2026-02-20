// src/settings/tab/CoursesTab.jsx

import React from "react";
import SectionCard from "../SectionCard";
import SettingRow from "../SettingRow";
import ToggleSwitch from "../ToggleSwitch";

export default function CoursesTab({ toggles, toggle }) {
  return (
    <SectionCard title="Course Settings">
      
      <div className="divide-y divide-border">

        <SettingRow
          label="Review & Approval Required"
          desc="New courses require admin approval before publishing"
        >
          <ToggleSwitch checked={toggles.reviewApproval} onChange={() => toggle("reviewApproval")} />
        </SettingRow>

        <SettingRow
          label="Auto-Enroll on Payment"
          desc="Automatically enroll students after successful payment"
        >
          <ToggleSwitch checked={toggles.autoEnroll} onChange={() => toggle("autoEnroll")} />
        </SettingRow>

        <SettingRow
          label="Certificate Generation"
          desc="Auto-generate completion certificates for students"
        >
          <ToggleSwitch checked={toggles.certificateGen} onChange={() => toggle("certificateGen")} />
        </SettingRow>

      </div>

      <div className="grid grid-cols-2 gap-4 mt-5">

        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase">Max Video Size (MB)</label>
          <input type="number" className="form-input" defaultValue="2048" />
        </div>

        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase">Supported Video Formats</label>
          <input className="form-input" defaultValue="mp4, webm, mov" />
        </div>

      </div>

    </SectionCard>
  );
}