import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

const plugins = [react(), tailwindcss()];

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(import.meta.dirname), "");

  // Deployment targets:
  // - default (Node/Express): build client into `dist/public` (server serves this)
  // - pages (GitHub Pages): build client into `dist` (pure static output)
  const deployTarget = (env.VITE_DEPLOY_TARGET || "").toLowerCase();
  const isPages = deployTarget === "pages";

  // Base path rules:
  // - Local dev + Node/Express deploys typically use "/"
  // - GitHub Pages project site uses "/<repo-name>/"
  // Set VITE_BASE in CI (recommended) to avoid hard-coding the repo name.
  const base = env.VITE_BASE?.trim() || "/";

  return {
    plugins,
    base,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
      },
      dedupe: ["react", "react-dom"],
      preserveSymlinks: false,
    },
    envDir: path.resolve(import.meta.dirname),
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(
        import.meta.dirname,
        isPages ? "dist" : "dist/public"
      ),
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      strictPort: false, // Will find next available port if 3000 is busy
      host: true,
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
