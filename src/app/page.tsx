import Hero from "@/components/hero/Hero";
import Stats from "@/components/sections/Stats";
import ServiceMarquee from "@/components/sections/ServiceMarquee";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import CTA from "@/components/sections/CTA";
import PriceLine from "@/components/sections/PriceLine";

export default function Home() {
  return (
    <>
      <PriceLine />
      <Hero />
      <Stats />
      <ServiceMarquee />
      <FeaturedProjects />
      <CTA />
    </>
  );
}
