import Link from "next/link";
import { testimonials } from "@/content/testimonials";
import { getProject } from "@/content/projects";
import Reveal from "@/components/motion/Reveal";
import { accentVar } from "./ProjectVisual";

export default function TestimonialGrid() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {testimonials.map((t, i) => {
        const project = getProject(t.project)!;
        const c = accentVar[project.accent];
        return (
          <Reveal key={t.name} delay={(i % 2) * 0.1} className="h-full">
            <figure className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-bg2 p-6 transition-colors duration-300 hover:border-[color:var(--c)] sm:p-8" style={{ ["--c" as string]: c }}>
              <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-30 blur-3xl transition-opacity duration-300 group-hover:opacity-60" style={{ background: c }} />
              <span aria-hidden className="relative font-display text-7xl font-bold leading-none text-[color:var(--c)]">&ldquo;</span>
              <blockquote className="relative -mt-2 flex-1 text-lg leading-relaxed sm:text-xl">{t.quote}</blockquote>
              <figcaption className="relative mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full p-[2px]" style={{ background: `conic-gradient(from 200deg, ${c}, var(--accent-2), ${c})` }}>
                    <span className="grid h-full w-full place-items-center rounded-full bg-bg2 font-display text-lg font-bold">{t.name[0]}</span>
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-bold leading-tight">{t.name}</p>
                    <p className="truncate text-sm text-muted">{t.role}</p>
                  </div>
                </div>
                <Link href={`/projects/${project.slug}`} data-cursor aria-label={`View ${project.name} project`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-sm transition-all hover:border-[color:var(--c)] hover:bg-[color:var(--c)] hover:text-onaccent">↗</Link>
              </figcaption>
            </figure>
          </Reveal>
        );
      })}
    </div>
  );
}
