const SIZE = 220;
const STROKE = 8;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// SVG ring, percent + seconds left rendered as centered text (blueprint §6).
// Purely presentational — callers position their own Start button on top of it.
export function ProgressRing({
  progressPct,
  secondsLeft,
  idleLabel,
}: {
  progressPct: number;
  secondsLeft?: number;
  idleLabel?: string;
}) {
  const offset =
    CIRCUMFERENCE * (1 - Math.min(100, Math.max(0, progressPct)) / 100);

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="pointer-events-none absolute inset-0"
      role="img"
      aria-label={
        secondsLeft !== undefined
          ? `${Math.round(progressPct)}% complete, ${secondsLeft} seconds left`
          : (idleLabel ?? "Progress")
      }
    >
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="var(--border)"
        strokeWidth={STROKE}
      />
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={RADIUS}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        style={{ transition: "stroke-dashoffset 100ms linear" }}
      />
    </svg>
  );
}

export const PROGRESS_RING_SIZE = SIZE;
