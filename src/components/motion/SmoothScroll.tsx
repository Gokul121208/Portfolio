"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduce]);
  return <>{children}</>;
}
