import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui";
import Reveal from "@/components/motion/Reveal";
import ProjectCard from "@/components/sections/ProjectCard";
import CTA from "@/components/sections/CTA";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

export const metadata: Metadata = { title: "Projects", description: "Freelance projects: Red Sea Boating, Pondy SRM Cruises, Pondy Gyp Sea Boating, Sengal Boutique Hotel." };

export default function Projects() {
  return (
    <>
      <PageHero eyebrow="Projects" title="Real brands. Real results." intro={<><strong className="font-semibold text-accentink">{profile.agency}</strong> · Freelance campaigns with content, video and lead generation. Showreels are landing soon.</>} />
      <Container className="grid gap-6 py-8 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug}><ProjectCard project={p} index={i} /></Reveal>
        ))}
      </Container>
      <CTA />
    </>
  );
}
