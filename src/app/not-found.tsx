import Link from "next/link";
export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] place-items-center px-5 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent3">404 · Market closed</p>
        <h1 className="mt-4 font-display text-6xl font-bold tracking-tighter sm:text-9xl">Page not found</h1>
        <Link href="/" className="mt-8 inline-block rounded-full bg-accent px-7 py-4 font-medium text-onaccent">Back home</Link>
      </div>
    </section>
  );
}
