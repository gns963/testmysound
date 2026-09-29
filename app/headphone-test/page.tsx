import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import headphoneTest from "@/content/tools/headphone-test";
import { HeadphoneTest } from "@/components/tools/HeadphoneTest";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: headphoneTest.metaTitle,
  description: headphoneTest.metaDescription,
  path: "/headphone-test",
});

export default function HeadphoneTestPage() {
  return (
    <ToolPageShell
      title="Headphone Test"
      subtitle="Check your headphones for wiring/phase issues, plus quick links to related checks."
      breadcrumbLabel="Headphone Test"
      path="/headphone-test"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Headphone Test",
            description:
              "Free browser tool to check headphones for phase/wiring issues.",
            path: "/headphone-test",
          }),
        )}
      />
      <HeadphoneTest />
      <ToolContentBody
        content={headphoneTest}
        updatedDate={CONTENT_LAST_UPDATED}
      />
    </ToolPageShell>
  );
}
