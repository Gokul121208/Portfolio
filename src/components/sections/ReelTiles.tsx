"use client";
import { useRef } from "react";

const firstReel = "https://files.gokulm.in/build-with-goku-1-1080p.mp4";

const tiles = [
  {
    bg: "linear-gradient(160deg, var(--accent-2), transparent 70%)",
    cls: "animate-[floaty_7s_ease-in-out_infinite]",
    reel: {
      src: firstReel,
      preview: firstReel,
      poster: "/reels/build-with-goku-1.jpg",
    },
  },
  {
    bg: "linear-gradient(160deg, var(--accent), transparent 75%)",
    cls: "mt-10 animate-[floaty_9s_ease-in-out_infinite_1s]",
    reel: {
      src: "https://files.gokulm.in/Build%20With%20Goku%202.mp4",
      preview: "/reels/build-with-goku-2.mp4",
      poster: "/reels/build-with-goku-2.jpg",
    },
  },
  {
    bg: "linear-gradient(160deg, var(--accent-3), transparent 70%)",
    cls: "animate-[floaty_8s_ease-in-out_infinite_2s]",
    reel: null,
  },
];

function ReelTile({ tile, number }: { tile: (typeof tiles)[number]; number: number }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const { bg, cls, reel } = tile;
  const reelNumber = String(number).padStart(2, "0");
  const label = <span className="absolute bottom-2 left-2 font-mono text-[10px] uppercase tracking-widest text-fg/80">Reel {reelNumber}</span>;
  const box = `relative aspect-[9/16] overflow-hidden rounded-2xl border border-line ${cls}`;

  if (!reel) {
    return (
      <div aria-hidden className={box} style={{ background: bg }}>
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-fg/50 bg-bg/40 text-xs backdrop-blur">▶</span>
        </span>
        {label}
      </div>
    );
  }

  const open = () => {
    dialog.current?.showModal();
    // The click allows playback with sound.
    void player.current?.play().catch(() => {});
  };

  return (
    <>
      <button type="button" onClick={open} aria-label={`Play reel ${reelNumber} with sound`} className={`${box} cursor-pointer text-left transition-colors hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`} style={{ background: bg }}>
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={reel.preview}
          poster={reel.poster}
          autoPlay muted loop playsInline preload="none"
          aria-hidden
          onContextMenu={(e) => e.preventDefault()}
        />
        <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-bg/60 text-[10px] backdrop-blur" aria-hidden>🔊</span>
        {label}
      </button>

      <dialog
        ref={dialog}
        onClose={() => player.current?.pause()}
        onClick={(e) => e.target === dialog.current && dialog.current?.close()}
        aria-label={`Reel ${reelNumber}`}
        className="reel-dialog m-auto max-h-[100dvh] max-w-[100vw] overflow-visible bg-transparent p-0 backdrop:bg-black/80 backdrop:backdrop-blur-sm"
      >
        <div className="relative">
          <video
            ref={player}
            src={reel.src}
            poster={reel.poster}
            controls
            playsInline
            preload="none"
            controlsList="nodownload"
            onContextMenu={(e) => e.preventDefault()}
            className="block aspect-[9/16] h-[90dvh] max-w-[95vw] rounded-2xl bg-black object-contain"
          />
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close video" className="absolute -top-3 -right-3 grid h-9 w-9 place-items-center rounded-full bg-accent text-onaccent shadow-lg sm:-right-12 sm:top-0">✕</button>
        </div>
      </dialog>
    </>
  );
}

export default function ReelTiles() {
  return (
    <div className="relative mx-auto grid max-w-md grid-cols-3 gap-3 rounded-[2rem] border border-line bg-bg2 p-4 sm:p-6">
      {tiles.map((tile, i) => <ReelTile key={i} tile={tile} number={i + 1} />)}
    </div>
  );
}
