import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

declare const process: {
  cwd(): string;
  env: {
    GITHUB_REPOSITORY?: string;
  };
};

const localResumeRelativePath = "local-private/resume-main.md";

type LocalFsPromises = {
  readFile(path: string, encoding: "utf8"): Promise<string>;
  readFile(path: string): Promise<Uint8Array>;
  stat(path: string): Promise<{ mtime: Date }>;
};

const importModule = new Function("specifier", "return import(specifier)") as (
  specifier: string
) => Promise<unknown>;

async function loadFsPromises() {
  return importModule("node:fs/promises") as Promise<LocalFsPromises>;
}

function normalizeFilePath(value: string) {
  return value.replace(/\\/g, "/").toLowerCase();
}

function isLocalPrivatePath(value: string) {
  const normalized = value.replace(/\\/g, "/");
  return normalized.startsWith("local-private/") && !normalized.split("/").includes("..");
}

function getContentType(path: string) {
  const extension = path.split(".").pop()?.toLowerCase();
  if (extension === "png") return "image/png";
  if (extension === "jpg" || extension === "jpeg") return "image/jpeg";
  if (extension === "webp") return "image/webp";
  if (extension === "gif") return "image/gif";
  if (extension === "svg") return "image/svg+xml";
  return "application/octet-stream";
}

function getQueryParam(url: string, name: string) {
  const queryStart = url.indexOf("?");
  if (queryStart === -1) return "";
  const pairs = url.slice(queryStart + 1).split("&");
  const prefix = `${name}=`;
  const pair = pairs.find((item) => item.startsWith(prefix));
  return pair ? pair.slice(prefix.length) : "";
}

function localResumePlugin(): Plugin {
  const root = process.cwd();
  const resumePath = `${root}/${localResumeRelativePath}`;
  const normalizedResumePath = normalizeFilePath(resumePath);

  return {
    name: "local-resume-dev-server",
    apply: "serve",
    async configureServer(server) {
      const fs = await loadFsPromises();

      server.middlewares.use("/api/local-resume", async (req, res, next) => {
        if ((req as { method?: string }).method !== "GET") {
          next();
          return;
        }

        try {
          const [markdown, stat] = await Promise.all([
            fs.readFile(resumePath, "utf8"),
            fs.stat(resumePath),
          ]);

          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.setHeader("Cache-Control", "no-store");
          res.end(
            JSON.stringify({
              markdown,
              sourcePath: localResumeRelativePath,
              updatedAt: stat.mtime.toISOString(),
            })
          );
        } catch (error) {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.setHeader("Cache-Control", "no-store");
          res.end(
            JSON.stringify({
              message: "Local resume markdown not found",
              sourcePath: localResumeRelativePath,
            })
          );
        }
      });

      server.middlewares.use("/api/local-resume-asset", async (req, res, next) => {
        if ((req as { method?: string }).method !== "GET") {
          next();
          return;
        }

        const requestUrl = (req as { url?: string }).url || "";
        const assetPath = getQueryParam(requestUrl, "path");
        const decodedAssetPath = decodeURIComponent(assetPath);

        if (!isLocalPrivatePath(decodedAssetPath)) {
          res.statusCode = 403;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify({ message: "Local asset path is not allowed" }));
          return;
        }

        try {
          const content = await fs.readFile(`${root}/${decodedAssetPath}`);
          res.statusCode = 200;
          res.setHeader("Content-Type", getContentType(decodedAssetPath));
          res.setHeader("Cache-Control", "no-store");
          res.end(content);
        } catch {
          res.statusCode = 404;
          res.setHeader("Content-Type", "application/json; charset=utf-8");
          res.end(JSON.stringify({ message: "Local asset not found" }));
        }
      });

      server.watcher.add(resumePath);
      server.watcher.on("change", (changedPath) => {
        if (normalizeFilePath(changedPath) !== normalizedResumePath) return;
        server.ws.send({
          type: "custom",
          event: "local-resume:changed",
          data: {
            sourcePath: localResumeRelativePath,
            updatedAt: new Date().toISOString(),
          },
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [localResumePlugin(), react(), tailwindcss()],
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split("/")[1]}/`
    : "/",
});
