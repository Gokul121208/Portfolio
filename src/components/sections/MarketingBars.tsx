"use client";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { profile } from "@/content/profile";
import { Container, SectionHead } from "@/components/ui";
import Reveal from "@/components/motion/Reveal";
import CountUp from "@/components/motion/CountUp";
import { useReduced } from "@/components/motion/useReduced";

export default function MarketingBars() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <SectionHead eyebrow="My marketing" title="Strategy that's creative, creative that's measured." />
            <Reveal delay={0.2}>
              <p className="max-w-lg text-muted sm:text-lg">
                I plan, shoot, edit, advertise and automate. Every post, reel and ad is built to earn attention, then turn it
                into enquiries you can follow up on, with AI-powered nurturing doing the heavy lifting.
              </p>
            </Reveal>
          </div>
          <ul className="space-y-6">
            {profile.marketingFocus.map((b, i) => (
              <Bar key={b.label} label={b.label} level={b.level} index={i} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}

// The in-view trigger lives on the (unscaled) track: a scaleX(0) element has no area, so it never counts as visible.
function Bar({ label, level, index }: { label: string; level: number; index: number }) {
  const reduce = useReduced();
  const track = useRef<HTMLDivElement>(null);
  const inView = useInView(track, { once: true, margin: "-10% 0px" });
  const filled = inView || reduce;
  return (
    <li>
      <div className="mb-2 flex items-baseline justify-between font-mono text-xs uppercase tracking-widest">
        <span>{label}</span>
        <span className="text-accentink"><CountUp to={level} suffix="%" /></span>
      </div>
      <div ref={track} className="h-2.5 overflow-hidden rounded-full bg-line" role="presentation">
        <motion.div
          className="relative h-full origin-left rounded-full"
          style={{ width: `${level}%`, background: "linear-gradient(90deg, var(--accent-2), var(--accent))" }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: filled ? 1 : 0 }}
          transition={{ duration: 1.3, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {!reduce && <span aria-hidden className="absolute inset-y-0 -left-1/3 w-1/3 animate-[shine_2.6s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />}
        </motion.div>
      </div>
    </li>
  );
}
