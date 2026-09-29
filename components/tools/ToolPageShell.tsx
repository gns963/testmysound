import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

// Shared wrapper for the P0 tool routes: breadcrumbs, H1 + subtitle, then the
// tool itself (blueprint §8, steps 1-3 — the "above the fold" part). Full
// content sections (AnswerBox, StepList, FAQ, etc.) ship in Phase 2.
export function ToolPageShell({
  eyebrow = "Free browser tool",
  title,
  subtitle,
  breadcrumbLabel,
  path,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  breadcrumbLabel: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center gap-6 px-4 py-10">
      <div className="w-full">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: breadcrumbLabel, href: path },
          ]}
        />
      </div>

      <div className="text-center">
        <p className="text-primary text-xs font-semibold tracking-wide uppercase">
          {eyebrow}
        </p>
        <h1 className="text-h1 mt-2 leading-tight font-bold tracking-tight text-balance">
          {title}
        </h1>
        <p className="text-body text-muted mt-3">{subtitle}</p>
      </div>

      {children}
    </div>
  );
}
