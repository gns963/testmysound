// Small "how it works" diagram for the Keyboard Tester page: physical key →
// key code → matched on-screen key. Inline SVG, purely decorative aside from
// the accessible label + caption.
export function KeyboardDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Pressing a physical key sends a key code to the browser, which highlights the matching key on screen."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <rect x="8" y="50" width="90" height="50" rx="6" stroke="currentColor" strokeWidth="2" />
        {Array.from({ length: 12 }).map((_, i) => {
          const row = Math.floor(i / 4);
          const col = i % 4;
          return (
            <rect
              key={i}
              x={16 + col * 20}
              y={58 + row * 13}
              width="14"
              height="9"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.2"
              fill={i === 0 ? "currentColor" : "none"}
            />
          );
        })}

        <line x1="102" y1="70" x2="160" y2="70" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M154 64 L160 70 L154 76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <rect x="168" y="55" width="60" height="30" rx="6" stroke="currentColor" strokeWidth="2" />
        <text x="198" y="74" textAnchor="middle" fontSize="11" fill="currentColor" fontFamily="monospace">
          KeyA
        </text>

        <line x1="230" y1="70" x2="255" y2="70" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M249 64 L255 70 L249 76" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <circle cx="285" cy="70" r="20" stroke="currentColor" strokeWidth="2" />
        <path d="M276 70 L283 77 L295 62" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Each keypress sends a key code your browser matches to the on-screen layout.
      </figcaption>
    </figure>
  );
}
