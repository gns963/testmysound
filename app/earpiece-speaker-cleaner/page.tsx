import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import earpieceSpeakerCleaner from "@/content/tools/earpiece-speaker-cleaner";
import { EarpieceSpeakerCleaner } from "@/components/tools/EarpieceSpeakerCleaner";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: earpieceSpeakerCleaner.metaTitle,
  description: earpieceSpeakerCleaner.metaDescription,
  path: "/earpiece-speaker-cleaner",
});

export default function EarpieceSpeakerCleanerPage() {
  return (
    <ToolPageShell
      title="Earpiece / Call Speaker Cleaner"
      subtitle="For the small speaker you hold to your ear during calls."
      breadcrumbLabel="Earpiece Speaker Cleaner"
      path="/earpiece-speaker-cleaner"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Earpiece Speaker Cleaner",
            description:
              "Free browser tool and guide to clean a phone's earpiece speaker.",
            path: "/earpiece-speaker-cleaner",
          }),
        )}
      />
      <EarpieceSpeakerCleaner />
      <ToolContentBody
        content={earpieceSpeakerCleaner}
        updatedDate={CONTENT_LAST_UPDATED}
      />
    </ToolPageShell>
  );
}
