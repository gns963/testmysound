import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import frequencySweep from "@/content/tools/frequency-sweep";
import { FrequencySweepGenerator } from "@/components/tools/FrequencySweepGenerator";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { ToolContentBody } from "@/components/tools/ToolContentBody";

export const metadata: Metadata = buildMetadata({
  title: frequencySweep.metaTitle,
  description: frequencySweep.metaDescription,
  path: "/frequency-sweep",
});

export default function FrequencySweepPage() {
  return (
    <ToolPageShell
      title="Frequency Sweep Generator"
      subtitle="Set your own frequency range and duration, then sweep it with a live readout."
      breadcrumbLabel="Frequency Sweep"
      path="/frequency-sweep"
    >
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Frequency Sweep Generator",
            description:
              "Free browser tool for a configurable frequency sweep.",
            path: "/frequency-sweep",
          }),
        )}
      />
      <FrequencySweepGenerator />
      <ToolContentBody
        content={frequencySweep}
        updatedDate={CONTENT_LAST_UPDATED}
      />
    </ToolPageShell>
  );
}
