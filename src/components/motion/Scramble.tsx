"use client";
import { useReduced } from "@/components/motion/useReduced";
import { useRef, useState } from "react";


const GLYPHS = "▲▼◆01$#%/\\+*";

export default function Scramble({ text, className }: { text: string; className?: string }) {
  const reduce = useReduced();
  const [out, setOut] = useState(text);
  const timer = useRef<number | null>(null);

  const run = () => {
    if (reduce) return;
    if (timer.current) window.clearInterval(timer.current);
    let frame = 0;
    timer.current = window.setInterval(() => {
      frame++;
      setOut(
        text.split("").map((c, i) => (c === " " || i < frame / 2 ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)])).join(""),
      );
      if (frame / 2 >= text.length) {
        window.clearInterval(timer.current!);
        setOut(text);
      }
    }, 28);
  };

  return (
    <span className={className} onMouseEnter={run} onFocus={run} aria-label={text}>
      <span aria-hidden>{out}</span>
    </span>
  );
}
