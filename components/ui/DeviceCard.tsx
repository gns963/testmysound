import Link from "next/link";

// Design-system DeviceCard — same reuse pattern as ToolCard, for device/brand
// hub links (homepage grid, related devices, mega menu Devices columns).
export function DeviceCard({
  name,
  icon,
  href,
  variant = "default",
}: {
  name: string;
  icon: string;
  href: string;
  variant?: "default" | "compact";
}) {
  if (variant === "compact") {
    return (
      <Link
        href={href}
        className="group flex items-center gap-2.5 rounded-xl p-2 transition-colors hover:bg-primary/6"
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm">
          {icon}
        </span>
        <span className="text-sm font-medium text-text">{name}</span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-surface p-4 text-center shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-card-hover"
    >
      <span aria-hidden="true" className="text-2xl">
        {icon}
      </span>
      <span className="text-xs font-semibold text-text">{name}</span>
    </Link>
  );
}
