import { Container, SectionHead } from "@/components/ui";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { profile } from "@/content/profile";
import { creatorSteps } from "@/content/pillars";

const instagram = profile.socials.find((s) => s.label === "Instagram")!.href;
// abstract reel tiles: stand-ins until real thumbnails are added
const tiles = [
  { bg: "linear-gradient(160deg, var(--accent-2), transparent 70%)", cls: "animate-[floaty_7s_ease-in-out_infinite]" },
  { bg: "linear-gradient(160deg, var(--accent), transparent 75%)", cls: "mt-10 animate-[floaty_9s_ease-in-out_infinite_1s]" },
  { bg: "linear-gradient(160deg, var(--accent-3), transparent 70%)", cls: "animate-[floaty_8s_ease-in-out_infinite_2s]" },
];

export default function CreatorSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Content creator" title="Content with a point of view." />
            <Reveal delay={0.2}>
              <p className="max-w-lg text-muted sm:text-lg">
                Alongside client work I run my own creator page, my playground for ideas, edits and the craft of making
                people stop scrolling. What I learn there goes straight back into the brands I work with.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-8 flex flex-wrap items-center gap-4 rounded-3xl border border-line bg-bg2 p-4 sm:p-5">
                <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full p-[3px]" style={{ background: "conic-gradient(from 200deg, var(--accent), var(--accent-2), var(--accent-3), var(--accent))" }}>
                  <span className="grid h-full w-full place-items-center rounded-full bg-bg font-display text-2xl font-bold">G</span>
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-xl font-bold tracking-tight">{profile.instagramHandle}</p>
                  <p className="text-sm text-muted">Instagram · by Gokul M</p>
                </div>
                <Magnetic>
                  <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`${profile.instagramHandle} on Instagram`} className="inline-block rounded-full bg-accent px-5 py-3 text-sm font-medium text-onaccent">
                    Follow {profile.instagramHandle} ↗
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div aria-hidden className="relative mx-auto grid max-w-md grid-cols-3 gap-3 rounded-[2rem] border border-line bg-bg2 p-4 sm:p-6">
              {tiles.map((t, i) => (
                <div key={i} className={`relative aspect-[9/16] overflow-hidden rounded-2xl border border-line ${t.cls}`} style={{ background: t.bg }}>
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-10 w-10 place-items-center rounded-full border border-fg/50 bg-bg/40 text-xs backdrop-blur">▶</span>
                  </span>
                  <span className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest text-fg/80">Reel 0{i + 1}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-4 md:grid-cols-4">
          {creatorSteps.map((s, i) => (
            <li key={s.t}>
              <Reveal delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-line bg-bg2 p-6 transition-colors hover:border-accent">
                  <p className="font-mono text-xs text-accentink">0{i + 1}</p>
                  <p className="mt-6 font-display text-2xl font-bold">{s.t}</p>
                  <p className="mt-2 text-sm text-muted">{s.d}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
