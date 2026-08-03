import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Resume from "@/pages/Resume";
import {
  certificationGroups,
  getCertificationItems,
} from "@/data/certifications";

afterEach(() => cleanup());

const googleCoreCompactNames: Record<string, string> = {
  "google-analytics-certification": "分析認證",
  "google-ads-measurement-certification": "評估認證",
  "google-ads-search-certification": "搜尋廣告認證",
  "google-ads-display-certification": "多媒體廣告認證",
};

function requireSeedData<T>(value: T | undefined): T {
  if (!value) {
    throw new Error("Google certification seed data missing");
  }

  return value;
}

const googleGroup = requireSeedData(
  certificationGroups.find(
    group => group.id === "google-digital-marketing-analytics"
  )
);
const googleCoreGroup = requireSeedData(
  googleGroup.subgroups?.find(
    subgroup => subgroup.id === "google-core-certifications"
  )
);
const googleBadgeGroup = requireSeedData(
  googleGroup.subgroups?.find(
    subgroup => subgroup.id === "google-professional-digital-badges"
  )
);
const googleOtherGroup = requireSeedData(
  googleGroup.subgroups?.find(
    subgroup => subgroup.id === "other-google-certifications"
  )
);

function expectTextOnce(container: HTMLElement, text: string) {
  expect(within(container).getAllByText(text)).toHaveLength(1);
}

function expectTextAbsent(container: HTMLElement, text: string) {
  expect(within(container).queryByText(text)).toBeNull();
}

function getCertificationSection() {
  const firstCard = screen.getAllByTestId("certification-group")[0];
  const container = firstCard.closest("section");

  if (!container) {
    throw new Error("Certification section missing");
  }

  return container;
}

function getGoogleCertificationCard(section: HTMLElement) {
  const googleCard = within(section)
    .getByRole("heading", { name: googleGroup.title })
    .closest("article");

  if (!googleCard) {
    throw new Error("Google certification card missing");
  }

  return googleCard;
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

  test("renders exactly four primary certification cards with the required headings", () => {
    render(<Resume />);

    const section = getCertificationSection();

    expect(within(section).getAllByTestId("certification-group")).toHaveLength(
      4
    );

    for (const group of certificationGroups) {
      expect(
        within(section).getByRole("heading", { name: group.title })
      ).toBeVisible();
    }

    expect(within(section).queryByText("其他證照與認證")).toBeNull();
  });

  test("renders non-Google certification cards without duplicating their credentials", () => {
    render(<Resume />);

    const section = getCertificationSection();
    const nonGoogleGroups = certificationGroups.filter(
      group => group.id !== googleGroup.id
    );

    for (const group of nonGoogleGroups) {
      const card = within(section)
        .getByRole("heading", { name: group.title })
        .closest("article");

      if (!card) {
        throw new Error(`Certification card missing: ${group.id}`);
      }

      for (const item of group.items ?? []) {
        expectTextOnce(card, item.nameZh ?? item.name);
        expectTextOnce(section, item.nameZh ?? item.name);
      }
    }

    expect(
      within(section).queryByText("PIMS 個人資料管理制度專業訓練證書")
    ).toBeNull();
  });

  test("renders Google card collapsed with four core credentials and summary", () => {
    render(<Resume />);

    const section = getCertificationSection();
    const googleCard = getGoogleCertificationCard(section);

    expect(
      within(googleCard).getByRole("heading", { name: googleCoreGroup.title })
    ).toBeVisible();

    for (const credential of googleCoreGroup.items) {
      expectTextOnce(googleCard, credential.nameEn ?? credential.name);
      expectTextOnce(
        googleCard,
        googleCoreCompactNames[credential.id] ?? credential.nameZh ?? ""
      );
    }

    for (const badge of googleBadgeGroup.items) {
      expectTextAbsent(googleCard, badge.name);
    }

    for (const credential of googleOtherGroup.items) {
      expectTextAbsent(googleCard, credential.name);
    }

    expect(
      within(googleCard).getByText(
        "另持有 4 項專業數位徽章與 1 項其他 Google 認證"
      )
    ).toBeVisible();

    const toggle = within(googleCard).getByRole("button", {
      name: "展開查看 5 項認證與徽章",
    });

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveAttribute("aria-controls");
    expect(
      within(googleCard).queryByRole("heading", { name: "專業數位徽章" })
    ).toBeNull();
    expect(
      within(googleCard).queryByRole("heading", { name: "其他 Google 認證" })
    ).toBeNull();
  });

  test("expands and collapses Google additional certifications and badges", async () => {
    const user = userEvent.setup();
    render(<Resume />);

    const section = getCertificationSection();
    const googleCard = getGoogleCertificationCard(section);
    const toggle = within(googleCard).getByRole("button", {
      name: "展開查看 5 項認證與徽章",
    });

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(toggle).toHaveTextContent("收合認證與徽章");
    expect(
      within(googleCard).getByRole("heading", { name: "專業數位徽章" })
    ).toBeVisible();
    expect(
      within(googleCard).getByRole("heading", { name: "其他 Google 認證" })
    ).toBeVisible();

    for (const badge of googleBadgeGroup.items) {
      expectTextOnce(googleCard, badge.name);
    }

    for (const credential of googleOtherGroup.items) {
      expectTextOnce(googleCard, credential.name);
    }

    for (const credential of googleCoreGroup.items) {
      expectTextOnce(googleCard, credential.nameEn ?? credential.name);
    }

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(toggle).toHaveTextContent("展開查看 5 項認證與徽章");

    for (const badge of googleBadgeGroup.items) {
      expectTextAbsent(googleCard, badge.name);
    }

    for (const credential of googleOtherGroup.items) {
      expectTextAbsent(googleCard, credential.name);
    }
  });

  test("renders each credential exactly once when Google disclosure is open", async () => {
    const user = userEvent.setup();
    render(<Resume />);

    const section = getCertificationSection();
    const googleCard = getGoogleCertificationCard(section);

    await user.click(
      within(googleCard).getByRole("button", {
        name: "展開查看 5 項認證與徽章",
      })
    );

    const normalizedNames = getNormalizedRenderedCertificationNames();

    expect(new Set(normalizedNames).size).toBe(normalizedNames.length);

    for (const item of getCertificationItems()) {
      if (googleCoreGroup.items.some(coreItem => coreItem.id === item.id)) {
        expectTextOnce(section, item.nameEn ?? item.name);
      } else {
        expectTextOnce(section, item.nameZh ?? item.name);
      }
    }
  });
});
