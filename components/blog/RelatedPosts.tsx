import { getPost } from "@/data/blog";
import { BlogCard } from "@/components/blog/BlogCard";

export function RelatedPosts({ slugs, currentSlug }: { slugs: string[]; currentSlug: string }) {
  const related = slugs
    .filter((slug) => slug !== currentSlug)
    .map((slug) => getPost(slug))
    .filter((post) => post !== undefined);
  if (related.length === 0) return null;

  return (
    <section className="w-full">
      <h2 className="text-h3 font-semibold tracking-tight text-text">Related guides</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {related.map((post) => (
          <BlogCard key={post.slug} post={post} compact />
        ))}
      </div>
    </section>
  );
}
