"use client";
import Link from "next/link";
import type { Project } from "@/content/types";
import ProjectVisual, { accentVar } from "./ProjectVisual";

const MAX_TAGS = 3;

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  // cursor-follow glow: written straight to CSS vars, no re-render
  const glow = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  const extra = project.services.length - MAX_TAGS;

  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor
      onPointerMove={glow}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-bg2 transition-[border-color,transform] duration-300 hover:border-[color:var(--c)] motion-safe:hover:-translate-y-1"
      style={{ ["--c" as string]: accentVar[project.accent] }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--c) 16%, transparent), transparent 65%)" }}
      />
      <ProjectVisual accent={project.accent} label="" className="aspect-[16/8]" />
      <div className="relative flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 font-mono text-xs text-muted">
            <span>{String(index + 1).padStart(2, "0")}</span>
            {project.ongoing && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-wider text-fg">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[color:var(--c)]" />
                Ongoing
              </span>
            )}
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-sm transition-all duration-300 group-hover:border-[color:var(--c)] group-hover:bg-[color:var(--c)] group-hover:text-onaccent motion-safe:group-hover:rotate-45">↗</span>
        </div>
        <h3 className="mt-4 font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">{project.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">{project.tagline}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
          {project.services.slice(0, MAX_TAGS).map((s) => (
            <li key={s} className="rounded-full bg-fg/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">{s}</li>
          ))}
          {extra > 0 && <li className="rounded-full bg-fg/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">+{extra}</li>}
        </ul>
      </div>
    </Link>
  );
}
