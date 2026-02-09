import EventCard from "./EventCard";

const sampleEvents = [
  { title: "Onsite Meeting", date: "14 Oct 2025 at 10:00 AM", color: "pink" },
  { title: "Teamwork", date: "18-19 Oct 2025 at 12:30 PM", color: "blue" },
  { title: "Teamwork", date: "23 Oct 2025 at 11:00 AM", color: "blue" },
  { title: "Online Meeting", date: "28 Oct 2025 at 03:00 PM", color: "purple" },
  { title: "Onsite Meeting", date: "30 Oct 2025 at 09:30 AM", color: "pink" },
];

export default function EventList() {
  return (
    <div className="w-72">
      
      <button className="w-full py-3 mb-4 text-white font-medium rounded-xl
        bg-gradient-to-r from-blue-500 to-pink-500 shadow hover:opacity-90">
        + Add New Event
      </button>

      <div className="space-y-3">
        {sampleEvents.map((ev, index) => (
          <EventCard key={index} title={ev.title} date={ev.date} color={ev.color} />
        ))}
      </div>
    </div>
  );
}
