import Link from "next/link";
import type { BlogPost } from "@/content/blog/types";

const ArrowIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3 w-3">
    <path
      d="M3 8h10m0 0L9 4m4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Blog card — same visual language as ToolCard (border/shadow/hover-lift)
// so the blog index and tool grids feel like one design system.
export function BlogCard({ post, compact = false }: { post: BlogPost; compact?: boolean }) {
  return (
    <Link
      href={post.path}
      className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-card-hover"
    >
      <p className="text-xs font-bold tracking-wide text-primary uppercase">{post.category}</p>
      <h3 className={`font-bold text-text ${compact ? "text-sm" : "text-base"}`}>{post.title}</h3>
      {!compact && (
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{post.metaDescription}</p>
      )}
      <span className="mt-1 flex items-center gap-1 text-xs font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        Read guide
        <ArrowIcon />
      </span>
    </Link>
  );
}
