import type { ReactNode } from "react";

export type BadgeVariant = "neutral" | "primary" | "success" | "warning";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  neutral: "bg-bg text-muted",
  primary: "bg-primary/10 text-primary-strong",
  success: "bg-accent/10 text-accent",
  warning: "bg-warn-bg text-warn",
};

// Design-system Badge — small pill label used for statuses, "Featured" tags,
// trust indicators, etc.
export function Badge({
  variant = "neutral",
  icon,
  children,
  className = "",
}: {
  variant?: BadgeVariant;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${VARIANT_CLASSES[variant]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
