import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import leftRightSpeakerTest from "@/content/tools/left-right-speaker-test";
import { StereoTest } from "@/components/tools/StereoTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: leftRightSpeakerTest.metaTitle,
  description: leftRightSpeakerTest.metaDescription,
  path: "/left-right-speaker-test",
});

export default function LeftRightSpeakerTestPage() {
  return (
    <ToolPageShell
      title="Left and Right Speaker Test"
      subtitle="Play each side on its own — or alternate — to check both speakers are working."
      breadcrumbLabel="Left/Right Speaker Test"
      path="/left-right-speaker-test"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Left and Right Speaker Test",
            description:
              "Free browser tool to test left and right speaker channels.",
            path: "/left-right-speaker-test",
          }),
        )}
      />
      <StereoTest />
      <ToolContentBody
        content={leftRightSpeakerTest}
        updatedDate={CONTENT_LAST_UPDATED}
      />
    </ToolPageShell>
  );
}
