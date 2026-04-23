import React, { useEffect } from "react";

type Theme = "light" | "dark";

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
}

export function ThemeProvider({
  children,
  defaultTheme = "light",
}: ThemeProviderProps) {
  useEffect(() => {
    const root = document.documentElement;
    if (defaultTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [defaultTheme]);

  // NOTE: This portfolio currently uses a fixed theme (App sets `defaultTheme="dark"`).
  // We intentionally keep the API minimal and avoid unused toggle/switch logic.
  return children;
}
