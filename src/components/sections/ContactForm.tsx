"use client";
import { useState } from "react";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { profile } from "@/content/profile";

type State = "idle" | "pending" | "done" | "fallback";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [notice, setNotice] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = e.currentTarget;
    const data = Object.fromEntries(new FormData(f)) as Record<string, string>;
    setState("pending"); setErrors({}); setNotice("");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const body = await res.json().catch(() => ({}));
      if (res.ok) { setState("done"); f.reset(); return; }
      if (res.status === 422) { setErrors(body.fieldErrors ?? {}); setState("idle"); return; }
      if (res.status === 429) { setNotice(body.error ?? "Too many attempts. Try again shortly."); setState("idle"); return; }
      setState("fallback");
    } catch {
      setState("fallback");
    }
  }

  if (state === "done")
    return (
      <div className="grid min-h-[22rem] place-items-center rounded-3xl border border-accent bg-bg2 p-8 text-center">
        <div>
          <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-full bg-accent text-3xl text-onaccent">✓</div>
          <p className="font-display text-3xl font-bold">Message sent!</p>
          <p className="mt-2 text-muted">I&apos;ll get back to you soon.</p>
        </div>
      </div>
    );

  const field = "w-full rounded-2xl border border-line bg-bg2 px-4 py-3.5 outline-none transition-colors focus:border-accent";
  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      {(["name", "email"] as const).map((n) => (
        <div key={n}>
          <label htmlFor={n} className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">{n === "name" ? "Your name" : "Email"}</label>
          <input id={n} name={n} type={n === "email" ? "email" : "text"} autoComplete={n} className={field} aria-invalid={!!errors[n]} />
          {errors[n] && <p role="alert" className="mt-1 text-sm text-accent3">{errors[n][0]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-widest text-muted">Message</label>
        <textarea id="message" name="message" rows={6} className={field} aria-invalid={!!errors.message} />
        {errors.message && <p role="alert" className="mt-1 text-sm text-accent3">{errors.message[0]}</p>}
      </div>
      {notice && <p role="alert" className="text-sm text-accent3">{notice}</p>}
      {state === "fallback" && (
        <div role="alert" className="rounded-2xl border border-accent3 p-4 text-sm">
          Couldn&apos;t send the form right now. Reach me directly:{" "}
          <a className="text-accent underline" href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">WhatsApp</a> or{" "}
          <a className="text-accent underline" href={`mailto:${profile.email}`}>{profile.email}</a>.
        </div>
      )}
      <button disabled={state === "pending"} className="w-full rounded-full bg-accent px-7 py-4 font-medium text-onaccent transition-opacity disabled:opacity-60 sm:w-auto">
        {state === "pending" ? "Sending…" : "Send message →"}
      </button>
    </form>
  );
}
