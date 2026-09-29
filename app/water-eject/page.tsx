import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import waterEject from "@/content/tools/water-eject";
import { SpeakerCleaner } from "@/components/tools/SpeakerCleaner";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

// Distinct title from "/" (which targets "speaker cleaner") even though the
// tool and body content are shared — avoids two indexed URLs with identical
// <title> tags while still targeting the "water eject" keyword variant.
export const metadata: Metadata = buildMetadata({
  title: "Water Eject — Get Water Out of Your Phone Speaker",
  description:
    "Free water eject tool that uses sound to push water out of your phone speaker. No app, works in about 60 seconds.",
  path: "/water-eject",
});

// Same tool as "/", published at its own exact-match URL for SEO (blueprint §5).
export default function WaterEjectPage() {
  return (
    <ToolPageShell
      title="Water Eject — Get Water Out of Your Phone Speaker"
      subtitle="Free. No app. Works on iPhone, Android and laptops in about 60 seconds."
      breadcrumbLabel="Water Eject"
      path="/water-eject"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Water Eject",
            description:
              "Free browser tool to eject water from a phone speaker.",
            path: "/water-eject",
          }),
        )}
      />
      <SpeakerCleaner defaultMode="water" />
      <ToolContentBody
        content={waterEject}
        updatedDate={CONTENT_LAST_UPDATED}
      />
    </ToolPageShell>
  );
}
