import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui";
import Timeline from "@/components/sections/Timeline";
import CTA from "@/components/sections/CTA";
import { experience } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Gokul M's professional journey: founder of The Moments Lab AI Marketing Agency and earlier roles as Visual Content Specialist at Vima Insurance Brokers, digital marketer at Deivamey Digital Marketing Agency and web developer at Blackwins Tech Solutions.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://gokulm.in"}/experience` },
};

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
