import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
// Security middleware
import helmet from "helmet";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function resolveStaticPath(): string {
  // In production, the server bundle lives in `dist/` and static files are in
  // `dist/public/` (relative to this file's directory).
  if (process.env.NODE_ENV === "production") {
    return path.resolve(__dirname, "public");
  }

  // In development, we still serve `dist/public/` if it exists (useful for
  // validating the production server locally).
  return path.resolve(__dirname, "..", "dist", "public");
}

function setIndexNoCacheHeaders(res: express.Response) {
  // Ensure HTML is always revalidated (avoid stale SPA shell after deploy).
  res.setHeader("Cache-Control", "no-cache, max-age=0, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.disable("x-powered-by");

  // Security headers
  // Disable CSP here because this is a static SPA and CSP configuration is deployment-specific.
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  const staticPath = resolveStaticPath();

  // 1) Long-cache hashed build assets (Vite outputs to /assets/* by default).
  app.use(
    "/assets",
    express.static(path.join(staticPath, "assets"), {
      maxAge: "365d",
      immutable: true,
      etag: false,
      index: false,
      fallthrough: true,
    })
  );

  // 2) Everything else in the static folder should be cacheable but not forever
  // (e.g. icons, manifest). IMPORTANT: do NOT let express.static serve index.html
  // with long cache headers.
  app.use(
    express.static(staticPath, {
      maxAge: "1h",
      etag: true,
      index: false,
      fallthrough: true,
    })
  );

  // Handle client-side routing - serve index.html for all routes
  // Don't cache index.html to ensure users get the latest version
  app.get("*", (req, res, next) => {
    // Only rewrite "app routes" (no file extension). Missing static files should 404.
    if (path.extname(req.path)) return next();
    if (req.path.startsWith("/assets/")) return next();

    setIndexNoCacheHeaders(res);
    res.sendFile(path.join(staticPath, "index.html"), err => {
      if (err) next(err);
    });
  });

  const port = process.env.PORT || 3000;
  const nodeEnv = process.env.NODE_ENV || "development";

  server.listen(Number(port), () => {
    console.log(`Server running on http://localhost:${port}/ [${nodeEnv}]`);
  });

  return server;
}

startServer()
  .then(server => {
    const shutdown = (signal: string) => {
      console.log(`${signal} received, shutting down gracefully...`);
      const forceExitTimer = setTimeout(() => {
        console.error("Forced shutdown after timeout.");
        process.exit(1);
      }, 10_000);
      forceExitTimer.unref();

      server.close(err => {
        clearTimeout(forceExitTimer);
        if (err) {
          console.error("Error during shutdown:", err);
          process.exit(1);
        }
        process.exit(0);
      });
    };

    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  })
  .catch(err => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
