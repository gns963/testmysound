"use client";

import { useCallback, useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { createPortal } from "react-dom";
import { ToolShell } from "@/components/tools/shell/ToolShell";

type Pattern = { id: string; label: string; style: CSSProperties; swatch: string };

const PATTERNS: Pattern[] = [
  { id: "black", label: "Solid Black", style: { backgroundColor: "#000000" }, swatch: "#000000" },
  { id: "white", label: "Solid White", style: { backgroundColor: "#FFFFFF" }, swatch: "#FFFFFF" },
  { id: "red", label: "Solid Red", style: { backgroundColor: "#FF0000" }, swatch: "#FF0000" },
  { id: "green", label: "Solid Green", style: { backgroundColor: "#00FF00" }, swatch: "#00FF00" },
  { id: "blue", label: "Solid Blue", style: { backgroundColor: "#0000FF" }, swatch: "#0000FF" },
  { id: "yellow", label: "Solid Yellow", style: { backgroundColor: "#FFFF00" }, swatch: "#FFFF00" },
  { id: "cyan", label: "Solid Cyan", style: { backgroundColor: "#00FFFF" }, swatch: "#00FFFF" },
  { id: "magenta", label: "Solid Magenta", style: { backgroundColor: "#FF00FF" }, swatch: "#FF00FF" },
  {
    id: "gradient",
    label: "Grayscale Gradient",
    style: { backgroundImage: "linear-gradient(90deg, #000000, #ffffff)" },
    swatch: "#808080",
  },
  {
    id: "checker",
    label: "Checkerboard",
    style: {
      backgroundImage: "repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)",
      backgroundSize: "40px 40px",
    },
    swatch: "#cccccc",
  },
];

/** Dead Pixel & Screen Test: full-screen color/gradient/checker cycle. Fullscreen API + iOS fallback. */
export function ScreenTest() {
  const [active, setActive] = useState(false);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // One-time mount flag so createPortal only runs client-side — not a
    // cascading update.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const exit = useCallback(() => {
    if (typeof document !== "undefined" && document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setActive(false);
  }, []);

  const open = useCallback((startIndex: number) => {
    setIndex(startIndex);
    setActive(true);
    document.documentElement.requestFullscreen?.().catch(() => {
      // iOS Safari and some others don't support the Fullscreen API — the
      // fixed-position overlay below still fills the visible viewport.
    });
  }, []);

  const next = useCallback(() => setIndex((i) => (i + 1) % PATTERNS.length), []);
  const prev = useCallback(() => setIndex((i) => (i - 1 + PATTERNS.length) % PATTERNS.length), []);

  // Keep our overlay state in sync if the browser exits native fullscreen on
  // its own (e.g. some browsers intercept Esc before our own handler runs).
  useEffect(() => {
    if (!active) return;
    function handleFullscreenChange() {
      if (!document.fullscreenElement) setActive(false);
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        exit();
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, exit, next, prev]);

  const pattern = PATTERNS[index];

  return (
    <ToolShell>
      <p className="text-muted max-w-sm text-center text-xs">
        Cycles through solid colors, a gradient and a checkerboard, full-screen — arrow keys or tap to change, Esc to exit.
      </p>

      <div className="grid grid-cols-5 gap-2">
        {PATTERNS.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => open(i)}
            aria-label={`Start full-screen test on ${p.label}`}
            className="border-border h-10 w-10 rounded-lg border-2"
            style={{ background: p.style.backgroundImage ?? p.swatch }}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={() => open(0)}
        className="bg-primary hover:bg-primary-strong rounded-full px-6 py-3 text-base font-semibold text-white"
      >
        Start full-screen test
      </button>

      {mounted &&
        active &&
        createPortal(
          <div
            role="dialog"
            aria-label={`Screen test: ${pattern.label}`}
            className="fixed inset-0 z-[999] cursor-pointer"
            style={pattern.style}
            onClick={next}
          >
            <span
              aria-live="polite"
              className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white"
            >
              {pattern.label} · {index + 1}/{PATTERNS.length} · tap to change
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                exit();
              }}
              aria-label="Exit screen test"
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-lg font-bold text-white"
            >
              ×
            </button>
          </div>,
          document.body,
        )}
    </ToolShell>
  );
}
