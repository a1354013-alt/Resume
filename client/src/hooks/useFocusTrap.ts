import { RefObject, useEffect } from "react";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function getFocusableElements(container: HTMLElement) {
  const nodes = Array.from(
    container.querySelectorAll<HTMLElement>(focusableSelector)
  );
  return nodes.filter(node => {
    const style = window.getComputedStyle(node);
    return style.visibility !== "hidden" && style.display !== "none";
  });
}

export function useFocusTrap(
  containerRef: RefObject<HTMLElement | null>,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof document === "undefined") return;

    const getContainer = () => containerRef.current;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const container = getContainer();
      if (!container) return;

      const focusables = getFocusableElements(container);
      if (focusables.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      const isShift = event.shiftKey;

      if (isShift) {
        if (active === first || !container.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const onFocusIn = (event: FocusEvent) => {
      const container = getContainer();
      if (!container) return;

      const target = event.target;
      if (!(target instanceof Node)) return;
      if (container.contains(target)) return;

      const focusables = getFocusableElements(container);
      (focusables[0] ?? container).focus();
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("focusin", onFocusIn);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [containerRef, enabled]);
}
