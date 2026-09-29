import { getTool } from "@/data/tools";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import { ToolCard } from "@/components/ui/ToolCard";

export function RelatedTools({ slugs }: { slugs: string[] }) {
  const related = slugs.map((slug) => getTool(slug)).filter((tool) => tool !== undefined);
  if (related.length === 0) return null;

  return (
    <section className="w-full">
      <h2 className="text-h3 font-semibold tracking-tight text-text">Related tools</h2>
      <div className="mt-4 grid grid-cols-1 gap-1 sm:grid-cols-2">
        {related.map((tool) => (
          <ToolCard
            key={tool.slug}
            variant="compact"
            name={tool.shortName}
            description={tool.primaryKeyword}
            icon={TOOL_ICON_BY_SLUG[tool.slug] ?? "🎚️"}
            href={tool.path}
          />
        ))}
      </div>
    </section>
  );
}
