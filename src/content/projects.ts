import type { Project } from "./types";

// Completed projects first; ongoing work goes last.
export const projects: Project[] = [
  {
    slug: "red-sea-boating",
    name: "Red Sea Boating",
    tagline: "Waves of attention for a water-sports brand",
    summary: "End-to-end social media management and video production, with lead generation turning views into booking enquiries.",
    services: ["Social Media Management", "Video Production", "Lead Generation"],
    accent: "accent",
  },
  {
    slug: "pondy-srm-cruises",
    name: "Pondy SRM Cruises",
    tagline: "A full marketing engine for cruise experiences",
    summary: "Content planning, social media, video, Meta ads, lead generation and automation working as one connected system.",
    services: ["Content Planning", "Social Media Management", "Video Production", "Meta Ads", "Lead Generation", "Automation"],
    accent: "accent2",
  },
  {
    slug: "sengal-boutique-hotel",
    name: "Sengal Boutique Hotel",
    tagline: "Giving a boutique stay a voice online",
    summary: "Social media management that presents the hotel's character and keeps guests engaged between stays.",
    services: ["Social Media Management"],
    accent: "accent",
  },
  {
    slug: "nr-congress-election-campaign",
    name: "NR Congress Election Campaign",
    tagline: "One part of a larger election campaign",
    summary:
      "Worked with NR Congress on one part of their election campaign. This was a contribution to the campaign, not the full campaign.",
    services: ["Election Campaign Support"],
    accent: "accent2",
  },
  {
    slug: "pondy-gyp-sea-boating",
    name: "Pondy Gyp Sea Boating",
    tagline: "Ongoing: ads and video driving daily enquiries",
    summary: "Video production and Meta ads focused on a steady flow of qualified leads. This partnership is ongoing.",
    services: ["Video Production", "Meta Ads", "Lead Generation"],
    ongoing: true,
    accent: "accent3",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
