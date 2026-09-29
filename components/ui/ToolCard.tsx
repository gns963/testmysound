import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export type ToolCardVariant = "default" | "compact" | "featured";

const ArrowIcon = ({ className = "h-3 w-3" }: { className?: string }) => (
  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className={className}>
    <path
      d="M3 8h10m0 0L9 4m4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Design-system ToolCard — the single component every tool link on the site
// renders through (homepage grid, related-tools, mega menu columns), so a
// tool always looks the same wherever it's shown. `compact` = icon+title+sub
// row (related tools / menu list items); `featured` = larger card with a
// "Featured" badge (mega menu's featured column); default = full card with
// description + reveal-on-hover arrow (homepage grid).
export function ToolCard({
  name,
  description,
  icon,
  href,
  variant = "default",
}: {
  name: string;
  description: string;
  icon: string;
  href: string;
  variant?: ToolCardVariant;
}) {
  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-primary/6"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-base">
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-text">{name}</p>
          <p className="line-clamp-2 text-xs leading-snug text-muted">{description}</p>
        </div>
        <ArrowIcon className="h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        href={href}
        className="group flex flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5 transition-all hover:border-primary/40 hover:shadow-card"
      >
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-2xl">
            {icon}
          </span>
          <Badge variant="primary">Featured</Badge>
        </div>
        <div>
          <p className="text-base font-bold text-text">{name}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted">{description}</p>
        </div>
        <span className="flex items-center gap-1 text-sm font-semibold text-primary">
          Try it now
          <ArrowIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-card-hover"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-xl">{icon}</span>
      <div className="flex-1">
        <h3 className="text-sm font-bold text-text">{name}</h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{description}</p>
      </div>
      <span className="flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Try it
        <ArrowIcon />
      </span>
    </Link>
  );
}
