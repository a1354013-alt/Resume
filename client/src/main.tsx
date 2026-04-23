import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// 動態載入 Umami analytics
const loadUmamiAnalytics = () => {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

  if (endpoint && websiteId) {
    const normalizedEndpoint = endpoint.replace(/\/+$/, "");
    const scriptId = "umami-analytics";

    // Avoid injecting the same script multiple times (HMR, repeated imports, etc.)
    if (document.getElementById(scriptId)) return;
    const existing = document.querySelector(
      `script[src="${normalizedEndpoint}/umami"][data-website-id="${websiteId}"]`
    );
    if (existing) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.defer = true;
    script.src = `${normalizedEndpoint}/umami`;
    script.dataset.websiteId = websiteId;
    document.body.appendChild(script);
  }
};

loadUmamiAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
