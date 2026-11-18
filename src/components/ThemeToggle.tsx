"use client";
import { useTheme } from "next-themes";
import { flushSync } from "react-dom";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = (e: React.MouseEvent) => {
    const next = resolvedTheme === "day" ? "night" : "day";
    const root = document.documentElement;
    const apply = () => {
      root.setAttribute("data-theme", next);
      flushSync(() => setTheme(next));
    };
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("startViewTransition" in document)) return apply();
    root.style.setProperty("--rx", `${e.clientX}px`);
    root.style.setProperty("--ry", `${e.clientY}px`);
    (document as Document & { startViewTransition: (cb: () => void) => unknown }).startViewTransition(apply);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Switch between Night and Day session"
      className="relative grid h-10 w-10 place-items-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accentink"
    >
      {/* moon: shown in night */}
      <svg className="day:hidden h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
      {/* sun: shown in day */}
      <svg className="hidden day:block h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    </button>
  );
}
