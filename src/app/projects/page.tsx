import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui";
import Reveal from "@/components/motion/Reveal";
import ProjectCard from "@/components/sections/ProjectCard";
import CTA from "@/components/sections/CTA";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Projects", description: "Freelance projects: Red Sea Boating, Pondy SRM Cruises, Pondy Gyp Sea Boating, Sengal Boutique Hotel." };

export default function Projects() {
  return (
    <>
      <PageHero eyebrow="Projects" title="Real brands. Real results." intro="Freelance campaigns with content, video and lead generation. Video showreels are being added." />
      <Container className="grid gap-6 py-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug}><ProjectCard project={p} index={i} /></Reveal>
        ))}
      </Container>
      <CTA />
    </>
  );
}
