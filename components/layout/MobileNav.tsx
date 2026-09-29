"use client";

import Link from "next/link";
import type { MenuColumn } from "@/lib/megaMenu";

// Slide-in drawer (from the right): nested accordion categories (built from
// the same mega-menu column data as desktop, so mobile never drifts out of
// sync with desktop) plus a search bar that opens the shared SearchPalette.
export function MobileNav({
  open,
  onClose,
  onOpenSearch,
  sections,
}: {
  open: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  sections: { label: string; columns: MenuColumn[] }[];
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm motion-safe:animate-[drawerBackdropIn_0.25s_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute inset-y-0 right-0 w-[86%] max-w-sm overflow-hidden rounded-l-3xl bg-surface shadow-[-24px_0_60px_rgba(15,23,42,0.25)] duration-300 motion-safe:animate-[drawerIn_0.3s_ease-out]">
        <div className="flex h-full flex-col">
          <div
            className="flex h-[72px] shrink-0 items-center justify-between border-b border-border px-5"
            style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
          >
            <span className="text-sm font-bold text-text">Menu</span>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
                <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5">
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="mb-6 flex w-full items-center gap-2 rounded-full border border-border bg-bg px-4 py-2.5 text-sm text-muted"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="m14 14-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Search tools and devices…
            </button>

            <Link
              href="/"
              onClick={onClose}
              className="mb-2 block rounded-xl px-3 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-primary/10 hover:text-primary"
            >
              Speaker Cleaner
            </Link>

            <div className="space-y-1">
              {sections.map((section) => (
                <details key={section.label} className="group border-b border-border py-1">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-text">
                    {section.label}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 12 12"
                      className="h-3 w-3 text-muted transition-transform duration-200 group-open:rotate-180"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="m2.5 4.5 3.5 3.5 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </summary>
                  <div className="space-y-3 px-3 pb-3 pt-1">
                    {section.columns.map((column) => (
                      <div key={column.label}>
                        <p className="mb-1.5 text-xs font-semibold tracking-wide text-muted uppercase">
                          {column.label}
                        </p>
                        <ul className="space-y-0.5">
                          {column.links.map((link) => (
                            <li key={link.href + link.name}>
                              <Link
                                href={link.href}
                                onClick={onClose}
                                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-text transition-colors hover:bg-primary/10 hover:text-primary"
                              >
                                <span aria-hidden="true">{link.icon}</span>
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </details>
              ))}
            </div>

            <Link
              href="/blog"
              onClick={onClose}
              className="mt-2 block rounded-xl px-3 py-2.5 text-sm font-semibold text-text transition-colors hover:bg-primary/10 hover:text-primary"
            >
              Blog
            </Link>
          </div>

          <div className="shrink-0 border-t border-border p-5">
            <Link
              href="/"
              onClick={onClose}
              className="flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(14,165,233,0.35)] transition-all duration-200 active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-strong))" }}
            >
              Start Cleaning
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
