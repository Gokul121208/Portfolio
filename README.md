# Gokul M — Portfolio

Next.js 15 · TypeScript · Tailwind v4 · Motion · GSAP · React Three Fiber · Lenis · next-themes.

```sh
npm install
npm run dev        # http://localhost:3100 with: npm run dev -- -p 3100
npm test           # unit tests (content, WhatsApp link, contact validation, rate limit)
npm run e2e        # Playwright smoke tests (set PW_CHROMIUM_PATH to use a local Chromium/Brave)
npm run build
```

## Things you will edit
- **All copy and data:** `src/content/` (profile, services, experience, projects, testimonials).
- **Placeholders to replace:** testimonials, stats (`profile.stats`) and social links (`profile.socials`) are sample values.
- **Project videos:** put the file in `public/videos/` and set `video: "/videos/name.mp4"` (optional `poster`) on the project in `src/content/projects.ts`. Until then each project shows a "Video coming soon" slot.
- **Contact form:** copy `.env.example` to `.env.local` and set `RESEND_API_KEY` (and `CONTACT_FROM` once you verify a domain in Resend). Without a key the form shows a WhatsApp/email fallback.
- **WhatsApp:** the floating button opens a service menu and sends a prefilled message to +91 9159348778. A true auto-reply bot needs the WhatsApp Business API (or use the WhatsApp Business app's greeting message).

## Notes
- Themes: "Night Session" (default) and "Day Session"; tokens live in `src/app/globals.css`.
- Rate limiting on `/api/contact` is in-memory and per instance, keyed by the client address from platform headers (`x-vercel-forwarded-for`). Off Vercel, add Cloudflare Turnstile or a firewall rule if abuse appears.
- Motion respects `prefers-reduced-motion` (no WebGL, cursor, scramble or smooth scroll).
