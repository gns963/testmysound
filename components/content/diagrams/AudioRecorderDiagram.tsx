// Small "how it works" diagram for Audio Recorder: mic input becomes a
// local file you can play back or download — with a crossed-out server to
// make the "nothing is uploaded" claim visual too. Inline SVG, purely
// decorative aside from the accessible label + caption.
export function AudioRecorderDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Your microphone's audio is recorded and kept as a local file in your browser — never uploaded to a server."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <rect x="28" y="20" width="16" height="28" rx="8" stroke="currentColor" strokeWidth="2" />
        <path d="M20 42 a16 16 0 0 0 32 0" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="36" y1="58" x2="36" y2="68" stroke="currentColor" strokeWidth="2" />
        <line x1="24" y1="68" x2="48" y2="68" stroke="currentColor" strokeWidth="2" />

        <line x1="60" y1="55" x2="85" y2="55" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M79 49 L85 55 L79 61" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <path
          d="M95 55 L105 40 L115 65 L125 30 L135 70 L145 45 L155 55"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        <line x1="165" y1="55" x2="190" y2="55" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M184 49 L190 55 L184 61" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <rect x="200" y="35" width="40" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
        <path d="M212 55 L228 55 M220 47 L220 63" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

        <g opacity="0.5">
          <rect x="270" y="35" width="34" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <line x1="277" y1="45" x2="297" y2="45" stroke="currentColor" strokeWidth="1.5" />
          <line x1="277" y1="55" x2="297" y2="55" stroke="currentColor" strokeWidth="1.5" />
          <line x1="266" y1="29" x2="308" y2="81" stroke="currentColor" strokeWidth="2" />
        </g>
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Your recording becomes a local file you control — never a server upload.
      </figcaption>
    </figure>
  );
}
