import React, { useState } from "react";
import {
  User, Shield, Bell, Settings, Save, Key, Globe, Mail,
  Lock, Database, Cloud, Palette, Link as LinkIcon
} from "lucide-react";

export default function AdminSettings() {
  const [form, setForm] = useState({
    name: "Admin User",
    email: "admin@example.com",
    language: "English",
    timezone: "UTC +5:30",
    enableEmails: true,
    enableAlerts: true,
    enablePayments: false,
    enableTwoFactor: false,
    theme: "light",
    apiKey: "",
    webhookUrl: "",
    autoBackup: true,
    backupFrequency: "Daily",
  });

  const update = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-100 p-8">

      <h1 className="text-4xl font-extrabold text-indigo-900 mb-10 text-center">
        Admin Settings
      </h1>

      <div className="max-w-6xl mx-auto bg-white rounded-3xl p-10 shadow-xl border space-y-14">

        {/* PROFILE SETTINGS */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-2 mb-6">
            <User size={22} /> Profile Settings
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className="mt-1 w-full p-3 border rounded-lg bg-gray-50 focus:ring-indigo-300"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="mt-1 w-full p-3 border rounded-lg bg-gray-50 focus:ring-indigo-300"
              />
            </div>
          </div>
        </section>

        {/* GENERAL SETTINGS */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-2 mb-6">
            <Settings size={22} /> General Settings
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-gray-700">Language</label>
              <select
                value={form.language}
                onChange={(e) => update("language", e.target.value)}
                className="mt-1 w-full p-3 rounded-lg border bg-gray-50"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>Arabic</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Timezone</label>
              <select
                value={form.timezone}
                onChange={(e) => update("timezone", e.target.value)}
                className="mt-1 w-full p-3 rounded-lg border bg-gray-50"
              >
                <option>UTC +5:30</option>
                <option>UTC +1:00</option>
                <option>UTC -5:00</option>
                <option>UTC +10:00</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECURITY SETTINGS */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-2 mb-6">
            <Shield size={22} /> Security & Authentication
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-gray-700">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="mt-1 w-full p-3 rounded-lg border bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm password"
                className="mt-1 w-full p-3 rounded-lg border bg-gray-50"
              />
            </div>
          </div>

          {/* 2FA */}
          <label className="flex items-center gap-3 mt-4">
            <input
              type="checkbox"
              checked={form.enableTwoFactor}
              onChange={(e) => update("enableTwoFactor", e.target.checked)}
              className="w-5 h-5"
            />
            <span className="font-medium text-gray-700">Enable Two-Factor Authentication (2FA)</span>
          </label>
        </section>

        {/* NOTIFICATION SETTINGS */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-2 mb-6">
            <Bell size={22} /> Notifications
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.enableEmails}
                onChange={(e) => update("enableEmails", e.target.checked)}
                className="w-5 h-5"
              />
              <span>Email Alerts</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.enableAlerts}
                onChange={(e) => update("enableAlerts", e.target.checked)}
                className="w-5 h-5"
              />
              <span>System & Error Alerts</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={form.enablePayments}
                onChange={(e) => update("enablePayments", e.target.checked)}
                className="w-5 h-5"
              />
              <span>Payment Notifications</span>
            </label>
          </div>
        </section>

        {/* APPEARANCE SETTINGS */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-2 mb-6">
            <Palette size={22} /> Appearance
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-semibold text-gray-700">Theme</label>
              <select
                value={form.theme}
                onChange={(e) => update("theme", e.target.value)}
                className="mt-1 w-full p-3 rounded-lg border bg-gray-50"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>
          </div>
        </section>

        {/* INTEGRATIONS */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-2 mb-6">
            <LinkIcon size={22} /> Integrations (API / Webhooks)
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">

            <div>
              <label className="text-sm font-semibold text-gray-700">API Key</label>
              <input
                type="text"
                placeholder="Your API key..."
                value={form.apiKey}
                onChange={(e) => update("apiKey", e.target.value)}
                className="mt-1 w-full p-3 border rounded-lg bg-gray-50"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-gray-700">Webhook URL</label>
              <input
                type="text"
                placeholder="https://example.com/webhook"
                value={form.webhookUrl}
                onChange={(e) => update("webhookUrl", e.target.value)}
                className="mt-1 w-full p-3 border rounded-lg bg-gray-50"
              />
            </div>

          </div>
        </section>

        {/* STORAGE & BACKUP */}
        <section>
          <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-2 mb-6">
            <Database size={22} /> Storage & Backup
          </h2>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.autoBackup}
              onChange={(e) => update("autoBackup", e.target.checked)}
              className="w-5 h-5"
            />
            <span>Enable Auto Backup</span>
          </label>

          <div className="mt-4">
            <label className="text-sm font-semibold">Backup Frequency</label>
            <select
              value={form.backupFrequency}
              onChange={(e) => update("backupFrequency", e.target.value)}
              className="mt-1 w-full p-3 rounded-lg border bg-gray-50"
            >
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
        </section>

        {/* SAVE BUTTON */}
        <div className="pt-6 text-center">
          <button className="flex items-center gap-2 mx-auto bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg transition">
            <Save size={20} /> Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
