import { Container, SectionHead } from "@/components/ui";
import Reveal from "@/components/motion/Reveal";
import CandleChart from "./CandleChart";
import { tradingLessons } from "@/content/pillars";

export default function TraderSection() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <SectionHead eyebrow="Trader" title="Forex & Futures, played like a long game." />
            <Reveal delay={0.2}>
              <p className="max-w-lg text-muted sm:text-lg">
                I trade my own account. Markets are a daily lesson in patience, probability and staying calm when it
                matters, and I carry those habits into every campaign I run.
              </p>
              <p className="mt-4 text-sm text-muted">A personal journey, not a service and not financial advice.</p>
            </Reveal>
          </div>
          <Reveal>
            <div className="rounded-3xl border border-line bg-bg2 p-5 sm:p-8">
              <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted">
                <span>Illustrative · not live data</span>
                <span className="text-accentink">▲ Discipline</span>
              </div>
              <CandleChart />
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <Reveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accentink">What the market taught my marketing</p>
          </Reveal>
          <ul className="divide-y divide-line border-y border-line">
            {tradingLessons.map((l, i) => (
              <li key={l.lesson}>
                <Reveal delay={i * 0.06}>
                  <div className="group relative grid gap-2 overflow-hidden px-2 py-6 sm:grid-cols-[0.45fr_1fr] sm:items-center sm:gap-10 sm:px-4">
                    <span aria-hidden className="absolute inset-0 -z-0 origin-left scale-x-0 bg-accent/10 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    <h3 className="relative font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-accentink sm:text-3xl">
                      <span className="mr-3 font-mono text-xs text-muted">0{i + 1}</span>
                      {l.lesson}
                    </h3>
                    <p className="relative text-muted"><span aria-hidden className="mr-2 text-accentink">→</span>{l.move}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
