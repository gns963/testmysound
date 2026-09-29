"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { LogoMark } from "@/components/layout/LogoMark";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { SearchPalette } from "@/components/layout/SearchPalette";
import { MobileNav } from "@/components/layout/MobileNav";
import { audioToolsMenu, devicesMenu, resourcesMenu, featuredTool } from "@/lib/megaMenu";

type MenuKey = "tools" | "devices" | "resources";

const NAV_ITEMS: { key: MenuKey; label: string; columns: typeof audioToolsMenu; width?: string }[] = [
  { key: "tools", label: "Tools", columns: audioToolsMenu, width: "w-[1140px]" },
  { key: "devices", label: "Devices", columns: devicesMenu, width: "w-[820px]" },
  { key: "resources", label: "Resources", columns: resourcesMenu, width: "w-[720px]" },
];

const NAV_PILL =
  "rounded-full px-4 py-2 text-sm font-medium text-muted transition-all duration-200 hover:bg-primary/10 hover:text-primary";

// Sticky, 72px glass header (Stripe/Linear/Vercel-style): translucent white
// panel over a 12px backdrop blur with a hairline bottom border. Nav sits in
// a flex-1 middle column (logo and actions are shrink-0), so it's centered
// in the space left over between them and can shrink to fit rather than
// ever overlapping — an absolutely-centered nav collided with the search
// box at medium widths, since it ignored the actions column's own width.
// Scroll position nudges the glass toward opaque + adds a soft shadow,
// echoing how those sites' headers thicken on scroll.
export function Header() {
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 8);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 h-[72px] border-b border-[var(--header-border)] backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "bg-[var(--header-bg-scrolled)] shadow-[0_8px_30px_rgba(15,23,42,0.08)]" : "bg-[var(--header-bg)]"
        }`}
      >
        <div
          className="mx-auto flex h-full max-w-6xl items-center justify-between px-5 sm:px-8"
          style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        >
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2.5 py-2 pr-4 text-[17px] font-bold tracking-tight text-text transition-opacity hover:opacity-80"
          >
            <LogoMark />
            {siteConfig.shortName}
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-1 md:flex"
            aria-label="Primary"
          >
            <Link href="/" className={NAV_PILL}>
              Speaker Cleaner
            </Link>

            {NAV_ITEMS.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setOpenMenu(item.key)}
                onMouseLeave={() => setOpenMenu((current) => (current === item.key ? null : current))}
              >
                <button
                  type="button"
                  className={`flex items-center gap-1 ${NAV_PILL}`}
                  aria-expanded={openMenu === item.key}
                  aria-haspopup="true"
                  onClick={() => setOpenMenu((current) => (current === item.key ? null : item.key))}
                >
                  {item.label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 12"
                    className={`h-3 w-3 transition-transform duration-200 ${openMenu === item.key ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="m2.5 4.5 3.5 3.5 3.5-3.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {openMenu === item.key && (
                  <MegaMenu
                    columns={item.columns}
                    featured={item.key === "tools" ? featuredTool : undefined}
                    width={item.width}
                  />
                )}
              </div>
            ))}

            <Link href="/blog" className={NAV_PILL}>
              Blog
            </Link>
          </nav>

          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="hidden items-center gap-2 rounded-full border border-border/70 bg-surface/50 px-3.5 py-2 text-sm text-muted backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:bg-surface hover:text-text sm:flex"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="m14 14-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Search
              <kbd className="ml-2 rounded border border-border bg-bg px-1.5 py-0.5 text-[10px] font-semibold">⌘K</kbd>
            </button>

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text sm:hidden"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="m14 14-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <ThemeToggle />

            <Link
              href="/"
              className="hidden items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(14,165,233,0.35)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(14,165,233,0.45)] hover:brightness-110 active:scale-[0.97] md:inline-flex"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-strong))" }}
            >
              Start Cleaning
            </Link>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-text md:hidden"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((open) => !open)}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-5 w-5">
                {mobileOpen ? (
                  <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
                ) : (
                  <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Rendered outside <header> — its backdrop-blur establishes a new
         containing block for position:fixed descendants (a Chromium/spec
         quirk), which would otherwise clip these to the header's own height
         instead of the viewport. */}
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenSearch={() => setSearchOpen(true)}
        sections={[
          { label: "Tools", columns: audioToolsMenu },
          { label: "Devices", columns: devicesMenu },
          { label: "Resources", columns: resourcesMenu },
        ]}
      />
      <SearchPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}
