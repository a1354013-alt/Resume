import { afterEach, describe, expect, test, vi } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Lightbox from "@/components/Lightbox";
import type { ProjectImage } from "@/data/projects";

afterEach(() => cleanup());

describe("Lightbox", () => {
  test("navigates images and closes on ESC", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const images: ProjectImage[] = [
      { src: "/images/projects/pdf-engine/cover.png", alt: "Image One" },
      { src: "/images/projects/pdf-engine/annotation.png", alt: "Image Two" },
    ];

    render(
      <Lightbox
        images={images}
        initialIndex={0}
        isOpen={true}
        onClose={onClose}
      />
    );

    expect(screen.getByRole("dialog", { name: /lightbox/i })).toBeVisible();
    expect(screen.getByRole("img", { name: "Image One" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: /next image/i }));
    expect(screen.getByRole("img", { name: "Image Two" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: /previous image/i }));
    expect(screen.getByRole("img", { name: "Image One" })).toBeVisible();

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
