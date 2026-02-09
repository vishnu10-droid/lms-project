import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import EventList from "./EventList";
import CalendarView from "./CalendarView";

export default function SchedulePage() {

  // 🔥 MAIN GLOBAL EVENTS STATE (SHARED TO ALL COMPONENTS)
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Onsite Meeting",
      date: "14 Oct 2025 at 10:00 AM",
      startDay: 14,
      endDay: 14,
      color: "pink",
    },
    {
      id: 2,
      title: "Teamwork",
      date: "18-19 Oct 2025 at 12:30 PM",
      startDay: 18,
      endDay: 19,
      color: "blue",
    },
    {
      id: 3,
      title: "Teamwork",
      date: "23 Oct 2025 at 11:00 AM",
      startDay: 23,
      endDay: 23,
      color: "blue",
    },
    {
      id: 4,
      title: "Online Meeting",
      date: "28 Oct 2025 at 03:00 PM",
      startDay: 28,
      endDay: 28,
      color: "purple",
    },
    {
      id: 5,
      title: "Onsite Meeting",
      date: "30 Oct 2025 at 09:30 AM",
      startDay: 30,
      endDay: 30,
      color: "pink",
    }
  ]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-1">Hi Abdallah 👋</h2>
      <p className="text-gray-500 mb-6">Let's learning something new today!</p>

      <div className="flex gap-6">

        {/* EVENT LIST CONNECTED */}
        <EventList events={events} />

        {/* CALENDAR CONNECTED */}
        <div className="flex-1 bg-white shadow-md rounded-2xl p-6">
          <CalendarHeader />
          <CalendarView events={events} />
        </div>

      </div>
    </div>
  );
}
