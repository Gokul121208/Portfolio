# Gokul M Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page, heavily animated, dark/light portfolio for Gokul M with a WebGL "living market" hero, project video slots, a WhatsApp service-menu button and a working contact form.

**Architecture:** Next.js App Router. All copy and data live in typed files under `src/content/`. Pure logic (WhatsApp link builder, contact validation, rate limiting) lives in `src/lib/` and is unit-tested with Vitest. Motion primitives live in `src/components/motion/` and are consumed by page sections in `src/components/sections/`. Pages in `src/app/` only compose sections.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, Framer Motion (`motion`), GSAP + ScrollTrigger, three + @react-three/fiber, Lenis, next-themes, zod, Resend, Vitest, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-15-gokul-portfolio-design.md`

## Global Constraints

- Branding is "Gokul M". The Moments Lab AI Marketing Agency appears only as "founded by me".
- WhatsApp number: `919159348778`. Email: `gokulamurugan40@gmail.com`. Phone display: `+91 9159348778`.
- Themes: "Night Session" (default) and "Day Session"; no flash of wrong theme on load.
- Routes: `/`, `/about`, `/services`, `/experience`, `/projects`, `/projects/[slug]`, `/testimonials`, `/contact`.
- Projects: Red Sea Boating, Pondy SRM Cruises, Pondy Gyp Sea Boating (ongoing), Sengal Boutique Hotel.
- Experience: Black Lens Tech Solution (Digital Marketing Intern, 6 months); VIMA Insurance Brokers (Visual Content Specialist, about 6 months).
- Education: B.Tech Information Technology; MBA Marketing (currently pursuing).
- Trading is shown as a personal journey, never as a service.
- Testimonials, stats and trading figures are placeholders and must be visibly flagged in `src/content/` with `placeholder: true`.
- `prefers-reduced-motion` disables WebGL animation, scramble, parallax, cursor and transitions.
- Responsive from 360px; WCAG AA contrast in both themes.
- Pin dependency versions that exist at install time; do not use `latest` ranges in docs.

## Review Focus

- Visitor clicks WhatsApp with no service chosen: the link must still open with a generic welcome message.
- Contact form submitted with empty, whitespace-only or 10k-character fields, or a malformed email: clear field errors, no email sent.
- Contact form hit 6+ times a minute from one IP: 429 with a friendly message, not a crash.
- `RESEND_API_KEY` missing: form shows a WhatsApp/email fallback instead of a generic failure.
- WebGL unavailable or reduced motion on: hero shows a static gradient with full headline, no blank screen.
- Project with no `video`: case page shows "Video coming soon", no broken player.
- Direct visit to `/projects/unknown-slug`: 404 page, not a crash.

---

### Task 1: Scaffold, theme tokens, layout shell

**Files:**
- Create: Next.js app in repo root (`package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`)
- Create: `src/app/layout.tsx`, `src/app/globals.css`, `src/components/ThemeProvider.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `vitest.config.ts`
- Modify: `package.json` (scripts `test`, `typecheck`)

**Interfaces:**
- Produces: CSS variables `--bg --fg --muted --accent --accent-2 --accent-3 --line` per theme (`:root[data-theme="night"]`, `[data-theme="day"]`); `<ThemeProvider>`; `<Header/>` with nav links to all routes; `<Footer/>`.

- [ ] **Step 1: Scaffold.** From the repo root (existing `docs/` stays):
```bash
npx create-next-app@latest . --ts --tailwind --app --src-dir --eslint --use-npm --import-alias "@/*" --yes
npm i motion gsap three @react-three/fiber @react-three/drei lenis next-themes zod resend
npm i -D vitest @vitest/coverage-v8 @playwright/test @types/three
```
- [ ] **Step 2: Theme tokens** in `globals.css`:
```css
@import "tailwindcss";
@custom-variant day (&:where([data-theme="day"], [data-theme="day"] *));
:root, [data-theme="night"] {
  --bg:#07070b; --fg:#f4f4ee; --muted:#8b8b99; --line:#1d1d2a;
  --accent:#c6ff3d; --accent-2:#8b5cf6; --accent-3:#ff5d73;
}
[data-theme="day"] {
  --bg:#f6f1e7; --fg:#101014; --muted:#5d5a54; --line:#dcd4c3;
  --accent:#ff5d4a; --accent-2:#2a4bff; --accent-3:#101014;
}
@theme inline {
  --color-bg: var(--bg); --color-fg: var(--fg); --color-muted: var(--muted);
  --color-line: var(--line); --color-accent: var(--accent);
  --color-accent2: var(--accent-2); --color-accent3: var(--accent-3);
}
body { background: var(--bg); color: var(--fg); }
```
- [ ] **Step 3: ThemeProvider** using `next-themes` with `attribute="data-theme"`, `themes={["night","day"]}`, `defaultTheme="night"`, `disableTransitionOnChange={false}`; wrap in `layout.tsx` with `suppressHydrationWarning` on `<html>`.
- [ ] **Step 4: Fonts** via `next/font/google`: display "Space Grotesk" (var `--font-display`), body "Inter", mono "JetBrains Mono". Apply variables on `<body>`.
- [ ] **Step 5: Header/Footer** with links to all 7 routes, "Gokul M" wordmark, footer with email, phone, "Founder, The Moments Lab AI Marketing Agency".
- [ ] **Step 6: Vitest config** (`environment: "node"`, alias `@` to `src`); add scripts `"test":"vitest run"`, `"typecheck":"tsc --noEmit"`.
- [ ] **Step 7: Verify** `npm run typecheck && npm run build`. Expected: both pass.
- [ ] **Step 8: Commit** `git init` if needed, then `git add -A && git commit -m "feat: scaffold app with theme tokens and layout shell"`.

### Task 2: Content layer

**Files:**
- Create: `src/content/types.ts`, `src/content/profile.ts`, `src/content/services.ts`, `src/content/experience.ts`, `src/content/projects.ts`, `src/content/testimonials.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Produces:
```ts
export type Project = { slug: string; name: string; summary: string; services: string[]; ongoing?: boolean; video?: string; poster?: string; accent: "accent"|"accent2"|"accent3" };
export type Service = { id: string; title: string; blurb: string };
export type Role = { company: string; title: string; duration: string; points: string[] };
export type Testimonial = { name: string; role: string; quote: string; placeholder: true };
export const profile: { name: "Gokul M"; identities: string[]; email: string; phone: string; whatsapp: string; education: {degree:string; status:string}[]; stats: {label:string; value:number; suffix:string; placeholder:true}[] };
export const projects: Project[]; export const services: Service[]; export const experience: Role[]; export const testimonials: Testimonial[];
export function getProject(slug: string): Project | undefined;
```

- [ ] **Step 1: Failing test**
Import `profile` from `./profile`, `services` from `./services`, `projects` and `getProject` from `./projects`, `testimonials` from `./testimonials`. Assert: 4 projects with slugs `red-sea-boating`, `pondy-srm-cruises`, `pondy-gyp-sea-boating`, `sengal-boutique-hotel`; 7 services; unique slugs; `getProject("nope")` is `undefined`; `profile.name === "Gokul M"`; `profile.whatsapp === "919159348778"`; every testimonial and stat has `placeholder: true`.
- [ ] **Step 2: Run** `npx vitest run src/content` and confirm FAIL (modules missing).
- [ ] **Step 3: Implement** the files with the exact data from the Global Constraints and spec (services: Social Media Management; Content Planning & Writing; Video Production & Editing; Meta, Google & LinkedIn Ads; Lead Generation; Website Development; AI Marketing Automation & Lead Nurturing). Pondy Gyp Sea Boating has `ongoing: true`. No project sets `video` yet.
- [ ] **Step 4: Run** tests, confirm PASS.
- [ ] **Step 5: Commit** `feat: add typed content layer`.

### Task 3: WhatsApp link builder and widget

**Files:**
- Create: `src/lib/whatsapp.ts`, `src/components/WhatsAppWidget.tsx`
- Test: `src/lib/whatsapp.test.ts`
- Modify: `src/app/layout.tsx` (mount widget)

**Interfaces:**
- Produces: `buildWhatsAppUrl(serviceId?: string): string`

- [ ] **Step 1: Failing test**
```ts
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
  expect(new URL(buildWhatsAppUrl("zzz")).searchParams.get("text")).toMatch(/Hi Gokul/);
});
```
- [ ] **Step 2: Run, confirm FAIL.**
- [ ] **Step 3: Implement**
```ts
import { profile } from "@/content/profile";
import { whatsappOptions } from "@/content/services";
export function buildWhatsAppUrl(serviceId?: string) {
  const opt = whatsappOptions.find(o => o.id === serviceId);
  const text = opt
    ? `Hi Gokul! I'm interested in ${opt.title}. Could we talk?`
    : "Hi Gokul! I found your portfolio. Which service would suit me? I'd like to discuss.";
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(text)}`;
}
```
Add `whatsappOptions` to `services.ts` (the 7 services plus `{id:"trading", title:"a Trading chat"}`; service ids: `social, content, video, ads, leads, web, ai`). Update the Task 2 test count accordingly (`services` stays 7).
- [ ] **Step 4: Run, confirm PASS.**
- [ ] **Step 5: Widget.** Fixed bottom-right round button (WhatsApp glyph SVG, pulsing ring). Click opens an animated panel titled "What do you need?" listing `whatsappOptions` as buttons; each is `<a href={buildWhatsAppUrl(id)} target="_blank" rel="noopener noreferrer">`. Include "Just say hi" using `buildWhatsAppUrl()`. Escape closes; focus trap not required but button has `aria-expanded`, panel `role="dialog"`.
- [ ] **Step 6: Commit** `feat: whatsapp service menu`.

### Task 4: Contact API

**Files:**
- Create: `src/lib/contact.ts`, `src/lib/rateLimit.ts`, `src/app/api/contact/route.ts`
- Test: `src/lib/contact.test.ts`, `src/lib/rateLimit.test.ts`

**Interfaces:**
- Produces: `contactSchema` (zod: `name` 2-80, `email` valid, `message` 10-2000, all trimmed); `rateLimit(key: string, now?: number): boolean` (true if allowed; 5 per 60s per key).

- [ ] **Step 1: Failing tests:** schema rejects empty, whitespace-only name, bad email, 2001-char message; accepts valid. `rateLimit("ip", t)` allows 5 calls then rejects the 6th within 60s, and allows again at `t + 61000`.
- [ ] **Step 2: Run, confirm FAIL.**
- [ ] **Step 3: Implement** both modules (in-memory `Map<string, number[]>`; note in a comment that it is per-instance).
- [ ] **Step 4: Run, confirm PASS.**
- [ ] **Step 5: Route handler.** `POST`: read IP from `x-forwarded-for`; if `!rateLimit` return 429 `{error:"Too many messages, please try again in a minute."}`; parse JSON safely (400 on invalid); `contactSchema.safeParse` (422 with `fieldErrors`); if `!process.env.RESEND_API_KEY` return 503 `{error:"not_configured"}`; else send via Resend to `gokulamurugan40@gmail.com` with `replyTo` set to the visitor email, return `{ok:true}`; wrap send in try/catch returning 502.
- [ ] **Step 6: Commit** `feat: contact api with validation and rate limit`.

### Task 5: Motion foundation

**Files:**
- Create: `src/components/motion/SmoothScroll.tsx`, `Cursor.tsx`, `Loader.tsx`, `PageTransition.tsx`, `Reveal.tsx`, `SplitText.tsx`, `Scramble.tsx`, `Magnetic.tsx`, `CountUp.tsx`, `useReducedMotion.ts`
- Modify: `src/app/layout.tsx`, `src/app/template.tsx` (create, wraps children in `PageTransition`)

**Interfaces:**
- Produces: `useReducedMotion(): boolean`; `<Reveal delay?>`, `<SplitText as text>`, `<Scramble text>`, `<Magnetic>`, `<CountUp to suffix>`; each renders final content immediately when reduced motion is on.

- [ ] **Step 1: SmoothScroll** wraps the app with Lenis, syncs `lenis.on("scroll", ScrollTrigger.update)` and `gsap.ticker`; skipped when reduced motion.
- [ ] **Step 2: Cursor:** dot plus lagging ring using `motion` springs, grows over `a, button, [data-cursor]`, hidden when `(pointer: coarse)` or reduced motion.
- [ ] **Step 3: Loader:** full-screen counter 0 to 100 over about 1.4s, shown once per session (`sessionStorage`, wrapped in try/catch), then slides up. Skipped under reduced motion.
- [ ] **Step 4: PageTransition:** `AnimatePresence` with a clip-path wipe in accent color between routes.
- [ ] **Step 5: Reveal/SplitText/Scramble/Magnetic/CountUp:** implement with `motion` + `useInView`; Scramble cycles random glyphs on hover for 400ms and settles on `text`.
- [ ] **Step 6: Verify** `npm run typecheck && npm run build`, then `npm run dev` and confirm no console errors on `/`.
- [ ] **Step 7: Commit** `feat: motion primitives`.

### Task 6: Theme toggle with ripple

**Files:**
- Create: `src/components/ThemeToggle.tsx`
- Modify: `src/components/layout/Header.tsx`

- [ ] **Step 1: Implement.** Animated sun/moon SVG morph. On click, set `--rx/--ry` from the click point on `<html>`; if `document.startViewTransition` exists and motion is allowed, wrap `setTheme` in it, with CSS `::view-transition-new(root)` animating `clip-path: circle(0 at var(--rx) var(--ry))` to `circle(150% ...)` over 700ms; otherwise just `setTheme`. Add `aria-label="Switch to Day/Night session"`.
- [ ] **Step 2: Add** the view-transition CSS to `globals.css` (disable default cross-fade: `::view-transition-old(root),::view-transition-new(root){animation:none;mix-blend-mode:normal}`).
- [ ] **Step 3: Verify** manually with Playwright MCP or browser: click toggles, reload keeps the choice, no flash.
- [ ] **Step 4: Commit** `feat: animated theme toggle`.

### Task 7: Hero, ticker and Home

**Files:**
- Create: `src/components/hero/MarketScene.tsx`, `Hero.tsx`, `Ticker.tsx`, `IdentityCycler.tsx`
- Create: `src/components/sections/Stats.tsx`, `ServicesTeaser.tsx`, `FeaturedProjects.tsx`, `TradingTeaser.tsx`, `TestimonialsTeaser.tsx`, `CTA.tsx`, `PriceLine.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: MarketScene** (R3F `Canvas`, `dynamic(..., {ssr:false})`): instanced candlesticks along a moving sine "price path" plus 3 ribbon meshes with a vertex-shader wave; mouse parallax; colors read from CSS variables on theme change; `dpr={[1, isMobile ? 1 : 1.5]}`; fewer instances on mobile.
- [ ] **Step 2: Fallback.** If `!WebGL2` (check via a throwaway canvas) or reduced motion, render a static layered-gradient `div` instead. Headline never depends on the canvas.
- [ ] **Step 3: Hero:** giant "GOKUL M" (SplitText), `IdentityCycler` rotating the four identities, scroll hint, buttons (`View work`, `WhatsApp me`) wrapped in `Magnetic`.
- [ ] **Step 4: Ticker:** CSS marquee of `profile.stats` plus service keywords, pauses on hover, flagged placeholder values.
- [ ] **Step 5: PriceLine:** SVG path fixed along the page edge drawn via GSAP ScrollTrigger `scrub`, linking sections.
- [ ] **Step 6: Sections** as specified: Stats (CountUp), ServicesTeaser, FeaturedProjects (tilt cards linking to `/projects/[slug]`), TradingTeaser (candle chart drawn on scroll with GSAP, copy framed as a personal journey), TestimonialsTeaser, CTA.
- [ ] **Step 7: Compose** `page.tsx`. Verify `npm run build` and view at 1440px and 390px; no horizontal scroll.
- [ ] **Step 8: Commit** `feat: home page with market hero`.

### Task 8: About, Services, Experience

**Files:**
- Create: `src/app/about/page.tsx`, `src/app/services/page.tsx`, `src/app/experience/page.tsx`, `src/components/sections/EducationTimeline.tsx`, `Skills.tsx`, `ServiceBook.tsx`, `ExperienceTimeline.tsx`, `Process.tsx`

- [ ] **Step 1: About:** story, education timeline from `profile.education`, skills grid, trading-journey block, founder note ("Founder of The Moments Lab AI Marketing Agency").
- [ ] **Step 2: Services:** `ServiceBook` renders all 7 `services` as order-book rows that flash accent and expand on hover/focus (keyboard accessible, `button` semantics); `Process` with 4 steps.
- [ ] **Step 3: Experience:** vertical timeline from `experience`, line draws on scroll.
- [ ] **Step 4: Add** per-page `metadata` exports (title, description).
- [ ] **Step 5: Verify** `npm run build`; visit each route in both themes.
- [ ] **Step 6: Commit** `feat: about, services, experience pages`.

### Task 9: Projects

**Files:**
- Create: `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx`, `src/components/sections/ProjectGallery.tsx`, `src/components/VideoSlot.tsx`
- Test: covered by Playwright in Task 11 (no unit test).

**Interfaces:**
- Consumes: `projects`, `getProject`
- Produces: `<VideoSlot video? poster? title>`

- [ ] **Step 1: VideoSlot:** if `video`, render `<video controls playsInline preload="metadata" poster>`; otherwise a framed placeholder with an animated play glyph and "Video coming soon".
- [ ] **Step 2: Gallery:** horizontal scroll-pinned gallery (GSAP ScrollTrigger) on desktop, plain vertical list on mobile and under reduced motion.
- [ ] **Step 3: Case page:** `generateStaticParams` from `projects`; call `notFound()` when `getProject` returns undefined; show summary, services delivered, `ongoing` badge, VideoSlot, next/previous project links.
- [ ] **Step 4: Verify** `/projects/red-sea-boating` renders; `/projects/nope` returns 404.
- [ ] **Step 5: Commit** `feat: projects and case pages with video slots`.

### Task 10: Testimonials and Contact

**Files:**
- Create: `src/app/testimonials/page.tsx`, `src/app/contact/page.tsx`, `src/components/sections/TestimonialCarousel.tsx`, `ContactForm.tsx`

- [ ] **Step 1: Carousel:** drag/arrow navigable, shows a small "Sample" tag when `placeholder`.
- [ ] **Step 2: ContactForm:** client component posting JSON to `/api/contact`; shows per-field errors from 422, a rate-limit message on 429, and on 503/502/network failure a fallback card with the WhatsApp link (`buildWhatsAppUrl()`) and the mailto link; success state with animated check; submit disabled while pending.
- [ ] **Step 3: Contact page:** form plus email, phone, WhatsApp and social links (Instagram, LinkedIn as placeholders in `profile.socials` flagged for Gokul to fill).
- [ ] **Step 4: Verify** with `npm run dev`: submit invalid data (errors appear), submit valid data without `RESEND_API_KEY` (fallback appears).
- [ ] **Step 5: Commit** `feat: testimonials and contact pages`.

### Task 11: Polish and verification

**Files:**
- Create: `playwright.config.ts`, `e2e/smoke.spec.ts`, `src/app/not-found.tsx`, `src/app/sitemap.ts`, `.env.example`, `README.md`
- Modify: per-page metadata and OG tags

- [ ] **Step 1: e2e smoke tests:** each of the 8 routes returns 200 and has an `h1`; theme toggle persists after reload; WhatsApp widget opens and a service link's href starts with `https://wa.me/919159348778`; `/projects/nope` shows 404; at 390px width `document.documentElement.scrollWidth <= 390`.
- [ ] **Step 2: Reduced motion test:** emulate `prefers-reduced-motion: reduce`, confirm the hero headline is visible and no canvas is mounted.
- [ ] **Step 3: Run** `npm run test && npm run typecheck && npm run build && npx playwright test`. Expected: all PASS.
- [ ] **Step 4: Accessibility pass:** run Lighthouse (accessibility, best practices) on `/` in both themes; fix any contrast or label failures; target accessibility 90+.
- [ ] **Step 5: README/.env.example:** document `RESEND_API_KEY`, how to add a project video (`public/videos/x.mp4` and set `video`), and how to replace placeholders.
- [ ] **Step 6: Commit** `chore: polish, e2e, docs`.
