import { Container, SectionHead } from "@/components/ui";
import Reveal from "@/components/motion/Reveal";
import CandleChart from "./CandleChart";

export default function TradingTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Beyond marketing" title="I trade Forex & Futures, on my own account." />
            <Reveal delay={0.2}>
              <p className="max-w-lg text-muted sm:text-lg">
                Markets taught me patience, discipline and risk. The same habits shape how I run campaigns: read the data,
                size the bet, cut what isn&apos;t working, and stay consistent.
              </p>
              <p className="mt-4 max-w-lg text-sm text-muted">
                This is my personal journey, not a service or financial advice.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <div className="rounded-3xl border border-line bg-bg2 p-5 sm:p-8">
              <div className="mb-4 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted">
                <span>Illustrative · not live data</span>
                <span className="text-accent">▲ Discipline</span>
              </div>
              <CandleChart />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
