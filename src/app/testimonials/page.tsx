import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui";
import TestimonialCarousel from "@/components/sections/TestimonialCarousel";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = { title: "Testimonials", description: "What clients say about working with Gokul M." };

export default function Testimonials() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title="Trusted by the brands I've built with." intro="Sample feedback shown while real client quotes are collected." />
      <Container className="py-8"><TestimonialCarousel /></Container>
      <CTA />
    </>
  );
}
