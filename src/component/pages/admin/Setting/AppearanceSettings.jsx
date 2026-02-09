export default function AppearanceSettings() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Appearance Settings</h1>

      <div className="grid gap-4">
        <div>
          <label className="font-medium">Theme</label>
          <select className="w-full border p-2 rounded">
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>

        <div>
          <label className="font-medium">Accent Color</label>
          <input type="color" className="w-16 h-10 p-1 rounded border" />
        </div>

        <div>
          <label className="font-medium">Upload Logo</label>
          <input type="file" className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="font-medium">App Name</label>
          <input type="text" placeholder="My LMS" className="w-full border p-2 rounded" />
        </div>
      </div>
    </div>
  );
}
