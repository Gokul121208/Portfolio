import Hero from "@/components/hero/Hero";
import Stats from "@/components/sections/Stats";
import ServicesTeaser from "@/components/sections/ServicesTeaser";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import TradingTeaser from "@/components/sections/TradingTeaser";
import TestimonialsTeaser from "@/components/sections/TestimonialsTeaser";
import CTA from "@/components/sections/CTA";
import PriceLine from "@/components/sections/PriceLine";

export default function Home() {
  return (
    <>
      <PriceLine />
      <Hero />
      <Stats />
      <ServicesTeaser />
      <FeaturedProjects />
      <TradingTeaser />
      <TestimonialsTeaser />
      <CTA />
    </>
  );
}
