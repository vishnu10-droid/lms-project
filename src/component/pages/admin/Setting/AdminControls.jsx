export default function AdminControls() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Admin Controls</h1>

      <div className="grid gap-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create New Admin
        </button>

        <button className="bg-red-600 text-white px-4 py-2 rounded">
          View Logs
        </button>
      </div>
    </div>
  );
}
