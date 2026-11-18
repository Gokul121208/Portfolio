import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://gokulm.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/experience`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/testimonials`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
  ];
  for (const p of projects) {
    if (p.noLink) continue;
    pages.push({ url: `${BASE}/projects/${p.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  }
  return pages;
}
