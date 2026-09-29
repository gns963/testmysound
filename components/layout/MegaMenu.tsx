import type { MenuColumn, MenuLink } from "@/lib/megaMenu";
import { ToolCard } from "@/components/ui/ToolCard";

// Desktop mega-menu panel: an optional "featured" card (Audio Tools' first
// column) plus N link columns. Fade + slide entrance, exact shadow/radius/
// border from spec. Shown/hidden by the parent Header via hover state.
// Tailwind can't see dynamically-built class names, so the total column count
// (columns + optional featured slot) maps to a literal class here instead of
// a template string.
const GRID_COLS_CLASS: Record<number, string> = {
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
};

export function MegaMenu({
  columns,
  featured,
  width = "w-[720px]",
}: {
  columns: MenuColumn[];
  featured?: MenuLink;
  width?: string;
}) {
  const totalColumns = columns.length + (featured ? 1 : 0);

  return (
    <div
      className={`absolute top-full left-1/2 z-30 -translate-x-1/2 rounded-3xl border border-border bg-surface p-8 duration-250 motion-safe:animate-[megaMenuIn_0.25s_ease-out] ${width}`}
      style={{ boxShadow: "0 25px 50px rgba(15, 23, 42, 0.12)" }}
    >
      <div className={`grid gap-8 ${GRID_COLS_CLASS[totalColumns] ?? "grid-cols-3"}`}>
        {featured && (
          <div className="col-span-1">
            <p className="mb-3 text-xs font-bold tracking-wide text-muted uppercase">Featured</p>
            <ToolCard variant="featured" name={featured.name} description={featured.description} icon={featured.icon} href={featured.href} />
          </div>
        )}
        {columns.map((column) => (
          <div key={column.label}>
            <p className="mb-3 text-xs font-bold tracking-wide text-muted uppercase">{column.label}</p>
            <div className="space-y-0.5">
              {column.links.map((link) => (
                <ToolCard
                  key={link.href + link.name}
                  variant="compact"
                  name={link.name}
                  description={link.description}
                  icon={link.icon}
                  href={link.href}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
