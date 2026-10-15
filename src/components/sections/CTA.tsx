import Link from "next/link";
import { Container } from "@/components/ui";
import Magnetic from "@/components/motion/Magnetic";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import SplitText from "@/components/motion/SplitText";

export default function CTA() {
  return (
    <section className="py-24">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-bg2 p-8 text-center sm:p-20">
          <div aria-hidden className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/25 blur-[100px]" />
          <SplitText as="h2" text="Ready to make your brand the next big move?" className="relative mx-auto max-w-4xl font-display text-4xl font-bold leading-[0.95] tracking-tighter sm:text-7xl" />
          <div className="relative mt-10 flex flex-wrap justify-center gap-3">
            <Magnetic><Link href="/contact" className="inline-block rounded-full bg-accent px-7 py-4 font-medium text-onaccent">Start a project</Link></Magnetic>
            <Magnetic><a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border border-line px-7 py-4 font-medium hover:border-accent">Chat on WhatsApp</a></Magnetic>
          </div>
        </div>
      </Container>
    </section>
  );
}
