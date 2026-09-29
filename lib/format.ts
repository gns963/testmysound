export function formatHz(hz: number): string {
  return hz >= 1000
    ? `${(hz / 1000).toFixed(hz >= 10000 ? 0 : 1)} kHz`
    : `${Math.round(hz)} Hz`;
}
