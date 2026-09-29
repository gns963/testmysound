import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { LegalSection } from "@/components/content/LegalSection";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: `Get in touch with ${siteConfig.name} — corrections, feedback, or questions about our tools.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <ToolPageShell
      title="Contact"
      subtitle="Found something inaccurate, or have feedback on a tool? We'd like to hear it."
      breadcrumbLabel="Contact"
      path="/contact"
    >
      <div className="flex w-full flex-col gap-8">
        <LegalSection title="Email">
          <p>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-primary hover:underline"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </LegalSection>

        <LegalSection title="What's most useful to hear about">
          <ul className="list-disc space-y-1 pl-5">
            <li>A factual error or outdated claim on a tool or guide page.</li>
            <li>
              A tool that didn&apos;t work as expected on your device or
              browser.
            </li>
            <li>
              A device or brand you&apos;d like us to add proper coverage for.
            </li>
          </ul>
        </LegalSection>
      </div>
    </ToolPageShell>
  );
}
