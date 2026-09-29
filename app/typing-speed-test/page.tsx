import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import typingSpeedTest from "@/content/tools/typing-speed-test";
import { TypingSpeedTest } from "@/components/tools/TypingSpeedTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { TypingSpeedDiagram } from "@/components/content/diagrams/TypingSpeedDiagram";

export const metadata: Metadata = buildMetadata({
  title: typingSpeedTest.metaTitle,
  description: typingSpeedTest.metaDescription,
  path: typingSpeedTest.path,
  ogImage: `/api/og?title=${encodeURIComponent(typingSpeedTest.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[typingSpeedTest.slug] ?? "⌨️")}`,
});

export default function TypingSpeedTestPage() {
  return (
    <ToolPageShell
      title="Typing Speed Test"
      subtitle="15, 30 or 60 seconds — WPM, accuracy and errors, with tips to improve."
      breadcrumbLabel="Typing Speed Test"
      path={typingSpeedTest.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Typing Speed Test",
            description: "Free browser typing test measuring net WPM, accuracy and errors across easy and medium word sets.",
            path: typingSpeedTest.path,
          }),
        )}
      />
      <TypingSpeedTest />
      <ToolContentBody
        content={typingSpeedTest}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<TypingSpeedDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
