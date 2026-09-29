import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import deadPixelTest from "@/content/tools/dead-pixel-test";
import { ScreenTest } from "@/components/tools/ScreenTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { ScreenTestDiagram } from "@/components/content/diagrams/ScreenTestDiagram";

export const metadata: Metadata = buildMetadata({
  title: deadPixelTest.metaTitle,
  description: deadPixelTest.metaDescription,
  path: deadPixelTest.path,
  ogImage: `/api/og?title=${encodeURIComponent(deadPixelTest.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[deadPixelTest.slug] ?? "🖥️")}`,
});

export default function DeadPixelTestPage() {
  return (
    <ToolPageShell
      title="Dead Pixel & Screen Test"
      subtitle="Full-screen colors, gradient and checker patterns to spot dead or stuck pixels."
      breadcrumbLabel="Dead Pixel & Screen Test"
      path={deadPixelTest.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Dead Pixel & Screen Test",
            description: "Free full-screen tool to check a screen for dead or stuck pixels using solid colors, a gradient and a checkerboard.",
            path: deadPixelTest.path,
          }),
        )}
      />
      <ScreenTest />
      <ToolContentBody
        content={deadPixelTest}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<ScreenTestDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
