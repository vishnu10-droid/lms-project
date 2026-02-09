import { useState, useEffect } from "react";

export default function EventModal({ close, save, deleteEvent, event }) {
  const [title, setTitle] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [weekDay, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [color, setColor] = useState("#60a5fa");

  const isEditing = Boolean(event);

  // Load existing data when editing
  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setStartDay(event.startDay);
      setEndDay(event.endDay);
      setWeekDay(event.weekDay);
      setTime(event.time);
      setColor(event.color);
    }
  }, [event]);

  const handleSave = () => {
    if (!title || !startDay) {
      alert("Title & Start Day required");
      return;
    }

    save({
      id: event?.id || Date.now(),
      title,
      startDay: Number(startDay),
      endDay: Number(endDay),
      weekDay: Number(weekDay),
      time,
      color,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-xl animate-fadeIn">

        <h2 className="text-2xl font-bold mb-4">
          {isEditing ? "Edit Event" : "Add New Event"}
        </h2>

        {/* FORM */}
        <div className="grid gap-4">

          {/* Title */}
          <div>
            <label className="font-medium">Title</label>
            <input
              className="border w-full p-2 rounded"
              placeholder="Event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Start Day */}
          <div>
            <label className="font-medium">Start Day (1–31)</label>
            <input
              type="number"
              className="border w-full p-2 rounded"
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
            />
          </div>

          {/* End Day */}
          <div>
            <label className="font-medium">End Day (1–31)</label>
            <input
              type="number"
              className="border w-full p-2 rounded"
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
            />
          </div>

          {/* Week Day*/}
          <div>
            <label className="font-medium">Week Day (1=Mon ... 7=Sun)</label>
            <input
              type="number"
              className="border w-full p-2 rounded"
              value={weekDay}
              onChange={(e) => setWeekDay(e.target.value)}
            />
          </div>

          {/* Time */}
          <div>
            <label className="font-medium">Time</label>
            <input
              className="border w-full p-2 rounded"
              placeholder="10:00 AM"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          {/* Color Picker */}
          <div>
            <label className="font-medium">Event Color</label>
            <input
              type="color"
              className="w-16 h-10 border rounded"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex justify-between mt-6">

          {isEditing && (
            <button
              onClick={() => deleteEvent(event.id)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg"
            >
              Delete
            </button>
          )}

          <div className="flex gap-3">
            <button
              onClick={close}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg"
            >
              Save
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
