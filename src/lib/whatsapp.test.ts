import { expect, test } from "vitest";
import { buildWhatsAppUrl } from "./whatsapp";

test("generic message when no service", () => {
  const u = new URL(buildWhatsAppUrl());
  expect(u.origin + u.pathname).toBe("https://wa.me/919159348778");
  expect(u.searchParams.get("text")).toMatch(/Hi Gokul/);
});
test("includes chosen service title", () => {
  expect(new URL(buildWhatsAppUrl("video")).searchParams.get("text")).toMatch(/Video Production/);
});
test("unknown service falls back to generic", () => {
  expect(new URL(buildWhatsAppUrl("zzz")).searchParams.get("text")).toMatch(/Which service/);
});
