import type { StyleConfig } from "./types";

export function buildCssVariables(style: StyleConfig, selector = ".resume-page") {
  return `${selector} {
  --primary: ${style.primaryColor};
  --font-family: ${style.fontFamily};
  --body-size: ${style.bodyFontSize}px;
  --h1-size: ${style.h1FontSize}px;
  --h2-size: ${style.h2FontSize}px;
  --h3-size: ${style.h3FontSize}px;
  --line-height: ${style.lineHeight};
  --paragraph-spacing: ${style.paragraphSpacing}px;
  --list-spacing: ${style.listSpacing}px;
  --section-spacing: ${style.sectionSpacing}px;
  --page-width: ${style.pageWidth}px;
  --page-padding: ${style.pagePadding}px;
  --print-margin: ${style.printMargin}mm;
}`;
}

export const resumeCss = `
* {
  box-sizing: border-box;
}

body.export-page {
  margin: 0;
  background: #f3f4f6;
}

.resume-page {
  position: relative;
  width: min(var(--page-width), calc(100vw - 32px));
  min-height: 960px;
  margin: 28px auto;
  padding: var(--page-padding);
  overflow: visible;
  background: #fff;
  color: #1f2937;
  box-shadow: 0 14px 36px rgba(15, 23, 42, 0.13);
  font-family: var(--font-family);
  font-size: var(--body-size);
  line-height: var(--line-height);
}

.resume-page h1 {
  margin: 0 0 6px;
  color: #111827;
  font-size: var(--h1-size);
  line-height: 1.18;
  letter-spacing: 0;
}

.resume-page h1 + p {
  margin-top: 0;
  color: #64748b;
}

.resume-page h2 {
  margin: var(--section-spacing) 0 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.5);
  color: var(--primary);
  font-size: var(--h2-size);
  line-height: 1.35;
}

.resume-page h3 {
  margin: 16px 0 6px;
  color: #111827;
  font-size: var(--h3-size);
  line-height: 1.4;
}

.resume-page p {
  margin: var(--paragraph-spacing) 0;
}

.resume-page ul {
  margin: var(--list-spacing) 0 12px;
  padding-left: 20px;
  list-style: disc;
}

.resume-page ol {
  margin: var(--list-spacing) 0 12px;
  padding-left: 20px;
  list-style: decimal;
}

.resume-page li {
  margin: 4px 0;
}

.resume-page a {
  color: var(--primary);
  text-decoration: none;
}

.resume-separator {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.35em;
  color: var(--primary);
  font-weight: 700;
  opacity: 0.78;
}

.resume-page code {
  padding: 1px 4px;
  border-radius: 4px;
  background: #f1f5f9;
  font-size: 0.92em;
}

.resume-page pre {
  overflow: auto;
  padding: 12px;
  border-radius: 8px;
  background: #111827;
  color: #f9fafb;
}

.resume-page hr {
  border: 0;
  border-top: 1px solid rgba(148, 163, 184, 0.5);
  margin: 18px 0;
}

.resume-avatar {
  position: absolute;
  z-index: 2;
  margin: 0;
}

.resume-avatar img {
  display: block;
  width: 96px;
  height: 96px;
  object-fit: cover;
}

.resume-image {
  margin: 16px 0;
}

.resume-image img,
.resume-inline-image {
  max-width: 100%;
  border-radius: 8px;
}

.template-apple {
  padding-top: calc(var(--page-padding) + 8px);
  border-radius: 24px;
  background:
    radial-gradient(circle at top right, color-mix(in srgb, var(--primary) 18%, transparent), transparent 34%),
    #ffffff;
}

.template-apple .resume-avatar {
  top: 42px;
  right: 46px;
}

.template-apple:has(.resume-avatar) h1,
.template-apple:has(.resume-avatar) h1 + p,
.template-minimal:has(.resume-avatar) h1,
.template-minimal:has(.resume-avatar) h1 + p,
.template-business:has(.resume-avatar) h1,
.template-business:has(.resume-avatar) h1 + p,
.template-sweet:has(.resume-avatar) h1,
.template-sweet:has(.resume-avatar) h1 + p,
.template-cyberpunk:has(.resume-avatar) h1,
.template-cyberpunk:has(.resume-avatar) h1 + p {
  padding-right: 132px;
}

.template-apple .resume-avatar img {
  border-radius: 28px;
  box-shadow: 0 14px 28px rgba(15, 23, 42, 0.16);
}

.template-minimal {
  border: 1px solid #e5e7eb;
  box-shadow: none;
}

.template-minimal h2 {
  border-bottom-color: #111827;
  color: #111827;
  text-transform: uppercase;
}

.template-minimal .resume-avatar {
  top: 40px;
  right: 40px;
}

.template-minimal .resume-avatar img {
  border-radius: 999px;
  filter: grayscale(1);
}

.template-business {
  border-top: 12px solid var(--primary);
  background: linear-gradient(90deg, color-mix(in srgb, var(--primary) 8%, #ffffff), #ffffff 36%);
}

.template-business h1 {
  color: var(--primary);
}

.template-business h2 {
  border-bottom: 2px solid var(--primary);
}

.template-business .resume-avatar {
  top: 44px;
  right: 48px;
}

.template-business .resume-avatar img {
  border-radius: 10px;
  border: 3px solid #fff;
  box-shadow: 0 8px 22px rgba(30, 58, 138, 0.22);
}

.template-sweet {
  color: #5b213b;
  border-radius: 18px;
  background:
    radial-gradient(circle at 92% 8%, rgba(244, 114, 182, 0.25), transparent 28%),
    linear-gradient(180deg, #fff7fb, #ffffff 42%);
}

.template-sweet h1,
.template-sweet h2,
.template-sweet h3 {
  color: #be185d;
}

.template-sweet h2 {
  border-bottom: 1px dashed color-mix(in srgb, var(--primary) 55%, #f9a8d4);
}

.template-sweet .resume-avatar {
  top: 42px;
  right: 46px;
}

.template-sweet .resume-avatar img {
  border-radius: 999px;
  border: 5px solid #fff;
  box-shadow: 0 0 0 3px #f9a8d4;
}

.template-cyberpunk {
  color: #050505;
  background:
    linear-gradient(90deg, rgba(0, 0, 0, 0.07) 1px, transparent 1px),
    linear-gradient(180deg, rgba(0, 0, 0, 0.07) 1px, transparent 1px),
    linear-gradient(135deg, transparent 0 18px, #fff200 18px);
  background-size: 28px 28px, 28px 28px, auto;
  border: 2px solid #050505;
  border-radius: 0;
  box-shadow: 12px 12px 0 #050505, 0 22px 42px rgba(0, 0, 0, 0.22);
  font-family: "Cascadia Code", "Consolas", "Microsoft YaHei", "PingFang SC", monospace;
  isolation: isolate;
}

.template-cyberpunk::before {
  content: "";
  position: absolute;
  top: 18px;
  left: var(--page-padding);
  width: 34%;
  height: 12px;
  background: repeating-linear-gradient(90deg, #050505 0 10px, transparent 10px 14px);
  clip-path: polygon(14px 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
  opacity: 0.9;
}

.template-cyberpunk::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(135deg, transparent 0 72%, rgba(255, 43, 214, 0.42) 72% 73%, transparent 73%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0 1px, transparent 1px 5px);
  pointer-events: none;
}

.template-cyberpunk h1,
.template-cyberpunk h2,
.template-cyberpunk h3,
.template-cyberpunk p,
.template-cyberpunk li {
  color: inherit;
}

.template-cyberpunk h1 {
  display: inline-block;
  margin-top: 18px;
  color: #050505;
  font-weight: 900;
  text-transform: uppercase;
  text-shadow: 2px 0 rgba(0, 229, 255, 0.68), -2px 0 rgba(255, 43, 214, 0.68), 0 3px 0 rgba(0, 0, 0, 0.08);
}

.template-cyberpunk h1 + p {
  display: block;
  width: fit-content;
  max-width: 78%;
  margin: 10px 0 22px;
  padding: 8px 14px;
  background: #050505;
  color: #fff200;
  font-weight: 700;
  clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
}

.template-cyberpunk h2 {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: calc(var(--section-spacing) + 4px);
  padding: 8px 16px;
  border-bottom: 0;
  background: #050505;
  color: #fff200;
  font-weight: 900;
  text-shadow: 1.5px 0 rgba(0, 229, 255, 0.62), -1.5px 0 rgba(255, 43, 214, 0.62);
  clip-path: polygon(14px 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
}

.template-cyberpunk h2::after {
  content: "";
  flex: 1;
  height: 2px;
  min-width: 52px;
  background: #fff200;
  box-shadow: 5px 5px 0 #ff2bd6;
}

.template-cyberpunk h3 {
  width: fit-content;
  padding: 4px 10px;
  border: 2px solid #050505;
  background: #fff200;
  box-shadow: 5px 5px 0 #050505;
  font-weight: 800;
}

.template-cyberpunk a {
  color: #050505;
  font-weight: 800;
  text-decoration: underline;
  text-decoration-thickness: 3px;
  text-decoration-color: #ff2bd6;
  text-underline-offset: 3px;
}

.template-cyberpunk p,
.template-cyberpunk li {
  font-weight: 600;
}

.template-cyberpunk ul,
.template-cyberpunk ol {
  padding-left: 24px;
}

.template-cyberpunk li::marker {
  color: #ff2bd6;
}

.template-cyberpunk code {
  border: 1px solid #050505;
  border-radius: 0;
  background: #050505;
  color: #fff200;
}

.template-cyberpunk pre {
  border: 2px solid #fff200;
  border-radius: 0;
  background: #050505;
  color: #fff200;
  box-shadow: 8px 8px 0 #ff2bd6;
}

.template-cyberpunk hr {
  height: 10px;
  border: 0;
  background: repeating-linear-gradient(90deg, #050505 0 18px, transparent 18px 26px);
}

.template-cyberpunk .resume-avatar {
  top: 42px;
  right: 46px;
}

.template-cyberpunk .resume-avatar img {
  border-radius: 0;
  border: 3px solid #050505;
  filter: saturate(1.35) contrast(1.12);
  box-shadow: 8px 8px 0 #ff2bd6, -5px -5px 0 #00e5ff;
}

@media print {
  html,
  body,
  body.export-page {
    width: auto !important;
    height: auto !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: visible !important;
    background: #fff;
  }

  .topbar,
  .template-bar,
  .app-toolbar,
  .split-workspace > .control-pane,
  .control-sidebar,
  .preview-toolbar,
  .panel-heading,
  .editor-panel,
  .settings-panel {
    display: none !important;
  }

  .app-shell,
  .workspace,
  .split-workspace,
  .preview-workspace,
  .preview-panel,
  .preview-canvas,
  .preview-scale-box {
    display: block !important;
    padding: 0 !important;
    width: auto !important;
    height: auto !important;
    min-height: 0 !important;
    border: 0 !important;
    box-shadow: none !important;
    background: #fff !important;
    filter: none !important;
    overflow: visible !important;
    transform: none !important;
  }

  .resume-page {
    width: auto;
    min-height: auto;
    margin: 0;
    padding: var(--print-margin);
    overflow: visible;
    box-shadow: none;
    transform: none !important;
  }

  .resume-page h1,
  .resume-page h2,
  .resume-page h3 {
    break-after: avoid;
    page-break-after: avoid;
  }

  .resume-page h2,
  .resume-page h3,
  .resume-page p,
  .resume-page li {
    break-inside: avoid;
    page-break-inside: avoid;
  }

  @page {
    size: A4;
    margin: 0;
  }
}
`;
