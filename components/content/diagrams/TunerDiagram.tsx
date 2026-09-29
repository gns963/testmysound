// Small "how it works" diagram for the Tuner page: a waveform goes in, a
// note name + cents needle comes out. Inline SVG, purely decorative aside
// from the accessible label + caption.
export function TunerDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Your instrument's sound wave is analyzed to find its pitch, shown as a note name and a cents needle."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <path
          d="M10 60 Q25 20 40 60 T70 60 T100 60 T130 60"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <line x1="140" y1="60" x2="180" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M174 54 L180 60 L174 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <text x="230" y="50" textAnchor="middle" fontSize="22" fontWeight="700" fill="currentColor">
          A2
        </text>
        <rect x="195" y="70" width="70" height="8" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="230" cy="74" r="5" fill="currentColor" />
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Your instrument&apos;s sound wave is matched to the nearest note, with a cents needle for fine-tuning.
      </figcaption>
    </figure>
  );
}
