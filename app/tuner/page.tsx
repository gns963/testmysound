import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import tuner from "@/content/tools/tuner";
import { Tuner } from "@/components/tools/Tuner";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { TunerDiagram } from "@/components/content/diagrams/TunerDiagram";

export const metadata: Metadata = buildMetadata({
  title: tuner.metaTitle,
  description: tuner.metaDescription,
  path: tuner.path,
  ogImage: `/api/og?title=${encodeURIComponent(tuner.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[tuner.slug] ?? "🎸")}`,
});

export default function TunerPage() {
  return (
    <ToolPageShell
      title="Online Tuner"
      subtitle="Guitar, ukulele, violin, bass and chromatic presets — note name and cents needle."
      breadcrumbLabel="Online Tuner"
      path={tuner.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Online Tuner",
            description: "Free browser tuner using mic-based pitch detection, with guitar, ukulele, violin, bass and chromatic presets.",
            path: tuner.path,
          }),
        )}
      />
      <Tuner />
      <ToolContentBody content={tuner} updatedDate={CONTENT_LAST_UPDATED} diagram={<TunerDiagram />} tipsTitle="Device tips" />
    </ToolPageShell>
  );
}
