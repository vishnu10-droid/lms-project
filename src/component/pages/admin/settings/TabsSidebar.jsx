import React from "react";

export default function TabsSidebar({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="w-52 flex-shrink-0">
      <div className="card-premium p-2 space-y-1 sticky-top-[96px]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg 
              text-sm transition-all cursor-pointer
              ${
                activeTab === tab.id
                  ? "bg-primary/10 text-primary border-l-4 border-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}