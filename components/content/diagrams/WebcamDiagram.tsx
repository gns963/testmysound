// Small "how it works" diagram for the Webcam Test page: camera → browser,
// with a crossed-out server to make the "nothing is uploaded" claim visual
// as well as written. Inline SVG (no image asset) to stay inside the JS/CLS
// budget — purely decorative aside from the accessible label + caption.
export function WebcamDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Your camera streams video directly to your browser, which renders it locally — no server is involved."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <rect x="8" y="40" width="60" height="40" rx="8" stroke="currentColor" strokeWidth="2" />
        <circle cx="38" cy="60" r="12" stroke="currentColor" strokeWidth="2" />
        <circle cx="38" cy="60" r="4" fill="currentColor" />
        <rect x="60" y="50" width="10" height="20" rx="2" fill="currentColor" />

        <line x1="80" y1="60" x2="150" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        <path d="M144 54 L150 60 L144 66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        <rect x="160" y="30" width="90" height="60" rx="6" stroke="currentColor" strokeWidth="2" />
        <line x1="160" y1="44" x2="250" y2="44" stroke="currentColor" strokeWidth="2" />
        <circle cx="169" cy="37" r="2.5" fill="currentColor" />
        <circle cx="178" cy="37" r="2.5" fill="currentColor" />
        <path d="M195 55 L195 75 L215 65 Z" fill="currentColor" />

        <g opacity="0.5">
          <rect x="270" y="40" width="34" height="40" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <line x1="277" y1="50" x2="297" y2="50" stroke="currentColor" strokeWidth="1.5" />
          <line x1="277" y1="60" x2="297" y2="60" stroke="currentColor" strokeWidth="1.5" />
          <line x1="266" y1="34" x2="308" y2="86" stroke="currentColor" strokeWidth="2" />
        </g>
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Video streams straight from your camera to your browser — never to a server.
      </figcaption>
    </figure>
  );
}
