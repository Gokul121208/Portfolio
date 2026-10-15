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
      "pondy-gyp-sea-boating",
      "sengal-boutique-hotel",
    ]);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
    expect(getProject("pondy-gyp-sea-boating")?.ongoing).toBe(true);
    expect(getProject("nope")).toBeUndefined();
  });
  test("services", () => {
    expect(services).toHaveLength(7);
    expect(whatsappOptions.length).toBe(8);
  });
  test("profile", () => {
    expect(profile.name).toBe("Gokul M");
    expect(profile.whatsapp).toBe("919159348778");
    expect(profile.email).toBe("gokulamurugan40@gmail.com");
  });
  test("experience has both roles", () => {
    expect(experience.map((e) => e.company)).toEqual(["VIMA Insurance Brokers", "Black Lens Tech Solution"]);
  });
  test("placeholders are flagged", () => {
    expect(testimonials.every((t) => t.placeholder)).toBe(true);
    expect(profile.stats.every((s) => s.placeholder)).toBe(true);
  });
});
