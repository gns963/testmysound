// Small "how it works" diagram for Sleep/Focus Sounds: raw noise passes
// through a filter (and, for ocean, a slow volume swell) to become a
// rain/ocean/fan-like texture. Inline SVG, purely decorative aside from the
// accessible label + caption.
export function SleepSoundsDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Raw noise passes through a filter, and sometimes a slow volume swell, to become a rain, ocean or fan-like texture."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <path
          d="M10 60 L20 45 L30 70 L40 40 L50 65 L60 50 L70 60 L80 55"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />

        <line x1="95" y1="60" x2="130" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M124 54 L130 60 L124 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <rect x="140" y="40" width="50" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
        <text x="165" y="64" textAnchor="middle" fontSize="10" fill="currentColor">
          Filter
        </text>

        <line x1="195" y1="60" x2="225" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M219 54 L225 60 L219 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <path
          d="M235 65 Q245 45 255 65 Q265 45 275 65 Q285 45 295 65 Q305 45 310 65"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Filtered (and, for ocean, slowly swelling) noise — a texture, not a recording.
      </figcaption>
    </figure>
  );
}
