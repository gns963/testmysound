// Small "how it works" diagram for the Touch Screen Test page: two real
// finger touches (solid dots) plus one dashed "ghost" touch with a question
// mark, illustrating the difference. Inline SVG, purely decorative aside
// from the accessible label + caption.
export function TouchDiagram() {
  return (
    <figure className="flex flex-col items-center gap-2">
      <svg
        role="img"
        aria-label="A touch screen showing two real finger touches as solid dots, and one ghost touch as a faint dashed dot with a question mark."
        viewBox="0 0 320 130"
        className="text-primary h-auto w-full max-w-[320px]"
        fill="none"
      >
        <rect x="10" y="10" width="300" height="110" rx="10" stroke="currentColor" strokeWidth="2" />

        <circle cx="80" cy="65" r="18" fill="currentColor" opacity="0.25" />
        <circle cx="80" cy="65" r="18" stroke="currentColor" strokeWidth="2" />
        <circle cx="80" cy="65" r="3" fill="currentColor" />

        <circle cx="150" cy="40" r="18" fill="currentColor" opacity="0.25" />
        <circle cx="150" cy="40" r="18" stroke="currentColor" strokeWidth="2" />
        <circle cx="150" cy="40" r="3" fill="currentColor" />

        <circle cx="240" cy="80" r="18" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" opacity="0.6" />
        <text x="240" y="86" textAnchor="middle" fontSize="16" fontWeight="700" fill="currentColor" opacity="0.6">
          ?
        </text>
      </svg>
      <figcaption className="text-muted text-center text-xs">
        Real touches (solid) vs. a ghost touch (dashed) with nothing pressing on the screen.
      </figcaption>
    </figure>
  );
}
