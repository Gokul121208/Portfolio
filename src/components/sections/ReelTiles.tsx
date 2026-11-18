"use client";
import { useRef } from "react";

const FULL_REEL = "https://res.cloudinary.com/fi4eozvk/video/upload/v1794957737/build-with-goku-1-1080p.mp4";

// first tile plays a small looping preview; click opens the full video with sound.
// the other two are abstract stand-ins until their videos are added.
const tiles = [
  { bg: "linear-gradient(160deg, var(--accent-2), transparent 70%)", cls: "animate-[floaty_7s_ease-in-out_infinite]", reel: true },
  { bg: "linear-gradient(160deg, var(--accent), transparent 75%)", cls: "mt-10 animate-[floaty_9s_ease-in-out_infinite_1s]", reel: false },
  { bg: "linear-gradient(160deg, var(--accent-3), transparent 70%)", cls: "animate-[floaty_8s_ease-in-out_infinite_2s]", reel: false },
];

export default function ReelTiles() {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);

  const open = () => {
    dialog.current?.showModal();
    // click is a user gesture, so playing with sound is allowed
    void player.current?.play().catch(() => {});
  };
  const onClose = () => player.current?.pause();

  return (
    <>
      <div className="relative mx-auto grid max-w-md grid-cols-3 gap-3 rounded-[2rem] border border-line bg-bg2 p-4 sm:p-6">
        {tiles.map((t, i) => {
          const label = <span className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest text-fg/80">Reel 0{i + 1}</span>;
          const box = `relative aspect-[9/16] overflow-hidden rounded-2xl border border-line ${t.cls}`;
          if (!t.reel) {
            return (
              <div key={i} aria-hidden className={box} style={{ background: t.bg }}>
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-fg/50 bg-bg/40 text-xs backdrop-blur">▶</span>
                </span>
                {label}
              </div>
            );
          }
          return (
            <button key={i} type="button" onClick={open} aria-label="Play reel 01 with sound" className={`${box} cursor-pointer text-left transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`} style={{ background: t.bg }}>
              <video className="absolute inset-0 h-full w-full object-cover" src="/reels/build-with-goku-1.mp4" poster="/reels/build-with-goku-1.jpg" autoPlay muted loop playsInline preload="metadata" aria-hidden />
              <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-bg/60 text-[10px] backdrop-blur" aria-hidden>🔊</span>
              {label}
            </button>
          );
        })}
      </div>

      <dialog
        ref={dialog}
        onClose={onClose}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        aria-label="Reel 01"
        className="reel-dialog m-auto max-h-[100dvh] max-w-[100vw] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <div className="relative">
          <video ref={player} src={FULL_REEL} poster="/reels/build-with-goku-1.jpg" controls playsInline preload="none" className="block aspect-[9/16] h-[90dvh] max-w-[95vw] rounded-2xl bg-black object-contain" />
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close video" className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center rounded-full bg-accent text-onaccent shadow-lg sm:-right-12 sm:top-0">✕</button>
        </div>
      </dialog>
    </>
  );
}
