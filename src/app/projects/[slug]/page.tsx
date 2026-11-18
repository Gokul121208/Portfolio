import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/content/projects";
import { Container } from "@/components/ui";
import VideoSlot from "@/components/VideoSlot";
import Reveal from "@/components/motion/Reveal";
import SplitText from "@/components/motion/SplitText";
import CTA from "@/components/sections/CTA";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: p.name, description: p.summary } : {};
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const i = projects.findIndex((x) => x.slug === slug);
  const next = projects[(i + 1) % projects.length];
  const prev = projects[(i - 1 + projects.length) % projects.length];

  return (
    <>
      <Container className="pb-8 pt-36 sm:pt-44">
        <Link href="/projects" className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accentink">← All projects</Link>
        {p.ongoing && <p className="mt-6 w-fit rounded-full bg-accent px-3 py-1 font-mono text-xs uppercase text-onaccent">Ongoing</p>}
        <SplitText as="h1" text={p.name} className="mt-4 font-display text-5xl font-bold leading-[0.9] tracking-tighter sm:text-8xl" />
        <Reveal delay={0.3}><p className="mt-5 max-w-2xl text-xl text-muted">{p.tagline}</p></Reveal>
      </Container>
      <Container className="py-8"><Reveal><VideoSlot video={p.video} poster={p.poster} accent={p.accent} title={p.name} portrait={p.portrait} /></Reveal></Container>
      <Container className="grid gap-12 py-16 md:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accentink">The work</p>
          <p className="mt-4 text-lg leading-relaxed">{p.summary}</p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-accentink">Delivered</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.services.map((s) => <li key={s} className="rounded-full border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wider">{s}</li>)}
          </ul>
        </Reveal>
      </Container>
      <Container className="grid gap-4 py-8 sm:grid-cols-2">
        <Link href={`/projects/${prev.slug}`} data-cursor className="rounded-3xl border border-line p-6 transition-colors hover:border-accent"><span className="font-mono text-xs text-muted">← Previous</span><span className="mt-2 block font-display text-2xl font-bold">{prev.name}</span></Link>
        <Link href={`/projects/${next.slug}`} data-cursor className="rounded-3xl border border-line p-6 text-right transition-colors hover:border-accent"><span className="font-mono text-xs text-muted">Next →</span><span className="mt-2 block font-display text-2xl font-bold">{next.name}</span></Link>
      </Container>
      <CTA />
    </>
  );
}
