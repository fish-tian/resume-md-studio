function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isExternalImageSrc(value: string) {
  return /^(?:[a-z][a-z0-9+.-]*:|\/|#)/i.test(value);
}

type MarkdownRenderOptions = {
  partitionSidebar?: boolean;
  resolveImageSrc?: (src: string) => string;
};

function getImageSrc(value: string, options: MarkdownRenderOptions) {
  if (isExternalImageSrc(value)) return value;
  return options.resolveImageSrc?.(value) || value;
}

function renderInline(value: string, options: MarkdownRenderOptions) {
  return escapeHtml(value)
    .replace(/(\s)\|(\s)/g, '$1<span class="resume-separator">|</span>$2')
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      (_match, alt: string, src: string) =>
        `<img class="resume-inline-image" src="${escapeHtml(getImageSrc(src, options))}" alt="${alt}" />`
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noreferrer">$1</a>'
    );
}

export function markdownToHtml(markdown: string, options: MarkdownRenderOptions = {}) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const preamble: string[] = [];
  const sections: Array<{ html: string; sidebar: boolean }> = [];
  let current = preamble;
  let paragraph: string[] = [];
  let listOpen = false;
  let codeOpen = false;
  let codeLines: string[] = [];
  let avatarUsed = false;
  let sectionOpen = false;
  let currentSectionInSidebar = false;
  let nextSectionInSidebar = false;

  const closeParagraph = () => {
    if (paragraph.length === 0) return;
    current.push(`<p>${renderInline(paragraph.join(" "), options)}</p>`);
    paragraph = [];
  };

  const closeList = () => {
    if (!listOpen) return;
    current.push("</ul>");
    listOpen = false;
  };

  const closeCode = () => {
    if (!codeOpen) return;
    current.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    codeLines = [];
    codeOpen = false;
  };

  const closeSection = () => {
    if (!sectionOpen) return;
    closeParagraph();
    closeList();
    current.push("</section>");
    sections.push({
      html: current.join("\n"),
      sidebar: currentSectionInSidebar,
    });
    current = preamble;
    currentSectionInSidebar = false;
    sectionOpen = false;
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (line.startsWith("```")) {
      if (codeOpen) {
        closeCode();
      } else {
        closeParagraph();
        closeList();
        codeOpen = true;
      }
      continue;
    }

    if (codeOpen) {
      codeLines.push(rawLine);
      continue;
    }

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
      current.push(
        `<figure class="${className}"><img src="${escapeHtml(getImageSrc(image[2], options))}" alt="${escapeHtml(
          image[1]
        )}" /></figure>`
      );
      continue;
    }

    if (/^---+$/.test(line)) {
      closeParagraph();
      closeList();
      current.push("<hr />");
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
        current = [`<section class="${className}">`];
        currentSectionInSidebar = nextSectionInSidebar;
        nextSectionInSidebar = false;
        sectionOpen = true;
      }
      current.push(`<h${level}>${renderInline(heading[2], options)}</h${level}>`);
      continue;
    }

    const bullet = /^[-*]\s+(.+)$/.exec(line);
    if (bullet) {
      closeParagraph();
      if (!listOpen) {
        current.push("<ul>");
        listOpen = true;
      }
      current.push(`<li>${renderInline(bullet[1], options)}</li>`);
      continue;
    }

    paragraph.push(line);
  }

  closeCode();
  closeParagraph();
  closeList();
  closeSection();

  if (!options.partitionSidebar) {
    return [...preamble, ...sections.map((section) => section.html)].join("\n");
  }

  const sidebar = sections.filter((section) => section.sidebar).map((section) => section.html);
  const main = sections.filter((section) => !section.sidebar).map((section) => section.html);

  return [
    ...preamble,
    '<div class="resume-layout">',
    '<aside class="resume-sidebar">',
    ...sidebar,
    "</aside>",
    '<main class="resume-main">',
    ...main,
    "</main>",
    "</div>",
  ].join("\n");
}

export function extractTitle(markdown: string) {
  const match = /^#\s+(.+)$/m.exec(markdown);
  return match ? match[1].trim() : "resume";
}
