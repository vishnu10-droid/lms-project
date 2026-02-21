export default function MonthView({ events, onEventClick }) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const week = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"];

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow border border-slate-200 dark:border-slate-700 transition-colors duration-300">
      
      <div className="grid grid-cols-7 text-center text-gray-600 dark:text-slate-400 font-semibold mb-2">
        {week.map((d) => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-1">

        {days.map((day) => {
          const dayEvents = events.filter(
            (ev) => day >= ev.startDay && day <= ev.endDay
          );

          return (
            <div
              key={day}
              className="h-28 border border-slate-200 dark:border-slate-700 rounded-xl p-2 relative hover:shadow transition"
            >
              <span className="font-semibold text-slate-700 dark:text-slate-200">{day}</span>

              {dayEvents.map((ev) => {
                const isStart = ev.startDay === day;
                const isEnd = ev.endDay === day;
                const isMiddle = day > ev.startDay && day < ev.endDay;

                return (
                  <div
                    key={ev.id}
                    onClick={() => onEventClick(ev)}
                    className={`absolute bottom-2 left-2 right-2 text-xs p-1 rounded cursor-pointer ${ev.color}`}
                    style={{
                      borderLeft: isStart ? "4px solid #333" : "",
                      borderRight: isEnd ? "4px solid #333" : "",
                      opacity: isMiddle ? 0.7 : 1,
                    }}
                  >
                    {isStart && ev.title}
                  </div>
                );
              })}
            </div>
          );
        })}

      </div>
    </div>
  );
}
