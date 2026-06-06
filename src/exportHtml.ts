import { markdownToHtml, extractTitle } from "./markdown";
import { buildCssVariables, resumeCss } from "./resumeStyles";
import type { StyleConfig, TemplateId } from "./types";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildStandaloneHtml(
  markdown: string,
  templateId: TemplateId,
  style: StyleConfig
) {
  const title = extractTitle(markdown);
  const content = markdownToHtml(markdown, { partitionSidebar: templateId === "harbor" });

  return `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(title)}</title>
    <style>
${buildCssVariables(style, ".resume-page")}
${resumeCss}
    </style>
  </head>
  <body class="export-page">
    <main class="resume-page template-${templateId}">
${content}
    </main>
  </body>
</html>`;
}
