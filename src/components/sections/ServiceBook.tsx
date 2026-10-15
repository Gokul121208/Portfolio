"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { services } from "@/content/services";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export default function ServiceBook() {
  const [open, setOpen] = useState<string | null>(services[0].id);
  return (
    <ul className="divide-y divide-line border-y border-line">
      {services.map((s) => {
        const isOpen = open === s.id;
        return (
          <li key={s.id}>
            <button
              onClick={() => setOpen(isOpen ? null : s.id)}
              onMouseEnter={() => setOpen(s.id)}
              aria-expanded={isOpen}
              data-cursor
              className="flex w-full items-center justify-between gap-4 py-6 text-left"
            >
              <span className="flex items-baseline gap-5 sm:gap-8">
                <span className={`font-mono text-xs ${isOpen ? "text-accent" : "text-muted"}`}>{s.tag}</span>
                <span className={`font-display text-2xl font-semibold tracking-tight transition-colors sm:text-5xl ${isOpen ? "text-accent" : ""}`}>{s.title}</span>
              </span>
              <span className={`text-2xl transition-transform ${isOpen ? "rotate-45 text-accent" : ""}`}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col gap-4 pb-8 pl-10 sm:flex-row sm:items-center sm:justify-between sm:pl-16">
                    <p className="max-w-xl text-muted sm:text-lg">{s.blurb}</p>
                    <a href={buildWhatsAppUrl(s.id)} target="_blank" rel="noopener noreferrer" className="w-fit rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-onaccent">
                      Ask about this →
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
