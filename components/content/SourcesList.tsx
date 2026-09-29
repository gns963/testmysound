// Visible citation list for health/safety-guidance tools (e.g. the Safe
// Volume Calculator's NIOSH/OSHA/WHO noise-exposure standards). Renders
// nothing when a tool has no sources — most tools won't.
export function SourcesList({ sources }: { sources?: { label: string; href: string }[] }) {
  if (!sources || sources.length === 0) return null;

  return (
    <section className="w-full">
      <h2 className="text-h3 font-semibold tracking-tight text-text">Sources</h2>
      <ul className="mt-4 space-y-2">
        {sources.map((source) => (
          <li key={source.href}>
            <a
              href={source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              {source.label} ↗
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
