// Decorative hero background: a soft brand-color gradient wash plus slowly
// floating blurred blobs. Everything fades to transparent well before the
// tool card, so there's no hard edge that needs to line up with it. Purely
// visual (aria-hidden, pointer-events-none) and clipped to its own box so
// the blobs' negative offsets never cause horizontal overflow.
export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[480px] overflow-hidden sm:h-[620px]"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 18% 0%, color-mix(in srgb, var(--primary) 18%, transparent), transparent 70%), " +
            "radial-gradient(50% 45% at 100% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 70%)",
        }}
      />
      <span className="bg-primary/25 absolute top-[6%] left-[-8%] h-56 w-56 rounded-full blur-3xl motion-safe:animate-[heroFloat_11s_ease-in-out_infinite] sm:h-72 sm:w-72" />
      <span className="bg-accent/20 absolute top-[2%] right-[-10%] h-64 w-64 rounded-full blur-3xl motion-safe:animate-[heroFloat_13s_1s_ease-in-out_infinite] sm:h-80 sm:w-80" />
      <span className="bg-primary/15 absolute top-[55%] left-[38%] h-48 w-48 rounded-full blur-3xl motion-safe:animate-[heroFloat_9s_0.5s_ease-in-out_infinite] sm:h-64 sm:w-64" />
    </div>
  );
}
