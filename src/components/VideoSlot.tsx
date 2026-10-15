import type { Accent } from "@/content/types";
import ProjectVisual from "@/components/sections/ProjectVisual";

export default function VideoSlot({ video, poster, accent, title }: { video?: string; poster?: string; accent: Accent; title: string }) {
  if (video) {
    return (
      <video className="aspect-video w-full rounded-3xl border border-line bg-black" controls playsInline preload="metadata" poster={poster} aria-label={`${title} showreel`}>
        <source src={video} />
      </video>
    );
  }
  return (
    <div className="overflow-hidden rounded-3xl border border-line">
      <ProjectVisual accent={accent} />
    </div>
  );
}
