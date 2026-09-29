import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import noiseGenerator from "@/content/tools/noise-generator";
import { NoiseGenerator } from "@/components/tools/NoiseGenerator";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: noiseGenerator.metaTitle,
  description: noiseGenerator.metaDescription,
  path: "/noise-generator",
});

export default function NoiseGeneratorPage() {
  return (
    <ToolPageShell
      title="White / Pink / Brown Noise Generator"
      subtitle="Play white, pink or brown noise with a volume slider and an optional timer."
      breadcrumbLabel="Noise Generator"
      path="/noise-generator"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Noise Generator",
            description:
              "Free browser tool for white, pink and brown noise playback.",
            path: "/noise-generator",
          }),
        )}
      />
      <NoiseGenerator />
      <ToolContentBody
        content={noiseGenerator}
        updatedDate={CONTENT_LAST_UPDATED}
      />
    </ToolPageShell>
  );
}
