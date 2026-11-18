import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui";
import ContactForm from "@/components/sections/ContactForm";
import { profile } from "@/content/profile";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Contact", description: "Get in touch with Gokul M by form, email, phone or WhatsApp." };

export default function Contact() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's build something that moves." intro="Tell me about your brand and goals. I usually reply within a day." />
      <Container className="grid gap-12 py-8 lg:grid-cols-[1.3fr_1fr]">
        <ContactForm />
        <aside className="space-y-4">
          {[
            { k: "Email", v: profile.email, href: `mailto:${profile.email}` },
            { k: "Phone / WhatsApp", v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
            { k: "WhatsApp chat", v: "Message me directly", href: buildWhatsAppUrl() },
            ...profile.socials.map((s) => ({ k: s.label, v: "Follow", href: s.href })),
          ].map((c) => (
            <a key={c.k} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" data-cursor className="block rounded-3xl border border-line bg-bg2 p-6 transition-colors hover:border-accent">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">{c.k}</span>
              <span className="mt-1 block break-all font-display text-xl font-semibold">{c.v}</span>
            </a>
          ))}
        </aside>
      </Container>
    </>
  );
}
