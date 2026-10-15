"use client";
import { useReduced } from "@/components/motion/useReduced";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import SplitText from "@/components/motion/SplitText";
import Magnetic from "@/components/motion/Magnetic";
import Reveal from "@/components/motion/Reveal";
import SceneBoundary from "./SceneBoundary";
import Ticker from "./Ticker";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { profile } from "@/content/profile";

const MarketScene = dynamic(() => import("./MarketScene"), { ssr: false });

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
    gl?.getExtension("WEBGL_lose_context")?.loseContext(); // release the probe context; browsers cap live contexts
    return !!gl;
  } catch {
    return false;
  }
}

export default function Hero() {
  const reduce = useReduced();
  const [gl, setGl] = useState(false);
  useEffect(() => setGl(!reduce && hasWebGL()), [reduce]);

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* static fallback layer: always present, canvas draws over it */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 60%, color-mix(in oklab, var(--accent-2) 35%, transparent), transparent 70%), radial-gradient(40% 40% at 20% 80%, color-mix(in oklab, var(--accent) 22%, transparent), transparent 70%)",
        }}
      />
      {gl && (
        <SceneBoundary>
          <MarketScene />
        </SceneBoundary>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-16 pt-24 sm:px-8">
        <Reveal>
          <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-line bg-bg/60 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-muted backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-accent" /> Open for new projects
          </p>
        </Reveal>
        <h1 className="flex flex-wrap items-baseline gap-x-[0.18em] font-display text-[clamp(3.6rem,13.5vw,12rem)] font-bold uppercase leading-[0.86] tracking-tighter">
          <SplitText as="span" text="Gokul" delay={0.2} />
          <span className="text-transparent [-webkit-text-stroke:2px_var(--fg)]">
            <SplitText as="span" text="M" delay={0.45} />
          </span>
          <span className="sr-only">, Digital Marketer and Trader</span>
        </h1>
        <div className="mt-6 max-w-2xl space-y-5">
          <Reveal delay={0.7}>
            <p className="text-base text-fg/70 [text-shadow:0_0_14px_var(--bg)] sm:text-lg">
              I read attention the way traders read markets: spotting the move, managing the risk, and turning it into
              growth. Founder of {profile.agency}.
            </p>
          </Reveal>
          <Reveal delay={0.85}>
            <div className="flex flex-wrap gap-3">
              <Magnetic>
                <Link href="/projects" className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-medium text-onaccent">
                  View my work <span aria-hidden>→</span>
                </Link>
              </Magnetic>
              <Magnetic>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/50 px-6 py-3.5 font-medium backdrop-blur hover:border-accent"
                >
                  WhatsApp me
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>
      <Ticker />
    </section>
  );
}
