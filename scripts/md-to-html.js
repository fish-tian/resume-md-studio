import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const input = process.argv[2] || "resume-main.md";
const templateName = process.argv[3] || "resume";

const inputPath = path.resolve(root, input);
const templatePath = path.resolve(root, "templates", `${templateName}.html`);
const cssPath = path.resolve(root, "templates", `${templateName}.css`);
const outputPath = path.resolve(
  root,
  "outputs",
  `${path.basename(input, path.extname(input))}.html`
);

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function inlineMarkdown(value) {
  return escapeHtml(value)
    .replace(/(\s)\|(\s)/g, '$1<span class="resume-separator">|</span>$2')
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img class="resume-inline-image" src="$2" alt="$1" />'
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
    );
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let listOpen = false;
  let paragraph = [];
  let avatarUsed = false;
  let sectionOpen = false;
  let nextSectionInSidebar = false;

  function closeParagraph() {
    if (paragraph.length === 0) return;
    html.push(`<p>${inlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  }

  function closeList() {
    if (!listOpen) return;
    html.push("</ul>");
    listOpen = false;
  }

  function closeSection() {
    if (!sectionOpen) return;
    closeParagraph();
    closeList();
    html.push("</section>");
    sectionOpen = false;
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (/^<!--\s*sidebar\s*-->$/i.test(line)) {
      closeParagraph();
      closeList();
      nextSectionInSidebar = true;
      continue;
    }

    if (!line) {
      closeParagraph();
      closeList();
      continue;
    }

    const image = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(line);
    if (image) {
      closeParagraph();
      closeList();
      const className = avatarUsed ? "resume-image" : "resume-avatar";
      avatarUsed = true;
      html.push(
        `<figure class="${className}"><img src="${escapeHtml(image[2])}" alt="${escapeHtml(
          image[1]
        )}" /></figure>`
      );
      continue;
    }

    const heading = /^(#{1,6})\s+(.+)$/.exec(line);
    if (heading) {
      closeParagraph();
      closeList();
      const level = heading[1].length;
      if (level === 2) {
        closeSection();
        const className = nextSectionInSidebar ? "resume-section sidebar-section" : "resume-section";
        html.push(`<section class="${className}">`);
        nextSectionInSidebar = false;
        sectionOpen = true;
      }
      html.push(`<h${level}>${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }

    const bullet = /^[-*]\s+(.+)$/.exec(line);
    if (bullet) {
      closeParagraph();
      if (!listOpen) {
        html.push("<ul>");
        listOpen = true;
      }
      html.push(`<li>${inlineMarkdown(bullet[1])}</li>`);
      continue;
    }

    paragraph.push(line);
  }

  closeParagraph();
  closeList();
  closeSection();
  return html.join("\n");
}

function extractTitle(markdown, fallback) {
  const match = /^#\s+(.+)$/m.exec(markdown);
  return match ? match[1].trim() : fallback;
}

if (!fs.existsSync(inputPath)) {
  throw new Error(`Markdown file not found: ${inputPath}`);
}

if (!fs.existsSync(templatePath)) {
  throw new Error(`Template file not found: ${templatePath}`);
}

const markdown = fs.readFileSync(inputPath, "utf8");
const template = fs.readFileSync(templatePath, "utf8");
const css = fs.existsSync(cssPath) ? fs.readFileSync(cssPath, "utf8") : "";
const title = extractTitle(markdown, path.basename(input, path.extname(input)));
const content = markdownToHtml(markdown);

const output = template
  .replaceAll("{{title}}", escapeHtml(title))
  .replaceAll("{{content}}", content)
  .replaceAll("{{css}}", css);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, output, "utf8");

console.log(`Generated ${outputPath}`);
