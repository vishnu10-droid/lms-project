export default function DayView({ events, onEventClick }) {
  const hours = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);

  const todayEvents = events.filter((ev) => ev.weekDay === 1);

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow border border-slate-200 dark:border-slate-700 transition-colors duration-300">

      <h3 className="font-semibold text-gray-700 dark:text-slate-200 mb-4">Today's Schedule</h3>

      <div className="space-y-4">
        {hours.map((hr) => (
          <div key={hr} className="border-l-2 border-slate-200 dark:border-slate-700 pl-4 py-3 relative">

            <span className="absolute -left-12 text-gray-500 dark:text-slate-400 text-sm">
              {hr}
            </span>

            {todayEvents
              .filter((ev) => ev.time === hr)
              .map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => onEventClick(ev)}
                  className={`p-2 rounded-xl text-xs w-40 cursor-pointer ${ev.color}`}
                >
                  {ev.title}
                </div>
              ))}
          </div>
        ))}
      </div>

    </div>
  );
}
