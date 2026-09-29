// Small "how it works" diagram for the Speaker Phase/Polarity Test: two
// speaker cones moving the same direction (in phase) vs. opposite
// directions (inverted/out of phase). Inline SVG, purely decorative aside
// from the accessible label + caption.
export function PolarityTestDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Two speaker cones moving the same direction reinforce each other; moving in opposite directions, from inverted wiring, partially cancels the sound."
        viewBox="0 0 320 130"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <text x="70" y="16" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">
          In phase
        </text>
        <path d="M30 30 L30 70 L55 70 L75 90 L75 10 L55 30 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M120 30 L120 70 L95 70 L75 90 L75 10 L95 30 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M20 50 L8 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrowL)" />
        <path d="M130 50 L142 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrowR)" />

        <line x1="150" y1="50" x2="150" y2="90" stroke="currentColor" strokeWidth="1" opacity="0.3" />

        <text x="245" y="16" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">
          Inverted (reversed wiring)
        </text>
        <path d="M200 30 L200 70 L225 70 L245 90 L245 10 L225 30 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M290 30 L290 70 L265 70 L245 90 L245 10 L265 30 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" strokeDasharray="3 3" />
        <path d="M190 50 L178 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrowL)" />
        <path d="M300 50 L288 50" stroke="currentColor" strokeWidth="2" strokeLinecap="round" markerEnd="url(#arrowR)" />

        <defs>
          <marker id="arrowL" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M6 0 L0 3 L6 6 Z" fill="currentColor" />
          </marker>
          <marker id="arrowR" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0 0 L6 3 L0 6 Z" fill="currentColor" />
          </marker>
        </defs>
      </svg>
      <figcaption className="text-muted text-center text-xs">
        In phase, both cones move outward together; inverted, one moves in while the other moves out.
      </figcaption>
    </figure>
  );
}
