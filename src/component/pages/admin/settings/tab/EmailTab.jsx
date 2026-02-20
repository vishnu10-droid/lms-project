// src/settings/tab/EmailTab.jsx

import React, { useState } from "react";
import SectionCard from "../SectionCard";
import { Eye, EyeOff, Mail } from "lucide-react";

export default function EmailTab({ toggles, toggle }) {
  const [showPass, setShowPass] = useState(false);

  return (
    <SectionCard title="SMTP Configuration">

      <div className="grid grid-cols-2 gap-4">

        {[
          { label: "SMTP Host", placeholder: "smtp.gmail.com" },
          { label: "SMTP Port", placeholder: "587" },
          { label: "From Name", placeholder: "AI Scholar" },
          { label: "From Email", placeholder: "noreply@aischolar.io" },
        ].map((f) => (
          <div key={f.label}>
            <label className="text-xs uppercase font-semibold text-muted-foreground">{f.label}</label>
            <input className="form-input" placeholder={f.placeholder} />
          </div>
        ))}

      </div>

      <div className="mt-4 space-y-4">

        <div>
          <label className="text-xs uppercase font-semibold text-muted-foreground">SMTP Username</label>
          <input className="form-input max-w-sm" placeholder="your@email.com" />
        </div>

        <div>
          <label className="text-xs uppercase font-semibold text-muted-foreground">SMTP Password</label>

          <div className="relative max-w-sm">
            <input
              type={showPass ? "text" : "password"}
              className="form-input pr-10"
              placeholder="•••••••••••"
            />
            <button
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div>
          <label className="text-xs uppercase font-semibold text-muted-foreground">Encryption</label>
          <select className="form-input max-w-[160px]">
            <option>TLS</option>
            <option>SSL</option>
            <option>None</option>
          </select>
        </div>

      </div>

      <button className="btn-secondary mt-4 flex items-center gap-2">
        <Mail className="w-4 h-4" /> Send Test Email
      </button>

    </SectionCard>
  );
}