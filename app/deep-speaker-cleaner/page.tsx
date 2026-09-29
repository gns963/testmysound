import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import deepSpeakerCleaner from "@/content/tools/deep-speaker-cleaner";
import { DeepSpeakerCleaner } from "@/components/tools/DeepSpeakerCleaner";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: deepSpeakerCleaner.metaTitle,
  description: deepSpeakerCleaner.metaDescription,
  path: "/deep-speaker-cleaner",
});

export default function DeepSpeakerCleanerPage() {
  return (
    <ToolPageShell
      title="Deep Speaker Cleaner"
      subtitle="A longer 3-stage program for speakers that are still muffled after a quick clean."
      breadcrumbLabel="Deep Speaker Cleaner"
      path="/deep-speaker-cleaner"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Deep Speaker Cleaner",
            description:
              "Free 3-stage browser tool to deep-clean a phone speaker.",
            path: "/deep-speaker-cleaner",
          }),
        )}
      />
      <DeepSpeakerCleaner />
      <ToolContentBody
        content={deepSpeakerCleaner}
        updatedDate={CONTENT_LAST_UPDATED}
      />
    </ToolPageShell>
  );
}
