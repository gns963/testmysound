// Small "how it works" diagram for the CPS Test page: repeated clicks over
// a fixed time window divide down to a clicks-per-second number. Inline SVG,
// purely decorative aside from the accessible label + caption.
export function CpsTestDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Clicks counted over a fixed time window are divided by the duration to calculate clicks per second."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <circle cx={30 + i * 28} cy="55" r="10" stroke="currentColor" strokeWidth="2" opacity={0.4 + i * 0.12} />
            <circle cx={30 + i * 28} cy="55" r="3" fill="currentColor" opacity={0.4 + i * 0.12} />
          </g>
        ))}
        <line x1="10" y1="90" x2="170" y2="90" stroke="currentColor" strokeWidth="1.5" />
        <path d="M164 85 L170 90 L164 95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="90" y="105" textAnchor="middle" fontSize="11" fill="currentColor" opacity="0.7">
          5 clicks / 1s
        </text>

        <line x1="190" y1="55" x2="220" y2="55" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M214 49 L220 55 L214 61" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <text x="270" y="63" textAnchor="middle" fontSize="30" fontWeight="700" fill="currentColor">
          5 CPS
        </text>
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Total clicks divided by the test duration gives your clicks-per-second score.
      </figcaption>
    </figure>
  );
}
