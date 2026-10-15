import { profile } from "@/content/profile";

const items = [
  ...profile.stats.map((s) => ({ k: s.label, v: `${s.value.toLocaleString("en-IN")}${s.suffix}`, up: true })),
  { k: "REACH", v: "GROWING", up: true },
  { k: "CPL", v: "FALLING", up: false },
  { k: "CONTENT", v: "DAILY", up: true },
  { k: "RISK", v: "MANAGED", up: true },
];

export default function Ticker() {
  const row = [...items, ...items];
  return (
    <div className="marquee relative overflow-hidden border-y border-line bg-bg/60 py-3 backdrop-blur" aria-hidden>
      <div className="marquee-track flex w-max gap-10 font-mono text-xs uppercase tracking-widest">
        {row.map((it, i) => (
          <span key={i} className="flex items-center gap-3 whitespace-nowrap">
            <span className="text-muted">{it.k}</span>
            <span className="text-fg">{it.v}</span>
            <span className={it.up ? "text-accentink" : "text-accent3"}>{it.up ? "▲" : "▼"}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
