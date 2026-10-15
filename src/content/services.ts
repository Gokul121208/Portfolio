import type { Service } from "./types";

export const services: Service[] = [
  { id: "social", tag: "01", title: "Social Media Management", blurb: "Calendars, community and consistent growth across every platform your audience lives on." },
  { id: "content", tag: "02", title: "Content Planning & Writing", blurb: "Strategy-led scripts, captions and long-form that sound like your brand and convert." },
  { id: "video", tag: "03", title: "Video Production & Editing", blurb: "Scroll-stopping reels and brand films, shot, cut and graded end to end." },
  { id: "ads", tag: "04", title: "Meta, Google & LinkedIn Ads", blurb: "Paid campaigns built on testing and tracking, tuned for cost per qualified lead." },
  { id: "leads", tag: "05", title: "Lead Generation", blurb: "Funnels and offers that bring in enquiries you can actually close." },
  { id: "web", tag: "06", title: "Website Development", blurb: "Fast, modern sites designed to turn visitors into customers." },
  { id: "ai", tag: "07", title: "AI Marketing Automation & Lead Nurturing", blurb: "Chatbots, follow-ups and workflows that nurture leads while you sleep." },
];

export const whatsappOptions = [
  ...services.map((s) => ({ id: s.id, title: s.title })),
  { id: "trading", title: "a Trading chat" },
];
