import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
// Security middleware
// import helmet from "helmet";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Security headers (when helmet is available)
  // app.use(helmet());

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  // Static file caching configuration
  app.use(
    express.static(staticPath, {
      maxAge: "30d",
      immutable: true,
      etag: false, // Disable etag for immutable files
    })
  );

  // Handle client-side routing - serve index.html for all routes
  // Don't cache index.html to ensure users get the latest version
  app.get("*", (_req, res) => {
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  const nodeEnv = process.env.NODE_ENV || "development";

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/ [${nodeEnv}]`);
  });
}

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down gracefully...");
  process.exit(0);
});

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
