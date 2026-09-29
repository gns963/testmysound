import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { siteConfig } from "@/lib/config/site";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { BlogCard } from "@/components/blog/BlogCard";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description: `Guides on phone speaker water damage, muffled sound, cleaning and testing — practical, honest answers from the team behind ${siteConfig.name}'s free audio tools.`,
  path: "/blog",
});

// Blog index (blueprint §10) — links to every post, and every post links
// back here plus its siblings via RelatedPosts, satisfying the "hub links
// to all children, children link back" interlinking rule (§11.2).
export default function BlogIndexPage() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-10">
      <div>
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }]} />
        <div className="mt-6 text-center">
          <p className="text-xs font-semibold tracking-wide text-primary uppercase">Guides</p>
          <h1 className="text-h1 mt-2 font-bold tracking-tight text-balance">
            Speaker &amp; audio troubleshooting guides
          </h1>
          <p className="text-body text-muted mx-auto mt-3 max-w-[640px]">
            Practical, honest answers to the water damage, muffled-sound and
            cleaning questions people actually search for — each one links
            straight to the free tool that helps.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
