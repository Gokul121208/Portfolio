"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { testimonials } from "@/content/testimonials";

export default function TestimonialCarousel() {
  const [i, setI] = useState(0);
  const go = (d: number) => setI((n) => (n + d + testimonials.length) % testimonials.length);
  const t = testimonials[i];
  return (
    <div className="rounded-[2rem] border border-line bg-bg2 p-8 sm:p-16">
      <div className="min-h-[14rem]" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.figure key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.35 }} drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={(_, info) => Math.abs(info.offset.x) > 60 && go(info.offset.x < 0 ? 1 : -1)}>
            <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-4xl">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">{t.name} · {t.role} <span className="ml-2 text-accent">Sample</span></figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-2">{testimonials.map((_, n) => <span key={n} className={`h-1.5 rounded-full transition-all ${n === i ? "w-8 bg-accent" : "w-3 bg-line"}`} />)}</div>
        <div className="flex gap-2">
          <button onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-line hover:border-accent hover:text-accent">←</button>
          <button onClick={() => go(1)} aria-label="Next testimonial" className="grid h-11 w-11 place-items-center rounded-full border border-line hover:border-accent hover:text-accent">→</button>
        </div>
      </div>
    </div>
  );
}
