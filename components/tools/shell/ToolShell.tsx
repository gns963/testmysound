import type { ReactNode } from "react";

// Tool container: title, optional mode tabs, main interactive area, hint row.
// Every P0 tool renders inside this so the "above the fold" layout stays
// consistent (blueprint §6/§8).
export function ToolShell({
  modes,
  children,
  hint,
}: {
  modes?: ReactNode;
  children: ReactNode;
  hint?: ReactNode;
}) {
  return (
    <div className="border-border/70 bg-surface/95 shadow-card-hover relative w-full overflow-hidden rounded-3xl border p-6 backdrop-blur-sm sm:p-9">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1"
        style={{
          background: "linear-gradient(90deg, var(--primary), var(--accent))",
        }}
      />
      {modes && <div className="mb-6 flex justify-center">{modes}</div>}
      <div className="flex flex-col items-center gap-6">{children}</div>
      {hint && <div className="mt-6 flex justify-center">{hint}</div>}
    </div>
  );
}
