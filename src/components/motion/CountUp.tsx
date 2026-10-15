"use client";
import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export default function CountUp({ to, suffix = "" }: { to: number; suffix?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) { setV(to); return; }
    const c = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (n) => setV(Math.round(n)) });
    return () => c.stop();
  }, [inView, to, reduce]);

  return <span ref={ref}>{(reduce ? to : v).toLocaleString("en-IN")}{suffix}</span>;
}
