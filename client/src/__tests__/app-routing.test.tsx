import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("App routing", () => {
  test("renders Home route", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    const headings = await screen.findAllByRole("heading");

    expect(headings.length).toBeGreaterThan(0);
  });

  test("renders Projects route", async () => {
    window.history.pushState({}, "", "/projects");

    render(<App />);

    const headings = await screen.findAllByRole("heading");

    expect(headings.length).toBeGreaterThan(0);
  });

  test("renders Experience route", async () => {
    window.history.pushState({}, "", "/experience");

    render(<App />);

    expect(
      await screen.findByRole("heading", { name: /Work Experience/i })
    ).toBeInTheDocument();
  });

  test("renders NotFound on unknown route (fallback)", async () => {
    window.history.pushState({}, "", "/unknown");

    render(<App />);

    const notFoundTexts = await screen.findAllByText(/page not found/i);

    expect(notFoundTexts.length).toBeGreaterThan(0);
  });
});
