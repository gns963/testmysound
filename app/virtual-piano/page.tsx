import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import virtualPiano from "@/content/tools/virtual-piano";
import { VirtualPiano } from "@/components/tools/VirtualPiano";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { VirtualPianoDiagram } from "@/components/content/diagrams/VirtualPianoDiagram";

export const metadata: Metadata = buildMetadata({
  title: virtualPiano.metaTitle,
  description: virtualPiano.metaDescription,
  path: virtualPiano.path,
  ogImage: `/api/og?title=${encodeURIComponent(virtualPiano.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[virtualPiano.slug] ?? "🎹")}`,
});

export default function VirtualPianoPage() {
  return (
    <ToolPageShell
      title="Online Piano"
      subtitle="Play with your mouse, finger, or keyboard — polyphonic, synthesized tones."
      breadcrumbLabel="Online Piano"
      path={virtualPiano.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Online Piano",
            description: "Free virtual piano keyboard, playable by mouse, touch or physical keyboard, with adjustable octave and waveform.",
            path: virtualPiano.path,
          }),
        )}
      />
      <VirtualPiano />
      <ToolContentBody
        content={virtualPiano}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<VirtualPianoDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
