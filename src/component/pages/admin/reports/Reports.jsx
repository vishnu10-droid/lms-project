import { useState } from "react";
import {
  Settings as SettingsIcon,
  Users,
  CreditCard,
  BookOpen,
  Bell,
  Shield,
  Mail,
  Zap,
  Palette,
  Database,
} from "lucide-react";

/* ----------------------------------------
   SIMPLE TOGGLE BUTTON (REUSABLE)
---------------------------------------- */
function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative w-10 h-5 rounded-full transition ${
        on ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition ${
          on ? "translate-x-5" : ""
        }`}
      />
    </button>
  );
}

/* ----------------------------------------
   CARD WRAPPER (REUSABLE)
---------------------------------------- */
function Card({ title, children }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 space-y-5">
      <h2 className="text-lg font-bold flex items-center gap-2 text-gray-800">
        <span className="w-1 h-5 bg-blue-600 rounded-full" />
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ----------------------------------------
   ALL TAB COMPONENTS (IN SINGLE FILE)
---------------------------------------- */

function GeneralTab({ state, setState }) {
  return (
    <Card title="General Settings">
      <div className="space-y-5">
        <div>
          <p className="font-semibold text-sm">Platform Name</p>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            defaultValue="My LMS"
          />
        </div>

        <div>
          <p className="font-semibold text-sm">Tagline</p>
          <input
            className="w-full px-3 py-2 border rounded-lg"
            defaultValue="Next-gen learning"
          />
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <p className="font-semibold text-sm">Maintenance Mode</p>
          <Toggle
            on={state.maintenanceMode}
            onChange={(v) => setState({ ...state, maintenanceMode: v })}
          />
        </div>
      </div>
    </Card>
  );
}

function UsersTab({ state, setState }) {
  return (
    <Card title="User Management">
      {/* Email Verification */}
      <div className="flex justify-between py-4 border-b">
        <div>
          <p className="font-semibold text-sm">Email Verification</p>
          <p className="text-xs text-gray-500">
            Require users to confirm email.
          </p>
        </div>

        <Toggle
          on={state.emailVerification}
          onChange={(v) => setState({ ...state, emailVerification: v })}
        />
      </div>

      {/* Default Role */}
      <div className="mt-6">
        <p className="text-xs uppercase font-semibold text-gray-500 mb-2">
          Default Role
        </p>

        <div className="flex gap-3">
          {["Student", "Instructor", "Admin"].map((role) => (
            <button
              key={role}
              onClick={() => setState({ ...state, role })}
              className={`flex-1 py-3 rounded-xl border text-sm font-medium transition ${
                state.role === role
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-50 text-gray-700 border-gray-300"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Session Settings */}
      <div className="bg-gray-50 border p-5 rounded-xl mt-6">
        <p className="text-xs uppercase font-semibold text-gray-500 mb-3">
          Session Settings
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-gray-600">Timeout (minutes)</label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              defaultValue="30"
            />
          </div>

          <div>
            <label className="text-xs text-gray-600">Max Login Attempts</label>
            <input
              className="w-full px-3 py-2 border rounded-lg"
              defaultValue="5"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

function PaymentsTab() {
  return (
    <Card title="Payment Gateways">
      {["Stripe", "Razorpay", "PayPal"].map((name) => (
        <div key={name} className="flex justify-between border-b pb-3 mb-2">
          <p className="font-semibold text-gray-700">{name}</p>
          <button className="px-4 py-1.5 text-sm border rounded-lg hover:bg-gray-100">
            Configure
          </button>
        </div>
      ))}
    </Card>
  );
}

function CoursesTab() {
  return (
    <Card title="Course Settings">
      <div className="space-y-5">
        <div>
          <p className="font-semibold text-sm">Max Video Size (MB)</p>
          <input className="w-full p-2 border rounded-lg" defaultValue="2048" />
        </div>

        <div>
          <p className="font-semibold text-sm">Allowed Formats</p>
          <input
            className="w-full p-2 border rounded-lg"
            defaultValue="mp4, webm"
          />
        </div>
      </div>
    </Card>
  );
}

function NotificationsTab() {
  return (
    <Card title="Notifications">
      <p className="text-gray-600">Email, SMS & push notifications</p>
    </Card>
  );
}

function SecurityTab() {
  return (
    <Card title="Security">
      <p className="text-gray-600">2FA, login rules, password policy…</p>
    </Card>
  );
}

function EmailTab() {
  return (
    <Card title="SMTP Server">
      <div>
        <p className="font-semibold">SMTP Host</p>
        <input
          className="w-full px-3 py-2 border rounded-lg"
          defaultValue="smtp.gmail.com"
        />
      </div>
    </Card>
  );
}

function IntegrationsTab() {
  return (
    <Card title="Integrations">
      <p className="text-gray-600">Stripe, Slack, Zoom, AWS integrations</p>
    </Card>
  );
}

function AppearanceTab() {
  return (
    <Card title="Appearance">
      <p className="text-gray-600">Theme, fonts, color system</p>
    </Card>
  );
}

function BackupTab() {
  return (
    <Card title="Backups & Logs">
      <p className="text-gray-600">Database backups & system logs</p>
    </Card>
  );
}

/* ----------------------------------------
   TAB COMPONENT MAP
---------------------------------------- */
const TAB_COMPONENTS = {
  general: GeneralTab,
  users: UsersTab,
  payments: PaymentsTab,
  courses: CoursesTab,
  notifications: NotificationsTab,
  security: SecurityTab,
  email: EmailTab,
  integrations: IntegrationsTab,
  appearance: AppearanceTab,
  backup: BackupTab,
};

/* ----------------------------------------
   SIDEBAR BUTTONS LIST
---------------------------------------- */
const SIDEBAR = [
  { id: "general", label: "General", icon: SettingsIcon },
  { id: "users", label: "Users", icon: Users },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "email", label: "Email / SMTP", icon: Mail },
  { id: "integrations", label: "Integrations", icon: Zap },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "backup", label: "Backup & Logs", icon: Database },
];

export default function Settings() {
  const [active, setActive] = useState("general");

  const [state, setState] = useState({
    maintenanceMode: false,
    emailVerification: true,
    role: "Student",
  });

  const ActiveTabComponent = TAB_COMPONENTS[active];

  return (
    <div className="p-10 bg-gray-50 min-h-screen flex gap-8">

      {/* Sidebar */}
      <div className="w-64 bg-white rounded-xl border shadow-sm p-4 space-y-1">
        {SIDEBAR.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition
              ${
                active === t.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1">
        <ActiveTabComponent state={state} setState={setState} />
      </div>
    </div>
  );
}