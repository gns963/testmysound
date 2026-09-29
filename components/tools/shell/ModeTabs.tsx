export type ModeOption = {
  id: string;
  label: string;
};

// iOS-style segmented control with a smoothly sliding active indicator.
// translateX(N * 100%) moves by the indicator's OWN width each step, so the
// math works for any segment count without measuring anything in JS.
export function ModeTabs({
  modes,
  active,
  onChange,
  disabled,
}: {
  modes: ModeOption[];
  active: string;
  onChange: (id: string) => void;
  disabled?: boolean;
}) {
  if (modes.length < 2) return null;

  const activeIndex = Math.max(
    0,
    modes.findIndex((m) => m.id === active),
  );

  return (
    <div
      role="tablist"
      aria-label="Mode"
      className="border-border bg-bg relative grid rounded-full border p-1"
      style={{ gridTemplateColumns: `repeat(${modes.length}, 1fr)` }}
    >
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 left-1 rounded-full shadow-sm transition-transform duration-300 ease-out"
        style={{
          width: `calc((100% - 8px) / ${modes.length})`,
          transform: `translateX(${activeIndex * 100}%)`,
          background:
            "linear-gradient(135deg, var(--primary), var(--primary-strong))",
        }}
      />
      {modes.map((mode) => {
        const isActive = mode.id === active;
        return (
          <button
            key={mode.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => onChange(mode.id)}
            className={`relative z-10 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
              isActive ? "text-white" : "text-muted hover:text-text"
            }`}
          >
            {mode.label}
          </button>
        );
      })}
    </div>
  );
}
