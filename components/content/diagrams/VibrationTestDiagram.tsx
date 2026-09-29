// Small "how it works" diagram for Vibration Test: a pattern of on/off bars
// feeds into a phone, which vibrates in that exact rhythm. Inline SVG,
// purely decorative aside from the accessible label + caption.
export function VibrationTestDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="A pattern of vibrate and pause durations is sent to your phone, which vibrates in that exact rhythm."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        {[
          { x: 10, w: 24 },
          { x: 44, w: 10 },
          { x: 64, w: 24 },
          { x: 98, w: 10 },
          { x: 118, w: 40 },
        ].map((bar, i) => (
          <rect key={i} x={bar.x} y="50" width={bar.w} height="20" rx="3" fill="currentColor" opacity={i % 2 === 0 ? 0.85 : 0.15} />
        ))}
        <text x="85" y="90" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">
          vibrate / pause pattern
        </text>

        <line x1="175" y1="60" x2="205" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M199 54 L205 60 L199 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <rect x="230" y="30" width="40" height="65" rx="8" stroke="currentColor" strokeWidth="2" />
        <line x1="240" y1="40" x2="260" y2="40" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path d="M220 45 Q212 55 220 65" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
        <path d="M280 45 Q288 55 280 65" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />
      </svg>
      <figcaption className="text-muted text-center text-xs">
        The pattern of numbers you tap becomes the exact rhythm your phone vibrates.
      </figcaption>
    </figure>
  );
}
