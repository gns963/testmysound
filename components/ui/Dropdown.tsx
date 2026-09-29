"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Design-system Dropdown — generic click-to-toggle menu with click-outside
// and Escape to close. `trigger` receives the open state so callers can
// rotate a chevron, etc.
export function Dropdown({
  trigger,
  children,
  align = "left",
}: {
  trigger: (open: boolean) => ReactNode;
  children: ReactNode;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {trigger(open)}
      </button>
      {open && (
        <div
          className={`absolute top-full z-30 mt-2 rounded-2xl border border-border bg-surface/95 shadow-card-hover backdrop-blur-xl duration-250 motion-safe:animate-[dropdownIn_0.25s_ease-out] ${
            align === "right" ? "right-0" : "left-0"
          }`}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  );
}
