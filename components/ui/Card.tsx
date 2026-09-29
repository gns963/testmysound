import type { ReactNode } from "react";

// Design-system Card — the base surface every card component (ToolCard,
// DeviceCard, FeatureCard, AlertBox, etc.) builds on, so depth/radius/spacing
// stay identical across the whole site.
export function Card({
  children,
  hover = false,
  padding = "md",
  className = "",
}: {
  children: ReactNode;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
  className?: string;
}) {
  const paddingClass = { none: "", sm: "p-4", md: "p-5 sm:p-6", lg: "p-6 sm:p-9" }[padding];
  const hoverClass = hover
    ? "transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover"
    : "";

  return (
    <div
      className={`rounded-2xl border border-border bg-surface shadow-card ${paddingClass} ${hoverClass} ${className}`}
    >
      {children}
    </div>
  );
}
