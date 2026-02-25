// src/settings/Settings.jsx
import { motion, AnimatePresence } from "framer-motion"; // Dynamic Animations

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
{/* SETTINGS HEADER — Converted to Payments Parallax Style */}

<div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br 
               
                border border-white/20 shadow-lg backdrop-blur-xl
                transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">

  {/* Floating Glow */}
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.4 }}
    className="absolute -top-14 -right-14 w-56 h-56 bg-indigo-500/30 
               rounded-full blur-3xl"
  />

  {/* Content */}
  <div className="relative z-20 flex items-center justify-between">

    {/* LEFT TEXT */}
    <div className="space-y-1">
      <motion.h1
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 60 }}
        className="text-[28px] font-extrabold tracking-tight 
                   .bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600
                   bg-clip-text text-transparent"
      >
        Settings
      </motion.h1>

      <p className="text-[14px] text-slate-600 dark:text-slate-400">
        Configure your AI Scholar platform
      </p>
    </div>

    {/* RIGHT BUTTON */}
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onClick={handleSave}
      className={`px-5 py-2.5 rounded-xl flex items-center gap-2 
                  text-white text-sm font-semibold shadow-lg transition-all
                  ${saved ? "bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"}`}
    >
      {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
      {saved ? "Saved!" : "Save Changes"}
    </motion.button>
    
  </div>
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