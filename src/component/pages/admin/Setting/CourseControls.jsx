export default function CourseControls() {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Course Controls</h1>

      <div className="grid gap-4">
        <label>
          <input type="checkbox" className="mr-2" />
          Enable Comments
        </label>

        <label>
          <input type="checkbox" className="mr-2" />
          Enable Certificates
        </label>

        <label>
          <input type="checkbox" className="mr-2" />
          Auto-Publish Modules
        </label>
      </div>
    </div>
  );
}
