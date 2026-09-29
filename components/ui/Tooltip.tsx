import type { ReactNode } from "react";

// Design-system Tooltip — pure CSS (group-hover), no JS/positioning library.
// Wrap any trigger element; the label appears above it on hover/focus.
export function Tooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded-lg bg-text px-2.5 py-1.5 text-xs font-medium whitespace-nowrap text-bg opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {label}
      </span>
    </span>
  );
}
