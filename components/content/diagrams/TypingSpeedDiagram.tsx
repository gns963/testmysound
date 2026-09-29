// Small "how it works" diagram for the Typing Speed Test page: typed
// characters are grouped into 5-character "words" and divided by elapsed
// minutes to get WPM. Inline SVG, purely decorative aside from the
// accessible label + caption.
export function TypingSpeedDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Correctly typed characters are grouped into 5-character words and divided by elapsed minutes to calculate words per minute."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        {"abcde fghij".split("").map((ch, i) => (
          <text key={i} x={14 + i * 16} y="55" fontSize="16" fontFamily="monospace" fill="currentColor" opacity={ch === " " ? 0 : 0.85}>
            {ch}
          </text>
        ))}
        <rect x="8" y="38" width="76" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <rect x="92" y="38" width="76" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="46" y="80" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">
          5 chars
        </text>
        <text x="130" y="80" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.6">
          5 chars
        </text>

        <line x1="185" y1="50" x2="210" y2="50" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M204 44 L210 50 L204 56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <text x="265" y="58" textAnchor="middle" fontSize="28" fontWeight="700" fill="currentColor">
          WPM
        </text>
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Every 5 correctly typed characters counts as one word toward your WPM.
      </figcaption>
    </figure>
  );
}
