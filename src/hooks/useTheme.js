import { useEffect, useState } from "react";

/**
 * useTheme Hook
 * Manages dark/light theme toggle with localStorage persistence
 */
export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    // Update localStorage
    localStorage.setItem("app-theme", theme);

    // Update document class for CSS styling
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark-theme");
      root.classList.remove("light-theme");
    } else {
      root.classList.add("light-theme");
      root.classList.remove("dark-theme");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
};

export default useTheme;
