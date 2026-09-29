import type { TroubleshootRow } from "@/content/tools/types";
import { Table } from "@/components/ui/Table";

export function TroubleshootingTable({ rows }: { rows: TroubleshootRow[] }) {
  return (
    <section className="w-full">
      <h2 className="text-h3 font-semibold tracking-tight text-text">Troubleshooting</h2>
      <div className="mt-4">
        <Table
          headers={["Problem", "Likely cause", "Fix"]}
          rows={rows.map((row) => [row.problem, row.cause, row.fix])}
        />
      </div>
    </section>
  );
}
