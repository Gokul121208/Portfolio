import { describe, expect, test } from "vitest";
import { profile } from "./profile";
import { services, whatsappOptions } from "./services";
import { projects, getProject } from "./projects";
import { testimonials } from "./testimonials";
import { experience } from "./experience";

describe("content", () => {
  test("projects", () => {
    expect(projects.map((p) => p.slug)).toEqual([
      "red-sea-boating",
      "pondy-srm-cruises",
      "sengal-boutique-hotel",
      "nr-congress-election-campaign",
      "pondy-gyp-sea-boating", // ongoing work goes last, after the completed projects
    ]);
    expect(projects.at(-1)?.ongoing).toBe(true);
    expect(projects.slice(0, -1).every((p) => !p.ongoing)).toBe(true);    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(getProject("pondy-gyp-sea-boating")?.ongoing).toBe(true);
    expect(getProject("nr-congress-election-campaign")?.name).toBe("NR Congress Election Campaign");
    expect(getProject("nope")).toBeUndefined();
  });
  test("services", () => {
    expect(services).toHaveLength(7);
    expect(whatsappOptions.length).toBe(8);
  });
  test("profile", () => {
    expect(profile.name).toBe("Gokul M");
    expect(profile.whatsapp).toBe("919159348778");
    expect(profile.email).toBe("goku@gokulm.in");
  });
  test("experience lists the founded company and all three jobs", () => {
    expect(experience.map((e) => e.company)).toEqual([
      "The Moments Lab AI Marketing Agency",
      "Vima Insurance Brokers Pvt Ltd",
      "Deivamey Digital Marketing Agency",
      "Blackwins Tech Solutions",
    ]);
    const byCompany = Object.fromEntries(experience.map((e) => [e.company, e]));
    expect(byCompany["The Moments Lab AI Marketing Agency"]).toMatchObject({ title: "Founder", duration: "2025 – Present" });
    expect(byCompany["Vima Insurance Brokers Pvt Ltd"].title).toBe("Visual Content Specialist & Executive");
    expect(byCompany["Deivamey Digital Marketing Agency"].title).toBe("Content Specialist & Performance Marketer");
    expect(byCompany["Blackwins Tech Solutions"].title).toBe("Digital Marketing Intern");
  });
  test("testimonials are the four client owners; stats stay flagged as placeholders", () => {
    expect(testimonials.map((t) => t.name)).toEqual(["Madhan S", "Rajesh", "Thilaga", "Kanchan"]);
    expect(profile.stats.every((s) => s.placeholder)).toBe(true);
  });
});
