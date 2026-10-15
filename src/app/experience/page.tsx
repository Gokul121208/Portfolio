import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui";
import Timeline from "@/components/sections/Timeline";
import CTA from "@/components/sections/CTA";
import { experience } from "@/content/experience";

export const metadata: Metadata = { title: "Experience", description: "Founder of The Moments Lab AI Marketing Agency, plus roles at Vima Insurance Brokers, Deivamey Digital Marketing Agency and Blackwins Tech Solutions." };

export default function Experience() {
  return (
    <>
      <PageHero eyebrow="Experience" title="Where I've sharpened the craft." />
      <Container className="py-8">
        <Timeline items={experience.map((e) => ({ title: e.title, sub: e.company, meta: e.duration, points: e.points }))} />
      </Container>
      <CTA />
    </>
  );
}
