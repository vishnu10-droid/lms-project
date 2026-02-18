import { useState } from "react";

const DevAi = ({ activeVideo }) => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!question.trim()) return;

    const userMessage = { role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/devai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          videoTitle: activeVideo?.title,
          videoDescription: activeVideo?.description,
          transcript: activeVideo?.transcript,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: data.reply || "No response" },
      ]);

    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "AI failed. Try again." },
      ]);
    }

    setLoading(false);
    setQuestion("");
  };

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex-1 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg text-sm ${
              msg.role === "user"
                ? "bg-blue-600 text-white self-end"
                : "bg-slate-800 text-slate-200"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="text-sm text-slate-400">
            AI is thinking...
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-3">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about this lesson..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm"
        />
        <button
          onClick={askAI}
          className="bg-blue-600 px-4 rounded-lg text-white"
        >
          Ask
        </button>
      </div>
    </div>
  );
};

export default DevAi;
