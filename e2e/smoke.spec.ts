import { expect, test } from "@playwright/test";

const routes = ["/", "/about", "/services", "/experience", "/projects", "/projects/red-sea-boating", "/testimonials", "/contact"];

for (const r of routes) {
  test(`route ${r} renders with an h1 and no horizontal overflow`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    const res = await page.goto(r);
    expect(res?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  });
}

test("unknown project is a 404", async ({ page }) => {
  const res = await page.goto("/projects/nope");
  expect(res?.status()).toBe(404);
  await expect(page.getByText("Page not found")).toBeVisible();
});

test("theme toggle switches and persists across reload", async ({ page }) => {
  await page.goto("/about");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "night");
  await page.getByRole("button", { name: /Night and Day/ }).click();
  await expect(html).toHaveAttribute("data-theme", "day");
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "day");
});

test("whatsapp menu opens and links carry the service", async ({ page }) => {
  await page.goto("/about");
  await page.getByRole("button", { name: "Chat on WhatsApp" }).click();
  const link = page.getByRole("dialog").getByRole("link", { name: "Video Production & Editing" });
  const href = await link.getAttribute("href");
  expect(href).toMatch(/^https:\/\/wa\.me\/919159348778\?text=/);
  expect(decodeURIComponent(href!)).toContain("Video Production");
});

test("project without video shows the coming-soon slot", async ({ page }) => {
  await page.goto("/projects/pondy-srm-cruises");
  await expect(page.getByText("Video coming soon")).toBeVisible();
});

test("contact form shows field errors for invalid input", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /Send message/ }).click();
  await expect(page.getByText("Please enter your name")).toBeVisible();
});

test("contact form falls back to WhatsApp/email when email is not configured", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("Asha");
  await page.getByLabel("Email").fill("asha@example.com");
  await page.getByLabel("Message").fill("I would like to discuss a campaign.");
  await page.getByRole("button", { name: /Send message/ }).click();
  await expect(page.getByText(/Couldn't send the form/)).toBeVisible();
});

test("reduced motion: hero headline visible and no canvas mounted", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("h1").first()).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});
