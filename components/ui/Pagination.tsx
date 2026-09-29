import Link from "next/link";

// Design-system Pagination. No page on the site is paginated yet (the blog
// system hasn't been built), so this has no caller today — built ahead of
// that need per the design-system spec, not wired into fake content.
export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number;
  totalPages: number;
  /** e.g. "/blog" — page N renders at `${basePath}?page=N`. */
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const pageHref = (page: number) => (page === 1 ? basePath : `${basePath}?page=${page}`);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Pagination" className="flex items-center justify-center gap-1.5">
      <Link
        href={pageHref(Math.max(1, currentPage - 1))}
        aria-disabled={currentPage === 1}
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm text-text transition-colors hover:border-primary hover:text-primary ${
          currentPage === 1 ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
          <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      {pages.map((page) => (
        <Link
          key={page}
          href={pageHref(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
            page === currentPage ? "bg-primary text-white" : "text-muted hover:bg-text/5 hover:text-text"
          }`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={pageHref(Math.min(totalPages, currentPage + 1))}
        aria-disabled={currentPage === totalPages}
        className={`flex h-9 w-9 items-center justify-center rounded-full border border-border text-sm text-text transition-colors hover:border-primary hover:text-primary ${
          currentPage === totalPages ? "pointer-events-none opacity-40" : ""
        }`}
      >
        <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
          <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </nav>
  );
}
