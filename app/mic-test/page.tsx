import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import micTest from "@/content/tools/mic-test";
import { MicTest } from "@/components/tools/MicTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: micTest.metaTitle,
  description: micTest.metaDescription,
  path: "/mic-test",
});

export default function MicTestPage() {
  return (
    <ToolPageShell
      title="Mic Test"
      subtitle="Check your microphone with a live waveform and a quick recording."
      breadcrumbLabel="Mic Test"
      path="/mic-test"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Mic Test",
            description:
              "Free browser tool to test a microphone with a live waveform and playback.",
            path: "/mic-test",
          }),
        )}
      />
      <MicTest />
      <ToolContentBody content={micTest} updatedDate={CONTENT_LAST_UPDATED} />
    </ToolPageShell>
  );
}
