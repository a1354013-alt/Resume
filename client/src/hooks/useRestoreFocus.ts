import { useEffect, useRef } from "react";

export function useRestoreFocus(enabled: boolean) {
  const previousActiveRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!enabled) return;
    if (typeof document === "undefined") return;

    previousActiveRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    return () => {
      previousActiveRef.current?.focus({ preventScroll: true });
    };
  }, [enabled]);
}
