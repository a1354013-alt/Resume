const UMAMI_SCRIPT_ID = "umami-analytics";

function normalizeEndpoint(endpoint: string): string {
  return endpoint.replace(/\/+$/, "");
}

/**
 * Bootstraps Umami analytics if env vars are present.
 *
 * - Safe in dev/HMR: avoids injecting the same script multiple times.
 * - No-op when VITE_ANALYTICS_* is not configured.
 */
export function bootstrapUmamiAnalytics(): void {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

  if (!endpoint || !websiteId) return;

  const normalizedEndpoint = normalizeEndpoint(endpoint);
  const scriptSrc = `${normalizedEndpoint}/umami`;

  // Avoid injecting the same script multiple times (HMR, repeated imports, etc.)
  if (document.getElementById(UMAMI_SCRIPT_ID)) return;
  const existing = document.querySelector(
    `script[src="${scriptSrc}"][data-website-id="${websiteId}"]`
  );
  if (existing) return;

  const script = document.createElement("script");
  script.id = UMAMI_SCRIPT_ID;
  script.defer = true;
  script.src = scriptSrc;
  script.dataset.websiteId = websiteId;
  document.body.appendChild(script);
}
