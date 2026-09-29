import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import textToSpeech from "@/content/tools/text-to-speech";
import { TextToSpeech } from "@/components/tools/TextToSpeech";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { TextToSpeechDiagram } from "@/components/content/diagrams/TextToSpeechDiagram";

export const metadata: Metadata = buildMetadata({
  title: textToSpeech.metaTitle,
  description: textToSpeech.metaDescription,
  path: textToSpeech.path,
  ogImage: `/api/og?title=${encodeURIComponent(textToSpeech.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[textToSpeech.slug] ?? "🗣️")}`,
});

export default function TextToSpeechPage() {
  return (
    <ToolPageShell
      title="Text to Speech"
      subtitle="Type or paste text, pick a voice, and hear it read aloud."
      breadcrumbLabel="Text to Speech"
      path={textToSpeech.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Text to Speech",
            description: "Free browser text-to-speech tool with adjustable rate, pitch and volume, labeling on-device vs. cloud voices.",
            path: textToSpeech.path,
          }),
        )}
      />
      <TextToSpeech />
      <ToolContentBody
        content={textToSpeech}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<TextToSpeechDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
