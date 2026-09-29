import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { LegalSection } from "@/components/content/LegalSection";

export const metadata: Metadata = buildMetadata({
  title: "Editorial Policy",
  description: `How ${siteConfig.name} writes, reviews and updates its content, including our AI-use disclosure.`,
  path: "/editorial-policy",
});

export default function EditorialPolicyPage() {
  return (
    <ToolPageShell
      title="Editorial Policy"
      subtitle="How our content gets written, reviewed and kept up to date."
      breadcrumbLabel="Editorial Policy"
      path="/editorial-policy"
    >
      <div className="flex w-full flex-col gap-8">
        <LegalSection title="AI-use disclosure">
          <p>
            Much of this site&apos;s written content — tool descriptions, FAQs,
            troubleshooting tables, and guides — is drafted with AI assistance.
            We disclose this plainly rather than presenting AI-drafted text as
            if it were written entirely by a human, and rather than presenting a
            human editor as someone they aren&apos;t.
          </p>
        </LegalSection>

        <LegalSection title="What we won't publish">
          <ul className="list-disc space-y-1 pl-5">
            <li>Invented statistics, success rates, or user counts.</li>
            <li>Fabricated testimonials or reviews.</li>
            <li>
              Device specifications we can&apos;t point to an official
              manufacturer source for.
            </li>
            <li>
              Claims that a tool does something it technically can&apos;t (for
              example, that a website can play audio through a phone&apos;s
              earpiece specifically — it can&apos;t).
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Corrections">
          <p>
            If you spot something inaccurate or outdated, we want to know —{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            . We update pages when facts change (new devices, corrected
            information) rather than only on a fixed schedule.
          </p>
        </LegalSection>
      </div>
    </ToolPageShell>
  );
}
