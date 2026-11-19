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
  await page.goto("/projects/red-sea-boating");
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
  await expect(page.locator("form").getByRole("link", { name: "goku@gokulm.in" })).toHaveAttribute("href", "mailto:goku@gokulm.in");
});

for (const reducedMotion of ["no-preference", "reduce"] as const) {
  test(`contact success fits the viewport with motion set to ${reducedMotion}`, async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.emulateMedia({ reducedMotion });
    await page.route("**/api/contact", (route) => route.fulfill({ json: { ok: true } }));
    await page.goto("/contact");
    await page.getByLabel("Your name").fill("Asha");
    await page.getByLabel("Email").fill("asha@example.com");
    await page.getByLabel("Message").fill("I would like to discuss a campaign.");
    await page.getByRole("button", { name: /Send message/ }).click();

    const title = page.getByRole("heading", { name: "Message sent!" });
    await expect(title).toBeFocused();
    await expect(title).toBeInViewport();
    const artwork = page.getByRole("region", { name: "Message sent!" }).locator("svg");
    const hasAnimation = await artwork.evaluate(
      (element) => element.getAnimations({ subtree: true }).length > 0,
    );
    expect(hasAnimation).toBe(reducedMotion === "no-preference");

    for (const width of [320, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 800 });
      const bounds = (await artwork.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    }
  });
}

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

test("home: recent work features Pondy Gyp Sea Boating and Pondy SRM Cruises showreels", async ({ page }) => {
  await page.goto("/");
  const recentWork = page.locator("section").filter({
    has: page.getByRole("heading", { name: "Recent work." }),
  });
  await expect(recentWork.getByRole("heading", { level: 3 })).toHaveText([
    "Pondy Gyp Sea Boating",
    "Pondy SRM Cruises",
  ]);
  await expect(recentWork.getByRole("button", { name: /^Play .+ showreel$/ })).toHaveCount(2);
});

test("projects: cards with video come first and the election campaign case page works", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.getByRole("heading", { level: 3 })).toHaveText([
    "Pondy SRM Cruises",
    "Sengal Boutique Hotel",
    "Pondy Gyp Sea Boating",
    "Red Sea Boating",
    "NR Congress Election Campaign",
  ]);
  const res = await page.goto("/projects/nr-congress-election-campaign");
  expect(res?.status()).toBe(200);
  await expect(page.getByRole("heading", { level: 1, name: "NR Congress Election Campaign" })).toBeVisible();
});

test("instagram card: full-width button on phones, compact on desktop, no overflow", async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem("loaded", "1"));
  const link = page.getByRole("link", { name: /@buildwith\.goku on Instagram/ });
  const card = link.locator("xpath=ancestor::div[contains(@class,'rounded-3xl')][1]");

  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto("/");
  await link.scrollIntoViewIfNeeded();
  const c = (await card.boundingBox())!;
  const l = (await link.boundingBox())!;
  expect(l.width).toBeGreaterThan(c.width - 40); // spans the card's inner width
  expect(l.x).toBeGreaterThanOrEqual(c.x);
  expect(l.x + l.width).toBeLessThanOrEqual(c.x + c.width);
  expect(l.height).toBeGreaterThanOrEqual(44); // comfortable touch target
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(360);

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.reload();
  await link.scrollIntoViewIfNeeded();
  expect((await link.boundingBox())!.width).toBeLessThan(400); // not stretched on desktop
});

test("home: each Instagram reel opens its own video", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => sessionStorage.setItem("loaded", "1"));
  await page.goto("/");

  const secondTile = page.getByRole("button", { name: "Play reel 02 with sound" });
  // Wait for the reveal wrapper to settle after hydration before clicking.
  await expect(secondTile.locator("xpath=../..")).toHaveCSS("opacity", "1");
  await secondTile.click();
  const second = page.getByRole("dialog", { name: "Reel 02" });
  await expect(second.locator("video")).toHaveAttribute("src", "https://files.gokulm.in/Build%20With%20Goku%202.mp4");
  await second.getByRole("button", { name: "Close video" }).click();
  await expect(second).toBeHidden();

  await page.getByRole("button", { name: "Play reel 01 with sound" }).click();
  const first = page.getByRole("dialog", { name: "Reel 01" });
  await expect(first.locator("video")).toHaveAttribute("src", "https://files.gokulm.in/build-with-goku-1-1080p.mp4");
  await page.keyboard.press("Escape");
  await expect(first).toBeHidden();
});

test("dark is the default: a stale saved Day choice from an older build is ignored, a new choice sticks", async ({ browser }) => {
  const ctx = await browser.newContext({ colorScheme: "light" }); // even a light system gets Night first
  await ctx.addInitScript(() => localStorage.setItem("theme", "day")); // key used by earlier builds
  const page = await ctx.newPage();
  await page.goto("/about");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "night");
  await page.getByRole("button", { name: /Night and Day/ }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "day");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "day"); // new choice persists
  await ctx.close();
});

test("projects intro is one paragraph: agency name, then freelance, then content", async ({ page }) => {
  await page.goto("/projects");
  const para = page.locator("section").first().locator("p", { hasText: "The Moments Lab AI Marketing Agency" });
  await expect(para).toHaveCount(1);
  const text = (await para.innerText()).replace(/\s+/g, " ");
  const agency = text.indexOf("The Moments Lab AI Marketing Agency");
  const freelance = text.indexOf("Freelance campaigns");
  const content = text.indexOf("content, video and lead generation");
  expect(agency).toBeGreaterThan(-1);
  expect(freelance).toBeGreaterThan(agency);
  expect(content).toBeGreaterThan(freelance);
  await expect(page.getByText("Video showreels are being added")).toHaveCount(0);
});
