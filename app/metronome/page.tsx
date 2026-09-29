import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import metronome from "@/content/tools/metronome";
import { Metronome } from "@/components/tools/Metronome";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { MetronomeDiagram } from "@/components/content/diagrams/MetronomeDiagram";

export const metadata: Metadata = buildMetadata({
  title: metronome.metaTitle,
  description: metronome.metaDescription,
  path: metronome.path,
  ogImage: `/api/og?title=${encodeURIComponent(metronome.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[metronome.slug] ?? "⏱️")}`,
});

// Reads ?bpm= so the BPM Counter's "Practice at this tempo" link (and anyone
// sharing a direct link) opens the metronome pre-set to that tempo.
export default async function MetronomePage({
  searchParams,
}: {
  searchParams: Promise<{ bpm?: string }>;
}) {
  const { bpm } = await searchParams;
  const parsedBpm = bpm ? Number.parseInt(bpm, 10) : undefined;
  const initialBpm = parsedBpm && Number.isFinite(parsedBpm) ? parsedBpm : undefined;

  return (
    <ToolPageShell
      title="Online Metronome"
      subtitle="30-300 BPM, time signatures, accent beat and tap tempo — precisely scheduled."
      breadcrumbLabel="Online Metronome"
      path={metronome.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Online Metronome",
            description: "Free online metronome with time signatures, accent beat and tap tempo, using lookahead Web Audio scheduling.",
            path: metronome.path,
          }),
        )}
      />
      <Metronome initialBpm={initialBpm} />
      <ToolContentBody
        content={metronome}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<MetronomeDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
