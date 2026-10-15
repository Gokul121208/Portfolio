import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";

const css = readFileSync("src/app/globals.css", "utf8");

function tokens(selector: RegExp): Record<string, string> {
  const block = css.match(selector)?.[1] ?? "";
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-fA-F]{6})/g)].map((m) => [m[1], m[2]]));
}
const lum = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

const themes = {
  night: tokens(/:root,\s*\[data-theme="night"\]\s*\{([^}]*)\}/),
  day: tokens(/\n\[data-theme="day"\]\s*\{([^}]*)\}/),
};

for (const [name, t] of Object.entries(themes)) {
  describe(`${name} theme WCAG AA`, () => {
    // Day theme: the owner chose the brand orange for accent text (about 2.7:1 on cream), accepting lower
    // contrast for the small orange labels. Night theme and all body text stay at AA.
    const inkMin = name === "day" ? 2.4 : 4.5;
    test("accent-ink (accent used as text) on bg and bg-2", () => {
      expect(ratio(t["accent-ink"], t.bg)).toBeGreaterThanOrEqual(inkMin);
      expect(ratio(t["accent-ink"], t["bg-2"])).toBeGreaterThanOrEqual(inkMin);
    });
    test("text on accent buttons", () => expect(ratio(t["on-accent"], t.accent)).toBeGreaterThanOrEqual(4.5));
    test("muted and fg text", () => {
      expect(ratio(t.muted, t.bg)).toBeGreaterThanOrEqual(4.5);
      expect(ratio(t.fg, t.bg)).toBeGreaterThanOrEqual(4.5);
    });
    test("accent-3 text (errors) on bg", () => expect(ratio(t["accent-3"], t.bg)).toBeGreaterThanOrEqual(4.5));
  });
}
