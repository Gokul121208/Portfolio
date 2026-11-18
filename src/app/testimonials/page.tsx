import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui";
import TestimonialGrid from "@/components/sections/TestimonialGrid";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = { title: "Testimonials", description: "What clients say about working with Gokul M." };

export default function Testimonials() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title="Trusted by the brands I've built with." intro="Kind words from the owners of the brands I've worked with." />
      <Container className="py-8"><TestimonialGrid /></Container>
      <CTA />
    </>
  );
}
