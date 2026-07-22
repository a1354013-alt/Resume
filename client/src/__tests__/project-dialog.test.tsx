import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import ProjectDialog from "@/components/ProjectDialog";
import { projects, type Project } from "@/data/projects";

afterEach(() => cleanup());

describe("ProjectDialog links", () => {
  test("does not render Demo/Repo buttons when demoUrl/githubUrl are missing", async () => {
    const project: Project = {
      id: "no-links",
      name: "No Links Project",
      tagline: "Tagline",
      role: "Role",
      category: "learning",
      tier: "selected",
      tierLabel: "精選專案",
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
      />
    );

    expect(await screen.findByRole("dialog")).toBeVisible();
    expect(screen.getByText(project.name)).toBeVisible();
    expect(screen.queryByText("Screenshots")).toBeNull();

    expect(screen.queryByRole("link", { name: "Demo" })).toBeNull();
    expect(screen.queryByRole("link", { name: "Repo" })).toBeNull();
  });

  test("renders production and demo database environments clearly", async () => {
    const project = projects.find(p => p.id === "erp-change-management");
    if (!project) throw new Error("Seed project missing");

    render(
      <ProjectDialog
        project={project}
        isOpen={true}
        onClose={() => undefined}
      />
    );

    expect(await screen.findByRole("dialog")).toBeVisible();
    expect(
      screen.getByText("正式環境資料庫：Microsoft SQL Server")
    ).toBeVisible();
    expect(screen.getByText("展示版本資料庫：MySQL")).toBeVisible();
  });
});
