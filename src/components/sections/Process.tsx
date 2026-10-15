import Reveal from "@/components/motion/Reveal";
const steps = [
  { t: "Listen", d: "We start with your goals, audience and numbers." },
  { t: "Plan", d: "A clear strategy, content plan and budget." },
  { t: "Create", d: "Content, video, ads and funnels built and launched." },
  { t: "Optimise", d: "Track, test and scale what works." },
];
export default function Process() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {steps.map((s, i) => (
        <Reveal key={s.t} delay={i * 0.08}>
          <div className="h-full rounded-3xl border border-line bg-bg2 p-6">
            <p className="font-mono text-xs text-accent">0{i + 1}</p>
            <p className="mt-6 font-display text-2xl font-bold">{s.t}</p>
            <p className="mt-2 text-sm text-muted">{s.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
