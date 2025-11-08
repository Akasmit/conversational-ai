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
        className="h-9 rounded-xl border border-white/20 px-3 text-sm bg-white/10 hover:bg-white/20 text-white backdrop-blur"
      >
        Toggle theme
      </button>
    );
  }