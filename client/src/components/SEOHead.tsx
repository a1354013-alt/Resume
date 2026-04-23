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

    setMetaTag("description", description);
    setMetaTag(
      "viewport",
      "width=device-width, initial-scale=1.0, maximum-scale=1"
    );

    const resolvedPath =
      canonicalPath ??
      (typeof window !== "undefined" ? window.location.pathname : "/");
    const canonicalUrl = buildUrl(resolvedPath);

    // Open Graph
    setMetaTag("og:title", ogTitle || title, true);
    setMetaTag("og:description", ogDescription || description, true);
    setMetaTag("og:type", "website", true);
    setMetaTag("og:url", canonicalUrl, true);
    if (ogImage) setMetaTag("og:image", ogImage, true);

    // Twitter Card
    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", ogTitle || title);
    setMetaTag("twitter:description", ogDescription || description);
    if (ogImage) setMetaTag("twitter:image", ogImage);

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
