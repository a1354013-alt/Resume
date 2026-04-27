import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProjectsPage from "@/pages/ProjectsPage";
import { projects } from "@/data/projects";

afterEach(() => cleanup());

function getAllProjectsSection() {
  return screen.getByRole("region", { name: "All projects" });
}

describe("ProjectsPage filtering", () => {
  test("search filters the main project list", async () => {
    const user = userEvent.setup();

    const pdf = projects.find(p => p.id === "pdf-annotation-engine");

    const smart = projects.find(p => p.id === "smart-organizer");

    if (!pdf || !smart) throw new Error("Seed projects missing");

    render(<ProjectsPage />);

    await user.type(await screen.findByLabelText("Search projects"), "pdf");

    const list = within(getAllProjectsSection());

    expect(list.getByText(pdf.name)).toBeVisible();

    expect(list.queryByText(smart.name)).toBeNull();
  });

  test("category selection filters the main project list", async () => {
    const user = userEvent.setup();

    const aiProject = projects.find(p => p.id === "covid-cough-detection");

    const nonAiProject = projects.find(p => p.id === "pdf-annotation-engine");

    if (!aiProject || !nonAiProject) throw new Error("Seed projects missing");

    render(<ProjectsPage />);

    await user.selectOptions(await screen.findByLabelText("Category"), "ai");

    const list = within(getAllProjectsSection());

    expect(list.getByText(aiProject.name)).toBeVisible();

    expect(list.queryByText(nonAiProject.name)).toBeNull();
  });

  test("technology filter narrows the main project list", async () => {
    const user = userEvent.setup();

    const pdf = projects.find(p => p.id === "pdf-annotation-engine");

    const smart = projects.find(p => p.id === "smart-organizer");

    if (!pdf || !smart) throw new Error("Seed projects missing");

    render(<ProjectsPage />);

    await user.click(await screen.findByLabelText("Technologies filter"));

    await user.click(
      screen.getByRole("button", {
        name: "TypeScript",
      })
    );

    const list = within(getAllProjectsSection());

    expect(list.getByText(pdf.name)).toBeVisible();

    expect(list.queryByText(smart.name)).toBeNull();
  });
});
