export default function CalendarView({ events }) {
  return (
    <div className="grid grid-cols-7 gap-1 text-center text-gray-600">

      {/* WEEK LABELS */}
      {["SAT","SUN","MON","TUE","WED","THU","FRI"].map(d => (
        <div key={d} className="py-2 font-medium">{d}</div>
      ))}

      {/* CALENDAR DAYS */}
      {Array.from({ length: 31 }, (_, i) => {
        const day = i + 1;

        // Filter events that match this day
        const dayEvents = events.filter(
          ev => day >= ev.startDay && day <= ev.endDay
        );

        return (
          <div
            key={day}
            className="h-28 border rounded-xl p-2 flex flex-col text-left relative hover:shadow-sm transition"
          >
            <span className="text-gray-800 font-semibold">{day}</span>

            {dayEvents.map(ev => (
              <div
                key={ev.id}
                className={`absolute bottom-2 left-2 right-2 
                text-xs p-1 rounded-md 
                ${
                  ev.color === "pink"
                    ? "bg-pink-100 text-pink-700"
                    : ev.color === "blue"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}
              >
                {ev.title}
              </div>
            ))}
          </div>
        );
      })}

    </div>
  );
}
