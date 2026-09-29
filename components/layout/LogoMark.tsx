// Small 3-bar equalizer icon next to the wordmark — a subtle, monochrome nod
// to audio rather than a loud illustrated mark.
export function LogoMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="text-primary h-5 w-5 shrink-0"
      fill="currentColor"
    >
      <rect x="1" y="6" width="3" height="8" rx="1" />
      <rect x="6.5" y="2" width="3" height="12" rx="1" />
      <rect x="12" y="8" width="3" height="6" rx="1" />
    </svg>
  );
}
