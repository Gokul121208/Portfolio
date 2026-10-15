import Hero from "@/components/hero/Hero";
import Stats from "@/components/sections/Stats";
import ServiceMarquee from "@/components/sections/ServiceMarquee";
import ServicesTeaser from "@/components/sections/ServicesTeaser";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import TestimonialsTeaser from "@/components/sections/TestimonialsTeaser";
import CTA from "@/components/sections/CTA";
import PriceLine from "@/components/sections/PriceLine";

export default function Home() {
  return (
    <>
      <PriceLine />
      <Hero />
      <Stats />
      <ServiceMarquee />
      <ServicesTeaser />
      <FeaturedProjects />
      <TestimonialsTeaser />
      <CTA />
    </>
  );
}
