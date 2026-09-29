import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import cameraMicTest from "@/content/tools/camera-mic-test";
import { CameraMicTest } from "@/components/tools/CameraMicTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { CameraMicTestDiagram } from "@/components/content/diagrams/CameraMicTestDiagram";

export const metadata: Metadata = buildMetadata({
  title: cameraMicTest.metaTitle,
  description: cameraMicTest.metaDescription,
  path: cameraMicTest.path,
  ogImage: `/api/og?title=${encodeURIComponent(cameraMicTest.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[cameraMicTest.slug] ?? "🎥")}`,
});

export default function CameraMicTestPage() {
  return (
    <ToolPageShell
      title="Camera & Mic Test"
      subtitle="Checks both together, like a video-call app, plus a speaker check."
      breadcrumbLabel="Camera & Mic Test"
      path={cameraMicTest.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Camera & Mic Test",
            description: "Free browser tool that checks camera and microphone together, with per-device diagnosis and a speaker check.",
            path: cameraMicTest.path,
          }),
        )}
      />
      <CameraMicTest />
      <ToolContentBody
        content={cameraMicTest}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<CameraMicTestDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
