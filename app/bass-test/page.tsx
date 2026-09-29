import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import bassTest from "@/content/tools/bass-test";
import { BassTest } from "@/components/tools/BassTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: bassTest.metaTitle,
  description: bassTest.metaDescription,
  path: "/bass-test",
});

export default function BassTestPage() {
  return (
    <ToolPageShell
      title="Bass Test"
      subtitle="Test the low end of your speakers or subwoofer, from 20Hz to 200Hz."
      breadcrumbLabel="Bass Test"
      path="/bass-test"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Bass Test",
            description:
              "Free browser tool to test bass and subwoofer response from 20Hz to 200Hz.",
            path: "/bass-test",
          }),
        )}
      />
      <BassTest />
      <ToolContentBody content={bassTest} updatedDate={CONTENT_LAST_UPDATED} />
    </ToolPageShell>
  );
}
