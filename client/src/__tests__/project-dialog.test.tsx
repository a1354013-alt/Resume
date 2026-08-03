import { useState } from "react";
import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectDialog from "@/components/ProjectDialog";
import { projects, type Project } from "@/data/projects";

afterEach(() => cleanup());

function getProjectWithImages() {
  const project = projects.find(item => item.images && item.images.length >= 2);

  if (!project) {
    throw new Error("Seed project with images missing");
  }

  return project;
}

function ControlledProjectDialog({
  initialProject = getProjectWithImages(),
}: {
  initialProject?: Project;
}) {
  const [project, setProject] = useState<Project>(initialProject);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Open project
      </button>
      <ProjectDialog
        project={project}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onProjectChange={setProject}
      />
    </>
  );
}

async function openControlledDialog() {
  const user = userEvent.setup();

  render(<ControlledProjectDialog />);

  const openButton = screen.getByRole("button", { name: "Open project" });
  await user.click(openButton);
  const dialog = await screen.findByRole("dialog");

  return { dialog, openButton, user };
}

describe("ProjectDialog links", () => {
  test("does not render Demo/Repo buttons when demoUrl/githubUrl are missing", async () => {
    const project: Project = {
      id: "no-links",
      name: "No Links Project",
      tagline: "Tagline",
      role: "Role",
      category: "learning",
      tier: "selected",
      tierLabel: "Selected",
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
    expect(screen.getAllByText(/Microsoft SQL Server/)[0]).toBeVisible();
    expect(screen.getAllByText(/MySQL/)[0]).toBeVisible();
  });
});

describe("ProjectDialog close behavior", () => {
  test("backdrop click closes the dialog and restores focus to the opener", async () => {
    const { openButton, user } = await openControlledDialog();

    await user.click(screen.getByTestId("project-dialog-backdrop"));

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(openButton).toHaveFocus();
  });

  test("dialog-content click does not close the dialog", async () => {
    const { dialog, user } = await openControlledDialog();

    await user.click(dialog);

    expect(screen.getByRole("dialog")).toBeVisible();
  });

  test("navigation-arrow click does not close the dialog", async () => {
    const { user } = await openControlledDialog();

    await user.click(screen.getByTestId("project-dialog-next"));

    expect(screen.getByRole("dialog")).toBeVisible();
  });

  test("Escape closes the dialog and restores focus to the opener", async () => {
    const { openButton, user } = await openControlledDialog();

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(openButton).toHaveFocus();
  });

  test("nested lightbox backdrop closes only the lightbox", async () => {
    const { user } = await openControlledDialog();
    const projectDialog = screen.getByRole("dialog");
    const imageButtons = within(projectDialog).getAllByRole("button", {
      name: /Open image:/,
    });

    await user.click(imageButtons[0]);

    expect(screen.getByRole("dialog", { name: /lightbox/i })).toBeVisible();

    await user.click(screen.getByTestId("lightbox-backdrop"));

    expect(screen.queryByRole("dialog", { name: /lightbox/i })).toBeNull();
    expect(screen.getByRole("dialog")).toBeVisible();
  });
});
