export default function NotificationControls() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Notification Controls</h1>

      <div className="grid gap-4">
        <label>
          <input type="checkbox" className="mr-2" />
          Email Notifications
        </label>

        <label>
          <input type="checkbox" className="mr-2" />
          Push Notifications
        </label>

        <label>
          <input type="checkbox" className="mr-2" />
          Student Alerts
        </label>
      </div>
    </div>
  );
}
