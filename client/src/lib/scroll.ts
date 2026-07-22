export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function getPreferredScrollBehavior(): ScrollBehavior {
  return prefersReducedMotion() ? "auto" : "smooth";
}

export function scrollPageToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: getPreferredScrollBehavior(),
  });
}

export function scrollElementIntoView(target: HTMLElement) {
  target.scrollIntoView({
    behavior: getPreferredScrollBehavior(),
    block: "start",
  });
}
