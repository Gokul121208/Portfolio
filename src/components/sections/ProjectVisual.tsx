import type { Accent } from "@/content/types";

export const accentVar: Record<Accent, string> = {
  accent: "var(--accent)",
  accent2: "var(--accent-2)",
  accent3: "var(--accent-3)",
};

// Abstract animated "waves + horizon" poster, used until a real video is added.
export default function ProjectVisual({ accent, label, className = "aspect-[16/10]" }: { accent: Accent; label?: string; className?: string }) {
  const c = accentVar[accent];
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ background: `radial-gradient(80% 70% at 70% 20%, color-mix(in oklab, ${c} 55%, transparent), transparent 70%), var(--bg-2)` }}
    >
      <svg viewBox="0 0 400 250" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M-20 ${120 + i * 26} Q 60 ${90 + i * 26} 120 ${120 + i * 26} T 260 ${120 + i * 26} T 420 ${120 + i * 26}`}
            fill="none"
            stroke={c}
            strokeOpacity={0.15 + i * 0.12}
            strokeWidth={1.5}
          >
            <animateTransform attributeName="transform" type="translate" values={`0 0; -60 ${i % 2 ? 6 : -6}; 0 0`} dur={`${6 + i}s`} repeatCount="indefinite" />
          </path>
        ))}
      </svg>
      <div className="absolute bottom-3 left-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-fg/80">
        <span className="grid h-7 w-7 place-items-center rounded-full border border-fg/40">▶</span>
        {label ?? "Video coming soon"}
      </div>
    </div>
  );
}
