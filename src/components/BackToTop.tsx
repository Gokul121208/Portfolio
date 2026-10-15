"use client";
import { useState } from "react";
import { AnimatePresence, animate, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useReduced } from "@/components/motion/useReduced";

export default function BackToTop() {
  const reduce = useReduced();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 480));

  const toTop = () => {
    if (reduce) return window.scrollTo(0, 0);
    animate(window.scrollY, 0, {
      duration: Math.min(1.4, 0.5 + window.scrollY / 4000),
      ease: [0.76, 0, 0.24, 1],
      onUpdate: (v) => window.scrollTo(0, v),
    });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          key="top"
          onClick={toTop}
          aria-label="Back to top"
          data-cursor
          initial={reduce ? false : { opacity: 0, scale: 0.4, y: 30, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.4, y: 30, rotate: 90 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          whileHover={reduce ? undefined : { scale: 1.12 }}
          whileTap={reduce ? undefined : { scale: 0.9 }}
          className="group fixed bottom-24 right-5 z-[70] grid h-14 w-14 place-items-center rounded-full border border-line bg-bg2/80 text-accentink shadow-xl backdrop-blur-md sm:bottom-28 sm:right-8"
        >
          {/* scroll-progress ring */}
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden>
            <circle cx="28" cy="28" r="25" fill="none" stroke="var(--line)" strokeWidth="2" />
            <motion.circle cx="28" cy="28" r="25" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" style={{ pathLength: progress }} />
          </svg>
          {/* arrow: slides up and is replaced from below on hover */}
          <span className="relative block h-6 w-6 overflow-hidden" aria-hidden>
            {[0, 1].map((n) => (
              <svg
                key={n}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`absolute inset-0 h-6 w-6 transition-transform duration-300 ease-out ${n === 0 ? "group-hover:-translate-y-7" : "translate-y-7 group-hover:translate-y-0"}`}
              >
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            ))}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
