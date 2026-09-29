import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { LegalSection } from "@/components/content/LegalSection";
import { Callout } from "@/components/content/Callout";

export const metadata: Metadata = buildMetadata({
  title: "Disclaimer",
  description: `The honest limits of what ${siteConfig.name}'s tools can and can't do.`,
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <ToolPageShell
      title="Disclaimer"
      subtitle="What our tools can and can't do — stated plainly, not buried in fine print."
      breadcrumbLabel="Disclaimer"
      path="/disclaimer"
    >
      <div className="flex w-full flex-col gap-8">
        <Callout variant="warn" title="The short version">
          Our cleaning tools can help move small amounts of surface water or
          dust off a speaker grille. They do not repair hardware damage. Use
          them at your own risk, and stop immediately if you hear distortion or
          things get worse.
        </Callout>

        <LegalSection title="Speaker cleaning tools">
          <p>
            The Water Eject, Deep Speaker Cleaner, Dust Remover and Earpiece
            Cleaner tools use sound to vibrate a speaker and help shift small
            amounts of surface water or dust. They cannot repair a speaker with
            genuine liquid or physical damage, and they are not a substitute for
            professional repair. We are not responsible for any device damage
            related to using these tools.
          </p>
        </LegalSection>

        <LegalSection title="Measurement and hearing tools">
          <p>
            The dB Meter gives an approximate, uncalibrated reading — it is not
            a certified sound level meter and shouldn&apos;t be used for
            anything requiring precise or legally meaningful measurement. The
            Hearing Test is an informal estimate for curiosity, not a medical or
            calibrated hearing assessment. If you have a real concern about your
            hearing, see an audiologist.
          </p>
        </LegalSection>

        <LegalSection title="General use">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              Don&apos;t charge your device while it&apos;s wet, regardless of
              what any tool on this site says.
            </li>
            <li>
              Stop any tool immediately if you hear distortion, buzzing, or
              anything that sounds worse than when you started.
            </li>
            <li>
              All tools are provided free, &quot;as is,&quot; with no warranty
              of any kind.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Not affiliated with any manufacturer">
          <p>
            {siteConfig.name} is independent and not affiliated with, sponsored
            by, or endorsed by Apple, Samsung, Google, or any other device
            manufacturer mentioned on this site. Device and brand names are used
            descriptively only.
          </p>
        </LegalSection>
      </div>
    </ToolPageShell>
  );
}
