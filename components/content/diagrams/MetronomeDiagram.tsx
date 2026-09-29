// Small "how it works" diagram for the Metronome page: a pendulum swinging
// between two positions (dashed = previous position) over evenly spaced
// tick marks, implying a steady beat. Inline SVG, purely decorative aside
// from the accessible label + caption.
export function MetronomeDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="A metronome arm swings between evenly spaced beats, each one scheduled precisely ahead of time rather than timed by a simple on-screen clock."
        viewBox="0 0 320 120"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <path d="M120 100 L200 100 L160 30 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <line x1="160" y1="90" x2="130" y2="35" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" opacity="0.5" />
        <line x1="160" y1="90" x2="185" y2="40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="185" cy="40" r="4" fill="currentColor" />

        {Array.from({ length: 6 }).map((_, i) => (
          <circle key={i} cx={230 + i * 14} cy="100" r={i === 0 ? 5 : 3} fill="currentColor" opacity={i === 0 ? 1 : 0.5} />
        ))}
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Every click is scheduled precisely ahead of time, so tempo stays steady even under page load.
      </figcaption>
    </figure>
  );
}
