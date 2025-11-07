// src/components/layout/ThemeToggle.tsx
export function ThemeToggle() {
    const toggle = () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    };
    return (
      <button 
        onClick={toggle} 
        className="h-9 rounded-xl border px-3 text-sm bg-white hover:bg-neutral-50 dark:bg-white dark:hover:bg-neutral-100 dark:text-black dark:border-black shadow-sm"
      >
        Toggle theme
      </button>
    );
  }