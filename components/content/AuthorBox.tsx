import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

// Reviewer byline + "Last updated" + "How we test" link (blueprint §8 step 14,
// §11.6 E-E-A-T). No individual is invented here — until a named reviewer is
// assigned, the honest byline is the editorial team, not a fabricated person.
export function AuthorBox({ updatedDate }: { updatedDate: string }) {
  const formatted = new Date(updatedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="border-border text-muted flex w-full flex-wrap items-center justify-between gap-2 border-t pt-4 text-xs">
      <span>
        Reviewed by the {siteConfig.name} editorial team ·{" "}
        <Link href="/how-we-test" className="text-primary hover:underline">
          How we test
        </Link>
      </span>
      <span>Last updated {formatted}</span>
    </div>
  );
}
