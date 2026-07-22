import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import App from "@/App";

afterEach(() => cleanup());

function expectNoCorruptionInDocument() {
  const text = document.body.textContent ?? "";
  expect(text).not.toMatch(/[\uFFFD\uE000-\uF8FF]/u);
}

describe("App routing", () => {
  test("home route shows restored navigation labels", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(await screen.findByRole("link", { name: "首頁" })).toBeVisible();
    expect(screen.getByRole("link", { name: "履歷" })).toBeVisible();
    expect(screen.getByRole("link", { name: "工作經歷" })).toBeVisible();
    expect(screen.getByRole("link", { name: "專案" })).toBeVisible();
    expect(screen.getByRole("link", { name: "自傳" })).toBeVisible();
    expectNoCorruptionInDocument();
  });

  test("resume route shows shortened resume and CTA", async () => {
    window.history.pushState({}, "", "/resume");

    render(<App />);

    expect(
      await screen.findByRole("heading", { name: "個人摘要" })
    ).toBeVisible();
    expect(
      screen.getByRole("link", { name: /查看完整工作經驗/ })
    ).toBeVisible();
    expectNoCorruptionInDocument();
  });

  test("experience route renders the new page in Chinese", async () => {
    window.history.pushState({}, "", "/experience");

    render(<App />);

    expect(
      await screen.findByRole("heading", { name: "工作經驗" })
    ).toBeVisible();
    expect(screen.getByRole("region", { name: "完整工作經歷" })).toBeVisible();
    expectNoCorruptionInDocument();
  });

  test("biography route keeps stable headings", async () => {
    window.history.pushState({}, "", "/biography");

    render(<App />);

    expect(
      await screen.findByRole("heading", { name: "背景與定位" })
    ).toBeVisible();
    expect(
      screen.getByRole("heading", { name: "舊系統除錯與重構" })
    ).toBeVisible();
    expectNoCorruptionInDocument();
  });

  test("projects route keeps stable Chinese copy", async () => {
    window.history.pushState({}, "", "/projects");

    render(<App />);

    expect(
      await screen.findByRole("heading", { name: "工程作品與實作專案" })
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "全部作品" })).toBeVisible();
    expectNoCorruptionInDocument();
  });

  test("renders NotFound on unknown route (fallback)", async () => {
    window.history.pushState({}, "", "/unknown");

    render(<App />);

    const notFoundTexts = await screen.findAllByText(/page not found/i);

    expect(notFoundTexts.length).toBeGreaterThan(0);
  });
});
