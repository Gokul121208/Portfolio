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
