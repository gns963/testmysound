import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";
import { ToolPageShell } from "@/components/tools/ToolPageShell";
import { LegalSection } from "@/components/content/LegalSection";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles your data — microphone audio, analytics and local storage.`,
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <ToolPageShell
      title="Privacy Policy"
      subtitle="What we do — and don't — collect."
      breadcrumbLabel="Privacy Policy"
      path="/privacy-policy"
    >
      <div className="flex w-full flex-col gap-8">
        <LegalSection title="Microphone audio">
          <p>
            Tools that use your microphone (Mic Test, dB Meter) process audio
            entirely in your browser using the Web Audio API. Nothing is
            recorded to a server, uploaded, or stored beyond your current
            browser tab. Closing or refreshing the page discards it completely.
          </p>
        </LegalSection>

        <LegalSection title="Local storage">
          <p>
            We store your light/dark theme preference in your browser&apos;s
            localStorage so it persists between visits. This stays on your
            device and isn&apos;t sent to us.
          </p>
        </LegalSection>

        <LegalSection title="Analytics">
          <p>
            We may use Google Analytics (GA4) to understand aggregate usage —
            which tools are used, whether they complete successfully — so we can
            improve them. GA4 only loads when we&apos;ve configured it for this
            deployment; where it&apos;s not configured, no analytics script
            loads or runs. When it is active, it&apos;s subject to Google&apos;s
            own privacy policy for data it collects.
          </p>
        </LegalSection>

        <LegalSection title="Advertising">
          <p>
            We don&apos;t currently run ads. If we add display advertising in
            the future (for example, Google AdSense), we&apos;ll update this
            policy and add an appropriate consent mechanism for visitors in
            regions that require one (such as the EU/UK), before any ad or
            consent-related cookie is set.
          </p>
        </LegalSection>

        <LegalSection title="What we don't do">
          <ul className="list-disc space-y-1 pl-5">
            <li>
              We don&apos;t require an account or collect your name, email, or
              phone number to use any tool.
            </li>
            <li>
              We don&apos;t sell personal data — we don&apos;t collect enough of
              it to sell in the first place.
            </li>
            <li>
              We don&apos;t share microphone audio with any third party, because
              we never receive it ourselves.
            </li>
          </ul>
        </LegalSection>

        <LegalSection title="Changes to this policy">
          <p>
            If our data practices change — for example, when we add analytics or
            advertising — we&apos;ll update this page and its &quot;last
            updated&quot; date rather than changing behavior silently.
          </p>
        </LegalSection>
      </div>
    </ToolPageShell>
  );
}
