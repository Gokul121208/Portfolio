import Link from "next/link";
import { Container, SectionHead } from "@/components/ui";
import Reveal from "@/components/motion/Reveal";
import Magnetic from "@/components/motion/Magnetic";
import { services } from "@/content/services";
import { experience } from "@/content/experience";

// The founded company is the first (newest) entry in the experience data: one source of truth.
const company = experience[0];

export default function FounderSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-bg2 p-8 sm:p-14">
          <div aria-hidden className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-accent2/25 blur-[100px]" />
          <div className="relative">
            <SectionHead eyebrow={`Founder · ${company.duration}`} title="I built my own agency." />
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <Reveal delay={0.15}>
                <p className="font-display text-2xl font-bold tracking-tight sm:text-4xl">{company.company}</p>
                <p className="mt-4 max-w-xl text-muted sm:text-lg">
                  {company.points.join(" ")}
                </p>
                <div className="mt-8">
                  <Magnetic>
                    <Link href="/experience" className="inline-block rounded-full bg-accent px-6 py-3.5 font-medium text-onaccent">
                      See my journey →
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accentink">What the agency does</p>
                <ul className="flex flex-wrap gap-2">
                  {services.map((s) => (
                    <li key={s.id} className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-muted">{s.title}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
