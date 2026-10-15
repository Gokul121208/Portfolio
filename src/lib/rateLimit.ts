// In-memory and per server instance: blunts spam on a single deployment.
// Per-client limit plus a global cap, so rotating spoofed client keys cannot bypass it.
const WINDOW_MS = 60_000;
const MAX_PER_KEY = 5;
const MAX_GLOBAL = 30;
const MAX_KEYS = 5000;

const hits = new Map<string, number[]>();
let globalHits: number[] = [];

function sweep(now: number) {
  for (const [k, v] of hits) {
    if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  // Still too big (all keys active): drop oldest-inserted keys.
  for (const k of hits.keys()) {
    if (hits.size < MAX_KEYS) break;
    hits.delete(k);
  }
}

export function rateLimit(key: string, now: number = Date.now()): boolean {
  globalHits = globalHits.filter((t) => now - t < WINDOW_MS);
  if (globalHits.length >= MAX_GLOBAL) return false;

  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_PER_KEY) {
    hits.set(key, recent);
    return false;
  }
  if (!hits.has(key) && hits.size >= MAX_KEYS) sweep(now);

  recent.push(now);
  hits.set(key, recent);
  globalHits.push(now);
  return true;
}

export function rateLimitSize(): number {
  return hits.size;
}

// Prefer headers set by the hosting platform; the leftmost x-forwarded-for entry is client-controlled,
// so fall back to the rightmost (added by the nearest trusted proxy).
export function clientKey(h: Headers): string {
  const platform = h.get("x-vercel-forwarded-for") ?? h.get("x-real-ip");
  if (platform) return platform.split(",")[0].trim();
  const xff = h.get("x-forwarded-for");
  if (xff) return xff.split(",").pop()!.trim();
  return "unknown";
}
