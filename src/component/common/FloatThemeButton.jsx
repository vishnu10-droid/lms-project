import React, { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function FloatThemeButton() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return savedTheme || (systemPrefersDark ? "dark" : "light");
  });

  // 2. On Theme Change: Update DOM and LocalStorage
  useEffect(() => {
    if (!theme) return;

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.documentElement.style.colorScheme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full 
                 bg-zinc-900 text-white 
                 dark:bg-zinc-100 dark:text-zinc-900
                 hover:scale-110 active:scale-95
                 shadow-2xl flex items-center justify-center 
                 transition-all duration-300 z-50
                 border border-white/10 dark:border-black/10"
    >
      {theme === "light" ? (
        <Moon size={24} className="fill-current" />
      ) : (
        <Sun size={24} className="fill-current" />
      )}
    </button>
  );
}
