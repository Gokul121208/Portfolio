import Link from "next/link";
import { testimonials } from "@/content/testimonials";
import { Container, SectionHead } from "@/components/ui";
import Reveal from "@/components/motion/Reveal";

export default function TestimonialsTeaser() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHead eyebrow="Kind words" title="What clients say." />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <figure className="flex h-full flex-col justify-between rounded-3xl border border-line bg-bg2 p-6">
                <blockquote className="text-lg leading-relaxed">&ldquo;{t.quote}&rdquo;</blockquote>
                <figcaption className="mt-6 font-mono text-xs uppercase tracking-widest text-muted">
                  {t.name} · {t.role} <span className="ml-2 text-accent">Sample</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/testimonials" className="font-mono text-sm uppercase tracking-widest text-accent hover:underline">More feedback →</Link>
        </div>
      </Container>
    </section>
  );
}
