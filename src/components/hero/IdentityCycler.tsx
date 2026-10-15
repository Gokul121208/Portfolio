"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "@/content/profile";

export default function IdentityCycler() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % profile.identities.length), 2400);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 font-display text-2xl font-medium tracking-tight sm:text-4xl">
      <span className="text-muted">I&apos;m a</span>
      <span className="relative inline-flex h-[1.25em] min-w-[10ch] overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={i}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-accent"
          >
            {profile.identities[i]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
