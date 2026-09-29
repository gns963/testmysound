import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import speakerTest from "@/content/tools/speaker-test";
import { SpeakerTest } from "@/components/tools/SpeakerTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: speakerTest.metaTitle,
  description: speakerTest.metaDescription,
  path: "/speaker-test",
});

export default function SpeakerTestPage() {
  return (
    <ToolPageShell
      title="Speaker Sound Test"
      subtitle="A quick check, a full frequency sweep, or individual test tones."
      breadcrumbLabel="Speaker Sound Test"
      path="/speaker-test"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Speaker Sound Test",
            description:
              "Free browser tool to test speakers with tones and a frequency sweep.",
            path: "/speaker-test",
          }),
        )}
      />
      <SpeakerTest />
      <ToolContentBody
        content={speakerTest}
        updatedDate={CONTENT_LAST_UPDATED}
      />
    </ToolPageShell>
  );
}
