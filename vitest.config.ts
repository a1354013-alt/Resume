import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
    },
    dedupe: ["react", "react-dom"],
    preserveSymlinks: false,
  },
  test: {
    environment: "jsdom",
    // vmThreads keeps execution closer to Vite's module graph and avoids duplicate module identities.
    pool: "vmThreads",
    setupFiles: [
      path.resolve(import.meta.dirname, "client/src/__tests__/setup.ts"),
    ],
    css: true,
    restoreMocks: true,
    clearMocks: true,
  },
});
