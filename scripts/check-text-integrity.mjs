import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const allowedExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".html",
  ".css",
  ".md",
  ".mjs",
]);

const ignoredNames = new Set([
  ".git",
  "node_modules",
  "dist",
  "coverage",
]);

const issues = [];

function shouldScan(filePath) {
  return allowedExtensions.has(path.extname(filePath).toLowerCase());
}

function walk(dirPath) {
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    if (ignoredNames.has(entry.name)) continue;

    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!shouldScan(fullPath)) continue;
    scanFile(fullPath);
  }
}

function addIssue(filePath, lineNumber, label, line) {
  issues.push({
    filePath: path.relative(rootDir, filePath),
    lineNumber,
    label,
    line,
  });
}

function scanFile(filePath) {
  const contents = fs.readFileSync(filePath, "utf8");
  const lines = contents.split(/\r?\n/);

  lines.forEach((line, index) => {
    if (/[\uFFFD\uE000-\uF8FF]/u.test(line)) {
      addIssue(filePath, index + 1, "invalid-or-private-use-character", line);
    }
  });
}

walk(rootDir);

if (issues.length > 0) {
  console.error("Text integrity check failed:\n");
  for (const issue of issues) {
    console.error(
      `${issue.filePath}:${issue.lineNumber} [${issue.label}] ${issue.line}`
    );
  }
  process.exit(1);
}

console.log("Text integrity check passed.");
