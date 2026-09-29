// Small "how it works" diagram for Surround Sound Test: a listener
// surrounded by labeled speaker positions, with one highlighted to show
// "testing one channel at a time." Inline SVG, purely decorative aside
// from the accessible label + caption.
export function SurroundSoundDiagram() {
  const positions: { x: number; y: number; label: string; active?: boolean }[] = [
    { x: 60, y: 25, label: "FL" },
    { x: 160, y: 15, label: "C" },
    { x: 260, y: 25, label: "FR" },
    { x: 30, y: 95, label: "RL", active: true },
    { x: 290, y: 95, label: "RR" },
    { x: 160, y: 100, label: "SUB" },
  ];

  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="A listener surrounded by labeled speaker positions — front left, front right, center, subwoofer and rear left/right — with one highlighted to show the test playing one channel at a time."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <circle cx="160" cy="60" r="12" stroke="currentColor" strokeWidth="2" />
        <line x1="160" y1="72" x2="160" y2="85" stroke="currentColor" strokeWidth="2" />
        <line x1="150" y1="80" x2="170" y2="80" stroke="currentColor" strokeWidth="2" />

        {positions.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="14" stroke="currentColor" strokeWidth="2" fill={p.active ? "currentColor" : "none"} opacity={p.active ? 0.15 : 1} />
            {p.active && <circle cx={p.x} cy={p.y} r="14" stroke="currentColor" strokeWidth="2.5" />}
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill="currentColor">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Only channels your browser actually reports (usually 2, sometimes more) can be tested this way.
      </figcaption>
    </figure>
  );
}
