import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction"; // drag, drop, resize
import { useRef } from "react";

export default function FullCalendarComponent({ events, setEvents }) {
  const calendarRef = useRef(null);

  // Handle drag/drop date change
  const handleEventDrop = (info) => {
    const updatedEvents = events.map((ev) =>
      ev.id === info.event.id
        ? {
            ...ev,
            start: info.event.start,
            end: info.event.end,
          }
        : ev
    );
    setEvents(updatedEvents);
  };

  // Handle resizing events
  const handleEventResize = (info) => {
    const updatedEvents = events.map((ev) =>
      ev.id === info.event.id
        ? {
            ...ev,
            start: info.event.start,
            end: info.event.end,
          }
        : ev
    );
    setEvents(updatedEvents);
  };

  // Click on event
  const handleEventClick = (info) => {
    alert(`Event: ${info.event.title}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        editable={true}
        droppable={true}
        selectable={true}
        events={events}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        eventClick={handleEventClick}
        height="80vh"
      />
    </div>
  );
}
