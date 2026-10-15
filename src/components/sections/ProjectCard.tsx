"use client";
import { useReduced } from "@/components/motion/useReduced";
import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import type { Project } from "@/content/types";
import ProjectVisual, { accentVar } from "./ProjectVisual";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reduce = useReduced();
  const ref = useRef<HTMLAnchorElement>(null);
  const mx = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const my = useSpring(useMotionValue(0), { stiffness: 150, damping: 18 });
  const rotateY = useTransform(mx, [-0.5, 0.5], [-8, 8]);
  const rotateX = useTransform(my, [-0.5, 0.5], [8, -8]);

  const move = (e: React.PointerEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <motion.div style={{ rotateX, rotateY, transformPerspective: 1000 }} onPointerMove={move} onPointerLeave={() => { mx.set(0); my.set(0); }}>
      <Link
        ref={ref}
        href={`/projects/${project.slug}`}
        data-cursor
        className="group relative block overflow-hidden rounded-3xl border border-line bg-bg2 transition-colors hover:border-[color:var(--c)]"
        style={{ ["--c" as string]: accentVar[project.accent] }}
      >
        <ProjectVisual accent={project.accent} />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-xs text-muted">0{index + 1}{project.ongoing && <span className="ml-3 rounded-full bg-accent px-2 py-0.5 text-[10px] uppercase text-onaccent">Ongoing</span>}</p>
              <h3 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">{project.name}</h3>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line transition-all group-hover:rotate-45 group-hover:border-[color:var(--c)] group-hover:text-[color:var(--c)]">↗</span>
          </div>
          <p className="mt-3 text-sm text-muted">{project.tagline}</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.services.slice(0, 4).map((s) => (
              <li key={s} className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">{s}</li>
            ))}
          </ul>
        </div>
      </Link>
    </motion.div>
  );
}
