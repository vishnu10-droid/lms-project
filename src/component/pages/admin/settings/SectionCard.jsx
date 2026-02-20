// src/settings/SectionCard.jsx
import React from "react";

export default function SectionCard({ title, children }) {
  return (
    <div className="card-premium p-6 mb-5">
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-primary inline-block" />
        {title}
      </h3>
      {children}
    </div>
  );
}