import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import Resume from "@/pages/Resume";
import {
  certificationGroups,
  getCertificationItems,
} from "@/data/certifications";

afterEach(() => cleanup());

const certificationHeadings = [
  "資訊工程與 AI",
  "Google 數位行銷與分析",
  "企業電子化與資料治理",
  "設計、CAD 與網頁工具",
];

const googleCoreCredentials = [
  {
    nameEn: "Google Analytics Certification",
    nameZh: "Google Analytics（分析）認證",
  },
  {
    nameEn: "Google Ads Measurement Certification",
    nameZh: "Google Ads 評估認證",
  },
  {
    nameEn: "Google Ads Search Certification",
    nameZh: "Google Ads 搜尋廣告認證",
  },
  {
    nameEn: "Google Ads Display Certification",
    nameZh: "Google Ads 多媒體廣告認證",
  },
];

const googleDigitalBadges = [
  "AI 技術輔助高效廣告認證",
  "運用需求開發創造需求並促成轉換",
  "從業人員適用的 AI 技術輔助搜尋廣告基礎課程徽章",
  "策略專家適用的 AI 技術輔助搜尋廣告基礎課程徽章",
];

const enterpriseCredentials = [
  "企業電子化助理規劃師",
  "企業電子化軟體應用師",
  "企業人才技能認證－電子商務概論",
  "企業電子化人才能力鑑定－網路行銷",
];

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

function expectTextOnce(container: HTMLElement, text: string) {
  expect(within(container).getAllByText(text)).toHaveLength(1);
}

function getNormalizedRenderedCertificationNames() {
  return getCertificationItems().map(item =>
    (item.nameZh ?? item.name).replace(/\s+/g, " ").trim().toLowerCase()
  );
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

  test("renders exactly four certification cards with the required headings", () => {
    render(<Resume />);

    const section = getCertificationSection();

    expect(within(section).getAllByTestId("certification-group")).toHaveLength(
      4
    );

    for (const heading of certificationHeadings) {
      expect(
        within(section).getByRole("heading", { name: heading })
      ).toBeVisible();
    }

    expect(within(section).queryByText("其他證照與認證")).toBeNull();
  });

  test("renders Google certifications as bilingual records and digital badges once", () => {
    render(<Resume />);

    const section = getCertificationSection();
    const googleCard = within(section)
      .getByRole("heading", { name: "Google 數位行銷與分析" })
      .closest("article");

    if (!googleCard) {
      throw new Error("Google certification card missing");
    }

    for (const heading of ["核心認證", "專業數位徽章", "其他 Google 認證"]) {
      expect(
        within(googleCard).getByRole("heading", { name: heading })
      ).toBeVisible();
    }

    for (const credential of googleCoreCredentials) {
      expectTextOnce(section, credential.nameEn);
      expectTextOnce(section, credential.nameZh);
    }

    for (const badge of googleDigitalBadges) {
      expectTextOnce(section, badge);
    }

    expectTextOnce(section, "Google 數位人才自學認證");
  });

  test("renders Gemini, enterprise, and PIMS certifications exactly once", () => {
    render(<Resume />);

    const section = getCertificationSection();
    const engineeringCard = within(section)
      .getByRole("heading", { name: "資訊工程與 AI" })
      .closest("article");
    const enterpriseCard = within(section)
      .getByRole("heading", { name: "企業電子化與資料治理" })
      .closest("article");

    if (!engineeringCard || !enterpriseCard) {
      throw new Error("Expected certification card missing");
    }

    expectTextOnce(engineeringCard, "Gemini Certification for Educators");
    expectTextOnce(section, "Gemini Certification for Educators");

    for (const item of enterpriseCredentials) {
      expectTextOnce(enterpriseCard, item);
      expectTextOnce(section, item);
    }

    expectTextOnce(enterpriseCard, "PIMS 個人資料管理師");
    expectTextOnce(section, "PIMS 個人資料管理師");
    expect(
      within(section).queryByText("PIMS 個人資料管理制度專業訓練證書")
    ).toBeNull();
  });

  test("does not duplicate normalized certification names in data or render", () => {
    render(<Resume />);

    const section = getCertificationSection();
    const normalizedNames = getNormalizedRenderedCertificationNames();

    expect(new Set(normalizedNames).size).toBe(normalizedNames.length);

    for (const item of getCertificationItems()) {
      expectTextOnce(section, item.nameZh ?? item.name);
    }

    const groupTitles = certificationGroups.map(group => group.title);
    expect(groupTitles).toEqual(certificationHeadings);
  });
});
