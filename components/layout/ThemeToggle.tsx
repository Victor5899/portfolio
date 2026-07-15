"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/useMounted";
import { THEME } from "@/constants/theme";
import { useTheme } from "./ThemeProvider";

/**
 * Dark/light switch (A11Y-7). Exposes state via an accessible name and
 * `aria-pressed`, and avoids a theme flash by deferring the resolved icon until
 * after mount (SSR renders the dark-first default). Leaf Client Component.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const mounted = useMounted();

  const isDark = !mounted
    ? THEME.default === "dark"
    : theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
      : theme === "dark";

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="text-muted-foreground hover:text-foreground"
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  );
}
