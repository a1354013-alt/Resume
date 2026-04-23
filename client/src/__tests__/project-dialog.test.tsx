import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ProjectDialog from "@/components/ProjectDialog";
import type { Project } from "@/data/projects";

afterEach(() => cleanup());

describe("ProjectDialog links", () => {
  test("does not render Demo/Repo buttons when demoUrl/githubUrl are missing", async () => {
    const project: Project = {
      id: "no-links",
      name: "No Links Project",
      tagline: "Tagline",
      role: "Role",
      category: "learning",
      tier: "bronze",
      technologies: ["TypeScript"],
      metrics: "Metrics",
      featured: false,
      details: {
        problem: "Problem",
        solution: "Solution",
        contribution: "Contribution",
        highlights: ["Highlight"],
        result: "Result",
        challenges: "Challenges",
        nextSteps: "Next steps",
      },
    };

    render(
      <ProjectDialog
        project={project}
        isOpen={true}
        onClose={() => undefined}
        getTierBadge={() => "Tier"}
      />
    );

    expect(await screen.findByRole("dialog")).toBeVisible();
    expect(screen.getByText(project.name)).toBeVisible();

    expect(screen.queryByRole("link", { name: "Demo" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Repo" })).toBeNull();
  });
});
