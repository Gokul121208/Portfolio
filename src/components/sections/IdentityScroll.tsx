"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
import { useReduced } from "@/components/motion/useReduced";
import { profile } from "@/content/profile";
import { Container } from "@/components/ui";

const ids = profile.identities;
const sentence = `I'm a ${ids.slice(0, -1).join(", ")} & ${ids[ids.length - 1]}`;

// stable pseudo-random in [-1, 1] so server and client agree
const rand = (n: number, salt: number) => {
  const v = Math.sin(n * 12.9898 + salt * 78.233) * 43758.5453;
  return (v - Math.floor(v)) * 2 - 1;
};
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeIn = (t: number) => t * t;

// Letters start scattered (random height + tilt, invisible) and snap into place as the sliding line carries them in.
function Char({ ch, index, x, offset, vw }: { ch: string; index: number; x: MotionValue<number>; offset: number; vw: number }) {
  const yPct = useMotionValue(0);
  const rotate = useMotionValue(0);
  const opacity = useMotionValue(0);
  const y = useTransform(yPct, (v) => `${v}%`);
  const sy = rand(index, 1) * 165;
  const sr = rand(index, 2) * 25;

  const update = () => {
    // 0 while the letter is still off the right edge, 1 once it has travelled ~38% of the viewport in
    const t = clamp((vw * 0.9 - (x.get() + offset)) / (vw * 0.38));
    const e = easeOut(t);
    yPct.set((1 - e) * sy);
    rotate.set((1 - e) * sr);
    opacity.set(clamp(t * 1.8));
  };
  useMotionValueEvent(x, "change", update);
  useEffect(update); // re-run when offset / vw are measured

  return (
    <motion.span data-char aria-hidden className="inline-block" style={{ y, rotate, opacity, whiteSpace: "pre" }}>
      {ch}
    </motion.span>
  );
}

function Star({ rotate }: { rotate: MotionValue<number> }) {
  return (
    <motion.svg aria-hidden viewBox="0 0 100 100" className="mr-[0.25em] h-[0.9em] w-[0.9em] shrink-0 text-accent" style={{ rotate }} fill="currentColor">
      <path d="M50 0 L56 44 L100 50 L56 56 L50 100 L44 56 L0 50 L44 44 Z" />
    </motion.svg>
  );
}

export default function IdentityScroll() {
  const reduce = useReduced();
  const section = useRef<HTMLElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const starRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const [m, setM] = useState({ vw: 1280, vh: 800, lineW: 4000, offsets: [] as number[] });
  const geo = useRef({ start: 0, end: 0, rise: 0 });

  // measure the line and every letter (re-measured on resize and once fonts load)
  useLayoutEffect(() => {
    if (reduce) return;
    const measure = () => {
      const el = line.current;
      if (!el) return;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const offsets = [...el.querySelectorAll<HTMLElement>("[data-char]")].map((c) => c.offsetLeft);
      setM({ vw, vh, lineW: el.scrollWidth, offsets });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduce]);

  // The line enters low on the screen at the right edge, rises to the middle while it is being read,
  // then keeps rising and drifting left until it has fully left through the top: the pinned section
  // hands off to the next one with no parked text and no break in the flow.
  const place = (p: number) => {
    const { start, end, rise } = geo.current;
    x.set(start + (end - start) * clamp(p));
    y.set(p < 0.5 ? (1 - easeOut(clamp(p / 0.5))) * rise : -easeIn(clamp((p - 0.5) / 0.5)) * rise);
  };
  useEffect(() => {
    geo.current = { start: m.vw * 0.96, end: -(m.lineW + 40), rise: m.vh * 0.42 };
    place(scrollYProgress.get());
  }, [m, scrollYProgress]); // eslint-disable-line react-hooks/exhaustive-deps
  useMotionValueEvent(scrollYProgress, "change", place);

  if (reduce) {
    return (
      <section className="py-24 sm:py-36">
        <Container>
          <h2 aria-label={sentence} className="font-display text-[clamp(2.4rem,8.5vw,7.5rem)] font-bold uppercase leading-[0.95] tracking-tighter">
            {sentence}
          </h2>
        </Container>
      </section>
    );
  }

  return (
    <section ref={section} className="relative h-[450vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div ref={line} style={{ x, y }} className="flex w-max items-center whitespace-nowrap font-display text-[clamp(3.2rem,11vw,11rem)] font-bold uppercase leading-none tracking-tighter">
          <Star rotate={starRotate} />
          <h2 aria-label={sentence} className="m-0 inline-flex font-[inherit] text-[length:inherit] font-bold leading-none">
            {sentence.split("").map((ch, idx) => (
              <Char key={idx} ch={ch} index={idx} x={x} offset={m.offsets[idx] ?? 0} vw={m.vw} />
            ))}
          </h2>
        </motion.div>
      </div>
    </section>
  );
}
