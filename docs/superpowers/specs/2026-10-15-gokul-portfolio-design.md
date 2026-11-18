# Gokul M Portfolio: "The Market Is the Stage" (Design Spec)

## Purpose
Personal brand site for **Gokul M**: Digital Marketer, Forex & Futures Trader, Content Creator, Founder of The Moments Lab AI Marketing Agency. Goal: showcase brand, experience, freelance work (with video), trading journey, and content skills; convert visitors to WhatsApp/contact leads.

Branding is **Gokul M**. The Moments Lab is mentioned only as "founded by me".

## Concept
Marketer, trader, creator = reading attention. The site behaves like a living market: price ribbons, candles, a ticker, and scroll as a chart timeline. Each section is a "session".

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion (UI motion, page transitions) · GSAP + ScrollTrigger (scroll storytelling) · React Three Fiber + three (hero) · Lenis (smooth scroll) · next-themes (theme) · Resend (contact email). Deploy target: Vercel.

## Pages
| Route | Content |
|---|---|
| `/` | Hero (WebGL ribbons/candles + giant "GOKUL M"), live-style ticker, identity cycler, stats count-up, services teaser, featured projects, trading teaser, testimonials, CTA |
| `/about` | Story, education timeline (B.Tech IT; MBA Marketing, pursuing), skills, trading journey, founder note |
| `/services` | 7 services as order-book style interactive rows; process section |
| `/experience` | Timeline: The Moments Lab AI Marketing Agency (Founder, 2025 – Present); Vima Insurance Brokers Pvt Ltd (Visual Content Specialist & Executive); Deivamey Digital Marketing Agency (Content Specialist & Performance Marketer); Blackwins Tech Solutions (Digital Marketing Intern, 6 mo) |
| `/projects`, `/projects/[slug]` | Red Sea Boating, Pondy SRM Cruises, Pondy Gyp Sea Boating (ongoing), Sengal Boutique Hotel. Horizontal-scroll gallery; case pages with video slot |
| `/testimonials` | Carousel of client feedback (placeholder content) |
| `/contact` | Form, email gokulamurugan40@gmail.com, phone +91 9159348778, social links |

## Theme
Toggle between **Night Session** (black, neon lime, ultraviolet, hot coral glows) and **Day Session** (editorial cream, ink black, coral, cobalt). Default: Night; respects saved choice; no flash on load. Toggle is an animated sun/moon; theme change ripples out from click point via View Transitions API (fallback: cross-fade).

## Motion system
- Loader: counts up like a market open, then reveals hero.
- Custom magnetic cursor (disabled on touch).
- Text scramble on hover, split-text scroll reveals.
- Page transitions: chart-refresh wipe.
- Scroll-drawn price line linking sections; trading candle chart draws on scroll.
- Tilt cards, marquee of services, count-up stats.
- `prefers-reduced-motion`: disable WebGL motion, scramble, parallax, and transitions; content stays fully usable.
- Mobile: lighter WebGL (fewer instances, capped DPR); no custom cursor.

## WhatsApp
Floating button bottom-right on every page. Click opens an in-site service menu (Social Media, Content, Video, Ads, Lead Gen, Website, AI Automation, Trading chat). Selection opens `https://wa.me/919159348778?text=<prefilled welcome + chosen service>`. A true auto-reply bot needs the WhatsApp Business API (separate later phase); the free WhatsApp Business app's greeting/away message covers the interim.

## Content and data
- All copy/data lives in typed files under `src/content/` (profile, services, experience, projects, testimonials).
- Project videos: `video` field optional; when absent, the player slot shows a "Video coming soon" state. Dropping a file in `public/videos/` and setting the field activates it.
- Testimonials, stats, and trading details are **clearly marked placeholders** to be replaced by Gokul.
- No photo yet: stylized initials avatar.

## Contact form
Route handler `/api/contact` validates input (zod), rate-limits per IP, and sends email via Resend to gokulamurugan40@gmail.com. Requires `RESEND_API_KEY` env var; without it the handler returns a clear error and the form shows a WhatsApp/email fallback.

## Quality bars
Responsive (360px up), keyboard accessible, WCAG AA contrast in both themes, semantic HTML, per-page metadata and OG tags, Lighthouse perf target ≥ 85 on mobile for non-hero pages.

## Out of scope
WhatsApp Business API bot, CMS, blog, analytics, real testimonials/videos/photos (supplied later).
