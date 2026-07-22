import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import Resume from "@/pages/Resume";

afterEach(() => cleanup());

describe("Resume content consistency", () => {
  test("shows thesis oral defense passed while degree approval remains in progress", async () => {
    render(<Resume />);

    expect(
      await screen.findByText(
        "碩士論文口試已通過，目前持續進行論文修訂與學位審核程序，學位尚未完成核定。"
      )
    ).toBeVisible();
    expect(screen.queryByText(/已畢業|碩士畢業|取得碩士學位/)).toBeNull();
  });

  test("keeps Gemini Certification for Educators in the certification section", async () => {
    render(<Resume />);

    const heading = await screen.findByRole("heading", {
      name: "專業證照與認證",
    });

    const container = heading.closest("section");
    if (!container) throw new Error("Certification section missing");

    expect(
      within(container).getByText("Gemini Certification for Educators")
    ).toBeVisible();
  });
});
