import Link from "next/link";
import type { ReactNode } from "react";

// Design-system FeatureCard — icon/letter badge + title + body + optional
// link, with an optional accent color (top bar + badge tint). Used by Tips,
// and general-purpose for any "feature" style card elsewhere.
export function FeatureCard({
  title,
  body,
  icon,
  href,
  linkLabel = "Learn more →",
  accent = "var(--primary)",
}: {
  title: string;
  body: string;
  icon: ReactNode;
  href?: string;
  linkLabel?: string;
  accent?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="h-1" style={{ background: accent }} />
      <div className="p-4">
        <span
          className="mb-2.5 flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold"
          style={{ backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`, color: accent }}
        >
          {icon}
        </span>
        <p className="text-sm font-bold text-text">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
        {href && (
          <Link href={href} className="mt-2 inline-block text-sm font-semibold hover:underline" style={{ color: accent }}>
            {linkLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
