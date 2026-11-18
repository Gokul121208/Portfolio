"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { useReduced } from "@/components/motion/useReduced";

const PANELS = 5;
const ease = [0.76, 0, 0.24, 1] as const;

function labelFor(path: string) {
  if (path === "/") return "Home";
  return path.split("/").filter(Boolean).pop()!.replace(/-/g, " ");
}

// Enter-only transition (App Router unmounts the old page immediately, so exit animations are unreliable):
// the new page mounts under five full-height panels; the destination name rises, then the panels
// retract upward in a stagger, each leaving a glowing accent edge.
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReduced();
  const path = usePathname();
  const [done, setDone] = useState(false);

  return (
    <>
      {!reduce && !done && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-[90] flex">
          {Array.from({ length: PANELS }).map((_, i) => (
            <motion.div
              key={i}
              className="h-full flex-1 origin-top border-b-[3px] border-accent bg-bg2"
              style={{ boxShadow: "0 8px 40px -4px var(--accent)" }}
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0, transition: { duration: 0.75, delay: 0.5 + i * 0.07, ease } }}
              onAnimationComplete={i === PANELS - 1 ? () => setDone(true) : undefined}
            />
          ))}
          <motion.div
            className="absolute inset-0 grid place-items-center"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: [0, 1, 1, 0], y: [40, 0, 0, -50] }}
            transition={{ duration: 0.85, times: [0, 0.3, 0.7, 1], ease: "easeOut" }}
          >
            <span className="font-display text-[clamp(2.5rem,10vw,8rem)] font-bold uppercase tracking-tighter text-fg">
              {labelFor(path)}
              <span className="text-accent">.</span>
            </span>
          </motion.div>
        </div>
      )}
      {children}
    </>
  );
}
