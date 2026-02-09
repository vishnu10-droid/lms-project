export default function DayView({ events, onEventClick }) {
  const hours = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`);

  const todayEvents = events.filter((ev) => ev.weekDay === 1);

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <h3 className="font-semibold text-gray-700 mb-4">Today's Schedule</h3>

      <div className="space-y-4">
        {hours.map((hr) => (
          <div key={hr} className="border-l-2 pl-4 py-3 relative">

            <span className="absolute -left-12 text-gray-500 text-sm">
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
