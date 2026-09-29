// Small "how it works" diagram for the Dead Pixel Test page: a magnifier
// over one odd-colored dot on an otherwise uniform screen. Inline SVG,
// purely decorative aside from the accessible label + caption.
export function ScreenTestDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="A magnifier reveals a single stuck pixel standing out against an otherwise uniform full-screen color."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <rect x="10" y="20" width="140" height="80" rx="6" stroke="currentColor" strokeWidth="2" />
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={10 + ((i + 1) * 140) / 7}
            y1="20"
            x2={10 + ((i + 1) * 140) / 7}
            y2="100"
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="10"
            y1={20 + ((i + 1) * 80) / 4}
            x2="150"
            y2={20 + ((i + 1) * 80) / 4}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
          />
        ))}
        <circle cx="70" cy="60" r="3" fill="currentColor" />

        <line x1="82" y1="68" x2="150" y2="90" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />

        <circle cx="230" cy="65" r="45" stroke="currentColor" strokeWidth="2.5" />
        <line x1="262" y1="97" x2="285" y2="118" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <circle cx="230" cy="65" r="6" fill="currentColor" />
      </svg>
      <figcaption className="text-muted text-center text-xs">
        A uniform color makes one stuck or dead pixel impossible to miss.
      </figcaption>
    </figure>
  );
}
