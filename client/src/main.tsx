import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// 動態載入 Umami analytics
const loadUmamiAnalytics = () => {
  const endpoint = import.meta.env.VITE_ANALYTICS_ENDPOINT;
  const websiteId = import.meta.env.VITE_ANALYTICS_WEBSITE_ID;

  if (endpoint && websiteId) {
    const script = document.createElement("script");
    script.defer = true;
    script.src = `${endpoint}/umami`;
    script.dataset.websiteId = websiteId;
    document.body.appendChild(script);
  }
};

loadUmamiAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
