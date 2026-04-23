import { useEffect } from "react";
import { profile } from "@/data/profile";

type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

interface SEOHeadProps {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalPath?: string;
  jsonLd?: JsonLd;
}

function getSiteOrigin(): string {
  const envOrigin = import.meta.env.VITE_SITE_URL as string | undefined;
  if (envOrigin && envOrigin.trim()) return envOrigin.replace(/\/+$/, "");
  if (typeof window !== "undefined" && window.location?.origin)
    return window.location.origin;
  return "";
}

function buildUrl(pathname: string): string {
  const origin = getSiteOrigin();
  if (!origin) return pathname;
  const url = new URL(pathname, origin);
  url.hash = "";
  url.search = "";
  return url.toString();
}

function withBasePath(pathname: string): string {
  // For GitHub Pages project sites, the app is served under BASE_URL (e.g. "/Resume/").
  // Canonical/meta URLs should include that base, otherwise they point to the wrong path.
  const baseUrl = import.meta.env.BASE_URL || "/";
  const base = baseUrl.replace(/\/+$/, "");
  if (!pathname.startsWith("/")) return pathname;
  if (!base || base === "/") return pathname;
  return `${base}${pathname}`;
}

export default function SEOHead({
  title,
  description,
  ogTitle,
  ogDescription,
  ogImage,
  canonicalPath,
  jsonLd,
}: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(isProperty ? "property" : "name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    const removeMetaTag = (name: string, isProperty = false) => {
      const selector = isProperty
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      document.querySelector(selector)?.remove();
    };

    setMetaTag("description", description);

    const resolvedPath =
      (canonicalPath ? withBasePath(canonicalPath) : undefined) ??
      (typeof window !== "undefined" ? window.location.pathname : "/");
    const canonicalUrl = buildUrl(resolvedPath);

    // Open Graph
    setMetaTag("og:title", ogTitle || title, true);
    setMetaTag("og:description", ogDescription || description, true);
    setMetaTag("og:type", "website", true);
    setMetaTag("og:url", canonicalUrl, true);
    if (ogImage) setMetaTag("og:image", ogImage, true);
    else removeMetaTag("og:image", true);

    // Twitter Card
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", ogTitle || title);
    setMetaTag("twitter:description", ogDescription || description);
    if (ogImage) setMetaTag("twitter:image", ogImage);
    else removeMetaTag("twitter:image");

    // Canonical
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.setAttribute("href", canonicalUrl);

    // JSON-LD (structured data)
    const ld =
      jsonLd ??
      ({
        "@context": "https://schema.org",
        "@type": "Person",
        name: profile.name,
        email: profile.contact.email,
        url: getSiteOrigin() || undefined,
        sameAs: [profile.contact.github, profile.contact.linkedin],
      } satisfies Record<string, unknown>);

    let jsonLdEl = document.querySelector('script[data-seo="jsonld"]');
    if (!jsonLdEl) {
      jsonLdEl = document.createElement("script");
      jsonLdEl.setAttribute("type", "application/ld+json");
      jsonLdEl.setAttribute("data-seo", "jsonld");
      document.head.appendChild(jsonLdEl);
    }
    jsonLdEl.textContent = JSON.stringify(ld);
  }, [
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    canonicalPath,
    jsonLd,
  ]);

  return null;
}
