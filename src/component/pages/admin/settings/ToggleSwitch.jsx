// src/settings/ToggleSwitch.jsx
import React from "react";

export default function ToggleSwitch({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer 
        ${checked ? "bg-primary" : "bg-muted-foreground/30"}`}
    >
      <div
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 
          ${checked ? "translate-x-5" : ""}`}
      />
    </button>
  );
}