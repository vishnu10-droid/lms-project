export default function EventCard({ title, date, color }) {
  const colorMap = {
    pink: "bg-pink-100 border-pink-300",
    blue: "bg-blue-100 border-blue-300",
    purple: "bg-purple-100 border-purple-300",
  };

  return (
    <div className={`p-3 rounded-xl border ${colorMap[color]} shadow-sm`}>
      <h3 className="font-semibold flex items-center gap-2">
        <span>📌</span> {title}
      </h3>
      <p className="text-gray-500 text-sm mt-1">{date}</p>
    </div>
  );
}
