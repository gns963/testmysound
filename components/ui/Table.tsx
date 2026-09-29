import type { ReactNode } from "react";

// Design-system Table — zebra rows, hover state, rounded container. Generic
// over column headers and row cells so any tabular data can use it.
export function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border shadow-card">
      <table className="w-full min-w-[480px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-bg text-xs tracking-wide text-muted uppercase">
            {headers.map((header) => (
              <th key={header} className="px-5 py-3 font-bold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-b border-border transition-colors last:border-0 hover:bg-primary/5 ${
                rowIndex % 2 === 1 ? "bg-bg/60" : "bg-surface"
              }`}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-5 py-3.5 align-top ${cellIndex === 0 ? "font-semibold text-text" : "text-muted"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
