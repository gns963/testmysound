import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo/metadata";
import { jsonLdScriptProps, articleJsonLd } from "@/lib/seo/jsonld";
import { siteConfig } from "@/lib/config/site";
import { blogPosts, getPost } from "@/data/blog";
import { BlogPostShell } from "@/components/blog/BlogPostShell";
import { BlogPostBody } from "@/components/blog/BlogPostBody";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: post.path,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <BlogPostShell category={post.category} title={post.title} path={post.path}>
      <script
        {...jsonLdScriptProps(
          articleJsonLd({
            headline: post.title,
            description: post.metaDescription,
            path: post.path,
            datePublished: post.publishedDate,
            dateModified: post.updatedDate,
            authorName: `${siteConfig.name} Editorial Team`,
          }),
        )}
      />
      <BlogPostBody post={post} />
    </BlogPostShell>
  );
}
