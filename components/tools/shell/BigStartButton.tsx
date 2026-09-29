// 180-220px circular Start/Stop button with a ripple while running (blueprint §6).
// Composed with ProgressRing by the caller (wrap both in a `relative` container).
// Signature gradient stays the same fixed blue in both themes — a deliberate
// brand-consistency choice for the site's single most important action.
export function BigStartButton({
  running,
  disabled,
  onClick,
  size = 180,
  startLabel = "Start",
  stopLabel = "Stop",
}: {
  running: boolean;
  disabled?: boolean;
  onClick: () => void;
  size?: number;
  startLabel?: string;
  stopLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={running}
      className="relative flex items-center justify-center rounded-full font-semibold text-white transition-[transform,box-shadow] duration-300 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-50 motion-safe:hover:enabled:scale-105 motion-safe:active:enabled:scale-95"
      style={{
        width: size,
        height: size,
        background: running
          ? "linear-gradient(135deg, #E11D48, #FB7185)"
          : "linear-gradient(135deg, #0EA5E9, #38BDF8)",
        boxShadow: running
          ? "0 12px 32px -6px rgba(225,29,72,0.5), 0 0 0 1px rgba(225,29,72,0.08)"
          : "0 12px 32px -6px rgba(14,165,233,0.5), 0 0 0 1px rgba(14,165,233,0.08)",
      }}
    >
      {running && (
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full motion-safe:animate-ping"
          style={{ backgroundColor: "var(--danger)", opacity: 0.3 }}
        />
      )}
      <span className="relative text-lg tracking-tight">
        {running ? stopLabel : startLabel}
      </span>
    </button>
  );
}
