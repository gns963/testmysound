import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import speakerPolarityTest from "@/content/tools/speaker-polarity-test";
import { SpeakerPolarityTest } from "@/components/tools/SpeakerPolarityTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { PolarityTestDiagram } from "@/components/content/diagrams/PolarityTestDiagram";

export const metadata: Metadata = buildMetadata({
  title: speakerPolarityTest.metaTitle,
  description: speakerPolarityTest.metaDescription,
  path: speakerPolarityTest.path,
  ogImage: `/api/og?title=${encodeURIComponent(speakerPolarityTest.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[speakerPolarityTest.slug] ?? "🔄")}`,
});

export default function SpeakerPolarityTestPage() {
  return (
    <ToolPageShell
      title="Speaker Phase & Polarity Test"
      subtitle="Play a bass tone, then invert one channel to hear reversed wiring."
      breadcrumbLabel="Speaker Phase & Polarity Test"
      path={speakerPolarityTest.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Speaker Phase & Polarity Test",
            description: "Free browser tool that plays a tone through both stereo speakers with an invert toggle to check for reversed wiring.",
            path: speakerPolarityTest.path,
          }),
        )}
      />
      <SpeakerPolarityTest />
      <ToolContentBody
        content={speakerPolarityTest}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<PolarityTestDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
