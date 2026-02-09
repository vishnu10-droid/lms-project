export default function WeekView({ events, onEventClick }) {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="bg-white p-6 rounded-2xl shadow">

      <div className="grid grid-cols-7 text-center font-semibold text-gray-600">
        {weekDays.map((d) => <div key={d}>{d}</div>)}
      </div>

      <div className="grid grid-cols-7 gap-3 mt-4">
        {weekDays.map((day, index) => {

          const todayEvents = events.filter((ev) => ev.weekDay === index + 1);

          return (
            <div key={day} className="min-h-[150px] border rounded-xl p-2">
              <h3 className="font-semibold text-gray-700 mb-2">{day}</h3>

              {todayEvents.length === 0 && (
                <p className="text-gray-300 text-sm">No events</p>
              )}

              {todayEvents.map((ev) => (
                <div
                  key={ev.id}
                  onClick={() => onEventClick(ev)}
                  className={`p-2 rounded-lg cursor-pointer text-xs ${ev.color}`}
                >
                  {ev.title}
                  <div className="text-[10px]">{ev.time}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>

    </div>
  );
}
