"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

// Design-system Modal — backdrop + centered panel, closes on Escape or
// backdrop click. Used by the search palette; general-purpose otherwise.
export function Modal({
  open,
  onClose,
  children,
  align = "center",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  align?: "center" | "top";
}) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex justify-center bg-text/40 p-4 backdrop-blur-sm ${
        align === "top" ? "items-start pt-[12vh]" : "items-center"
      }`}
      onClick={onClose}
      role="presentation"
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-surface shadow-card-hover"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>
  );
}
