import { profile } from "@/content/profile";
import CountUp from "@/components/motion/CountUp";
import { Container } from "@/components/ui";
import Reveal from "@/components/motion/Reveal";

export default function Stats() {
  return (
    <section className="py-16">
      <Container>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-4">
          {profile.stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="h-full bg-bg p-6 sm:p-8">
                <dd className="font-display text-5xl font-bold tracking-tighter text-accent sm:text-6xl"><CountUp to={s.value} suffix={s.suffix} /></dd>
                <dt className="mt-2 font-mono text-xs uppercase tracking-widest text-muted">{s.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
        <p className="mt-3 text-right font-mono text-[10px] uppercase tracking-widest text-muted">Sample figures, updating soon</p>
      </Container>
    </section>
  );
}
