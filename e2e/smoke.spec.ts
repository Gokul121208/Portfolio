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
  await page.getByText("My marketing", { exact: true }).scrollIntoViewIfNeeded();
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
  const lineMidY = async () => {
    const b = await id.locator("xpath=..").boundingBox(); // the sliding line container
    return b!.y + b!.height / 2;
  };
  const vh = page.viewportSize()!.height;
  // scroll to a fraction (0..1) of the pinned section's travel
  const goTo = (f: number) =>
    id.evaluate((el, f) => {
      const sec = el.closest("section")!;
      const top = window.scrollY + sec.getBoundingClientRect().top;
      window.scrollTo(0, top + f * (sec.offsetHeight - window.innerHeight));
    }, f);

  await goTo(0);
  await expect.poll(() => opacity("last")).toBeLessThan(0.2); // last letter still off to the right
  await expect.poll(lineMidY).toBeGreaterThan(vh / 2 + 100); // enters low on the screen
  await goTo(0.3);
  await page.waitForTimeout(300);
  const x1 = await left();
  await goTo(0.6);
  await page.waitForTimeout(300);
  const x2 = await left();
  expect(x2).toBeLessThan(x1 - 200); // the line travels left as you scroll
  expect(await opacity("first")).toBeGreaterThan(0.95); // letters that have arrived are settled
  expect(await opacity("last")).toBeLessThan(0.5); // letters still to come are scattered/hidden

  await goTo(0.5);
  await page.waitForTimeout(300);
  await expect.poll(async () => Math.abs((await lineMidY()) - vh / 2)).toBeLessThan(60); // passes through the middle
  await goTo(0.9);
  await page.waitForTimeout(300);
  await expect.poll(lineMidY).toBeLessThan(vh / 2 - 100); // and keeps rising toward the top

  // near the end the last letters have arrived and are settled, still on screen
  await goTo(0.85);
  await expect.poll(() => opacity("last")).toBeGreaterThan(0.95);
  const near = await chars.last().boundingBox();
  expect(near!.x).toBeGreaterThan(0);

  // the line never parks mid-screen: by the end of the pin it has fully exited to the left (no cut in the flow)
  await goTo(1);
  await page.waitForTimeout(300);
  const end = await chars.last().boundingBox();
  expect(end!.x + end!.width).toBeLessThanOrEqual(5);
});

test("home: marketing, trader, creator and founder sections follow the roller in that order, with the Instagram link", async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("loaded", "1"));
  await page.goto("/");
  const trader = page.getByRole("heading", { name: /Forex & Futures, played like a long game/ });
  const creator = page.getByRole("heading", { name: /point of view/i });
  await expect(trader).toHaveCount(1);
  await expect(creator).toHaveCount(1);
  const founder = page.getByRole("heading", { name: /I built my own agency/ });
  await expect(founder).toHaveCount(1);
  await expect(founder.locator("xpath=ancestor::section").getByRole("link", { name: /Moments Lab|Experience|journey/i }).first()).toHaveAttribute("href", "/experience");
  const order = await page.evaluate(() => {
    const pos = (el: Element | null) => (el ? el.getBoundingClientRect().top + window.scrollY : Infinity);
    const h = (re: RegExp) => [...document.querySelectorAll("h2")].find((e) => re.test(e.textContent ?? "")) ?? null;
    const identity = document.querySelector('h2[aria-label^="I\'m a"]');
    return [pos(identity), pos(h(/Strategy\sthat/i)), pos(h(/long\sgame/i)), pos(h(/point\sof\sview/i)), pos(h(/own\sagency/i))];
  });
  expect([...order].sort((a, b) => a - b)).toEqual(order); // identity < marketing < trader < creator < founder
  const ig = page.getByRole("link", { name: /@buildwith\.goku/i }).first();
  await expect(ig).toHaveAttribute("href", /instagram\.com\/buildwith\.goku/);
});

test("experience page lists the founded company (2025 – Present) and all three jobs", async ({ page }) => {
  await page.goto("/experience");
  for (const name of ["The Moments Lab AI Marketing Agency", "Vima Insurance Brokers Pvt Ltd", "Deivamey Digital Marketing Agency", "Blackwins Tech Solutions"]) {
    await expect(page.getByText(name, { exact: true })).toBeVisible();
  }
  await expect(page.getByText("2025 – Present")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Content Specialist & Performance Marketer" })).toBeVisible();
});

test("projects: all five projects are listed and the election campaign case page works", async ({ page }) => {
  await page.goto("/projects");
  for (const n of ["Red Sea Boating", "Pondy SRM Cruises", "Pondy Gyp Sea Boating", "Sengal Boutique Hotel", "NR Congress Election Campaign"]) {
    await expect(page.getByRole("heading", { name: n })).toBeVisible();
  }
  const res = await page.goto("/projects/nr-congress-election-campaign");
  expect(res?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "NR Congress Election Campaign" })).toBeVisible();
});
