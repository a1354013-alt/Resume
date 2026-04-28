import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * ScrollToTop component that listens to route changes and scrolls to the top
 * of the page. This ensures that when navigating between pages, the user
 * always sees the content from the top rather than staying at the previous
 * scroll position.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location]);

  return null;
}
