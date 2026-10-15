"use client";
import { useEffect, useState } from "react";

// Starts false so server and first client render match; updates after mount.
// (motion's own useReducedMotion reads matchMedia on the first client render and causes hydration mismatches.)
export function useReduced(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const on = () => setReduced(m.matches);
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduced;
}
