import { useState } from "react";
import CalendarHeader from "./CalendarHeader";
import MonthView from "./MonthView";
import WeekView from "./WeekView";
import DayView from "./DayView";
import EventModal from "./EventModal";

export default function Calendar() {
  const [view, setView] = useState("Month");

  const [events, setEvents] = useState([
    { id: 1, title: "Teamwork", startDay: 16, endDay: 16, weekDay: 2, time: "10:00 AM", color: "bg-blue-100 text-blue-700" },
    { id: 2, title: "Bootcamp", startDay: 20, endDay: 22, weekDay: 4, time: "1:00 PM", color: "bg-purple-100 text-purple-700" },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const openNewEvent = () => {
    setEditingEvent(null);
    setModalOpen(true);
  };

  const openEditEvent = (event) => {
    setEditingEvent(event);
    setModalOpen(true);
  };

  const saveEvent = (ev) => {
    if (editingEvent) {
      setEvents(events.map((e) => (e.id === ev.id ? ev : e)));
    } else {
      setEvents([...events, { ...ev, id: Date.now() }]);
    }
    setModalOpen(false);
  };

  const deleteEvent = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    setModalOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <h2 className="text-3xl font-bold mb-1">Hi ADMIN NAME 👋</h2>
      <p className="text-gray-500 mb-6">Let's learning something new today!</p>

      <div className="flex gap-6">

      <CalendarHeader onTabChange={setView} />
      </div>


      <button
        onClick={openNewEvent}
        className="mb-4 px-5 py-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white rounded-xl shadow"
      >
        + Add Event
      </button>
      
      {view === "Month" && <MonthView events={events} onEventClick={openEditEvent} />}
      {view === "Week"  && <WeekView events={events} onEventClick={openEditEvent} />}
      {view === "Day"   && <DayView events={events} onEventClick={openEditEvent} />}

      {modalOpen && (
        <EventModal
          close={() => setModalOpen(false)}
          save={saveEvent}
          deleteEvent={deleteEvent}
          event={editingEvent}
        />
      )}
    </div>
  );
}
