import Link from "next/link";
import { profile } from "@/content/profile";
import { nav } from "@/content/nav";

export default function Footer() {
  return (
    <footer className="relative mt-32 border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s turn attention <span className="text-accentink">into growth.</span>
          </p>
          <p className="mt-4 max-w-md text-sm text-muted">
            {profile.name} · Digital Marketer, Trader, Creator. Founder of {profile.agency}.
          </p>
        </div>
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">Pages</p>
          <ul className="space-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}><Link className="hover:text-accentink" href={n.href}>{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">Reach me</p>
          <ul className="space-y-2 text-sm">
            <li><a className="hover:text-accentink" href={`mailto:${profile.email}`}>{profile.email}</a></li>
            <li><a className="hover:text-accentink" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a></li>
            {profile.socials.map((s) => (
              <li key={s.label}><a className="hover:text-accentink" href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line px-5 py-5 text-center font-mono text-xs text-muted sm:px-8">
        © {new Date().getFullYear()} {profile.name}. Not financial advice: trading shown is a personal journey.
      </div>
    </footer>
  );
}
