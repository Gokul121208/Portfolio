import { Container, SectionHead } from "@/components/ui";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { profile } from "@/content/profile";
import { creatorSteps } from "@/content/pillars";
import ReelTiles from "./ReelTiles";

const instagram = profile.socials.find((s) => s.label === "Instagram")!.href;

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
              <div className="mt-8 flex flex-col gap-4 rounded-3xl border border-line bg-bg2 p-4 sm:flex-row sm:items-center sm:p-5">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full p-[3px] sm:h-16 sm:w-16" style={{ background: "conic-gradient(from 200deg, var(--accent), var(--accent-2), var(--accent-3), var(--accent))" }}>
                    <span className="grid h-full w-full place-items-center rounded-full bg-bg font-display text-xl font-bold sm:text-2xl">G</span>
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-bold tracking-tight sm:text-xl">{profile.instagramHandle}</p>
                    <p className="text-sm text-muted">Instagram · by Gokul M</p>
                  </div>
                </div>
                <Magnetic className="block w-full sm:inline-block sm:w-auto">
                  <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label={`${profile.instagramHandle} on Instagram`} className="block rounded-full bg-accent px-5 py-3.5 text-center text-sm font-medium text-onaccent sm:inline-block sm:py-3">
                    <span className="sm:hidden" aria-hidden>Follow on Instagram ↗</span>
                    <span className="hidden sm:inline" aria-hidden>Follow {profile.instagramHandle} ↗</span>
                  </a>
                </Magnetic>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <ReelTiles />
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
