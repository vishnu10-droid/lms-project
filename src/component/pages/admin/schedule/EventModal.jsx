import { useState } from "react";

export default function EventModal({ close, save, deleteEvent, event }) {
  const [title, setTitle] = useState(event?.title ?? "");
  const [startDay, setStartDay] = useState(event?.startDay ?? "");
  const [endDay, setEndDay] = useState(event?.endDay ?? "");
  const [weekDay, setWeekDay] = useState(event?.weekDay ?? "");
  const [time, setTime] = useState(event?.time ?? "");
  const [color, setColor] = useState(event?.color ?? "#60a5fa");

  const isEditing = Boolean(event);

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
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl w-full max-w-xl animate-fadeIn border border-slate-200 dark:border-slate-700">

        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          {isEditing ? "Edit Event" : "Add New Event"}
        </h2>

        {/* FORM */}
        <div className="grid gap-4">

          {/* Title */}
          <div>
            <label className="font-medium text-slate-700 dark:text-slate-300">Title</label>
            <input
              className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-full p-2 rounded"
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
              className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-full p-2 rounded"
              value={startDay}
              onChange={(e) => setStartDay(e.target.value)}
            />
          </div>

          {/* End Day */}
          <div>
            <label className="font-medium">End Day (1–31)</label>
            <input
              type="number"
              className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-full p-2 rounded"
              value={endDay}
              onChange={(e) => setEndDay(e.target.value)}
            />
          </div>

          {/* Week Day*/}
          <div>
            <label className="font-medium">Week Day (1=Mon ... 7=Sun)</label>
            <input
              type="number"
              className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-full p-2 rounded"
              value={weekDay}
              onChange={(e) => setWeekDay(e.target.value)}
            />
          </div>

          {/* Time */}
          <div>
            <label className="font-medium">Time</label>
            <input
              className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 w-full p-2 rounded"
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
              className="w-16 h-10 border border-slate-300 dark:border-slate-700 rounded"
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
              className="px-4 py-2 bg-gray-200 dark:bg-slate-700 dark:text-slate-100 rounded-lg"
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
