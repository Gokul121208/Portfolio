import Link from "next/link";
import { getProject } from "@/content/projects";
import { Container, SectionHead } from "@/components/ui";
import Reveal from "@/components/motion/Reveal";
import ProjectCard from "./ProjectCard";

const featuredProjects = [
  getProject("pondy-gyp-sea-boating")!,
  getProject("pondy-srm-cruises")!,
];

export default function FeaturedProjects() {
  return (
    <section className="py-24 sm:py-32">
      <Container>
        <SectionHead eyebrow="Selected work" title="Recent work." intro="A look at two of my freelance campaigns." />
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.1} className="h-full">
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/projects" className="font-mono text-sm uppercase tracking-widest text-accentink hover:underline">See all projects →</Link>
        </div>
      </Container>
    </section>
  );
}
