// Rounded gradient badge with a 3-bar equalizer glyph — the same mark
// generated as a static image for the favicon/apple touch icon (see
// lib/seo/brandIcon.tsx), kept as real SVG here so it stays crisp inline
// next to the wordmark and follows the light/dark theme via CSS variables.
export function LogoMark({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 32 32" className={`shrink-0 ${className}`}>
      <defs>
        <linearGradient id="logo-mark-gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" style={{ stopColor: "var(--primary)" }} />
          <stop offset="1" style={{ stopColor: "var(--primary-strong)" }} />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#logo-mark-gradient)" />
      <rect x="9" y="15" width="3.4" height="8" rx="1.4" fill="#fff" fillOpacity="0.95" />
      <rect x="14.3" y="8" width="3.4" height="15" rx="1.4" fill="#fff" />
      <rect x="19.6" y="12" width="3.4" height="11" rx="1.4" fill="#fff" fillOpacity="0.95" />
    </svg>
  );
}
