// src/settings/tab/PaymentsTab.jsx

import React from "react";
import SectionCard from "../SectionCard";
import { CreditCard } from "lucide-react";

export default function PaymentsTab() {

  const gateways = [
    { name: "Stripe", key: "sk_live_•••••••", active: true, color: "text-[#635bff]" },
    { name: "Razorpay", key: "rzp_live_••••••", active: false, color: "text-[#3395ff]" },
    { name: "PayPal", key: "AZ•••••••••", active: false, color: "text-[#003087]" },
  ];

  return (
    <>
      <SectionCard title="Payment Gateways">
        {gateways.map((gw) => (
          <div key={gw.name} className="flex items-center justify-between py-4 border-b border-border">

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl border flex items-center justify-center bg-card">
                <CreditCard className={`w-5 h-5 ${gw.color}`} />
              </div>

              <div>
                <p className="text-sm font-semibold">{gw.name}</p>
                <p className="text-xs text-muted-foreground">{gw.key}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold 
                ${gw.active ? "badge-success" : "bg-muted text-muted-foreground"}`}>
                {gw.active ? "Active" : "Inactive"}
              </span>

              <button className="btn-secondary text-xs px-3 py-1.5">Configure</button>
            </div>

          </div>
        ))}
      </SectionCard>

      <SectionCard title="Currency & Tax">
        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Default Currency</label>
            <select className="form-input">
              {["USD ($)", "EUR (€)", "GBP (£)", "INR (₹)", "SGD (S$)"].map(c => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Tax Rate (%)</label>
            <input type="number" className="form-input" defaultValue="18" />
          </div>

        </div>
      </SectionCard>
    </>
  );
}