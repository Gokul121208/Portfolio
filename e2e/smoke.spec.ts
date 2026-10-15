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

test("reduced motion: hero headline visible, no canvas, no hydration/console errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("h1").first()).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
  await page.waitForTimeout(800);
  expect(errors).toEqual([]);
});

test("no WebGL: hero still renders and the page does not crash", async ({ page }) => {
  await page.addInitScript(() => {
    HTMLCanvasElement.prototype.getContext = () => null;
  });
  await page.goto("/");
  await expect(page.locator("h1").first()).toBeVisible();
  await expect(page.locator("canvas")).toHaveCount(0);
});

test("back to top: hidden at top, appears after scrolling, returns to top", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/about");
  const btn = page.getByRole("button", { name: "Back to top" });
  await expect(btn).toBeHidden();
  await page.evaluate(() => window.scrollTo(0, 1500));
  await expect(btn).toBeVisible();
  await btn.click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(5);
  await expect(btn).toBeHidden();
});

test("home: marketing bars fill in on scroll and website development shows 98%", async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("loaded", "1"));
  await page.goto("/");
  await page.getByText("My marketing").scrollIntoViewIfNeeded();
  const fill = page.locator('[role="presentation"] > div').first();
  await expect.poll(async () => (await fill.boundingBox())?.width ?? 0, { timeout: 5000 }).toBeGreaterThan(100);
  await expect(page.getByText("98%")).toBeVisible();
});

test("home: identity line is pinned, slides sideways, and letters snap into place as they arrive", async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("loaded", "1"));
  await page.goto("/");
  await expect(page.locator("section").first().getByText(/I.m a/)).toHaveCount(0);
  await expect(page.getByText("Sample figures, updating soon")).toHaveCount(0);

  const id = page.getByRole("heading", { name: /Digital Marketer.*Founder/ });
  await expect(id).toHaveCount(1);
  const chars = id.locator("[data-char]");
  const opacity = (which: "first" | "last") => chars[which]().evaluate((el) => Number(getComputedStyle(el).opacity));
  const left = () => chars.first().evaluate((el) => el.getBoundingClientRect().left);
  // scroll to a fraction (0..1) of the pinned section's travel
  const goTo = (f: number) =>
    id.evaluate((el, f) => {
      const sec = el.closest("section")!;
      const top = window.scrollY + sec.getBoundingClientRect().top;
      window.scrollTo(0, top + f * (sec.offsetHeight - window.innerHeight));
    }, f);

  await goTo(0);
  await expect.poll(() => opacity("last")).toBeLessThan(0.2); // last letter still off to the right
  await goTo(0.3);
  await page.waitForTimeout(300);
  const x1 = await left();
  await goTo(0.6);
  await page.waitForTimeout(300);
  const x2 = await left();
  expect(x2).toBeLessThan(x1 - 200); // the line travels left as you scroll
  expect(await opacity("first")).toBeGreaterThan(0.95); // letters that have arrived are settled
  expect(await opacity("last")).toBeLessThan(0.5); // letters still to come are scattered/hidden

  await goTo(1);
  await expect.poll(() => opacity("last")).toBeGreaterThan(0.95);
  const lastBox = await chars.last().boundingBox();
  expect(lastBox!.x).toBeGreaterThan(0);
  expect(lastBox!.x).toBeLessThan(1280); // the full sentence ends inside the viewport
});
