import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, webApplicationJsonLd } from "@/lib/seo/jsonld";
import { CONTENT_LAST_UPDATED } from "@/lib/content-meta";
import waterEject from "@/content/tools/water-eject";
import { SpeakerCleaner } from "@/components/tools/SpeakerCleaner";
import { ToolContentBody } from "@/components/tools/ToolContentBody";
import { DeviceGrid } from "@/components/home/DeviceGrid";
import { MoreToolsGrid } from "@/components/home/MoreToolsGrid";
import { HeroBackdrop } from "@/components/home/HeroBackdrop";
import { WaveformBackdrop } from "@/components/ui/WaveformBackdrop";
import { WaveformDivider } from "@/components/ui/WaveformDivider";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = buildMetadata({
  title: waterEject.metaTitle,
  description: waterEject.metaDescription,
  path: "/",
});

// Honest, verifiable claims only — matches lib/audio's real 60s cycle length
// (see components/tools/SpeakerCleaner.tsx CYCLE_DURATION_MS) rather than an
// invented number.
const HERO_CHECKLIST = ["Safe for Phones", "No App Required", "Free Tool", "Works in 60 Seconds"];

// Homepage = the main tool (blueprint §7), followed by the full content
// template from data/tools.ts (blueprint §8).
export default function Home() {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-12 px-4 pb-10">
      <script
        {...jsonLdScriptProps(
          webApplicationJsonLd({
            name: "Speaker Cleaner",
            description:
              "Free browser tool to eject water and dust from a phone speaker.",
            path: "/",
          }),
        )}
      />

      <section className="relative w-full overflow-hidden pt-6 sm:pt-10">
        <HeroBackdrop />
        <WaveformBackdrop />

        <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center text-center">
          <TrustBadge />
          <h1
            className="mt-4 font-bold tracking-tight text-balance leading-[1.05]"
            style={{ fontSize: "clamp(2.625rem, 1.9rem + 3.3vw, 4rem)" }}
          >
            Remove{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #0EA5E9, #38BDF8)",
              }}
            >
              Water &amp; Dust
            </span>{" "}
            From Your Phone Speaker In Seconds
          </h1>
          <p className="text-body text-muted mx-auto mt-3 max-w-[560px]">
            Play specially engineered sound frequencies that help remove water,
            dust and debris from speakers.
          </p>

          <ul className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-semibold text-muted sm:text-sm">
            {HERO_CHECKLIST.map((label) => (
              <li key={label} className="flex items-center gap-1.5">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="text-primary h-3.5 w-3.5 shrink-0"
                >
                  <path
                    d="M3 8.5 6.5 12 13 4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 mx-auto -mt-6 w-full max-w-2xl sm:-mt-10">
          <SpeakerCleaner />
        </div>
      </section>

      <WaveformDivider />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <SectionHeader
          label="Devices"
          title="Choose your device"
          description="Device-specific tips for a faster fix."
        />
        <DeviceGrid />
      </div>

      <WaveformDivider />

      <div className="mx-auto flex w-full max-w-4xl flex-col gap-8">
        <SectionHeader
          label="Tools"
          title="More free audio tools"
          description="Test, tune, and check your audio setup."
        />
        <MoreToolsGrid excludeSlug="water-eject" />
      </div>

      <div className="mx-auto w-full max-w-2xl">
        <ToolContentBody
          content={waterEject}
          updatedDate={CONTENT_LAST_UPDATED}
        />
      </div>
    </div>
  );
}
