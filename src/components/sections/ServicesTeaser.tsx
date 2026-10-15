import Link from "next/link";
import { services } from "@/content/services";
import { Container, SectionHead } from "@/components/ui";

export default function ServicesTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHead eyebrow="What I do" title="One mind for strategy, content, ads and automation." />
        <ul className="divide-y divide-line border-y border-line">
          {services.map((s) => (
            <li key={s.id}>
              <Link href="/services" data-cursor className="group flex items-center justify-between gap-4 py-5 transition-all hover:px-4 hover:bg-bg2 sm:py-6">
                <span className="flex items-baseline gap-5 sm:gap-8">
                  <span className="font-mono text-xs text-muted">{s.tag}</span>
                  <span className="font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accentink sm:text-4xl">{s.title}</span>
                </span>
                <span className="text-xl transition-transform group-hover:translate-x-1 group-hover:text-accentink">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
