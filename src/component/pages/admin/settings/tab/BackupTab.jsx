// src/settings/tab/BackupTab.jsx

import React from "react";
import SectionCard from "../SectionCard";
import SettingRow from "../SettingRow";
import ToggleSwitch from "../ToggleSwitch";
import { Database, Download, Trash2 } from "lucide-react";

export default function BackupTab({ toggles, toggle }) {
  return (
    <>

      <SectionCard title="Automated Backups">

        <SettingRow
          label="Auto Backup"
          desc="Automatically backup database and files daily"
        >
          <ToggleSwitch checked={toggles.autoBackup} onChange={() => toggle("autoBackup")} />
        </SettingRow>

        <div className="grid grid-cols-2 gap-4 mt-4">

          <div>
            <label className="text-xs uppercase font-semibold">Backup Frequency</label>
            <select className="form-input">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div>
            <label className="text-xs uppercase font-semibold">Retention (days)</label>
            <input type="number" className="form-input" defaultValue="30" />
          </div>

        </div>

        <div className="flex gap-3 mt-4">

          <button className="btn-primary text-xs flex items-center gap-2">
            <Database className="w-4 h-4" /> Backup Now
          </button>

          <button className="btn-secondary text-xs flex items-center gap-2">
            <Download className="w-4 h-4" /> Download Backup
          </button>

        </div>

      </SectionCard>

      <SectionCard title="System Logs">

        <div className="bg-foreground/95 rounded-xl p-4 font-mono text-xs text-success max-h-48 overflow-y-auto scrollbar-thin space-y-1">
          {[
            "[2025-02-19 08:01:14] INFO: Server started on port 3000",
            "[2025-02-19 08:12:30] INFO: User registered: demo@email",
            "[2025-02-19 08:15:44] INFO: Payment processed: TXN-008012",
            "[2025-02-19 08:22:10] WARN: High memory usage detected (82%)",
            "[2025-02-19 08:45:22] INFO: Backup completed successfully",
            "[2025-02-19 09:12:18] ERROR: Email delivery failed",
          ].map((log, i) => (
            <p key={i} className={
              log.includes("ERROR") ? "text-red-400" :
              log.includes("WARN") ? "text-yellow-400" : ""
            }>
              {log}
            </p>
          ))}
        </div>

        <button className="btn-secondary text-xs mt-3 flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Clear Logs
        </button>

      </SectionCard>

    </>
  );
}