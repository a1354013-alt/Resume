import { useEffect } from "react";
import { useLocation } from "wouter";
import { scrollElementIntoView } from "@/lib/scroll";

function scrollToCurrentHash() {
  const hash = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!hash) return false;

  const target = document.getElementById(hash);
  if (!target) return false;

  scrollElementIntoView(target);
  return true;
}

/**
 * Keeps route changes predictable while still supporting in-page section anchors.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    const rafId = window.requestAnimationFrame(() => {
      if (scrollToCurrentHash()) return;
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [location]);

  useEffect(() => {
    const handleHashChange = () => {
      scrollToCurrentHash();
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return null;
}
