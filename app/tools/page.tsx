import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ToolCard } from "@/components/ui/ToolCard";
import { DeviceGrid } from "@/components/home/DeviceGrid";
import { audioToolsMenu, featuredTool } from "@/lib/megaMenu";

export const metadata: Metadata = buildMetadata({
  title: "All Tools",
  description: `Every free browser-based tool on ${siteConfig.name}: speaker cleaners, sound tests, mic tests, tone generators, webcam and keyboard checks — no app, no sign-up.`,
  path: "/tools",
});

// The "All Tools" hub — the CTA target for the header's secondary button and
// the mega menu's Featured/FAQs/Troubleshooting links. Built from the same
// audioToolsMenu grouping as the mega menu, so this page can never drift out
// of sync with what's actually offered.
export default function ToolsPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-12 px-4 py-10">
      <div>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "All Tools", href: "/tools" }]} />
        <div className="mt-6 text-center">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">All Tools</p>
          <h1 className="text-h1 mt-2 font-bold tracking-tight text-balance">
            Every free tool, in one place
          </h1>
          <p className="text-body text-muted mx-auto mt-3 max-w-[600px]">
            Free, browser-based tools to clean, test and tune your phone,
            laptop or earbud audio — plus webcam, keyboard and other device
            checks. No app, no sign-up, nothing recorded.
          </p>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs font-bold tracking-wide text-muted uppercase">Featured</p>
        <ToolCard variant="featured" {...featuredTool} />
      </div>

      {audioToolsMenu.map((group) => (
        <div key={group.label} className="flex flex-col gap-5">
          <SectionHeader label="Tools" title={group.label} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.links.map((link) => (
              <ToolCard key={link.href} {...link} />
            ))}
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-5">
        <SectionHeader label="Devices" title="Browse by device" description="Device-specific tips for a faster fix." />
        <DeviceGrid />
      </div>
    </div>
  );
}
