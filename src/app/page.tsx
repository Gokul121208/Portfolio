import Hero from "@/components/hero/Hero";
import IdentityScroll from "@/components/sections/IdentityScroll";
import ServiceMarquee from "@/components/sections/ServiceMarquee";
import TraderSection from "@/components/sections/TraderSection";
import CreatorSection from "@/components/sections/CreatorSection";
import MarketingBars from "@/components/sections/MarketingBars";
import FounderSection from "@/components/sections/FounderSection";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import TestimonialsTeaser from "@/components/sections/TestimonialsTeaser";
import CTA from "@/components/sections/CTA";
import PriceLine from "@/components/sections/PriceLine";

export default function Home() {
  return (
    <>
      <PriceLine />
      <Hero />
      <IdentityScroll />
      <ServiceMarquee />
      <MarketingBars />
      <TraderSection />
      <CreatorSection />
      <FounderSection />
      <FeaturedProjects />
      <TestimonialsTeaser />
      <CTA />
    </>
  );
}
