import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import speakerDustRemover from "@/content/tools/speaker-dust-remover";
import { SpeakerCleaner } from "@/components/tools/SpeakerCleaner";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: speakerDustRemover.metaTitle,
  description: speakerDustRemover.metaDescription,
  path: "/speaker-dust-remover",
});

// Dedicated single-mode page for Tool 1's "Dust" mode (blueprint §5).
export default function SpeakerDustRemoverPage() {
  return (
    <ToolPageShell
      title="Speaker Dust Remover"
      subtitle="Free. No app. Uses a frequency sweep to help shake dust out of the speaker grille."
      breadcrumbLabel="Speaker Dust Remover"
      path="/speaker-dust-remover"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Speaker Dust Remover",
            description:
              "Free browser tool to help clear dust from a phone speaker.",
            path: "/speaker-dust-remover",
          }),
        )}
      />
      <SpeakerCleaner defaultMode="dust" allowedModes={["dust"]} />
      <ToolContentBody
        content={speakerDustRemover}
        updatedDate={CONTENT_LAST_UPDATED}
      />
    </ToolPageShell>
  );
}
