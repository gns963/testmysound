import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

// Wrapper for /blog/[slug]: 3-level breadcrumbs (Home > Blog > post), unlike
// ToolPageShell's 2-level trail — tool pages hang directly off Home, blog
// posts hang off the Blog hub, so they need their own shell rather than
// reusing (or complicating) ToolPageShell.
export function BlogPostShell({
  category,
  title,
  path,
  children,
}: {
  category: string;
  title: string;
  path: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-6 px-4 py-10">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: title, href: path },
        ]}
      />

      <div>
        <p className="text-xs font-semibold tracking-wide text-primary uppercase">{category}</p>
        <h1 className="text-h1 mt-2 leading-tight font-bold tracking-tight text-balance">{title}</h1>
      </div>

      {children}
    </div>
  );
}
