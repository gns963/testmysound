import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import toneGenerator from "@/content/tools/tone-generator";
import { ToneGenerator } from "@/components/tools/ToneGenerator";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: toneGenerator.metaTitle,
  description: toneGenerator.metaDescription,
  path: "/tone-generator",
});

export default function ToneGeneratorPage() {
  return (
    <ToolPageShell
      title="Tone Generator"
      subtitle="Play any frequency from 1Hz to 22kHz with sine, square, sawtooth or triangle waves."
      breadcrumbLabel="Tone Generator"
      path="/tone-generator"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Tone Generator",
            description:
              "Free browser tool to generate test tones from 1Hz to 22kHz.",
            path: "/tone-generator",
          }),
        )}
      />
      <ToneGenerator />
      <ToolContentBody
        content={toneGenerator}
        updatedDate={CONTENT_LAST_UPDATED}
      />
    </ToolPageShell>
  );
}
