import { useEffect, useRef } from "react";
import styles from "./ContactSuccess.module.css";

export default function ContactSuccess() {
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    title.current?.focus();
  }, []);

  return (
    <section
      aria-labelledby="contact-success-title"
      className={`${styles.panel} grid min-h-[20rem] min-w-0 content-center justify-items-center gap-3 rounded-3xl border border-line px-4 py-8 text-center sm:min-h-[24rem] sm:px-8 sm:py-10`}
    >
      <svg aria-hidden="true" viewBox="0 0 350 194" width="350" height="194" fill="none" className="block h-auto w-full max-w-[22rem]">
        <path d="M55 139c57-67 100-7 155-17 39-7 48-33 64-63" stroke="var(--accent-2)" strokeOpacity=".72" strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" />
        <circle cx="55" cy="139" r="8" stroke="var(--accent-2)" />
        <circle cx="274" cy="59" r="44" fill="var(--bg-2)" stroke="var(--accent)" strokeOpacity=".38" strokeDasharray="2 5" />
        <g className={styles.plane}>
          <path d="M-24-11 25 0-22 15-14 2Z" fill="var(--accent-2)" />
          <path d="m-14 2 29-1" stroke="var(--bg-2)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
        <g className={styles.arrival}>
          <circle cx="274" cy="59" r="33" fill="var(--accent)" />
          <path d="m-16 0 11 11 22-23" transform="translate(274 59) scale(.81)" stroke="var(--on-accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <path className={styles.sparkles} d="M320 24h3v3h-3zM319 103h3v3h-3zM229 38h2v2h-2zM207 72h3v3h-3z" fill="var(--accent)" />
      </svg>
      <h2
        id="contact-success-title"
        ref={title}
        tabIndex={-1}
        aria-describedby="contact-success-description"
        className="scroll-mt-24 rounded-sm font-display text-4xl leading-none font-bold tracking-tight text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:text-5xl"
      >
        Message sent!
      </h2>
      <p id="contact-success-description" className="text-muted">I&apos;ll get back to you soon.</p>
    </section>
  );
}
