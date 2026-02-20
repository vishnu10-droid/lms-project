// src/settings/tab/SecurityTab.jsx

import React from "react";
import SectionCard from "../SectionCard";
import SettingRow from "../SettingRow";
import ToggleSwitch from "../ToggleSwitch";

export default function SecurityTab({ toggles, toggle }) {
  return (
    <>
      <SectionCard title="Authentication">
        <div className="divide-y divide-border">

          <SettingRow
            label="Two-Factor Authentication"
            desc="Require 2FA for all admin accounts"
          >
            <ToggleSwitch checked={toggles.twoFactor} onChange={() => toggle("twoFactor")} />
          </SettingRow>

          <SettingRow
            label="Session Timeout"
            desc="Auto logout after inactivity period"
          >
            <ToggleSwitch checked={toggles.sessionTimeout} onChange={() => toggle("sessionTimeout")} />
          </SettingRow>

        </div>

        {toggles.twoFactor && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-xl animate-fade-in-up">
            <p className="text-sm font-semibold mb-2">2FA Configuration</p>
            <p className="text-xs text-muted-foreground mb-3">Scan this QR code with your authenticator app</p>

            <div className="w-24 h-24 bg-foreground rounded-lg flex items-center justify-center">
              {/* Fake QR animation */}
              <div className="grid grid-cols-4 gap-0.5 p-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-sm ${
                      Math.random() > 0.5 ? "bg-background" : "bg-foreground/10"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      </SectionCard>

      <SectionCard title="Password Policy">

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="uppercase text-xs font-semibold">Minimum Length</label>
            <input type="number" className="form-input" defaultValue="8" />
          </div>

          <div>
            <label className="uppercase text-xs font-semibold">Password Expiry (days)</label>
            <input type="number" className="form-input" defaultValue="90" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          {[
            "Uppercase Required",
            "Numbers Required",
            "Special Characters",
            "No Common Passwords",
          ].map((rule) => (
            <label key={rule} className="flex items-center gap-2 text-xs">
              <input type="checkbox" defaultChecked className="accent-primary" />
              {rule}
            </label>
          ))}
        </div>

      </SectionCard>
    </>
  );
}