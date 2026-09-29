// Deterministic bar heights for the decorative waveform motifs — a pure
// function (sum of two sine waves, no Math.random) so server and client
// render byte-identical output with zero hydration risk.
export function generateBarHeights(count: number): number[] {
  const heights: number[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / count;
    const h =
      0.42 +
      0.32 * Math.sin(t * Math.PI * 4.5) +
      0.2 * Math.sin(t * Math.PI * 11 + 1.3);
    heights.push(Math.max(0.12, Math.min(1, h)));
  }
  return heights;
}
