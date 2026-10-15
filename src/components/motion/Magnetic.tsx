"use client";
import { useReduced } from "@/components/motion/useReduced";
import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function Magnetic({ children, strength = 0.35 }: { children: React.ReactNode; strength?: number }) {
  const reduce = useReduced();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  const move = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => { x.set(0); y.set(0); };

  return (
    <motion.div ref={ref} style={{ x, y }} onPointerMove={move} onPointerLeave={leave} className="inline-block">
      {children}
    </motion.div>
  );
}
