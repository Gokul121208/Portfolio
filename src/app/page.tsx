import type { Metadata } from "next";
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
import JsonLd from "@/components/JsonLd";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gokulm.in";

export const metadata: Metadata = {
  alternates: { canonical: BASE },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gokul M",
  url: BASE,
  image: `${BASE}/opengraph-image`,
  jobTitle: "Digital Marketer, Forex & Futures Trader, Content Creator",
  description:
    "Founder of The Moments Lab AI Marketing Agency. Helping brands grow through social media, video production, Meta ads and AI-powered lead generation.",
  worksFor: {
    "@type": "Organization",
    name: "The Moments Lab AI Marketing Agency",
    url: BASE,
  },
  knowsAbout: [
    "Digital Marketing", "Social Media Marketing", "Video Production",
    "Meta Ads", "Lead Generation", "Forex Trading", "Futures Trading",
    "Content Creation", "AI Marketing Automation", "Website Development",
  ],
  email: "gokulamurugan40@gmail.com",
  telephone: "+919159348778",
  address: { "@type": "PostalAddress", addressCountry: "IN", addressRegion: "Puducherry" },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Gokul M",
  url: BASE,
  description: "Portfolio of Gokul M — digital marketer, Forex trader and content creator.",
  author: { "@type": "Person", name: "Gokul M" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "The Moments Lab AI Marketing Agency",
  url: BASE,
  founder: { "@type": "Person", name: "Gokul M" },
  description:
    "AI-powered marketing agency offering social media management, video production, Meta ads, lead generation, website development and marketing automation.",
  areaServed: "IN",
  serviceType: ["Social Media Marketing", "Video Production", "Meta Ads", "Lead Generation", "Website Development", "Marketing Automation"],
};

export default function Home() {
  return (
    <>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={orgSchema} />
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
