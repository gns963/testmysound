import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import audioRecorder from "@/content/tools/audio-recorder";
import { AudioRecorder } from "@/components/tools/AudioRecorder";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { AudioRecorderDiagram } from "@/components/content/diagrams/AudioRecorderDiagram";

export const metadata: Metadata = buildMetadata({
  title: audioRecorder.metaTitle,
  description: audioRecorder.metaDescription,
  path: audioRecorder.path,
  ogImage: `/api/og?title=${encodeURIComponent(audioRecorder.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[audioRecorder.slug] ?? "🎙️")}`,
});

export default function AudioRecorderPage() {
  return (
    <ToolPageShell
      title="Audio Recorder"
      subtitle="Record, pause, resume, play back and download — all in your browser."
      breadcrumbLabel="Audio Recorder"
      path={audioRecorder.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Audio Recorder",
            description: "Free browser audio recorder with pause/resume, live level metering, playback and local download.",
            path: audioRecorder.path,
          }),
        )}
      />
      <AudioRecorder />
      <ToolContentBody
        content={audioRecorder}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<AudioRecorderDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
