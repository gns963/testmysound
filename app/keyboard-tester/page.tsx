import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import keyboardTester from "@/content/tools/keyboard-tester";
import { KeyboardTester } from "@/components/tools/KeyboardTester";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { KeyboardDiagram } from "@/components/content/diagrams/KeyboardDiagram";

export const metadata: Metadata = buildMetadata({
  title: keyboardTester.metaTitle,
  description: keyboardTester.metaDescription,
  path: keyboardTester.path,
  ogImage: `/api/og?title=${encodeURIComponent(keyboardTester.metaTitle)}&icon=${encodeURIComponent(TOOL_ICON_BY_SLUG[keyboardTester.slug] ?? "⌨️")}`,
});

export default function KeyboardTesterPage() {
  return (
    <ToolPageShell
      title="Keyboard Tester"
      subtitle="Press any key to see it highlighted instantly — no install, no permission needed."
      breadcrumbLabel="Keyboard Tester"
      path={keyboardTester.path}
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Keyboard Tester",
            description: "Free browser tool that highlights every key on-screen as it's pressed, to confirm a keyboard works.",
            path: keyboardTester.path,
          }),
        )}
      />
      <KeyboardTester />
      <ToolContentBody
        content={keyboardTester}
        updatedDate={CONTENT_LAST_UPDATED}
        diagram={<KeyboardDiagram />}
        tipsTitle="Device tips"
      />
    </ToolPageShell>
  );
}
