"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { useReduced } from "@/components/motion/useReduced";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReduced();
  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [reduce]);
  return <>{children}</>;
}
