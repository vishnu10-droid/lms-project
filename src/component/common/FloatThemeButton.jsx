import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function FloatThemeButton() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Apply theme to <html>
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full 
                 bg-black text-white 
                 hover:bg-gray-800
                 dark:bg-white dark:text-black dark:hover:bg-gray-300
                 shadow-xl flex items-center justify-center 
                 transition-all duration-300"
    >
      {theme === "light" ? <Moon size={26} /> : <Sun size={26} />}
    </button>
  );
}