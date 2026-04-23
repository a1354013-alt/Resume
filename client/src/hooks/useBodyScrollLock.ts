import { useEffect, useRef } from "react";

export function useBodyScrollLock(locked: boolean) {
  const previousOverflowRef = useRef<string | null>(null);
  const previousPaddingRightRef = useRef<string | null>(null);

  useEffect(() => {
    if (!locked) return;
    if (typeof document === "undefined") return;

    const body = document.body;
    previousOverflowRef.current = body.style.overflow;
    previousPaddingRightRef.current = body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflowRef.current ?? "";
      body.style.paddingRight = previousPaddingRightRef.current ?? "";
    };
  }, [locked]);
}
