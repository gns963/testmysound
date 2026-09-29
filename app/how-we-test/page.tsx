import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { LegalSection } from "@/components/content/LegalSection";

export const metadata: Metadata = buildMetadata({
  title: "How We Test",
  description: `How ${siteConfig.name} builds and verifies its audio tools before publishing them.`,
  path: "/how-we-test",
});

export default function HowWeTestPage() {
  return (
    <ToolPageShell
      title="How We Test"
      subtitle="What actually happens before a tool ships, stated plainly."
      breadcrumbLabel="How We Test"
      path="/how-we-test"
    >
      <div className="flex w-full flex-col gap-8">
        <LegalSection title="What we verify before publishing a tool">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              The tool runs correctly across the full user flow — start, stop,
              mode switches, and error states — checked with automated browser
              tests, not just a quick manual click.
            </li>
            <li>
              No console errors, hydration mismatches, or crashes on load or
              during interaction.
            </li>
            <li>
              Audio always requires a real tap or click to start, never
              autoplays, and always has a working Stop control.
            </li>
            <li>
              Health- or measurement-adjacent tools (Hearing Test, dB Meter) are
              explicitly labeled as approximations, not calibrated instruments.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="What we're honest about not having done yet">
          <p>
            We haven&apos;t yet run a systematic physical test across a large
            set of real devices (different phone brands, iOS versions, Android
            skins). Where we make a claim about how a tool behaves on a specific
            platform, we base it on the underlying web standard&apos;s
            documented behavior, not an invented statistic. As we test on more
            real hardware, we&apos;ll update tool pages with genuine findings —
            including where something doesn&apos;t work as well as we&apos;d
            like.
          </p>
        </LegalSection>

        <LegalSection title="No invented numbers">
          <p>
            We don&apos;t publish success rates, &quot;X% of users&quot; claims,
            or device-specific specs we haven&apos;t verified against an
            official source. If a tool page states a fact about a specific
            device, it&apos;s either general engineering knowledge (like how
            small speakers struggle with bass) or something we can point to a
            source for — never a made-up number to sound more convincing.
          </p>
        </LegalSection>

        <LegalSection title="AI-assisted content">
          <p>
            Some of this site&apos;s content is drafted with AI assistance. See
            our{" "}
            <Link
              href="/editorial-policy"
              className="text-primary hover:underline"
            >
              editorial policy
            </Link>{" "}
            for how that content is reviewed.
          </p>
        </LegalSection>
      </div>
    </ToolPageShell>
  );
}
