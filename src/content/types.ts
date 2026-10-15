export type Accent = "accent" | "accent2" | "accent3";
export type Project = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  services: string[];
  ongoing?: boolean;
  video?: string;
  poster?: string;
  accent: Accent;
};
export type Service = { id: string; title: string; blurb: string; tag: string };
export type Role = { company: string; title: string; duration?: string; points: string[] };
export type Testimonial = { name: string; role: string; quote: string; placeholder: true };
