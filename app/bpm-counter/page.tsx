import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import bpmCounter from "@/content/tools/bpm-counter";
import { BpmCounter } from "@/components/tools/BpmCounter";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { BpmCounterDiagram } from "@/components/content/diagrams/BpmCounterDiagram";

export const metadata: Metadata = buildMetadata({
  title: bpmCounter.metaTitle,
  description: bpmCounter.metaDescription,
  path: bpmCounter.path,
  ogImage: `/api/og?title=${encodeURIComponent(bpmCounter.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[bpmCounter.slug] ?? "👇")}`,
});

export default function BpmCounterPage() {
  return (
    <ToolPageShell
      title="BPM Counter"
      subtitle="Tap along to any song or beat to instantly measure its tempo."
      breadcrumbLabel="BPM Counter"
      path={bpmCounter.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "BPM Counter",
            description: "Free tap-tempo tool that measures a song or beat's tempo in beats per minute from your taps.",
            path: bpmCounter.path,
          }),
        )}
      />
      <BpmCounter />
      <ToolContentBody
        content={bpmCounter}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<BpmCounterDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
