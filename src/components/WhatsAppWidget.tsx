"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { whatsappOptions } from "@/content/services";

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-[70] sm:bottom-8 sm:right-8">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Choose a service to chat about on WhatsApp"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-20 right-0 w-[min(88vw,22rem)] origin-bottom-right rounded-2xl border border-line bg-bg2 p-4 shadow-2xl"
          >
            <p className="font-display text-lg font-bold">Hi! 👋 What do you need?</p>
            <p className="mb-3 text-xs text-muted">Pick one and I&apos;ll open WhatsApp with it ready to send.</p>
            <ul className="grid gap-2">
              {whatsappOptions.map((o) => (
                <li key={o.id}>
                  <a
                    href={buildWhatsAppUrl(o.id)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-line px-3 py-2 text-sm transition-colors hover:border-accent hover:bg-accent hover:text-onaccent"
                  >
                    {o.title.replace(/^a /, "")}
                  </a>
                </li>
              ))}
              <li>
                <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="block rounded-xl px-3 py-2 text-center text-sm text-muted hover:text-accentink">
                  Just say hi →
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Chat on WhatsApp"
        className="relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110"
      >
        <span aria-hidden className="absolute inset-0 rounded-full bg-[#25D366]" style={{ animation: "pulse-ring 2s ease-out infinite" }} />
        <svg className="relative h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.3 15l-.3-.18-3.1.88.9-3-.2-.32A8.1 8.1 0 0 1 12.04 3.8zm-3.2 4.2c-.2 0-.5.07-.75.35-.25.28-1 1-1 2.4s1.03 2.8 1.18 3c.14.2 2 3.2 4.95 4.35 2.45.97 2.95.78 3.48.73.53-.05 1.7-.7 1.95-1.38.24-.68.24-1.27.17-1.38-.07-.12-.27-.2-.57-.35-.3-.15-1.7-.84-1.97-.94-.27-.1-.47-.15-.67.15-.2.3-.77.94-.94 1.13-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.8-1.5-1.77-1.67-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.65-1.6-.9-2.18-.23-.56-.47-.48-.65-.49h-.55z" />
        </svg>
      </button>
    </div>
  );
}
