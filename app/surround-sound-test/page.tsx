import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import surroundSoundTest from "@/content/tools/surround-sound-test";
import { SurroundSoundTest } from "@/components/tools/SurroundSoundTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { SurroundSoundDiagram } from "@/components/content/diagrams/SurroundSoundDiagram";

export const metadata: Metadata = buildMetadata({
  title: surroundSoundTest.metaTitle,
  description: surroundSoundTest.metaDescription,
  path: surroundSoundTest.path,
  ogImage: `/api/og?title=${encodeURIComponent(surroundSoundTest.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[surroundSoundTest.slug] ?? "🎬")}`,
});

export default function SurroundSoundTestPage() {
  return (
    <ToolPageShell
      title="Surround Sound Test"
      subtitle="Checks your real channel count first, then tests 5.1/7.1 speaker positions."
      breadcrumbLabel="Surround Sound Test"
      path={surroundSoundTest.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Surround Sound Test",
            description: "Free browser tool that reports your real output channel count, then plays a tone to each available 5.1/7.1 speaker position.",
            path: surroundSoundTest.path,
          }),
        )}
      />
      <SurroundSoundTest />
      <ToolContentBody
        content={surroundSoundTest}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<SurroundSoundDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
