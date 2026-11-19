import type { Metadata } from "next";
import { PageHero, Container } from "@/components/ui";
import Reveal from "@/components/motion/Reveal";
import ProjectCard from "@/components/sections/ProjectCard";
import CTA from "@/components/sections/CTA";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Client Projects",
  description: "Real-world digital marketing campaigns by Gokul M: social media, video production and lead generation for Red Sea Boating, Pondy SRM Cruises, Sengal Boutique Hotel and Pondy Gyp Sea Boating.",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://gokulm.in"}/projects` },
};

export default function Projects() {
  const orderedProjects = [
    ...projects.filter((project) => project.video),
    ...projects.filter((project) => !project.video),
  ];

  return (
    <>
      <PageHero eyebrow="Projects" title="Real brands. Real results." intro={<><strong className="font-semibold text-accentink">{profile.agency}</strong> · Freelance campaigns with content, video and lead generation.</>} />
      <Container className="grid gap-6 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {orderedProjects.map((p, i) => (
          <Reveal key={p.slug} className="h-full"><ProjectCard project={p} index={i} /></Reveal>
        ))}
      </Container>
      <CTA />
    </>
  );
}
