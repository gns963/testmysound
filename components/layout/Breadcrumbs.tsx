import Link from "next/link";
import { jsonLdScriptProps, breadcrumbListJsonLd } from "@/lib/seo/jsonld";

export type BreadcrumbItem = {
  label: string;
  href: string;
};

// Visible breadcrumbs + matching BreadcrumbList JSON-LD (blueprint §11.3/§11.4).
// Callers pass the full trail including Home; the last item renders as plain text
// (current page, not a link).
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="text-muted text-sm">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span aria-current="page" className="text-text">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-text hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
      <script {...jsonLdScriptProps(breadcrumbListJsonLd(items))} />
    </nav>
  );
}
