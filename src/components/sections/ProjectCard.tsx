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
    document.documentElement.setAttribute("data-video-open", "");
    void player.current?.play().catch(() => {});
  };
  const closeVideo = () => {
    player.current?.pause();
    dialog.current?.close();
    document.documentElement.removeAttribute("data-video-open");
  };

  const extra = project.services.length - MAX_TAGS;
  const hasVideo = !!project.video;
  const isStatic = !!project.noLink && !hasVideo;

  const cardInner = (
    <>
      {/* cursor glow */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 0%), color-mix(in oklab, var(--c) 16%, transparent), transparent 65%)" }}
      />

      {/* background layer: gradient visual always, video fades in on hover */}
      <div aria-hidden className="absolute inset-0">
        <ProjectVisual accent={project.accent} label="" className="h-full" />
      </div>
      {hasVideo && (
        <video
          src={project.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden
        />
      )}

      {/* bottom gradient so text stays readable over video */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-bg2 via-bg2/80 to-transparent" />

      {/* content */}
      <div className="relative z-20 flex h-full flex-col justify-end p-5">
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
          {!isStatic && (
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-line text-sm transition-all duration-300 group-hover:border-[color:var(--c)] group-hover:bg-[color:var(--c)] group-hover:text-onaccent motion-safe:group-hover:rotate-45">
              {hasVideo ? "▶" : "↗"}
            </span>
          )}
        </div>
        <h3 className="mt-3 font-display text-xl font-bold leading-tight tracking-tight sm:text-2xl">{project.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-muted">{project.tagline}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.services.slice(0, MAX_TAGS).map((s) => (
            <li key={s} className="rounded-full bg-fg/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">{s}</li>
          ))}
          {extra > 0 && <li className="rounded-full bg-fg/5 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-muted">+{extra}</li>}
        </ul>
      </div>
    </>
  );

  const baseClass = "group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-[1.75rem] border border-line bg-bg2";
  const liveClass = "transition-[border-color,transform] duration-300 hover:border-[color:var(--c)] motion-safe:hover:-translate-y-1";

  return (
    <>
      {isStatic ? (
        <div className={baseClass} style={{ ["--c" as string]: accentVar[project.accent] }}>
          {cardInner}
        </div>
      ) : hasVideo ? (
        <button
          type="button"
          data-cursor
          onClick={openVideo}
          onPointerMove={glow}
          className={`${baseClass} ${liveClass} w-full cursor-pointer text-left`}
          style={{ ["--c" as string]: accentVar[project.accent] }}
          aria-label={`Play ${project.name} showreel`}
        >
          {cardInner}
        </button>
      ) : (
        <Link
          href={`/projects/${project.slug}`}
          data-cursor
          onPointerMove={glow}
          className={`${baseClass} ${liveClass}`}
          style={{ ["--c" as string]: accentVar[project.accent] }}
        >
          {cardInner}
        </Link>
      )}

      {hasVideo && (
        <dialog
          ref={dialog}
          onClose={() => {
            player.current?.pause();
            document.documentElement.removeAttribute("data-video-open");
          }}
          onClick={(e) => e.target === dialog.current && closeVideo()}
          aria-label={`${project.name} showreel`}
          className="project-dialog m-auto max-h-[100dvh] max-w-[100vw] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
        >
          <div className="relative">
            <video
              ref={player}
              src={project.video}
              controls
              playsInline
              preload="none"
              controlsList="nodownload"
              onContextMenu={(e) => e.preventDefault()}
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
