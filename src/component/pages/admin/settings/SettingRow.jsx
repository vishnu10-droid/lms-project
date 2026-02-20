// src/settings/SettingRow.jsx
import React from "react";

export default function SettingRow({ label, desc, children }) {
  return (
    <div className="flex items-start justify-between py-4 border-b border-border last:border-0 gap-6">
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        {desc && (
          <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
            {desc}
          </p>
        )}
      </div>
      <div className="flex-shrink-0 flex items-center">{children}</div>
    </div>
  );
}