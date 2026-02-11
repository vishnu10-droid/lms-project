import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    // Hard reset every possible scroll target
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    // If using any custom scroll wrappers
    const root = document.getElementById("root");
    if (root) root.scrollTop = 0;

    const main = document.querySelector("main");
    if (main) main.scrollTop = 0;

    const wrappers = document.querySelectorAll("[data-scroll]");
    wrappers.forEach(w => (w.scrollTop = 0));
  }, [location.pathname]);

  return null;
}
