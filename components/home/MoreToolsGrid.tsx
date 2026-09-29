import { tools } from "@/data/tools";
import { TOOL_ICON_BY_SLUG } from "@/lib/toolIcons";
import { ToolCard } from "@/components/ui/ToolCard";

// Homepage "More free audio tools" grid (blueprint §7.7). Shows every other
// tool rather than the blueprint's shorter example set — more internal links
// out, matching §11.2's "every page links to >=3 related pages" rule.
// Heading rendered by the page via <SectionHeader> — this is just the grid.
export function MoreToolsGrid({ excludeSlug }: { excludeSlug: string }) {
  const others = tools.filter((tool) => tool.slug !== excludeSlug);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {others.map((tool) => (
        <ToolCard
          key={tool.slug}
          name={tool.shortName}
          description={tool.metaDescription}
          icon={TOOL_ICON_BY_SLUG[tool.slug] ?? "🎚️"}
          href={tool.path}
        />
      ))}
    </div>
  );
}
