"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const THEME_CHANGE_EVENT = "armando-theme-change";

function getSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function getServerSnapshot(): Theme {
  return "dark";
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, onStoreChange);
}

function applyTheme(next: Theme) {
  if (next === "light") {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
    localStorage.removeItem("theme");
  }
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggleTheme() {
    applyTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="touch-target text-fg-muted hover:text-fg inline-flex items-center justify-center"
      aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
    >
      {theme === "light" ? <Moon size={20} aria-hidden /> : <Sun size={20} aria-hidden />}
    </button>
  );
}
