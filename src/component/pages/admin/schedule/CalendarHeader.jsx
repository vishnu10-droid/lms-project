import { useState } from "react";

export default function CalendarHeader({ onTabChange }) {
  const [active, setActive] = useState("Month");
  const tabs = ["Day", "Week", "Month"];

  const clickTab = (tab) => {
    setActive(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">October 2025</h2>

      <div className="flex gap-2 bg-gray-100 dark:bg-slate-800 p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => clickTab(tab)}
            className={`px-4 py-2 rounded-lg transition ${
              active === tab ? "bg-white dark:bg-slate-700 shadow text-blue-600" : "text-gray-500 dark:text-slate-400"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
