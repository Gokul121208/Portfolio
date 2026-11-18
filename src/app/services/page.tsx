import type { Metadata } from "next";
import { PageHero, Container, SectionHead } from "@/components/ui";
import ServiceBook from "@/components/sections/ServiceBook";
import Process from "@/components/sections/Process";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = { title: "Services", description: "Social media, content, video, ads, lead generation, websites and AI marketing automation." };

export default function Services() {
  return (
    <>
      <PageHero eyebrow="Services" title="Everything your brand needs to be seen and chosen." intro="Seven services that work alone or as one connected growth engine." />
      <Container className="py-8"><ServiceBook /></Container>
      <Container className="py-24">
        <SectionHead eyebrow="How I work" title="A simple, measurable process." />
        <Process />
      </Container>
      <CTA />
    </>
  );
}
