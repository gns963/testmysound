// Rounded pill badge above the hero heading. NOTE: the brief asked for
// "Trusted by Thousands of Users" — that's an invented user-count claim with
// nothing behind it, which conflicts with this project's own no-fake-stats
// rule (see CLAUDE.md and /how-we-test). Kept the exact visual treatment
// requested (pill, light blue bg, checkmark, shadow) with honest copy instead.
export function TrustBadge({
  label = "Free · No App · No Sign-up",
}: {
  label?: string;
}) {
  return (
    <span className="bg-primary/10 text-primary-strong inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm">
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        fill="none"
        className="h-3.5 w-3.5 shrink-0"
      >
        <path
          d="M3 8.5 6.5 12 13 4.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </span>
  );
}
