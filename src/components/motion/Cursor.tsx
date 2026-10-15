"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

export default function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [big, setBig] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 220, damping: 22, mass: 0.4 });

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setBig(!!(e.target as HTMLElement)?.closest?.("a, button, [data-cursor]"));
    };
    window.addEventListener("pointermove", move);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [reduce, x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div aria-hidden style={{ x, y }} className="pointer-events-none fixed left-0 top-0 z-[100] -ml-1 -mt-1 h-2 w-2 rounded-full bg-accent" />
      <motion.div
        aria-hidden
        style={{ x: rx, y: ry }}
        animate={{ scale: big ? 2.4 : 1 }}
        className="pointer-events-none fixed left-0 top-0 z-[99] -ml-5 -mt-5 h-10 w-10 rounded-full border border-accent mix-blend-difference"
      />
    </>
  );
}
