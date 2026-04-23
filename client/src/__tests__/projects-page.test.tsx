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
    const yolo = projects.find(p => p.id === "yolo-cv");
    const erp = projects.find(p => p.id === "erp-modernization");
    if (!yolo || !erp) throw new Error("Seed projects missing");

    render(<ProjectsPage />);

    await user.type(await screen.findByLabelText("Search projects"), "YOLO");

    const list = within(getAllProjectsSection());
    expect(list.getByText(yolo.name)).toBeVisible();
    expect(list.queryByText(erp.name)).toBeNull();
  });

  test("category selection filters the main project list", async () => {
    const user = userEvent.setup();
    const yolo = projects.find(p => p.id === "yolo-cv");
    const erp = projects.find(p => p.id === "erp-modernization");
    if (!yolo || !erp) throw new Error("Seed projects missing");

    render(<ProjectsPage />);

    await user.selectOptions(await screen.findByLabelText("Category"), "ai");

    const list = within(getAllProjectsSection());
    expect(list.getByText(yolo.name)).toBeVisible();
    expect(list.queryByText(erp.name)).toBeNull();
  });

  test("technology filter narrows the main project list", async () => {
    const user = userEvent.setup();
    const yolo = projects.find(p => p.id === "yolo-cv");
    const erp = projects.find(p => p.id === "erp-modernization");
    if (!yolo || !erp) throw new Error("Seed projects missing");

    render(<ProjectsPage />);

    await user.click(await screen.findByLabelText("Technologies filter"));
    await user.click(screen.getByRole("button", { name: "YOLO" }));

    const list = within(getAllProjectsSection());
    expect(list.getByText(yolo.name)).toBeVisible();
    expect(list.queryByText(erp.name)).toBeNull();
  });
});
