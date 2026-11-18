"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function NavigationProgress() {
  const path = usePathname();
  const bar = useRef<HTMLDivElement>(null);

  // Complete the bar when the new path lands
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    el.style.transition = "width 0.25s ease-out, opacity 0.3s";
    el.style.width = "100%";
    el.style.opacity = "1";
    const t = setTimeout(() => {
      el.style.opacity = "0";
      setTimeout(() => {
        el.style.width = "0%";
        el.style.transition = "none";
      }, 300);
    }, 250);
    return () => clearTimeout(t);
  }, [path]);

  // Start bar on any internal link click
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;
      const href = target.getAttribute("href") ?? "";
      if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto") || href.startsWith("tel")) return;
      if (href === window.location.pathname) return;
      el.style.transition = "width 12s cubic-bezier(0.1, 0.05, 0, 1), opacity 0.2s";
      el.style.opacity = "1";
      el.style.width = "75%";
    };
    document.addEventListener("click", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("click", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);

  return (
    <div
      ref={bar}
      aria-hidden
      style={{ width: "0%", opacity: 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[300] h-[3px] bg-accent shadow-[0_0_10px_var(--accent)]"
    />
  );
}
