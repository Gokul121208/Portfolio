import { services } from "@/content/services";

export default function ServiceMarquee() {
  const row = [...services, ...services];
  return (
    <div className="marquee overflow-hidden py-10" aria-hidden>
      <div className="marquee-track flex w-max items-center gap-8 font-display text-4xl font-bold uppercase tracking-tighter sm:text-7xl" style={{ animationDuration: "55s" }}>
        {row.map((s, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1.5px_var(--fg)]" : ""}>{s.title}</span>
            <span className="text-accentink">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
