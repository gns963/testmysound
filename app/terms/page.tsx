import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { LegalSection } from "@/components/content/LegalSection";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Use",
  description: `Terms for using ${siteConfig.name}'s free browser tools.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <ToolPageShell
      title="Terms of Use"
      subtitle="The basics of using this site."
      breadcrumbLabel="Terms"
      path="/terms"
    >
      <div className="flex w-full flex-col gap-8">
        <LegalSection title="Using the tools">
          <p>
            {siteConfig.name}&apos;s tools are free to use, with no account
            required. You&apos;re responsible for how you use them — see our{" "}
            <Link href="/disclaimer" className="text-primary hover:underline">
              Disclaimer
            </Link>{" "}
            for the specific limits of what our audio tools can do.
          </p>
        </LegalSection>

        <LegalSection title="No warranty">
          <p>
            Tools are provided &quot;as is,&quot; without any warranty of
            accuracy, fitness for a particular purpose, or uninterrupted
            availability. We do our best to keep them working correctly (see{" "}
            <Link href="/how-we-test" className="text-primary hover:underline">
              How We Test
            </Link>
            ), but we can&apos;t guarantee a specific tool will work perfectly
            on every device or browser.
          </p>
        </LegalSection>

        <LegalSection title="Acceptable use">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Don&apos;t attempt to disrupt, overload, or reverse-engineer the
              site in ways that harm other visitors.
            </li>
            <li>
              Don&apos;t scrape or republish our content wholesale without
              permission.
            </li>
            <li>
              Use the tools for their intended purpose — testing and cleaning
              audio hardware, not for anything harmful.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Changes">
          <p>
            We may update these terms as the site evolves. Continued use after a
            change means you accept the updated terms.
          </p>
        </LegalSection>

        <LegalSection title="A note on this page">
          <p>
            This is a general-purpose terms page, not a substitute for advice
            from a qualified legal professional. If you have specific legal
            concerns about using this site, consult one.
          </p>
        </LegalSection>
      </div>
    </ToolPageShell>
  );
}
