import type { DeviceHubContent } from "@/content/device-hubs/types";
import { AnswerBox } from "@/components/content/AnswerBox";
import { TipsGrid } from "@/components/content/TipsGrid";
import { Callout } from "@/components/content/Callout";
import { RelatedDevices } from "@/components/content/RelatedDevices";
import { FaqSection } from "@/components/content/FaqSection";
import { AuthorBox } from "@/components/content/AuthorBox";

// Content template for a device/brand hub page — the hub-level counterpart
// to ToolContentBody, adapted from blueprint §9's device page template
// (dropping the parts that require verified per-model facts, like an exact
// IP rating, which this hub level intentionally doesn't claim).
export function DeviceHubBody({
  content,
  updatedDate,
}: {
  content: DeviceHubContent;
  updatedDate: string;
}) {
  return (
    <div className="mt-6 flex w-full flex-col gap-10">
      <AnswerBox
        question={`Where are the speakers on ${content.name}?`}
        answer={content.speakerLayoutNote}
      />

      <TipsGrid title="Tips" tips={content.tips} />

      <section className="w-full">
        <h2 className="text-h3 text-text font-semibold tracking-tight">
          Common issues
        </h2>
        <ul className="border-border bg-surface shadow-card mt-4 space-y-2.5 rounded-2xl border p-4 sm:p-5">
          {content.commonIssues.map((issue) => (
            <li
              key={issue}
              className="text-muted flex gap-2.5 text-sm leading-relaxed"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 16 16"
                fill="none"
                className="text-warn mt-0.5 h-4 w-4 shrink-0"
              >
                <path
                  d="M8 2 14.5 13.5h-13L8 2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 6.5v3.2M8 11.6v.1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              {issue}
            </li>
          ))}
        </ul>
      </section>

      <Callout variant="warn" title="When to see a repair shop">
        {content.whenToSeeService}
      </Callout>

      <RelatedDevices excludeSlug={content.slug} />
      <FaqSection faqs={content.faqs} />
      <AuthorBox updatedDate={updatedDate} />
    </div>
  );
}
