import Link from "next/link";
import type { BlogPost } from "@/content/blog/types";
import { slugify } from "@/lib/slug";
import { AnswerBox } from "@/components/content/AnswerBox";
import { TableOfContents } from "@/components/content/TableOfContents";
import { TroubleshootingTable } from "@/components/content/TroubleshootingTable";
import { RelatedTools } from "@/components/content/RelatedTools";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { FaqSection } from "@/components/content/FaqSection";
import { AuthorBox } from "@/components/content/AuthorBox";

// Full blog-post content template (blueprint §10 "Blog post template"),
// mirroring ToolContentBody's structure: answer-first box, a quick-fix CTA
// into the relevant tool, TOC, question-phrased H2 body, troubleshooting,
// "when to see a repair shop", related tools/posts, FAQ, author box.
export function BlogPostBody({ post }: { post: BlogPost }) {
  return (
    <div className="flex w-full flex-col gap-10">
      <AnswerBox question={post.title} answer={post.answer} />

      <div className="flex w-full flex-col gap-3 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-sm leading-relaxed text-text">{post.quickFix.blurb}</p>
        <Link
          href={post.quickFix.href}
          className="inline-flex shrink-0 items-center justify-center gap-1 rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_rgba(14,165,233,0.35)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(14,165,233,0.45)] hover:brightness-110 active:scale-[0.97]"
          style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-strong))" }}
        >
          {post.quickFix.label} →
        </Link>
      </div>

      <TableOfContents headings={post.sections.map((section) => section.heading)} />

      {post.sections.map((section) => (
        <section key={section.heading} id={slugify(section.heading)} className="w-full">
          <h2 className="text-h3 font-semibold tracking-tight text-text">{section.heading}</h2>
          <div className="mt-3 space-y-3">
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ))}

      {post.troubleshooting && <TroubleshootingTable rows={post.troubleshooting} />}

      <section className="w-full">
        <h2 className="text-h3 font-semibold tracking-tight text-text">When to see a repair shop</h2>
        <ul className="mt-3 space-y-2.5">
          {post.repairShopSigns.map((sign) => (
            <li key={sign} className="flex gap-2.5 text-sm leading-relaxed text-muted">
              <span aria-hidden="true" className="mt-0.5 shrink-0 text-warn">
                ⚠
              </span>
              {sign}
            </li>
          ))}
        </ul>
      </section>

      <RelatedTools slugs={post.relatedTools} />
      <RelatedPosts slugs={post.relatedPosts} currentSlug={post.slug} />
      <FaqSection faqs={post.faqs} />
      <AuthorBox updatedDate={post.updatedDate} />
    </div>
  );
}
