import { slugify } from "@/lib/slug";

// Jump-to-section list for long-form posts. Anchors must match the #id set
// on each rendered <section> (BlogPostBody uses the same slugify()).
export function TableOfContents({ headings }: { headings: string[] }) {
  return (
    <nav aria-label="Table of contents" className="w-full rounded-2xl border border-border bg-surface p-5 shadow-card sm:p-6">
      <p className="text-xs font-bold tracking-wide text-muted uppercase">On this page</p>
      <ul className="mt-3 space-y-1.5">
        {headings.map((heading) => (
          <li key={heading}>
            <a href={`#${slugify(heading)}`} className="text-sm text-primary hover:underline">
              {heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
