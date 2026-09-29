import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import watchWaterEject from "@/content/tools/watch-water-eject";
import { SmartwatchWaterEject } from "@/components/tools/SmartwatchWaterEject";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { WatchWaterEjectDiagram } from "@/components/content/diagrams/WatchWaterEjectDiagram";

export const metadata: Metadata = buildMetadata({
  title: watchWaterEject.metaTitle,
  description: watchWaterEject.metaDescription,
  path: watchWaterEject.path,
  ogImage: `/api/og?title=${encodeURIComponent(watchWaterEject.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[watchWaterEject.slug] ?? "⌚")}`,
});

export default function WatchWaterEjectPage() {
  return (
    <ToolPageShell
      title="Smartwatch Water Eject"
      subtitle="Apple Watch's built-in Water Lock, plus a backup tool for your phone."
      breadcrumbLabel="Smartwatch Water Eject"
      path={watchWaterEject.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Smartwatch Water Eject",
            description: "Guide to Apple Watch's built-in Water Lock eject feature, plus a browser tone tool for a phone or laptop that also got wet.",
            path: watchWaterEject.path,
          }),
        )}
      />
      <SmartwatchWaterEject />
      <ToolContentBody
        content={watchWaterEject}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<WatchWaterEjectDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
