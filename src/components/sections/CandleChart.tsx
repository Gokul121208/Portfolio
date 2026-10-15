"use client";
import { useReduced } from "@/components/motion/useReduced";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { makeCandles } from "@/lib/candles";

const candles = makeCandles(36, 11);

export default function CandleChart() {
  const reduce = useReduced();
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const W = 720, H = 320, step = W / candles.length;
  const y = (v: number) => H - (v / 100) * H;

  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Illustrative candlestick chart">
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1={0} x2={W} y1={H * g} y2={H * g} stroke="var(--line)" strokeDasharray="4 6" />
      ))}
      {candles.map((c, i) => {
        const up = c.close >= c.open;
        const col = up ? "var(--accent)" : "var(--accent-3)";
        const x = i * step + step / 2;
        return (
          <motion.g
            key={i}
            style={{ originY: `${y((c.open + c.close) / 2)}px`, originX: `${x}px` }}
            initial={reduce ? false : { scaleY: 0, opacity: 0 }}
            animate={inView || reduce ? { scaleY: 1, opacity: 1 } : {}}
            transition={{ delay: i * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <line x1={x} x2={x} y1={y(c.high)} y2={y(c.low)} stroke={col} strokeWidth={1.5} />
            <rect x={x - step * 0.3} width={step * 0.6} y={y(Math.max(c.open, c.close))} height={Math.max(Math.abs(y(c.open) - y(c.close)), 2)} fill={col} rx={1} />
          </motion.g>
        );
      })}
    </svg>
  );
}
