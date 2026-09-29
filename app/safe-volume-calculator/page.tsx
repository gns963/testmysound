import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import safeVolumeCalculator from "@/content/tools/safe-volume-calculator";
import { SafeVolumeCalculator } from "@/components/tools/SafeVolumeCalculator";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { SafeVolumeDiagram } from "@/components/content/diagrams/SafeVolumeDiagram";

export const metadata: Metadata = buildMetadata({
  title: safeVolumeCalculator.metaTitle,
  description: safeVolumeCalculator.metaDescription,
  path: safeVolumeCalculator.path,
  ogImage: `/api/og?title=${encodeURIComponent(safeVolumeCalculator.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[safeVolumeCalculator.slug] ?? "🦻")}`,
});

export default function SafeVolumeCalculatorPage() {
  return (
    <ToolPageShell
      title="Safe Volume Calculator"
      subtitle="NIOSH, OSHA and WHO noise-exposure guidance — not medical advice."
      breadcrumbLabel="Safe Volume Calculator"
      path={safeVolumeCalculator.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Safe Volume Calculator",
            description: "Free calculator applying published NIOSH, OSHA and WHO noise-exposure guidance to estimate safe listening time.",
            path: safeVolumeCalculator.path,
          }),
        )}
      />
      <SafeVolumeCalculator />
      <ToolContentBody
        content={safeVolumeCalculator}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<SafeVolumeDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
