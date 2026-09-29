import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import hearingTest from "@/content/tools/hearing-test";
import { HearingTest } from "@/components/tools/HearingTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: hearingTest.metaTitle,
  description: hearingTest.metaDescription,
  path: "/hearing-test",
});

export default function HearingTestPage() {
  return (
    <ToolPageShell
      title="Hearing Test"
      subtitle="Find the top of your hearing range with an ascending tone ladder, 8kHz to 19kHz."
      breadcrumbLabel="Hearing Test"
      path="/hearing-test"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Hearing Test",
            description:
              "Free browser tool for a high-frequency hearing range check.",
            path: "/hearing-test",
          }),
        )}
      />
      <HearingTest />
      <ToolContentBody
        content={hearingTest}
        updatedDate={CONTENT_LAST_UPDATED}
      />
    </ToolPageShell>
  );
}
