// In-memory and per server instance: good enough to blunt spam on a single deployment.
const WINDOW_MS = 60_000;
const MAX = 5;
const hits = new Map<string, number[]>();

export function rateLimit(key: string, now: number = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  return true;
}
