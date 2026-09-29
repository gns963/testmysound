import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import touchScreenTest from "@/content/tools/touch-screen-test";
import { TouchScreenTest } from "@/components/tools/TouchScreenTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { TouchDiagram } from "@/components/content/diagrams/TouchDiagram";

export const metadata: Metadata = buildMetadata({
  title: touchScreenTest.metaTitle,
  description: touchScreenTest.metaDescription,
  path: touchScreenTest.path,
  ogImage: `/api/og?title=${encodeURIComponent(touchScreenTest.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[touchScreenTest.slug] ?? "👆")}`,
});

export default function TouchScreenTestPage() {
  return (
    <ToolPageShell
      title="Touch Screen Test"
      subtitle="Draw every touch point live, check multi-touch, and spot ghost touches."
      breadcrumbLabel="Touch Screen Test"
      path={touchScreenTest.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Touch Screen Test",
            description: "Free browser tool that draws every active touch point live to check multi-touch support and ghost touches.",
            path: touchScreenTest.path,
          }),
        )}
      />
      <TouchScreenTest />
      <ToolContentBody
        content={touchScreenTest}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<TouchDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
