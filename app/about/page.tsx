import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { LegalSection } from "@/components/content/LegalSection";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description: `Why ${siteConfig.name} exists and what we're trying to build: honest, fast, free browser tools for audio problems.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <ToolPageShell
      title={`About ${siteConfig.name}`}
      subtitle="Why we built this, and what we're trying to do differently."
      breadcrumbLabel="About"
      path="/about"
    >
      <div className="flex w-full flex-col gap-8">
        <LegalSection title="What this site is">
          <p>
            {siteConfig.name} is a small collection of free, browser-based audio
            tools — starting with a speaker cleaner and growing into speaker,
            mic and hearing tests. Every tool runs entirely in your browser
            using the Web Audio API: no app to install, no account, and no audio
            uploaded anywhere.
          </p>
        </LegalSection>

        <LegalSection title="Why it exists">
          <p>
            Most existing &quot;speaker cleaner&quot; sites make the same claim
            you&apos;ve probably seen: a promise that sound alone fixes speaker
            problems, backed by vague statistics that don&apos;t hold up to
            scrutiny. We wanted a version that&apos;s upfront about what a
            sound-based tool can and can&apos;t do, with tools that are
            genuinely fast and pleasant to use on a phone.
          </p>
        </LegalSection>

        <LegalSection title="Our approach">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              No invented statistics, testimonials, or success-rate claims.
            </li>
            <li>
              Honest limitations stated on every tool page — see each
              tool&apos;s Safety &amp; Limitations section.
            </li>
            <li>
              Nothing you say or record near your microphone leaves your device.
            </li>
            <li>
              Content is drafted with AI assistance and reviewed for accuracy —
              see our{" "}
              <Link
                href="/editorial-policy"
                className="text-primary hover:underline"
              >
                editorial policy
              </Link>
              .
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Get in touch">
          <p>
            Questions, corrections, or found something inaccurate?{" "}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
            .
          </p>
        </LegalSection>
      </div>
    </ToolPageShell>
  );
}
