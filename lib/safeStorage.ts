// localStorage wrapped in try/catch — private browsing, disabled site data,
// or a full quota can all make it throw. Every call site treats a miss the
// same as "no saved value" rather than crashing, since nothing here is
// essential to the tool working (personal best scores only, never a shared
// leaderboard — this is intentionally local-only, per-browser).

export function readLocalStorage(key: string): string | null {
  try {
    if (typeof window === "undefined") return null;
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeLocalStorage(key: string, value: string): void {
  try {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(key, value);
  } catch {
    // Storage unavailable — silently skip. Nothing depends on this persisting.
  }
}

export function readLocalStorageNumber(key: string): number | null {
  const raw = readLocalStorage(key);
  if (raw === null) return null;
  const value = Number(raw);
  return Number.isFinite(value) ? value : null;
}

export function readLocalStorageJSON<T>(key: string): T | null {
  const raw = readLocalStorage(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function writeLocalStorageJSON(key: string, value: unknown): void {
  try {
    writeLocalStorage(key, JSON.stringify(value));
  } catch {
    // Circular value or similar — skip rather than throw.
  }
}
