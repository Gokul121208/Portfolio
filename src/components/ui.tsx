import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";

export function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mb-12 max-w-3xl">
      <Reveal>
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-accentink">{eyebrow}</p>
      </Reveal>
      <SplitText as="h2" text={title} className="font-display text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl" />
      {intro && (
        <Reveal delay={0.2}>
          <p className="mt-5 max-w-xl text-muted sm:text-lg">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

export function PageHero({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 pb-12 pt-36 sm:px-8 sm:pt-44">
      <div aria-hidden className="absolute -top-20 right-0 -z-10 h-80 w-80 rounded-full bg-accent2/30 blur-[110px]" />
      <Reveal>
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-accentink">{eyebrow}</p>
      </Reveal>
      <SplitText as="h1" text={title} className="font-display text-5xl font-bold leading-[0.9] tracking-tighter sm:text-8xl" />
      {intro && (
        <Reveal delay={0.3}>
          <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>
        </Reveal>
      )}
    </section>
  );
}

export const Container = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`mx-auto max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>
);
