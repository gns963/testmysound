import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import vibrationTest from "@/content/tools/vibration-test";
import { VibrationTest } from "@/components/tools/VibrationTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { VibrationTestDiagram } from "@/components/content/diagrams/VibrationTestDiagram";

export const metadata: Metadata = buildMetadata({
  title: vibrationTest.metaTitle,
  description: vibrationTest.metaDescription,
  path: vibrationTest.path,
  ogImage: `/api/og?title=${encodeURIComponent(vibrationTest.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[vibrationTest.slug] ?? "📳")}`,
});

export default function VibrationTestPage() {
  return (
    <ToolPageShell
      title="Vibration Test"
      subtitle="Try short, long, double and pattern vibrations — Android only."
      breadcrumbLabel="Vibration Test"
      path={vibrationTest.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Vibration Test",
            description: "Free browser tool that triggers several vibration patterns to check a phone's vibration motor.",
            path: vibrationTest.path,
          }),
        )}
      />
      <VibrationTest />
      <ToolContentBody
        content={vibrationTest}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<VibrationTestDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
