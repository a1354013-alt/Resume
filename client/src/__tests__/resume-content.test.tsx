import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import Resume from "@/pages/Resume";
import { certificationGroups } from "@/data/certifications";

afterEach(() => cleanup());

function getCertificationSection() {
  const heading = screen.getByRole("heading", {
    name: "專業證照與認證",
  });
  const container = heading.closest("section");

  if (!container) {
    throw new Error("Certification section missing");
  }

  return container;
}

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

  test("renders exactly four certification cards with no expandable overflow section", () => {
    render(<Resume />);

    const section = getCertificationSection();

    expect(within(section).getAllByTestId("certification-group")).toHaveLength(
      4
    );
    expect(
      within(section).getByRole("heading", { name: "資訊工程與 AI" })
    ).toBeVisible();
    expect(
      within(section).getByRole("heading", { name: "企業電子化與數位商務" })
    ).toBeVisible();
    expect(
      within(section).getByRole("heading", { name: "資料治理與個資保護" })
    ).toBeVisible();
    expect(
      within(section).getByRole("heading", { name: "設計、CAD 與網頁工具" })
    ).toBeVisible();
    expect(within(section).queryByText("其他證照與認證")).toBeNull();
  });

  test("renders enterprise digitalization certifications exactly once", () => {
    render(<Resume />);

    const section = getCertificationSection();
    const enterpriseGroup = certificationGroups.find(
      group => group.category === "企業電子化與數位商務"
    );

    if (!enterpriseGroup) {
      throw new Error("Enterprise digitalization group missing");
    }

    for (const item of enterpriseGroup.items) {
      expect(within(section).getAllByText(item)).toHaveLength(1);
    }
  });

  test("renders Gemini Certification for Educators exactly once under 資訊工程與 AI", () => {
    render(<Resume />);

    const section = getCertificationSection();
    const engineeringCard = within(section)
      .getByRole("heading", { name: "資訊工程與 AI" })
      .closest("article");

    if (!engineeringCard) {
      throw new Error("Engineering certification card missing");
    }

    expect(
      within(engineeringCard).getAllByText("Gemini Certification for Educators")
    ).toHaveLength(1);
    expect(
      within(section).getAllByText("Gemini Certification for Educators")
    ).toHaveLength(1);
  });

  test("renders PIMS 個人資料管理師 exactly once under 資料治理與個資保護", () => {
    render(<Resume />);

    const section = getCertificationSection();
    const privacyCard = within(section)
      .getByRole("heading", { name: "資料治理與個資保護" })
      .closest("article");

    if (!privacyCard) {
      throw new Error("Privacy certification card missing");
    }

    expect(
      within(privacyCard).getAllByText("PIMS 個人資料管理師")
    ).toHaveLength(1);
    expect(within(section).getAllByText("PIMS 個人資料管理師")).toHaveLength(1);
    expect(
      within(section).queryByText("PIMS 個人資料管理制度專業訓練證書")
    ).toBeNull();
  });

  test("does not duplicate any certification name in the rendered page", () => {
    render(<Resume />);

    const section = getCertificationSection();
    const allCertificationNames = certificationGroups.flatMap(
      group => group.items
    );

    for (const name of allCertificationNames) {
      expect(within(section).getAllByText(name)).toHaveLength(1);
    }
  });
});
