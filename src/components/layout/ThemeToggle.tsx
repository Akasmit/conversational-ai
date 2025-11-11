// src/components/layout/ThemeToggle.tsx
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const [isDark, setIsDark] = useState(true);

    // Initialize theme on mount
    useEffect(() => {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const shouldBeDark = savedTheme === "dark" || (!savedTheme && prefersDark);
      
      setIsDark(shouldBeDark);
      if (shouldBeDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      document.documentElement.style.colorScheme = shouldBeDark ? "dark" : "light";
    }, []);

    const toggle = () => {
      const newIsDark = !isDark;
      setIsDark(newIsDark);
      
      if (newIsDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      
      localStorage.setItem("theme", newIsDark ? "dark" : "light");
      document.documentElement.style.colorScheme = newIsDark ? "dark" : "light";
      
      console.log('Theme toggled to:', newIsDark ? 'dark' : 'light');
      console.log('HTML classList:', document.documentElement.classList.toString());
    };

    return (
      <button 
        onClick={toggle} 
        className="h-9 rounded-xl border border-neutral-300 dark:border-white/20 px-3 text-sm 
                   bg-white dark:bg-white/10 hover:bg-neutral-100 dark:hover:bg-white/20 
                   text-neutral-800 dark:text-white backdrop-blur transition-colors"
      >
        {isDark ? "☀️ Light" : "🌙 Dark"}
      </button>
    );
  }