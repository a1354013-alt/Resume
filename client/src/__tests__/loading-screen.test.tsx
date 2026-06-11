import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import LoadingScreen from "@/components/LoadingScreen";

describe("LoadingScreen", () => {
  test("renders an accessible loading status", () => {
    render(<LoadingScreen label="Loading portfolio..." />);

    expect(
      screen.getByRole("status", { name: "Loading portfolio..." })
    ).toBeVisible();
    expect(screen.getByText("Loading portfolio...")).toBeVisible();
  });
});
