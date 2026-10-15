import type { Metadata } from "next";
import { PageHero, Container, SectionHead } from "@/components/ui";
import Timeline from "@/components/sections/Timeline";
import CandleChart from "@/components/sections/CandleChart";
import Reveal from "@/components/motion/Reveal";
import CTA from "@/components/sections/CTA";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "About", description: "Gokul M: education, skills, trading journey and the agency he founded." };

export default function About() {
  return (
    <>
      <PageHero eyebrow="About me" title="Part marketer, part trader, all creator." intro="I'm Gokul M. I turn attention into growth, using the creativity of a content creator and the discipline of a trader." />
      <Container className="grid gap-16 py-12 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Education" title="Technical roots, marketing mind." />
          <Timeline
            items={profile.education.map((e, i) => ({ title: e.degree, sub: e.status, meta: i === 0 ? "Foundation" : "Now" }))}
          />
        </div>
        <div>
          <SectionHead eyebrow="Skills" title="What I bring." />
          <ul className="flex flex-wrap gap-3">
            {profile.skills.map((s, i) => (
              <Reveal key={s} delay={i * 0.04}>
                <li className="rounded-full border border-line bg-bg2 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:border-accent hover:text-accent">{s}</li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Trading journey" title="Markets taught me discipline." />
            <Reveal>
              <p className="max-w-lg text-muted sm:text-lg">
                I trade Forex and Futures independently. It&apos;s where I learned to manage risk, stay patient and make decisions from data
                instead of emotion. That mindset shapes every campaign I run.
              </p>
              <p className="mt-4 text-sm text-muted">Personal journey only, not a service or financial advice.</p>
            </Reveal>
          </div>
          <div className="rounded-3xl border border-line bg-bg2 p-6"><CandleChart /></div>
        </div>
      </Container>
      <Container className="pb-8">
        <Reveal>
          <div className="rounded-3xl border border-line bg-bg2 p-8 sm:p-12">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">Founder</p>
            <p className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
              I founded {profile.agency}, bringing AI automation into everyday marketing.
            </p>
          </div>
        </Reveal>
      </Container>
      <CTA />
    </>
  );
}
