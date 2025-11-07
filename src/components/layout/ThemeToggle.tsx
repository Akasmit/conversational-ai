// src/components/layout/ThemeToggle.tsx
export function ThemeToggle() {
    const toggle = () => {
      const isDark = document.documentElement.classList.toggle("dark");
      localStorage.setItem("theme", isDark ? "dark" : "light");
      document.documentElement.style.colorScheme = isDark ? "dark" : "light";
    };
    return (
      <button onClick={toggle} className="rounded-xl border px-3 py-1 text-sm">
        Toggle theme
      </button>
    );
  }