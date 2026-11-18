"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function Loader() {
  const [show, setShow] = useState(false);
  const [n, setN] = useState(0);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("loaded") === "1"; } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // read directly: the hook flips after first render
    if (seen || reduce) return;
    setShow(true);
    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min((t - start) / 1400, 1);
      setN(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else {
        try { sessionStorage.setItem("loaded", "1"); } catch {}
        setTimeout(() => setShow(false), 250);
      }
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-bg p-6 sm:p-10"
        >
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-muted">Market opening · IST</div>
          <div className="flex items-end justify-between">
            <div className="font-display text-[22vw] font-bold leading-none tracking-tighter text-fg sm:text-[14vw]">{String(n).padStart(2, "0")}</div>
            <div className="mb-4 font-mono text-sm text-accentink">GOKUL M ▲</div>
          </div>
          <div className="absolute bottom-0 left-0 h-1 bg-accent" style={{ width: `${n}%` }} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
