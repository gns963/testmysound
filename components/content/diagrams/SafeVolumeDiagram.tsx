// Small "how it works" diagram for the Safe Volume Calculator: as decibels
// rise, the safe exposure time shrinks — illustrated as a volume scale next
// to a shrinking clock. Inline SVG, purely decorative aside from the
// accessible label + caption.
export function SafeVolumeDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="As decibel level rises, the recommended safe exposure time gets shorter, following each standard's published exchange rate."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <line x1="15" y1="95" x2="15" y2="20" stroke="currentColor" strokeWidth="2" />
        <line x1="15" y1="95" x2="150" y2="95" stroke="currentColor" strokeWidth="2" />
        <path
          d="M20 90 L45 75 L70 55 L95 40 L120 28 L145 22"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <text x="82" y="112" textAnchor="middle" fontSize="10" fill="currentColor" opacity="0.7">
          dB level →
        </text>

        <line x1="170" y1="60" x2="195" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M189 54 L195 60 L189 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <circle cx="240" cy="60" r="26" stroke="currentColor" strokeWidth="2" />
        <line x1="240" y1="60" x2="240" y2="42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <line x1="240" y1="60" x2="253" y2="60" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M290 40 L300 60 L290 80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Safe exposure time shrinks as the level rises, following each standard&apos;s published exchange rate.
      </figcaption>
    </figure>
  );
}
