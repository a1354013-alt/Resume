import { afterEach, describe, expect, test } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { projects } from "@/data/projects";
import ProjectsPage from "@/pages/ProjectsPage";

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

  test("tier selection filters the main project list", async () => {
    const user = userEvent.setup();

    const productionProject = projects.find(
      p => p.id === "erp-change-management"
    );
    const nonProductionProject = projects.find(
      p => p.id === "pdf-annotation-engine"
    );

    if (!productionProject || !nonProductionProject) {
      throw new Error("Seed projects missing");
    }

    render(<ProjectsPage />);

    await user.selectOptions(
      await screen.findByLabelText("Tier"),
      "production"
    );

    const list = within(getAllProjectsSection());

    expect(list.getByText(productionProject.name)).toBeVisible();
    expect(list.queryByText(nonProductionProject.name)).toBeNull();
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

describe("ProjectsPage image gallery", () => {
  test("renders 2-4 images when image data exists", async () => {
    render(<ProjectsPage />);

    const pdf = projects.find(p => p.id === "pdf-annotation-engine");
    if (!pdf || !pdf.images) throw new Error("Seed project images missing");

    const openButton = await screen.findByRole("button", {
      name: `Open project: ${pdf.name}`,
    });

    const card = openButton.closest("div");
    if (!card) throw new Error("Project card container missing");

    const imageButtons = within(card).getAllByRole("button", {
      name: /Open image:/,
    });

    expect(imageButtons.length).toBeGreaterThanOrEqual(2);
    expect(imageButtons.length).toBeLessThanOrEqual(4);
  });

  test("renders fallback placeholder when project has no images", async () => {
    render(<ProjectsPage />);

    const projectWithoutImages = projects.find(
      project => !project.images || project.images.length === 0
    );
    if (!projectWithoutImages) {
      throw new Error("Expected at least one seed project without images");
    }

    const openButton = await screen.findByRole("button", {
      name: `Open project: ${projectWithoutImages.name}`,
    });

    const card = openButton.closest("div");
    if (!card) throw new Error("Project card container missing");

    expect(within(card).getByText("系統畫面準備中")).toBeVisible();
  });

  test("renders fallback placeholder when all images fail to load", async () => {
    render(<ProjectsPage />);

    const projectWithImages = projects.find(
      project => project.id === "pdf-annotation-engine"
    );
    if (!projectWithImages || !projectWithImages.images) {
      throw new Error("Expected at least one seed project with images");
    }

    const openButton = await screen.findByRole("button", {
      name: `Open project: ${projectWithImages.name}`,
    });

    const card = openButton.closest("div");
    if (!card) throw new Error("Project card container missing");

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const imageButtons = within(card).queryAllByRole("button", {
        name: /Open image:/,
      });

      imageButtons.forEach(button => {
        const img = within(button).getByRole("img");
        fireEvent.error(img);
      });

      await Promise.resolve();
    }

    await waitFor(() => {
      expect(within(card).getByText("系統畫面準備中")).toBeVisible();
    });
  });

  test("opens and closes lightbox from a project card image", async () => {
    const user = userEvent.setup();
    render(<ProjectsPage />);

    const pdf = projects.find(p => p.id === "pdf-annotation-engine");
    if (!pdf || !pdf.images) throw new Error("Seed project images missing");

    const openButton = await screen.findByRole("button", {
      name: `Open project: ${pdf.name}`,
    });

    const card = openButton.closest("div");
    if (!card) throw new Error("Project card container missing");

    const imageButton = within(card).getByRole("button", {
      name: `Open image: ${pdf.images[0].alt}`,
    });

    await user.click(imageButton);

    expect(screen.getByRole("dialog", { name: /lightbox/i })).toBeVisible();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog", { name: /lightbox/i })).toBeNull();

    await user.click(imageButton);
    expect(screen.getByRole("dialog", { name: /lightbox/i })).toBeVisible();

    await user.click(screen.getByRole("button", { name: /close lightbox/i }));

    expect(screen.queryByRole("dialog", { name: /lightbox/i })).toBeNull();
  });
});
