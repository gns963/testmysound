"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getStoredTheme(): Theme | null {
  try {
    const stored = localStorage.getItem("theme");
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  // Always start at "light" — the one value guaranteed to match the server's
  // render (it has no access to localStorage or matchMedia). Reading the real
  // theme happens in the effect below, after hydration, so the icon can only
  // ever change post-mount — never mismatch what was server-rendered. (The
  // blocking script in layout.tsx already applied the real theme to <html>'s
  // data-theme before first paint; this only affects which icon this button
  // shows, not the page's actual colors.)
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    // One-time read of browser-only state after mount — not a cascading update.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(getStoredTheme() ?? getSystemTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable (private mode, etc.) — theme still applies for this load.
    }
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="border-border text-muted hover:text-text inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors"
    >
      {isDark ? (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="h-4.5 w-4.5"
        >
          <circle cx="12" cy="12" r="4.5" />
          <path
            strokeLinecap="round"
            d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
          />
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          className="h-4.5 w-4.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.5 14.5a8.5 8.5 0 1 1-9-10.9 7 7 0 0 0 9 10.9Z"
          />
        </svg>
      )}
    </button>
  );
}
