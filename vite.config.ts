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
