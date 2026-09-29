// Small "how it works" diagram for the Virtual Piano: pressing a key (mouse,
// touch, or a mapped physical key) starts an oscillator at that note's
// frequency, which ramps up then fades on release. Inline SVG, purely
// decorative aside from the accessible label + caption.
export function VirtualPianoDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Pressing a key starts an oscillator tuned to that note's frequency, with a quick fade-in and fade-out instead of an abrupt click."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <rect key={i} x={10 + i * 16} y="30" width="14" height="50" rx="2" stroke="currentColor" strokeWidth="1.5" fill={i === 2 ? "currentColor" : "none"} opacity={i === 2 ? 0.2 : 1} />
        ))}
        <text x="38" y="95" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.7">
          key press
        </text>

        <line x1="105" y1="55" x2="135" y2="55" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M129 49 L135 55 L129 61" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <path
          d="M150 70 L165 30 L180 70 L195 30 L210 70"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        <line x1="225" y1="55" x2="255" y2="55" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M249 49 L255 55 L249 61" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <path d="M270 75 L280 40 L295 40 L305 75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <text x="287" y="95" textAnchor="middle" fontSize="9" fill="currentColor" opacity="0.7">
          fade in/out
        </text>
      </svg>
      <figcaption className="text-muted text-center text-xs">
        A quick fade-in and fade-out replaces an abrupt on/off click for each note.
      </figcaption>
    </figure>
  );
}
