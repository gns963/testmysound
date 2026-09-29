import Link from "next/link";
import type { ReactNode } from "react";
import { footerNav, siteConfig } from "@/lib/config/site";
import { LogoMark } from "@/components/layout/LogoMark";

const POPULAR_TOOLS = [
  { label: "Speaker Cleaner", href: "/" },
  { label: "Deep Speaker Cleaner", href: "/deep-speaker-cleaner" },
  { label: "Left/Right Speaker Test", href: "/left-right-speaker-test" },
  { label: "Mic Test", href: "/mic-test" },
  { label: "Hearing Test", href: "/hearing-test" },
  { label: "Tone Generator", href: "/tone-generator" },
];

const FOOTER_LINK =
  "text-muted hover:text-primary inline-block text-sm transition-all duration-200 hover:translate-x-0.5";

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <p className="text-muted mb-4 text-xs font-bold tracking-[0.1em] uppercase">
      {children}
    </p>
  );
}

// Circular icon-button used for the social links — same treatment for a
// configured brand link (Twitter/GitHub) and the always-available mailto.
function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className="border-border text-muted flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/10 hover:text-primary"
    >
      {children}
    </a>
  );
}

// Premium SaaS footer (Vercel/Linear/Stripe-style): a large closing CTA band,
// a 4-column link layout, and a compact legal/copyright bar. Per blueprint
// §7.13/§15: tools/devices/company/legal groups + the "not affiliated with
// any manufacturer" disclaimer, now folded into the bottom bar.
export function Footer() {
  const year = new Date().getFullYear();
  const devices = footerNav.find((group) => group.label === "Devices");
  const company = footerNav.find((group) => group.label === "Company");
  const legal = footerNav.find((group) => group.label === "Legal");
  const { twitter, github } = siteConfig.social;

  return (
    <footer
      className="border-border bg-surface mt-auto border-t"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="border-border border-b">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 px-4 py-16 text-center sm:py-20">
          <h2 className="text-h2 text-text font-bold tracking-tight text-balance">
            Ready to Clean Your Speaker?
          </h2>
          <p className="text-body text-muted max-w-sm">
            Remove water and dust instantly.
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(14,165,233,0.35)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(14,165,233,0.45)] hover:brightness-110 active:scale-[0.97]"
              style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-strong))" }}
            >
              Start Cleaning
            </Link>
            <Link
              href="/tools"
              className="border-border text-text hover:border-primary hover:bg-primary/5 hover:text-primary inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold transition-all duration-200"
            >
              Explore Tools
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-14 sm:py-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-x-10">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Link
              href="/"
              className="text-text flex items-center gap-2.5 text-base font-bold tracking-tight transition-opacity hover:opacity-80"
            >
              <LogoMark />
              {siteConfig.shortName}
            </Link>
            <p className="text-muted mt-4 max-w-[280px] text-sm leading-relaxed">
              Free audio tools for cleaning, testing and improving speakers
              across phones, laptops and headphones.
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              {twitter && (
                <SocialIconLink href={twitter} label="Twitter / X">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M13.6 10.6 20.9 2h-1.7l-6.3 7.5L7.9 2H2l7.7 11L2 22h1.7l6.7-7.9L16.1 22H22l-8.4-11.4Zm-2.4 2.8-.8-1.1L4.2 3.3h2.7l5 6.9.8 1.1 6.5 9h-2.7l-5.3-7.4Z" />
                  </svg>
                </SocialIconLink>
              )}
              {github && (
                <SocialIconLink href={github} label="GitHub">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.9 1.2 2 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z" />
                  </svg>
                </SocialIconLink>
              )}
              <SocialIconLink href={`mailto:${siteConfig.contactEmail}`} label="Email">
                <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-4 w-4">
                  <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
                  <path d="m2 4.5 6 4.5 6-4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </SocialIconLink>
            </div>
          </div>

          <div>
            <FooterHeading>Popular Tools</FooterHeading>
            <ul className="space-y-3">
              {POPULAR_TOOLS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={FOOTER_LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/tools" className="text-primary inline-block text-sm font-semibold transition-all duration-200 hover:translate-x-0.5">
                  View all tools →
                </Link>
              </li>
            </ul>
          </div>

          {devices && (
            <div>
              <FooterHeading>Devices</FooterHeading>
              <ul className="space-y-3">
                {devices.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={FOOTER_LINK}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <FooterHeading>Company &amp; Legal</FooterHeading>
            <ul className="space-y-3">
              {company?.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={FOOTER_LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="border-border mt-5 space-y-3 border-t pt-5">
              {legal?.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={FOOTER_LINK}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-border border-t">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted text-xs">
            © {year} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-muted max-w-2xl text-xs leading-relaxed sm:text-right">
            {siteConfig.name} is an independent site and is not affiliated
            with, sponsored by, or endorsed by Apple, Samsung, Google, or any
            other device manufacturer. Device and brand names are used for
            descriptive purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
}
