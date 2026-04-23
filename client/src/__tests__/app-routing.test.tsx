import { afterEach, describe, expect, test } from "vitest";
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import App from "@/App";

afterEach(() => cleanup());

function navigate(pathname: string) {
  window.history.pushState({}, "", pathname);
}

describe("App routing", () => {
  test("renders Home route", async () => {
    navigate("/");
    render(<App />);
    await waitFor(() => {
      expect(document.getElementById("hero")).not.toBeNull();
    });
  });

  test("renders Projects route", async () => {
    navigate("/projects");
    render(<App />);
    expect(
      await screen.findByRole("heading", { name: /projects/i })
    ).toBeVisible();
  });

  test("renders NotFound on unknown route (fallback)", async () => {
    navigate("/this-route-does-not-exist");
    render(<App />);
    expect(
      await screen.findByRole("heading", { name: /page not found/i })
    ).toBeVisible();
  });
});
