"use client";
import { useRef } from "react";
import Link from "next/link";
import type { Project } from "@/content/types";
import ProjectVisual, { accentVar } from "./ProjectVisual";

const MAX_TAGS = 3;

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);

  const glow = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const openVideo = () => {
    dialog.current?.showModal();
    void player.current?.play().catch(() => {});
  };
  const closeVideo = () => {
    player.current?.pause();
    dialog.current?.close();
  };

  const extra = project.services.length - MAX_TAGS;
  const hasVideo = !!project.video;

  const cardBody = (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--c) 16%, transparent), transparent 65%)" }}
      />
      <div className="relative">
        <ProjectVisual accent={project.accent} label="" className="aspect-[16/8]" />
        {hasVideo && (
          <span aria-hidden className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-bg/70 text-lg shadow-lg backdrop-blur-sm">▶</span>
          </span>
        )}
      </div>
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
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-sm transition-all duration-300 group-hover:border-[color:var(--c)] group-hover:bg-[color:var(--c)] group-hover:text-onaccent motion-safe:group-hover:rotate-45">
            {hasVideo ? "▶" : "↗"}
          </span>
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
    </>
  );

  return (
    <>
      {hasVideo ? (
        <button
          type="button"
          data-cursor
          onClick={openVideo}
          onPointerMove={glow}
          className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[1.75rem] border border-line bg-bg2 text-left transition-[border-color,transform] duration-300 hover:border-[color:var(--c)] motion-safe:hover:-translate-y-1"
          style={{ ["--c" as string]: accentVar[project.accent] }}
          aria-label={`Play ${project.name} showreel`}
        >
          {cardBody}
        </button>
      ) : (
        <Link
          href={`/projects/${project.slug}`}
          data-cursor
          onPointerMove={glow}
          className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-bg2 transition-[border-color,transform] duration-300 hover:border-[color:var(--c)] motion-safe:hover:-translate-y-1"
          style={{ ["--c" as string]: accentVar[project.accent] }}
        >
          {cardBody}
        </Link>
      )}

      {hasVideo && (
        <dialog
          ref={dialog}
          onClose={() => player.current?.pause()}
          onClick={(e) => e.target === dialog.current && closeVideo()}
          aria-label={`${project.name} showreel`}
          className="m-auto max-h-[100dvh] max-w-[100vw] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        >
          <div className="relative">
            <video
              ref={player}
              src={project.video}
              controls
              playsInline
              preload="none"
              className="block aspect-[9/16] h-[90dvh] max-w-[95vw] rounded-2xl bg-black object-contain"
            />
            <button
              type="button"
              onClick={closeVideo}
              aria-label="Close video"
              className="absolute -right-3 -top-3 grid h-9 w-9 place-items-center rounded-full bg-accent text-onaccent shadow-lg sm:-right-12 sm:top-0"
            >
              ✕
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
