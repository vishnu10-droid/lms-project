import React from 'react'

export default function Admin() {
  return (
    <div>
      <h1>rfc</h1>
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