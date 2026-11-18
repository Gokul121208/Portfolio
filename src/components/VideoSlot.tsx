import type { Accent } from "@/content/types";
import ProjectVisual from "@/components/sections/ProjectVisual";

export default function VideoSlot({ video, poster, accent, title, portrait }: { video?: string; poster?: string; accent: Accent; title: string; portrait?: boolean }) {
  if (video) {
    return (
      <div className={portrait ? "flex justify-center" : ""}>
        <video
          className={portrait
            ? "max-h-[80vh] w-auto max-w-xs rounded-3xl border border-line bg-black sm:max-w-sm"
            : "aspect-video w-full rounded-3xl border border-line bg-black"}
          controls playsInline preload="none" controlsList="nodownload" onContextMenu={(e) => e.preventDefault()} poster={poster} aria-label={`${title} showreel`}
        >
          <source src={video} />
        </video>
      </div>
    );
  }
  return (
    <div className="overflow-hidden rounded-3xl border border-line">
      <ProjectVisual accent={accent} />
    </div>
  );
}
