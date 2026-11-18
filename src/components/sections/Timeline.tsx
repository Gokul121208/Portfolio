"use client";
import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Reveal from "@/components/motion/Reveal";

export type TimelineItem = { title: string; sub: string; meta?: string; points?: string[] };

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const h = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  return (
    <div ref={ref} className="relative pl-8 sm:pl-12">
      <div className="absolute bottom-0 left-2 top-0 w-px bg-line sm:left-3" />
      <motion.div className="absolute left-2 top-0 w-px origin-top bg-accent sm:left-3" style={{ scaleY: h, height: "100%" }} />
      <ul className="space-y-12">
        {items.map((it) => (
          <li key={it.title} className="relative">
            <span className="absolute -left-[1.95rem] top-2 h-3 w-3 rounded-full border-2 border-accent bg-bg sm:-left-[2.95rem]" />
            <Reveal>
              {it.meta && <p className="font-mono text-xs uppercase tracking-widest text-accentink">{it.meta}</p>}
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-4xl">{it.title}</h3>
              <p className="text-muted">{it.sub}</p>
              {it.points && (
                <ul className="mt-4 space-y-2 text-sm text-muted">
                  {it.points.map((p) => <li key={p} className="flex gap-3"><span className="text-accentink">▲</span>{p}</li>)}
                </ul>
              )}
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
