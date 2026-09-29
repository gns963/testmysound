// Small "how it works" diagram for Smartwatch Water Eject: a watch's own
// Digital Crown triggers its built-in eject tone (real feature), while a
// crossed-out arrow shows this website can't reach the watch directly —
// only the phone/laptop it's viewed on. Inline SVG, purely decorative
// aside from the accessible label + caption.
export function WatchWaterEjectDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="Your watch's own Digital Crown triggers its built-in eject tone; this website can only reach the phone or laptop you're viewing it on, not the watch directly."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <rect x="25" y="30" width="40" height="50" rx="10" stroke="currentColor" strokeWidth="2" />
        <rect x="38" y="46" width="6" height="10" rx="2" fill="currentColor" />
        <path d="M75 50 Q85 42 85 55 Q85 68 75 60" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.6" />

        <g opacity="0.4">
          <line x1="100" y1="30" x2="150" y2="80" stroke="currentColor" strokeWidth="2" />
          <line x1="150" y1="30" x2="100" y2="80" stroke="currentColor" strokeWidth="2" />
        </g>
        <path d="M110 15 L140 15 M140 15 L130 8 M140 15 L130 22" stroke="currentColor" strokeWidth="1.5" opacity="0.4" />

        <rect x="180" y="20" width="50" height="80" rx="8" stroke="currentColor" strokeWidth="2" />
        <line x1="192" y1="30" x2="218" y2="30" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <path
          d="M245 55 L255 40 L265 65 L275 30 L285 70 L295 45"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Your watch has its own eject tone; this site&apos;s tool only reaches the phone or laptop you&apos;re viewing it on.
      </figcaption>
    </figure>
  );
}
