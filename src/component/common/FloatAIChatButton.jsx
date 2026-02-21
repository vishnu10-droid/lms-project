import React from "react";
import { useNavigate } from "react-router-dom";
import { BotMessageSquare } from "lucide-react";

export default function FloatAIChatButton() {
  const navigate = useNavigate();

  const openAIChatBoard = () => {
    navigate("/admin/helpcenter");
  };

  return (
    <button
      onClick={openAIChatBoard}
      aria-label="Open AI ChatBoard"
      title="Open AI ChatBoard"
      className="fixed bottom-24 right-6 w-14 h-14 rounded-full
                 bg-indigo-600 text-white
                 dark:bg-indigo-500 dark:text-white
                 hover:scale-110 active:scale-95 hover:bg-indigo-700
                 shadow-2xl flex items-center justify-center
                 transition-all duration-300 z-50
                 border border-white/10 dark:border-indigo-300/20"
    >
      <BotMessageSquare size={24} />
    </button>
  );
}
