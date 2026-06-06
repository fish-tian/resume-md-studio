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

.template-minimal:has(.resume-avatar) h1,
.template-minimal:has(.resume-avatar) h1 + p,
.template-cyberpunk:has(.resume-avatar) h1,
.template-cyberpunk:has(.resume-avatar) h1 + p,
.template-aurora:has(.resume-avatar) h1,
.template-aurora:has(.resume-avatar) h1 + p,
.template-tide:has(.resume-avatar) h1,
.template-tide:has(.resume-avatar) h1 + p,
.template-notebook:has(.resume-avatar) h1,
.template-notebook:has(.resume-avatar) h1 + p,
.template-harbor:has(.resume-avatar) h1,
.template-harbor:has(.resume-avatar) h1 + p {
  padding-right: 132px;
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

.template-aurora {
  padding-top: calc(var(--page-padding) + 18px);
  color: #e5e7eb;
  background:
    radial-gradient(circle at 18% 8%, rgba(56, 189, 248, 0.42), transparent 24%),
    radial-gradient(circle at 86% 4%, rgba(129, 140, 248, 0.46), transparent 34%),
    radial-gradient(circle at 72% 88%, rgba(14, 165, 233, 0.18), transparent 28%),
    linear-gradient(180deg, #050816 0, #11113a 48%, #030712 100%);
  box-shadow: 0 24px 56px rgba(3, 7, 18, 0.45);
}

.template-aurora h1 {
  margin-top: 8px;
  color: #ffffff;
  font-size: calc(var(--h1-size) * 1.85);
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.template-aurora h1 + p {
  color: #d1d5db;
  font-weight: 600;
}

.template-aurora h2 {
  display: grid;
  grid-template-columns: minmax(120px, 0.34fr) 1fr;
  gap: 28px;
  margin-top: 36px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.74);
  border-bottom: 0;
  color: #ffffff;
  font-size: calc(var(--h2-size) * 1.1);
}

.template-aurora h2::after {
  content: "";
  align-self: center;
  height: 1px;
  background: rgba(255, 255, 255, 0.24);
}

.template-aurora h3,
.template-aurora strong {
  color: #ffffff;
}

.template-aurora p,
.template-aurora li {
  color: #c9ced8;
}

.template-aurora a {
  color: #bae6fd;
}

.template-aurora code {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
}

.template-aurora pre {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.template-aurora .resume-avatar {
  top: 58px;
  left: 58px;
}

.template-aurora:has(.resume-avatar) h1,
.template-aurora:has(.resume-avatar) h1 + p {
  margin-left: 150px;
  padding-right: 0;
}

.template-aurora .resume-avatar img {
  width: 126px;
  height: 126px;
  border-radius: 999px;
  box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.08);
}

.template-tide {
  padding-top: calc(var(--page-padding) + 150px);
  color: #253037;
  background:
    radial-gradient(120% 220px at 50% -18px, #0f8b8d 0 58%, transparent 59%),
    #ffffff;
}

.template-tide h1 {
  text-align: center;
  color: #111827;
  font-weight: 900;
}

.template-tide h1 + p {
  max-width: 76%;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  color: #4b5563;
}

.template-tide h2 {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 34px;
  border-bottom: 0;
  color: #111827;
}

.template-tide h2::after {
  content: "";
  flex: 1;
  height: 1px;
  background: #d1d5db;
}

.template-tide h3 {
  color: #111827;
}

.template-tide a {
  color: #0f8b8d;
}

.template-tide .resume-avatar {
  top: 58px;
  left: 50%;
  transform: translateX(-50%);
}

.template-tide:has(.resume-avatar) h1,
.template-tide:has(.resume-avatar) h1 + p {
  padding-right: 0;
}

.template-tide .resume-avatar img {
  width: 108px;
  height: 108px;
  border-radius: 999px;
  border: 6px solid #ffffff;
  box-shadow: 0 10px 26px rgba(15, 139, 141, 0.18);
}

.template-notebook {
  color: #111827;
  background:
    linear-gradient(#ffffff 31px, rgba(17, 24, 39, 0.045) 32px),
    #ffffff;
  background-size: 100% 32px;
  box-shadow: none;
}

.template-notebook h1 {
  color: #050505;
  font-weight: 900;
}

.template-notebook h1::after {
  content: "";
  display: block;
  width: 68px;
  height: 5px;
  margin-top: 8px;
  background: var(--primary);
}

.template-notebook h1 + p {
  color: #111827;
  font-size: 0.94em;
}

.template-notebook h2 {
  margin-top: 22px;
  padding-bottom: 0;
  border-bottom: 0;
  color: #050505;
  font-weight: 900;
}

.template-notebook h2::before {
  content: "#";
  margin-right: 8px;
  color: var(--primary);
}

.template-notebook h3 {
  color: #050505;
  font-weight: 850;
}

.template-notebook p,
.template-notebook li {
  font-size: 0.96em;
}

.template-notebook .resume-avatar {
  top: 42px;
  right: 46px;
}

.template-notebook .resume-avatar img {
  border-radius: 12px;
}

.template-harbor {
  --rail-width: 232px;
  display: grid;
  grid-template-columns: var(--rail-width) minmax(0, 1fr);
  grid-template-rows: auto auto;
  grid-auto-rows: auto;
  column-gap: 48px;
  align-content: start;
  padding-top: 64px;
  color: #2f3a45;
  background:
    linear-gradient(90deg, transparent 0 calc(var(--page-padding) + var(--rail-width) + 24px), rgba(37, 99, 235, 0.16) calc(var(--page-padding) + var(--rail-width) + 24px), rgba(37, 99, 235, 0.16) calc(var(--page-padding) + var(--rail-width) + 25px), transparent calc(var(--page-padding) + var(--rail-width) + 25px)),
    #ffffff;
}

.template-harbor::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: calc(100% - var(--page-padding) - var(--rail-width) - 34px);
  height: 196px;
  border-bottom-left-radius: 64px;
  background: linear-gradient(108deg, #1d4ed8 0%, #38bdf8 100%);
}

.template-harbor::after {
  content: "";
  position: absolute;
  top: 78px;
  left: var(--page-padding);
  width: 138px;
  height: 138px;
  border-radius: 34px;
  background: #e8f0ff;
}

.template-harbor h1 {
  position: relative;
  z-index: 1;
  grid-column: 2;
  grid-row: 1;
  margin-top: 8px;
  color: #ffffff;
  font-weight: 900;
}

.template-harbor h1 + p {
  position: relative;
  z-index: 1;
  grid-column: 2;
  grid-row: 1;
  min-height: 84px;
  margin-top: 58px;
  margin-bottom: 36px;
  color: rgba(255, 255, 255, 0.88);
  font-weight: 600;
}

.template-harbor .resume-layout {
  display: contents;
}

.template-harbor .resume-sidebar {
  grid-column: 1;
  grid-row: 2;
}

.template-harbor .resume-main {
  grid-column: 2;
  grid-row: 2;
}

.template-harbor h2 {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-top: 34px;
  border-bottom: 0;
  color: #111827;
  font-size: calc(var(--h2-size) * 1.18);
  font-weight: 900;
}

.template-harbor .sidebar-section h2 {
  margin-top: 20px;
  font-size: var(--h2-size);
}

.template-harbor .resume-sidebar .resume-section:first-child h2 {
  margin-top: 0;
}

.template-harbor h2::after {
  content: "";
  flex: 1;
  height: 1px;
  border-top: 1px dashed #d7dde7;
}

.template-harbor h3 {
  color: #111827;
  font-weight: 850;
}

.template-harbor a {
  color: #2563eb;
}

.template-harbor .resume-avatar {
  position: absolute;
  z-index: 1;
  top: 74px;
  left: calc(var(--page-padding) + (var(--rail-width) - 124px) / 2);
  margin: 0;
}

.template-harbor:has(.resume-avatar) h1,
.template-harbor:has(.resume-avatar) h1 + p {
  padding-right: 0;
}

.template-harbor .resume-avatar img {
  position: relative;
  z-index: 1;
  width: 124px;
  height: 124px;
  border-radius: 28px;
  border: 4px solid #ffffff;
  box-shadow: 20px 20px 0 #e8f0ff, 0 12px 28px rgba(37, 99, 235, 0.16);
}

@media screen and (max-width: 640px) {
  body.export-page {
    background: #f5f5f7;
  }

  .resume-page {
    width: min(var(--page-width), calc(100vw - 20px));
    min-height: 0;
    margin: 10px auto;
    padding: clamp(20px, 6vw, var(--page-padding));
    font-size: min(var(--body-size), 14px);
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.1);
  }

  .resume-page h1 {
    font-size: min(var(--h1-size), 28px);
    overflow-wrap: anywhere;
  }

  .resume-page h2 {
    font-size: min(var(--h2-size), 18px);
  }

  .resume-page h3 {
    font-size: min(var(--h3-size), 15px);
  }

  .resume-page p,
  .resume-page li,
  .resume-page a {
    overflow-wrap: anywhere;
  }

  .resume-avatar {
    position: static;
    display: block;
    margin: 0 0 14px;
  }

  .resume-avatar img {
    width: 72px;
    height: 72px;
  }

  .template-minimal:has(.resume-avatar) h1,
  .template-minimal:has(.resume-avatar) h1 + p,
  .template-cyberpunk:has(.resume-avatar) h1,
  .template-cyberpunk:has(.resume-avatar) h1 + p,
  .template-aurora:has(.resume-avatar) h1,
  .template-aurora:has(.resume-avatar) h1 + p,
  .template-tide:has(.resume-avatar) h1,
  .template-tide:has(.resume-avatar) h1 + p,
  .template-notebook:has(.resume-avatar) h1,
  .template-notebook:has(.resume-avatar) h1 + p,
  .template-harbor:has(.resume-avatar) h1,
  .template-harbor:has(.resume-avatar) h1 + p {
    margin-left: 0;
    padding-right: 0;
  }

  .template-minimal .resume-avatar,
  .template-cyberpunk .resume-avatar,
  .template-aurora .resume-avatar,
  .template-tide .resume-avatar,
  .template-notebook .resume-avatar,
  .template-harbor .resume-avatar {
    position: static;
    transform: none;
  }

  .template-cyberpunk {
    box-shadow: 6px 6px 0 #050505, 0 12px 26px rgba(0, 0, 0, 0.18);
  }

  .template-cyberpunk h1 + p {
    max-width: 100%;
  }

  .template-aurora {
    padding-top: clamp(24px, 7vw, var(--page-padding));
  }

  .template-aurora h1 {
    font-size: min(calc(var(--h1-size) * 1.35), 34px);
    letter-spacing: 0.02em;
  }

  .template-aurora .resume-avatar img {
    width: 84px;
    height: 84px;
  }

  .template-tide {
    padding-top: 104px;
    background:
      radial-gradient(130% 150px at 50% -20px, #0f8b8d 0 58%, transparent 59%),
      #ffffff;
  }

  .template-tide .resume-avatar {
    margin: 0 auto 14px;
    text-align: center;
  }

  .template-tide .resume-avatar img {
    width: 82px;
    height: 82px;
    border-width: 4px;
  }

  .template-tide h1 + p {
    max-width: 100%;
  }

  .template-notebook .resume-avatar img {
    border-radius: 10px;
  }

  .template-harbor {
    --rail-width: 0px;
    display: block;
    padding-top: 138px;
    background:
      linear-gradient(180deg, #2563eb 0 128px, transparent 128px),
      #ffffff;
  }

  .template-harbor::before {
    width: 100%;
    height: 138px;
    border-bottom-left-radius: 34px;
  }

  .template-harbor::after {
    display: none;
  }

  .template-harbor h1,
  .template-harbor h1 + p,
  .template-harbor .resume-sidebar,
  .template-harbor .resume-main {
    grid-column: auto;
    grid-row: auto;
  }

  .template-harbor h1 {
    margin-top: -104px;
  }

  .template-harbor h1 + p {
    min-height: 0;
    margin-top: 8px;
    margin-bottom: 48px;
  }

  .template-harbor .resume-avatar {
    position: relative;
    z-index: 1;
    margin-top: -118px;
  }

  .template-harbor .resume-avatar img {
    width: 84px;
    height: 84px;
    border-radius: 20px;
    box-shadow: 10px 10px 0 #e8f0ff, 0 8px 18px rgba(37, 99, 235, 0.14);
  }
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

  .template-tide {
    padding-top: 58mm;
    background:
      radial-gradient(140% 46mm at 50% -8mm, #0f8b8d 0 60%, transparent 61%),
      #ffffff;
  }

  .template-tide .resume-avatar {
    top: 18mm;
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }

  .template-tide .resume-avatar img {
    width: 28mm;
    height: 28mm;
    box-shadow: 0 4mm 10mm rgba(15, 139, 141, 0.12);
  }

  .template-tide h1,
  .template-tide h1 + p {
    max-width: 76%;
    margin-right: auto;
    margin-left: auto;
    padding-right: 0 !important;
    text-align: center;
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
