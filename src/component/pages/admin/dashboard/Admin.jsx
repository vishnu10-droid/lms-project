import React from "react";
import {
  Users,
  DollarSign,
  BookOpen,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  Tooltip
} from "recharts";

/* ---------------- MOCK DATA ---------------- */

const revenueData = [
  { month: "Jan", value: 4200 },
  { month: "Feb", value: 6800 },
  { month: "Mar", value: 7500 },
  { month: "Apr", value: 9200 },
  { month: "May", value: 10500 },
  { month: "Jun", value: 14800 },
];

const users = [
  { name: "Alex Morgan", role: "Student", status: "Active" },
  { name: "Sophia Lee", role: "Instructor", status: "Active" },
  { name: "John Carter", role: "Student", status: "Pending" },
];

/* ---------------- COMPONENT ---------------- */

export default function Admin() {
  return (
    <div className="p-10 text-white space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-black tracking-tight">Admin Dashboard</h1>
        <p className="text-slate-400 mt-1">
          Overview of platform performance & activity
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Total Users" value="12,480" />
        <StatCard icon={BookOpen} label="Courses" value="186" />
        <StatCard icon={DollarSign} label="Revenue" value="$245,800" />
        <StatCard icon={TrendingUp} label="Growth" value="+18%" />
      </div>

      {/* CHART + SYSTEM STATUS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* REVENUE CHART */}
        <div className="xl:col-span-2 bg-[#0f1522] border border-white/10 rounded-3xl p-8">
          <h2 className="font-bold text-lg mb-6">Revenue Overview</h2>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#475569" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#6366f1"
                  fill="url(#rev)"
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div className="bg-[#0f1522] border border-white/10 rounded-3xl p-8 space-y-6">
          <h2 className="font-bold text-lg">System Status</h2>

          <StatusItem
            icon={CheckCircle}
            label="API Status"
            value="Operational"
            color="emerald"
          />

          <StatusItem
            icon={Activity}
            label="Server Load"
            value="Normal"
            color="indigo"
          />

          <StatusItem
            icon={AlertTriangle}
            label="Alerts"
            value="1 Warning"
            color="amber"
          />
        </div>
      </div>

      {/* RECENT USERS TABLE */}
      <div className="bg-[#0f1522] border border-white/10 rounded-3xl p-8">
        <h2 className="font-bold text-lg mb-6">Recent Users</h2>

        <table className="w-full text-sm">
          <thead className="text-slate-400 border-b border-white/10">
            <tr>
              <th className="text-left pb-3">Name</th>
              <th className="text-left pb-3">Role</th>
              <th className="text-left pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((u, i) => (
              <tr key={i}>
                <td className="py-4 font-semibold">{u.name}</td>
                <td className="py-4">{u.role}</td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold
                      ${
                        u.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                  >
                    {u.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

/* ---------------- SMALL COMPONENTS ---------------- */

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-[#0f1522] border border-white/10 rounded-3xl p-6 flex items-center gap-4">
      <div className="p-3 bg-indigo-500/10 rounded-xl">
        <Icon className="text-indigo-400" />
      </div>
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-widest">
          {label}
        </p>
        <h3 className="text-2xl font-black">{value}</h3>
      </div>
    </div>
  );
}

function StatusItem({ icon: Icon, label, value, color }) {
  const colors = {
    emerald: "text-emerald-400",
    indigo: "text-indigo-400",
    amber: "text-amber-400",
  };

  return (
    <div className="flex items-center gap-4">
      <Icon className={colors[color]} />
      <div>
        <p className="text-sm font-semibold">{label}</p>
        <p className="text-xs text-slate-400">{value}</p>
      </div>
    </div>
  );
}
