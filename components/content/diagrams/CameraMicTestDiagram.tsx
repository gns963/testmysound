// Small "how it works" diagram for Camera & Mic Test: camera + mic feed
// into one combined check, producing a simple readiness checklist. Inline
// SVG, purely decorative aside from the accessible label + caption.
export function CameraMicTestDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Camera and microphone are requested together, then checked individually, producing a simple readiness checklist for camera, mic and speaker."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <rect x="10" y="20" width="46" height="34" rx="6" stroke="currentColor" strokeWidth="2" />
        <path d="M56 30 L72 22 L72 52 L56 44 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />

        <rect x="18" y="65" width="14" height="24" rx="7" stroke="currentColor" strokeWidth="2" />
        <path d="M12 80 a13 13 0 0 0 26 0" stroke="currentColor" strokeWidth="2" fill="none" />
        <line x1="25" y1="93" x2="25" y2="100" stroke="currentColor" strokeWidth="2" />

        <line x1="90" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M114 54 L120 60 L114 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <rect x="140" y="20" width="130" height="80" rx="8" stroke="currentColor" strokeWidth="2" />
        {["Camera", "Mic", "Speaker"].map((label, i) => (
          <g key={label}>
            <circle cx="155" cy={40 + i * 22} r="6" stroke="currentColor" strokeWidth="1.5" />
            <path d={`M152 ${40 + i * 22} l2 3 l5 -6`} stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <text x="170" y={44 + i * 22} fontSize="11" fill="currentColor">
              {label}
            </text>
          </g>
        ))}
      </svg>
      <figcaption className="text-muted text-center text-xs">
        One combined request, checked individually if anything fails, ending in a simple readiness checklist.
      </figcaption>
    </figure>
  );
}
