// Small "how it works" diagram for the BPM Counter page: a finger tapping
// at intervals, with the time between taps measured and converted to a BPM
// number. Inline SVG, purely decorative aside from the accessible label +
// caption.
export function BpmCounterDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="The time between your taps is measured and averaged to calculate beats per minute."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        {[40, 100, 160].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="50" r="14" stroke="currentColor" strokeWidth="2" opacity={0.9 - i * 0.15} />
            <circle cx={x} cy="50" r="3" fill="currentColor" />
          </g>
        ))}
        <line x1="54" y1="50" x2="86" y2="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="114" y1="50" x2="146" y2="50" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

        <line x1="185" y1="50" x2="215" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M209 44 L215 50 L209 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <text x="270" y="56" textAnchor="middle" fontSize="24" fontWeight="700" fill="currentColor">
          BPM
        </text>
      </svg>
      <figcaption className="text-muted text-center text-xs">
        The gaps between taps are averaged and converted into a beats-per-minute number.
      </figcaption>
    </figure>
  );
}
