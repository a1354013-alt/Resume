import { describe, expect, test } from "vitest";
import { projects, type Project } from "@/data/projects";

const expectedTierLabels: Record<Project["tier"], string> = {
  enterprise: "企業實戰專案",
  flagship: "旗艦作品",
  selected: "精選專案",
};

function expectNonEmpty(value: string, fieldName: string) {
  expect(value.trim(), `${fieldName} should not be empty`).not.toBe("");
}

describe("project data integrity", () => {
  test("uses unique project ids and consistent tier labels", () => {
    const ids = new Set<string>();

    for (const project of projects) {
      expect(ids.has(project.id), `Duplicate project id: ${project.id}`).toBe(
        false
      );
      ids.add(project.id);

      expect(project.tierLabel).toBe(expectedTierLabels[project.tier]);
    }
  });

  test("keeps project detail content complete", () => {
    for (const project of projects) {
      expectNonEmpty(project.name, `${project.id}.name`);
      expectNonEmpty(project.tagline, `${project.id}.tagline`);
      expectNonEmpty(project.role, `${project.id}.role`);
      expectNonEmpty(project.metrics, `${project.id}.metrics`);

      expect(project.technologies.length).toBeGreaterThan(0);
      for (const technology of project.technologies) {
        expectNonEmpty(technology, `${project.id}.technologies`);
      }

      expectNonEmpty(project.details.problem, `${project.id}.details.problem`);
      expectNonEmpty(
        project.details.solution,
        `${project.id}.details.solution`
      );
      expectNonEmpty(
        project.details.contribution,
        `${project.id}.details.contribution`
      );
      expectNonEmpty(project.details.result, `${project.id}.details.result`);
      expectNonEmpty(
        project.details.challenges,
        `${project.id}.details.challenges`
      );
      expectNonEmpty(
        project.details.nextSteps,
        `${project.id}.details.nextSteps`
      );
      expect(project.details.highlights.length).toBeGreaterThan(0);
    }
  });

  test("uses valid optional link URLs", () => {
    for (const project of projects) {
      for (const [fieldName, url] of Object.entries({
        demoUrl: project.details.demoUrl,
        githubUrl: project.details.githubUrl,
      })) {
        if (!url) continue;

        const parsed = new URL(url);
        expect(["http:", "https:"], `${project.id}.${fieldName}`).toContain(
          parsed.protocol
        );
      }
    }
  });

  test("distinguishes enterprise production and demo database environments", () => {
    const enterpriseProjects = projects.filter(
      project => project.productionEnvironment || project.demoEnvironment
    );

    expect(enterpriseProjects.length).toBeGreaterThan(0);

    for (const project of enterpriseProjects) {
      expect(project.productionEnvironment).toBe("Microsoft SQL Server");
      expect(project.demoEnvironment).toBe("MySQL");
    }
  });

  test("keeps image metadata non-empty without duplicate image entries", () => {
    for (const project of projects) {
      const imageKeys = new Set<string>();

      for (const image of project.images ?? []) {
        expectNonEmpty(image.src, `${project.id}.image.src`);
        expectNonEmpty(image.alt, `${project.id}.image.alt`);
        expect(image.src.startsWith("/images/projects/")).toBe(true);

        const key = `${image.src}::${image.alt}`;
        expect(
          imageKeys.has(key),
          `Duplicate image entry in ${project.id}: ${key}`
        ).toBe(false);
        imageKeys.add(key);
      }
    }
  });
});
