"use client";
import { motion, useReducedMotion } from "motion/react";

// Enter-only transition: App Router unmounts the old page immediately, so exit animations are unreliable.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-[90] origin-top bg-accent"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
      {children}
    </>
  );
}
