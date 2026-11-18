# Gokul M — Portfolio

**Digital marketer · Content creator · Founder · Forex & futures trader**

This is Gokul M's portfolio: a place to explore his campaigns, creative work, experience, and approach to building brands. His work spans social media, short-form video, performance ads, lead generation, and marketing automation through **The Moments Lab AI Marketing Agency**.

Built and developed by [@Jery0843](https://github.com/Jery0843) for [@Gokul121208](https://github.com/Gokul121208).

## Explore the portfolio

- **Projects:** campaigns and content work for boating, cruises, hospitality, and an election campaign contribution.
- **Services:** social media, video, ads, lead generation, websites, and automation.
- **Experience and about:** Gokul's background, skills, and story.
- **Testimonials:** feedback from the owners of brands he has worked with.
- **Contact:** a message form, email, and a WhatsApp service menu.

The interface includes a WebGL market-inspired hero, motion throughout the site, light and dark themes, and a reduced-motion experience.

## Run locally

You need Node.js and npm. From the repository root:

```bash
npm ci
npm run dev -- -p 3100
```

Open [http://localhost:3100](http://localhost:3100). The site renders without email credentials; the contact form uses a WhatsApp or email fallback until Resend is configured.

To enable contact-form email, copy `.env.example` to `.env.local`, add a `RESEND_API_KEY`, and set `CONTACT_FROM` to an address on a domain verified in Resend. Set `NEXT_PUBLIC_SITE_URL` to the deployed site URL when publishing so generated metadata uses the correct origin.

## Where to make changes

| Content | File |
| --- | --- |
| Gokul's bio, links, skills, and headline figures | `src/content/profile.ts` |
| Projects and their videos | `src/content/projects.ts` |
| Services, experience, and testimonials | `src/content/` |
| Theme and visual tokens | `src/app/globals.css` |

Project videos belong in `public/videos/`. Add a `video: "/videos/name.mp4"` path to the corresponding project, with an optional `poster`. Projects without a video show a coming-soon state.

**Before publishing:** the headline figures in `profile.stats` are placeholders, and the LinkedIn link in `profile.socials` is a placeholder. Replace them with verified values and Gokul's real profile.

## Check the project

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run e2e
```

The browser tests use Playwright and require a Chromium browser. Set `PW_CHROMIUM_PATH` if using an existing local Chromium or Brave installation.

## Stack

Next.js 15, React 19, TypeScript, Tailwind CSS 4, Motion, React Three Fiber, Three.js, Lenis, next-themes, and Resend. Vitest covers unit tests; Playwright covers browser flows.

---

**Portfolio owner:** [Gokul M](https://github.com/Gokul121208) · **Developer:** [Jery0843](https://github.com/Jery0843)
