// Small "how it works" diagram for Text to Speech: typed text becomes
// speech either fully on-device or via a browser's cloud voice — shown as
// two branching paths converging on a speaker. Inline SVG, purely
// decorative aside from the accessible label + caption.
export function TextToSpeechDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Typed text becomes speech either fully on your device or via a browser cloud voice, each labeled so you can tell which is used."
        viewBox="0 0 320 130"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <rect x="10" y="45" width="60" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
        {[0, 1, 2].map((i) => (
          <line key={i} x1="18" y1={56 + i * 9} x2="62" y2={56 + i * 9} stroke="currentColor" strokeWidth="1.5" opacity="0.6" />
        ))}

        <line x1="80" y1="50" x2="110" y2="30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="80" y1="80" x2="110" y2="100" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

        <rect x="112" y="16" width="70" height="28" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <text x="147" y="34" textAnchor="middle" fontSize="10" fill="currentColor">
          On-device
        </text>

        <rect x="112" y="86" width="70" height="28" rx="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="147" y="104" textAnchor="middle" fontSize="10" fill="currentColor">
          Cloud voice
        </text>

        <line x1="184" y1="30" x2="215" y2="60" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="184" y1="100" x2="215" y2="70" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />

        <path d="M225 55 L240 55 L255 42 L255 88 L240 75 L225 75 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M265 52 Q275 65 265 78" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Some voices speak fully on-device; others may use your browser&apos;s cloud voice service — the tool labels each one.
      </figcaption>
    </figure>
  );
}
