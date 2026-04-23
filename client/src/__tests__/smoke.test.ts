import { describe, expect, test } from "vitest";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

describe("portfolio smoke checks", () => {
  test("profile has valid contact fields", () => {
    expect(profile.name.trim().length).toBeGreaterThan(0);
    expect(profile.contact.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(profile.contact.github).toMatch(/^https:\/\/github\.com\//);
    expect(profile.contact.linkedin).toMatch(/^https:\/\/www\.linkedin\.com\//);
  });

  test("projects are well-formed and never use empty link strings", () => {
    const ids = new Set<string>();

    for (const p of projects) {
      expect(ids.has(p.id)).toBe(false);
      ids.add(p.id);

      expect(p.id.trim().length).toBeGreaterThan(0);
      expect(p.name.trim().length).toBeGreaterThan(0);
      expect(p.tagline.trim().length).toBeGreaterThan(0);
      expect(p.technologies.length).toBeGreaterThan(0);
      expect(p.technologies.every(t => t.trim().length > 0)).toBe(true);

      if ("demoUrl" in p.details) {
        const demoUrl = p.details.demoUrl;
        if (typeof demoUrl === "string") {
          expect(demoUrl.trim()).not.toBe("");
          expect(() => new URL(demoUrl)).not.toThrow();
        }
      }
      if ("githubUrl" in p.details) {
        const githubUrl = p.details.githubUrl;
        if (typeof githubUrl === "string") {
          expect(githubUrl.trim()).not.toBe("");
          expect(() => new URL(githubUrl)).not.toThrow();
        }
      }
    }
  });
});
