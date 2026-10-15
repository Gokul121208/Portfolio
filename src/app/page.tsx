import Hero from "@/components/hero/Hero";
import Stats from "@/components/sections/Stats";
import ServiceMarquee from "@/components/sections/ServiceMarquee";
import MarketingBars from "@/components/sections/MarketingBars";
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
      <MarketingBars />
      <FeaturedProjects />
      <TestimonialsTeaser />
      <CTA />
    </>
  );
}
