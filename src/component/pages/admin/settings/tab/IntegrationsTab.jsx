// src/settings/tab/IntegrationsTab.jsx

import React from "react";
import SectionCard from "../SectionCard";
import { CreditCard, Globe, Smartphone, Bell, Database } from "lucide-react";

export default function IntegrationsTab() {
  const list = [
    { name: "Stripe", desc: "Payment processing", icon: CreditCard, connected: true, color: "text-[#635bff]" },
    { name: "Google Analytics", desc: "Traffic analytics", icon: Globe, connected: true, color: "text-[#e37400]" },
    { name: "Zoom", desc: "Video meetings", icon: Smartphone, connected: false, color: "text-[#2d8cff]" },
    { name: "Slack", desc: "Team alerts", icon: Bell, connected: false, color: "text-[#4a154b]" },
    { name: "AWS S3", desc: "Cloud Storage", icon: Database, connected: true, color: "text-[#ff9900]" },
  ];

  return (
    <SectionCard title="Third Party Integrations">
      {list.map((item) => (
        <div key={item.name} className="flex items-center justify-between py-4 border-b border-border">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-card">
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>

            <div>
              <p className="text-sm font-semibold">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>

          <button
            className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all 
              ${item.connected
                ? "border-destructive/50 text-destructive hover:bg-destructive/10"
                : "border-primary text-primary hover:bg-primary/10"
              }`}
          >
            {item.connected ? "Disconnect" : "Connect"}
          </button>

        </div>
      ))}
    </SectionCard>
  );
}