export type Candle = { open: number; close: number; high: number; low: number };

// Deterministic pseudo-random walk so server and client render the same chart.
export function makeCandles(n: number, seed = 7): Candle[] {
  let s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  let price = 50;
  return Array.from({ length: n }, () => {
    const open = price;
    const drift = (rnd() - 0.42) * 9;
    const close = Math.max(8, Math.min(92, open + drift));
    const high = Math.max(open, close) + rnd() * 5;
    const low = Math.min(open, close) - rnd() * 5;
    price = close;
    return { open, close, high, low };
  });
}
