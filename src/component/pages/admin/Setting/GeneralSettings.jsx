export default function GeneralSettings() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">General Settings</h1>

      <div className="grid gap-4">
        <div>
          <label className="font-medium">Default Language</label>
          <select className="w-full border p-2 rounded">
            <option>English</option>
            <option>Hindi</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Time Zone</label>
          <select className="w-full border p-2 rounded">
            <option>Asia/Kolkata</option>
            <option>UTC</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Currency</label>
          <select className="w-full border p-2 rounded">
            <option>INR</option>
            <option>USD</option>
          </select>
        </div>
      </div>
    </div>
  );
}
