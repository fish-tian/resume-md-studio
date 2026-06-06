import { useEffect, useMemo, useRef, useState } from "react";
import defaultResume from "../examples/xiaoming-resume.md?raw";
import { defaultStyle, fontOptions, getEffectiveStyle, getTemplateThemeColor, templates } from "./config";
import { buildStandaloneHtml } from "./exportHtml";
import { markdownToHtml } from "./markdown";
import { buildCssVariables, resumeCss } from "./resumeStyles";
import type { StyleConfig, TemplateId } from "./types";

const STORAGE_KEY = "resume-md-studio:v3";

type SavedState = {
  markdown: string;
  templateId: TemplateId;
  style: StyleConfig;
};

type ActivePanel = "editor" | "templates" | "style";

const panelItems: Array<{ id: ActivePanel; label: string; description: string }> = [
  { id: "editor", label: "编辑", description: "Markdown" },
  { id: "templates", label: "模板", description: "风格" },
  { id: "style", label: "样式", description: "外观" },
];

const commonControls: Array<{
  key: keyof StyleConfig;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}> = [
  { key: "bodyFontSize", label: "正文字号", min: 11, max: 20, step: 1, unit: "px" },
  { key: "lineHeight", label: "行距", min: 1.2, max: 2, step: 0.02, unit: "" },
  { key: "pageWidth", label: "页面宽度", min: 680, max: 1100, step: 10, unit: "px" },
  { key: "pagePadding", label: "页面边距", min: 24, max: 90, step: 1, unit: "px" },
];

const advancedControls: Array<{
  key: keyof StyleConfig;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
}> = [
  { key: "h1FontSize", label: "一级标题", min: 22, max: 42, step: 1, unit: "px" },
  { key: "h2FontSize", label: "二级标题", min: 14, max: 28, step: 1, unit: "px" },
  { key: "h3FontSize", label: "三级标题", min: 12, max: 24, step: 1, unit: "px" },
  { key: "paragraphSpacing", label: "段落间距", min: 0, max: 24, step: 1, unit: "px" },
  { key: "listSpacing", label: "列表间距", min: 0, max: 24, step: 1, unit: "px" },
  { key: "sectionSpacing", label: "区块间距", min: 8, max: 48, step: 1, unit: "px" },
  { key: "printMargin", label: "打印页边距", min: 8, max: 28, step: 1, unit: "mm" },
];

function isTemplateId(value: unknown): value is TemplateId {
  return templates.some((template) => template.id === value);
}

function normalizeStyle(value: unknown): StyleConfig {
  if (!value || typeof value !== "object") return defaultStyle;
  const saved = value as Partial<StyleConfig> & {
    accentColor?: string;
  };

  return {
    fontFamily: saved.fontFamily || defaultStyle.fontFamily,
    bodyFontSize: saved.bodyFontSize || defaultStyle.bodyFontSize,
    lineHeight: saved.lineHeight || defaultStyle.lineHeight,
    pageWidth: saved.pageWidth || defaultStyle.pageWidth,
    pagePadding: saved.pagePadding || defaultStyle.pagePadding,
    h1FontSize: saved.h1FontSize || defaultStyle.h1FontSize,
    h2FontSize: saved.h2FontSize || defaultStyle.h2FontSize,
    h3FontSize: saved.h3FontSize || defaultStyle.h3FontSize,
    paragraphSpacing: saved.paragraphSpacing ?? defaultStyle.paragraphSpacing,
    listSpacing: saved.listSpacing ?? defaultStyle.listSpacing,
    sectionSpacing: saved.sectionSpacing || defaultStyle.sectionSpacing,
    printMargin: saved.printMargin || defaultStyle.printMargin,
    primaryColor: saved.primaryColor || saved.accentColor || "",
  };
}

function getInitialState(): SavedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) throw new Error("empty");
    const saved = JSON.parse(raw) as Partial<SavedState>;
    return {
      markdown: saved.markdown || defaultResume,
      templateId: isTemplateId(saved.templateId) ? saved.templateId : "apple",
      style: normalizeStyle(saved.style),
    };
  } catch {
    return {
      markdown: defaultResume,
      templateId: "apple",
      style: defaultStyle,
    };
  }
}

function clampScale(value: number) {
  return Math.min(1.6, Math.max(0.6, Number(value.toFixed(1))));
}

function downloadFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function App() {
  const initialState = useMemo(getInitialState, []);
  const [markdown, setMarkdown] = useState(initialState.markdown);
  const [templateId, setTemplateId] = useState<TemplateId>(initialState.templateId);
  const [style, setStyle] = useState<StyleConfig>(initialState.style);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>("editor");
  const [previewScale, setPreviewScale] = useState(1);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const renderedHtml = useMemo(() => markdownToHtml(markdown), [markdown]);
  const effectiveStyle = useMemo(() => getEffectiveStyle(style, templateId), [style, templateId]);
  const cssVariables = useMemo(() => buildCssVariables(effectiveStyle, ".resume-page"), [effectiveStyle]);

  useEffect(() => {
    const payload: SavedState = { markdown, templateId, style };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [markdown, templateId, style]);

  const updateStyle = <K extends keyof StyleConfig>(key: K, value: StyleConfig[K]) => {
    setStyle((current) => ({ ...current, [key]: value }));
  };

  const handleUpload = async (file?: File) => {
    if (!file) return;
    const text = await file.text();
    setMarkdown(text);
  };

  const insertMarkdown = (snippet: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setMarkdown((current) => `${snippet}\n${current}`);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = markdown.slice(0, start);
    const after = markdown.slice(end);
    const next = `${before}${snippet}${after}`;
    setMarkdown(next);

    window.requestAnimationFrame(() => {
      textarea.focus();
      textarea.selectionStart = start + snippet.length;
      textarea.selectionEnd = start + snippet.length;
    });
  };

  const handleInsertImageUrl = () => {
    const url = window.prompt("输入头像图片 URL，或 public 下的本地路径", "avatars/xiaoming.svg");
    if (!url?.trim()) return;
    insertMarkdown(`\n![头像](${url.trim()})\n`);
  };

  const handleExportHtml = () => {
    const html = buildStandaloneHtml(markdown, templateId, effectiveStyle);
    downloadFile("resume.html", html, "text/html;charset=utf-8");
  };

  const renderRangeControl = (control: (typeof commonControls)[number]) => (
    <label className="range-row" key={control.key}>
      <span>
        {control.label}
        <em>
          {String(style[control.key])}
          {control.unit}
        </em>
      </span>
      <input
        type="range"
        min={control.min}
        max={control.max}
        step={control.step}
        value={Number(style[control.key])}
        onChange={(event) => updateStyle(control.key, Number(event.target.value) as never)}
      />
    </label>
  );

  const renderPanel = () => {
    if (activePanel === "editor") {
      return (
        <div className="panel-stack">
          <div className="panel-section editor-section">
            <div className="panel-title-row">
              <h2>Markdown</h2>
              <span>{markdown.length} 字符</span>
            </div>
            <textarea
              ref={textareaRef}
              value={markdown}
              spellCheck={false}
              onChange={(event) => setMarkdown(event.target.value)}
            />
          </div>
        </div>
      );
    }

    if (activePanel === "templates") {
      return (
        <div className="template-list" aria-label="模板风格">
          {templates.map((template) => (
            <button
              key={template.id}
              className={templateId === template.id ? "template-card active" : "template-card"}
              onClick={() => setTemplateId(template.id)}
            >
              <span className="template-swatch" style={{ background: template.swatch }} />
              <span>
                <strong>{template.name}</strong>
                <em>{template.description}</em>
              </span>
            </button>
          ))}
        </div>
      );
    }

    if (activePanel === "style") {
      return (
        <div className="panel-stack">
          <div className="settings-group">
            <h3>颜色</h3>
            <label className="color-row">
              <span>{style.primaryColor ? "主题色" : `主题色（跟随模板 ${getTemplateThemeColor(templateId)}）`}</span>
              <input
                type="color"
                value={effectiveStyle.primaryColor}
                onChange={(event) => updateStyle("primaryColor", event.target.value)}
              />
            </label>
            <button className="secondary-action" onClick={() => updateStyle("primaryColor", "")}>
              使用模板色
            </button>
          </div>

          <div className="settings-group">
            <h3>字体</h3>
            <select
              value={style.fontFamily}
              onChange={(event) => updateStyle("fontFamily", event.target.value)}
            >
              {fontOptions.map((font) => (
                <option value={font.value} key={font.label}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          <div className="settings-group">
            <h3>常用排版</h3>
            {commonControls.map(renderRangeControl)}
            <button className="secondary-action" onClick={() => setAdvancedOpen((open) => !open)}>
              {advancedOpen ? "收起高级排版" : "展开高级排版"}
            </button>
            {advancedOpen && <div className="advanced-controls">{advancedControls.map(renderRangeControl)}</div>}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="app-shell">
      <style>{`${cssVariables}\n${resumeCss}`}</style>
      <header className="app-toolbar">
        <div className="toolbar-brand">
          <strong>Resume MD Studio</strong>
          <span>{templates.find((item) => item.id === templateId)?.name}</span>
        </div>
        <div className="toolbar-actions">
          <button onClick={() => fileInputRef.current?.click()}>上传 .md</button>
          <button onClick={handleInsertImageUrl}>插入头像链接</button>
          <button className="primary-action" onClick={handleExportHtml}>
            导出 HTML
          </button>
          <button onClick={() => window.print()}>打印 PDF</button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.markdown,text/markdown,text/plain"
            hidden
            onChange={(event) => handleUpload(event.target.files?.[0])}
          />
        </div>
      </header>

      <main className="split-workspace">
        <section className="control-pane">
          <nav className="side-nav" aria-label="功能菜单">
            {panelItems.map((item) => (
              <button
                key={item.id}
                className={activePanel === item.id ? "nav-item active" : "nav-item"}
                onClick={() => setActivePanel(item.id)}
              >
                <strong>{item.label}</strong>
                <span>{item.description}</span>
              </button>
            ))}
          </nav>

          <section className="sidebar-panel">
            <div className="panel-heading">
              <h2>{panelItems.find((item) => item.id === activePanel)?.label}</h2>
              {activePanel === "style" && (
                <button className="ghost" onClick={() => setStyle(defaultStyle)}>
                  恢复默认
                </button>
              )}
            </div>
            {renderPanel()}
          </section>
        </section>

        <section className="preview-workspace">
          <header className="preview-toolbar">
            <div>
              <p className="eyebrow">Live Preview</p>
              <h2>{templates.find((item) => item.id === templateId)?.name}</h2>
            </div>
            <div className="zoom-controls" aria-label="预览缩放">
              <button onClick={() => setPreviewScale((value) => clampScale(value - 0.1))}>缩小</button>
              <span>{Math.round(previewScale * 100)}%</span>
              <button onClick={() => setPreviewScale((value) => clampScale(value + 0.1))}>放大</button>
              <button onClick={() => setPreviewScale(1)}>重置</button>
            </div>
          </header>

          <section className="preview-canvas">
            <div
              className="preview-scale-box"
              style={{
                width: `calc(var(--page-width) * ${previewScale})`,
                minHeight: `calc(960px * ${previewScale})`,
              }}
            >
              <article
                className={`resume-page template-${templateId}`}
                style={{ transform: `scale(${previewScale})` }}
                dangerouslySetInnerHTML={{ __html: renderedHtml }}
              />
            </div>
          </section>
        </section>
      </main>
    </div>
  );
}

export default App;
