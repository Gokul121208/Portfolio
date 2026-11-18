import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui";
import TestimonialGrid from "@/components/sections/TestimonialGrid";
import CTA from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Client Testimonials",
  description: "Real feedback from business owners who worked with Gokul M on social media marketing, video production, Meta ads and digital campaigns — in their own words.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://gokulm.in"}/testimonials` },
};

export default function Testimonials() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title="Trusted by the brands I've built with." intro="Kind words from the owners of the brands I've worked with." />
      <Container className="py-8"><TestimonialGrid /></Container>
      <CTA />
    </>
  );
}
