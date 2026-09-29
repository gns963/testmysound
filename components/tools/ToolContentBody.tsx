import type { ReactNode } from "react";
import type { ToolContent } from "@/content/tools/types";
import { AnswerBox } from "@/components/content/AnswerBox";
import { StepList } from "@/components/content/StepList";
import { TipsGrid } from "@/components/content/TipsGrid";
import { TroubleshootingTable } from "@/components/content/TroubleshootingTable";
import { Callout } from "@/components/content/Callout";
import { RelatedTools } from "@/components/content/RelatedTools";
import { RelatedGuides } from "@/components/content/RelatedGuides";
import { SourcesList } from "@/components/content/SourcesList";
import { FaqSection } from "@/components/content/FaqSection";
import { AuthorBox } from "@/components/content/AuthorBox";

// Full tool-page content template (blueprint §8, steps 5-14) — everything
// that goes below the tool itself. Order matches the blueprint exactly.
// `diagram` and `tipsTitle` are optional so the original 14 tool pages
// (plain paragraphs, generic "Tips" heading) render exactly as before.
export function ToolContentBody({
  content,
  updatedDate,
  diagram,
  tipsTitle = "Tips",
}: {
  content: ToolContent;
  updatedDate: string;
  diagram?: ReactNode;
  tipsTitle?: string;
}) {
  return (
    <div className="mt-6 flex w-full flex-col gap-10">
      <AnswerBox
        question={`What is ${content.name.toLowerCase()}?`}
        answer={content.answer}
      />
      <StepList title="How to use it" steps={content.howToSteps} />
      <section className="w-full">
        <h2 className="text-h3 text-text font-semibold tracking-tight">
          How it works
        </h2>
        <div className="border-border bg-surface shadow-card mt-4 space-y-3 rounded-2xl border p-5 sm:p-6">
          {content.howItWorks.map((paragraph) => (
            <p key={paragraph} className="text-muted text-sm leading-relaxed">
              {paragraph}
            </p>
          ))}
          {diagram && <div className="flex justify-center pt-1">{diagram}</div>}
        </div>
      </section>
      <TipsGrid title={tipsTitle} tips={content.tips} />
      <TroubleshootingTable rows={content.troubleshooting} />
      <Callout variant="warn" title="Safety & limitations">
        {content.safetyNote}
      </Callout>
      <SourcesList sources={content.sources} />
      <RelatedTools slugs={content.related} />
      <RelatedGuides slugs={content.relatedBlogPosts} />
      <FaqSection faqs={content.faqs} />
      <AuthorBox updatedDate={updatedDate} />
    </div>
  );
}
