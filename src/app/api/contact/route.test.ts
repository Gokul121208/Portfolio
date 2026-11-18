import { beforeEach, describe, expect, test } from "vitest";
import { POST } from "./route";

const valid = { name: "Asha", email: "asha@example.com", message: "I would like to discuss a campaign." };
const req = (body: unknown, ip: string, headers: Record<string, string> = {}) =>
  new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-vercel-forwarded-for": ip, ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

beforeEach(() => { delete process.env.RESEND_API_KEY; });

describe("POST /api/contact", () => {
  test("invalid submissions do not consume the rate limit", async () => {
    for (let i = 0; i < 8; i++) expect((await POST(req({ name: "", email: "x", message: "" }, "10.0.0.1"))).status).toBe(422);
    // a valid message afterwards is not blocked (503 = reached the send step, key unset)
    expect((await POST(req(valid, "10.0.0.1"))).status).toBe(503);
  });
  test("valid submissions are still rate limited per client", async () => {
    const statuses: number[] = [];
    for (let i = 0; i < 7; i++) statuses.push((await POST(req(valid, "10.0.0.2"))).status);
    expect(statuses.slice(0, 5).every((s) => s === 503)).toBe(true);
    expect(statuses.slice(5)).toEqual([429, 429]);
  });
  test("honeypot field is silently accepted and never sends", async () => {
    const res = await POST(req({ ...valid, website: "http://spam.example" }, "10.0.0.3"));
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
  });
  test("oversized body is rejected with 413", async () => {
    const res = await POST(req({ ...valid, message: "x".repeat(40_000) }, "10.0.0.4", { "content-length": "40100" }));
    expect(res.status).toBe(413);
  });
});
