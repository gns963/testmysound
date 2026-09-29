import type { ReactNode } from "react";

const VARIANT_STYLES = {
  info: { border: "border-l-primary", bg: "bg-primary/6", iconColor: "text-primary", iconSize: "h-5 w-5" },
  warn: { border: "border-l-warn", bg: "bg-warn-bg", iconColor: "text-warn", iconSize: "h-6 w-6" },
  danger: { border: "border-l-danger", bg: "bg-danger/6", iconColor: "text-danger", iconSize: "h-5 w-5" },
} as const;

function VariantIcon({ variant, className }: { variant: keyof typeof VARIANT_STYLES; className: string }) {
  if (variant === "warn") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M12 3 22 20H2L12 3Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
        <path d="M12 10v4.5M12 17.2v.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  if (variant === "danger") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
        <path d="M12 7.5v5M12 15.5v.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 11v5.5M12 7.7v.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Design-system AlertBox — info / warning / danger callout (blueprint §6 core
// components calls this "Callout"; kept both names, see components/content/Callout.tsx).
export function AlertBox({
  variant = "info",
  title,
  children,
}: {
  variant?: keyof typeof VARIANT_STYLES;
  title?: string;
  children: ReactNode;
}) {
  const styles = VARIANT_STYLES[variant];
  return (
    <div className={`w-full rounded-2xl border-l-4 p-4 text-sm sm:p-5 ${styles.border} ${styles.bg}`}>
      <div className="flex gap-3">
        <VariantIcon variant={variant} className={`shrink-0 ${styles.iconColor} ${styles.iconSize}`} />
        <div>
          {title && <p className="font-bold text-text">{title}</p>}
          <div className="mt-1 leading-relaxed text-muted">{children}</div>
        </div>
      </div>
    </div>
  );
}
