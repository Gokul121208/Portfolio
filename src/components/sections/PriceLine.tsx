"use client";
import { useReduced } from "@/components/motion/useReduced";
import { motion, useScroll, useSpring } from "motion/react";

export default function PriceLine() {
  const reduce = useReduced();
  const { scrollYProgress } = useScroll();
  const len = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  if (reduce) return null;
  return (
    <svg aria-hidden className="pointer-events-none fixed right-3 top-0 z-40 hidden h-screen w-8 lg:block" viewBox="0 0 32 800" preserveAspectRatio="none">
      <path d="M16 0 L8 100 L22 180 L10 280 L24 380 L12 480 L22 580 L10 680 L16 800" fill="none" stroke="var(--line)" strokeWidth="1.5" />
      <motion.path d="M16 0 L8 100 L22 180 L10 280 L24 380 L12 480 L22 580 L10 680 L16 800" fill="none" stroke="var(--accent)" strokeWidth="2" style={{ pathLength: len }} />
    </svg>
  );
}
