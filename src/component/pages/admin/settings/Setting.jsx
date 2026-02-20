// src/settings/Settings.jsx

import { useState } from "react";
import {
  Settings as SettingsIcon, Users, CreditCard, BookOpen, Bell, Shield,
  Mail, Zap, Palette, Database, Save, Check
} from "lucide-react";

import TabsSidebar from "./TabsSidebar";

// ALL TABS
import GeneralTab from "./tab/GeneralTab";
import UsersTab from "./tab/UsersTab";
import PaymentsTab from "./tab/PaymentsTab";
import NotificationsTab from "./tab/NotificationsTab";
import SecurityTab from "./tab/SecurityTab";
import EmailTab from "./tab/EmailTab";
import IntegrationsTab from "./tab/IntegrationsTab";
import AppearanceTab from "./tab/AppearanceTab";
import BackupTab from "./tab/BackupTab";

export default function Settings() {

  const tabs = [
    { id: "general", label: "General", icon: SettingsIcon },
    { id: "users", label: "Users", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "email", label: "Email / SMTP", icon: Mail },
    { id: "integrations", label: "Integrations", icon: Zap },
    { id: "backup", label: "Backup & Logs", icon: Database },
  ];

  const [activeTab, setActiveTab] = useState("general");
  const [saved, setSaved] = useState(false);

  const [toggles, setToggles] = useState({
    maintenanceMode: false,
    studentRegistration: true,
    emailVerification: true,
    twoFactor: false,
    sessionTimeout: true,
    autoBackup: true,
    emailNotify: true,
    smsNotify: false,
    pushNotify: true,
    reviewApproval: true,
    autoEnroll: false,
    certificateGen: true,
    darkMode: false,
    compactMode: false,
  });

  const toggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "general": return <GeneralTab toggles={toggles} toggle={toggle} />;
      case "users": return <UsersTab toggles={toggles} toggle={toggle} />;
      case "payments": return <PaymentsTab toggles={toggles} toggle={toggle} />;
      case "notifications": return <NotificationsTab toggles={toggles} toggle={toggle} />;
      case "security": return <SecurityTab toggles={toggles} toggle={toggle} />;
      case "email": return <EmailTab toggles={toggles} toggle={toggle} />;
      case "integrations": return <IntegrationsTab toggles={toggles} toggle={toggle} />;
      case "backup": return <BackupTab toggles={toggles} toggle={toggle} />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">

     {/* HEADER */}
<div className="flex items-center justify-between animate-fade-in-up
                bg-white border border-[#eef1f6] shadow-sm
                rounded-2xl px-6 py-4">

  <div>
    <h1 className="page-title text-[26px] font-bold text-[#1e293b]">
      Settings
    </h1>
    <p className="page-subtitle text-[14px] text-[#64748b]">
      Configure your AI Scholar platform
    </p>
  </div>

  <button
    onClick={handleSave}
    className={`btn-primary transition-all flex items-center gap-2
                px-5 py-2.5 rounded-xl text-white text-sm font-semibold 
                shadow-md cursor-pointer
                ${saved ? "bg-success" : "bg-blue-600 hover:bg-blue-700"}`}
  >
    {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
    {saved ? "Saved!" : "Save Changes"}
  </button>
</div>

      {/* BODY */}
      <div className="flex gap-6 animate-fade-in-up delay-100">

        {/* LEFT SIDEBAR */}
        <TabsSidebar tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* RIGHT CONTENT */}
        <div className="flex-1 min-w-0 animate-fade-in-up">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}