import { describe, expect, test } from "vitest";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

describe("portfolio smoke checks", () => {
  test("profile uses real contact info", () => {
    expect(profile.name).toBe("羅揚文");
    expect(profile.contact.email).toBe("whois512139@gmail.com");
    expect(profile.contact.github).toBe("https://github.com/a1354013-alt");
    expect(profile.contact.linkedin).toBe(
      "https://www.linkedin.com/in/%E6%8F%9A%E6%96%87-%E7%BE%85-a9b9849a/"
    );
  });

  test("projects are well-formed and never use empty link strings", () => {
    const ids = new Set<string>();

    for (const p of projects) {
      expect(ids.has(p.id)).toBe(false);
      ids.add(p.id);

      expect(p.name.trim().length).toBeGreaterThan(0);
      expect(p.tagline.trim().length).toBeGreaterThan(0);
      expect(p.technologies.length).toBeGreaterThan(0);

      if ("demoUrl" in p.details) {
        expect(p.details.demoUrl).not.toBe("");
      }
      if ("githubUrl" in p.details) {
        expect(p.details.githubUrl).not.toBe("");
      }
    }
  });
});
