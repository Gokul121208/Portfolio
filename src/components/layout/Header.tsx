"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ThemeToggle from "@/components/ThemeToggle";
import Scramble from "@/components/motion/Scramble";
import { nav } from "@/content/nav";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled || open ? "bg-bg/80 backdrop-blur-xl" : ""}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          Gokul<span className="text-accentink"> M</span>
          <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent align-middle" />
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={path.startsWith(n.href) ? "page" : undefined}
              className={`rounded-full px-3 py-2 font-mono text-xs uppercase tracking-widest transition-colors hover:text-accentink ${path.startsWith(n.href) ? "text-accentink" : "text-muted"}`}
            >
              <Scramble text={n.label} />
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 top-0 h-px w-5 bg-fg transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-5 bg-fg transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0 }}
            animate={{ height: "calc(100vh - 4rem)" }}
            exit={{ height: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="overflow-hidden bg-bg md:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col gap-2 px-5 pt-8">
              {[{ href: "/", label: "Home" }, ...nav].map((n, i) => (
                <motion.div key={n.href} initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                  <Link href={n.href} className="font-display text-4xl font-bold tracking-tight hover:text-accentink">
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
