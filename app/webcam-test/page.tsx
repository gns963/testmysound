import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import webcamTest from "@/content/tools/webcam-test";
import { WebcamTest } from "@/components/tools/WebcamTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { WebcamDiagram } from "@/components/content/diagrams/WebcamDiagram";

export const metadata: Metadata = buildMetadata({
  title: webcamTest.metaTitle,
  description: webcamTest.metaDescription,
  path: webcamTest.path,
  ogImage: `/api/og?title=${encodeURIComponent(webcamTest.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[webcamTest.slug] ?? "📷")}`,
});

export default function WebcamTestPage() {
  return (
    <ToolPageShell
      title="Webcam Test"
      subtitle="Check your camera online — live preview, resolution, and a local-only snapshot."
      breadcrumbLabel="Webcam Test"
      path={webcamTest.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Webcam Test",
            description: "Free browser tool to test a webcam with a live preview, resolution readout and local snapshot.",
            path: webcamTest.path,
          }),
        )}
      />
      <WebcamTest />
      <ToolContentBody
        content={webcamTest}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<WebcamDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
