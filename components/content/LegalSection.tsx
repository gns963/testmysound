import type { ReactNode } from "react";

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="w-full">
      <h2 className="text-h3 text-text font-semibold">{title}</h2>
      <div className="text-muted mt-2 space-y-3 text-sm leading-relaxed">
        {children}
      </div>
    </section>
  );
}
