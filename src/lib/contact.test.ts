import { describe, expect, test } from "vitest";
import { contactSchema } from "./contact";
import { rateLimit } from "./rateLimit";

const ok = { name: "Asha", email: "asha@example.com", message: "I would like to discuss a campaign." };

describe("contactSchema", () => {
  test("accepts valid", () => expect(contactSchema.safeParse(ok).success).toBe(true));
  test("rejects empty", () => expect(contactSchema.safeParse({ name: "", email: "", message: "" }).success).toBe(false));
  test("rejects whitespace-only name", () => expect(contactSchema.safeParse({ ...ok, name: "   " }).success).toBe(false));
  test("rejects bad email", () => expect(contactSchema.safeParse({ ...ok, email: "nope" }).success).toBe(false));
  test("rejects 2001-char message", () => expect(contactSchema.safeParse({ ...ok, message: "x".repeat(2001) }).success).toBe(false));
  test("rejects missing fields", () => expect(contactSchema.safeParse({}).success).toBe(false));
});

describe("rateLimit", () => {
  test("allows 5 then blocks, then recovers", () => {
    const t = 1_000_000;
    for (let i = 0; i < 5; i++) expect(rateLimit("ip-a", t + i)).toBe(true);
    expect(rateLimit("ip-a", t + 6)).toBe(false);
    expect(rateLimit("ip-b", t + 6)).toBe(true);
    expect(rateLimit("ip-a", t + 61_000)).toBe(true);
  });
});

import { clientKey, rateLimitSize } from "./rateLimit";

describe("rateLimit hardening", () => {
  test("map stays bounded and prunes expired keys", () => {
    const t = 5_000_000;
    for (let i = 0; i < 20_000; i++) rateLimit(`spoof-${i}`, t);
    expect(rateLimitSize()).toBeLessThanOrEqual(5000);
    rateLimit("later", t + 120_000);
    expect(rateLimitSize()).toBeLessThanOrEqual(5000);
  });
  test("one client flooding cannot lock out other clients", () => {
    const t = 9_000_000;
    for (let i = 0; i < 100; i++) rateLimit("attacker", t);
    expect(rateLimit("legit-visitor", t)).toBe(true);
  });
  test("many distinct clients are each allowed", () => {
    const t = 9_500_000;
    for (let i = 0; i < 100; i++) expect(rateLimit(`c-${i}`, t)).toBe(true);
  });
  test("clientKey prefers platform headers over spoofable xff", () => {
    const h = (o: Record<string, string>) => new Headers(o);
    expect(clientKey(h({ "x-vercel-forwarded-for": "1.1.1.1", "x-forwarded-for": "9.9.9.9" }))).toBe("1.1.1.1");
    expect(clientKey(h({ "x-real-ip": "2.2.2.2", "x-forwarded-for": "9.9.9.9" }))).toBe("2.2.2.2");
    expect(clientKey(h({ "x-forwarded-for": "9.9.9.9, 3.3.3.3" }))).toBe("3.3.3.3");
    expect(clientKey(h({}))).toBe("unknown");
  });
});
