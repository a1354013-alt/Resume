import "@testing-library/jest-dom/vitest";
import { beforeAll, vi } from "vitest";

beforeAll(() => {
  // JSDOM doesn't implement scrollTo; some pages call it on mount.
  Object.defineProperty(window, "scrollTo", {
    value: vi.fn(),
    writable: true,
  });

  // JSDOM doesn't implement IntersectionObserver; some sections rely on it for reveal animations.
  class MockIntersectionObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

  // Canvas isn't supported in JSDOM by default; return null so effects bail out.
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", {
    value: () => null,
  });
});
