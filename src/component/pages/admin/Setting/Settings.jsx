import React, { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  CreditCard,
  Mail,
  Shield
} from "lucide-react";

/* ---------------- COMPONENT ---------------- */

export default function Settings() {

  const [tab, setTab] = useState("general");

  return (
    <div className="p-6 text-white">

      {/* HEADER */}
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {/* SIDEBAR TABS */}
        <div className="bg-slate-800 p-4 rounded-xl space-y-2">

          <TabButton
            label="General"
            icon={SettingsIcon}
            active={tab==="general"}
            onClick={()=>setTab("general")}
          />

          <TabButton
            label="Profile"
            icon={User}
            active={tab==="profile"}
            onClick={()=>setTab("profile")}
          />

          <TabButton
            label="Payments"
            icon={CreditCard}
            active={tab==="payments"}
            onClick={()=>setTab("payments")}
          />

          <TabButton
            label="Email"
            icon={Mail}
            active={tab==="email"}
            onClick={()=>setTab("email")}
          />

          <TabButton
            label="Security"
            icon={Shield}
            active={tab==="security"}
            onClick={()=>setTab("security")}
          />

        </div>

        {/* CONTENT */}
        <div className="md:col-span-3 bg-slate-800 p-6 rounded-xl">

          {tab==="general" && <GeneralSettings/>}
          {tab==="profile" && <ProfileSettings/>}
          {tab==="payments" && <PaymentSettings/>}
          {tab==="email" && <EmailSettings/>}
          {tab==="security" && <SecuritySettings/>}

        </div>

      </div>

    </div>
  );
}

/* ---------------- TAB BUTTON ---------------- */

function TabButton({ label, icon:Icon, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-2 p-3 rounded-lg
      ${active ? "bg-indigo-600" : "hover:bg-slate-700"}`}
    >
      <Icon size={18}/>
      {label}
    </button>
  );
}

/* ---------------- GENERAL ---------------- */

function GeneralSettings() {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold">General Settings</h2>

      <Input label="Platform Name"/>
      <Input label="Timezone"/>
      <Input label="Currency"/>

      <button className="bg-indigo-600 px-4 py-2 rounded">
        Save Changes
      </button>

    </div>
  );
}

/* ---------------- PROFILE ---------------- */

function ProfileSettings() {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold">Profile Settings</h2>

      <Input label="Full Name"/>
      <Input label="Email"/>
      <Input label="New Password" type="password"/>

      <button className="bg-indigo-600 px-4 py-2 rounded">
        Update Profile
      </button>

    </div>
  );
}

/* ---------------- PAYMENTS ---------------- */

function PaymentSettings() {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold">Payment Settings</h2>

      <Input label="Stripe Key"/>
      <Input label="Razorpay Key"/>

      <button className="bg-indigo-600 px-4 py-2 rounded">
        Save Payment Settings
      </button>

    </div>
  );
}

/* ---------------- EMAIL ---------------- */

function EmailSettings() {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold">Email Settings</h2>

      <Input label="SMTP Host"/>
      <Input label="SMTP Port"/>
      <Input label="Username"/>
      <Input label="Password" type="password"/>

      <button className="bg-indigo-600 px-4 py-2 rounded">
        Save Email Settings
      </button>

    </div>
  );
}

/* ---------------- SECURITY ---------------- */

function SecuritySettings() {
  return (
    <div className="space-y-4">

      <h2 className="text-lg font-semibold">Security Settings</h2>

      <Toggle label="Enable Two Factor Authentication"/>
      <Toggle label="Auto Logout Inactive Users"/>

      <button className="bg-indigo-600 px-4 py-2 rounded">
        Save Security Settings
      </button>

    </div>
  );
}

/* ---------------- REUSABLE INPUT ---------------- */

function Input({ label, type="text" }) {
  return (
    <div>
      <label className="text-sm text-gray-400">{label}</label>
      <input
        type={type}
        className="w-full bg-slate-700 rounded p-2 outline-none mt-1"
      />
    </div>
  );
}

/* ---------------- TOGGLE ---------------- */

function Toggle({ label }) {
  return (
    <div className="flex items-center justify-between">

      <span>{label}</span>

      <input type="checkbox" className="w-5 h-5"/>

    </div>
  );
}
