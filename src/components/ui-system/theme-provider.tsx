"use client";

import React, { useEffect, useState, createContext, useContext } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<
  { theme: Theme; setTheme: (t: Theme) => void } | undefined
>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme") as Theme | null;
      const initial = saved ?? "dark";
      setThemeState(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
    } catch (err) {
      // noop in SSR-unfriendly environments
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    try {
      localStorage.setItem("theme", t);
    } catch (e) {
      /* ignore */
    }
    document.documentElement.classList.toggle("dark", t === "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
