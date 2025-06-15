
import React from "react";
import { Sun, Moon } from "lucide-react";

const THEME_KEY = "fealtyx_theme";

function getPreferredTheme() {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") return stored;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = React.useState<"light" | "dark">(getPreferredTheme());

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  React.useEffect(() => {
    // Sync initial theme on mount
    setTheme(getPreferredTheme());
  }, []);

  const toggleTheme = () => setTheme(prev => (prev === "light" ? "dark" : "light"));

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="rounded-full p-2 transition bg-muted hover:bg-accent text-foreground dark:bg-background dark:hover:bg-muted"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
