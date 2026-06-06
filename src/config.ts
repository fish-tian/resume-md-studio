import type { StyleConfig, TemplateConfig, TemplateId } from "./types";

export const templates: TemplateConfig[] = [
  {
    id: "apple",
    name: "清简",
    description: "留白克制、圆角柔和，适合现代简历展示。",
    swatch: "linear-gradient(135deg, #f8fafc, #e5e7eb)",
    themeColor: "#2563eb",
  },
  {
    id: "minimal",
    name: "素描",
    description: "黑白灰排版，弱装饰，突出内容本身。",
    swatch: "linear-gradient(135deg, #ffffff, #f4f4f5)",
    themeColor: "#111827",
  },
  {
    id: "business",
    name: "蓝印",
    description: "稳重专业，适合正式投递和传统行业。",
    swatch: "linear-gradient(135deg, #e0f2fe, #1e3a8a)",
    themeColor: "#1e3a8a",
  },
  {
    id: "sweet",
    name: "桃雾",
    description: "柔和粉色、轻量卡片，适合更个性的展示。",
    swatch: "linear-gradient(135deg, #ffe4e6, #fbcfe8)",
    themeColor: "#db2777",
  },
  {
    id: "cyberpunk",
    name: "夜城",
    description: "高对比霓虹风格，适合创意和技术展示。",
    swatch: "linear-gradient(135deg, #fff200 0 58%, #050505 58% 72%, #ff2bd6 72% 84%, #00e5ff 84%)",
    themeColor: "#ff2bd6",
  },
];

export const fontOptions = [
  {
    label: "现代中文无衬线",
    value:
      '"Microsoft YaHei", "PingFang SC", "Noto Sans CJK SC", Arial, sans-serif',
  },
  {
    label: "思源黑体",
    value:
      '"Source Han Sans SC", "Noto Sans CJK SC", "Microsoft YaHei", sans-serif',
  },
  {
    label: "黑体",
    value: 'SimHei, "Microsoft YaHei", sans-serif',
  },
  {
    label: "楷体",
    value: 'KaiTi, "Kaiti SC", STKaiti, serif',
  },
  {
    label: "仿宋",
    value: 'FangSong, STFangsong, serif',
  },
  {
    label: "宋体",
    value: 'SimSun, "Songti SC", "Noto Serif CJK SC", serif',
  },
  {
    label: "系统默认无衬线",
    value:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  {
    label: "英文简洁",
    value: 'Arial, Helvetica, "Microsoft YaHei", sans-serif',
  },
  {
    label: "等宽技术感",
    value:
      '"Cascadia Code", "Consolas", "SFMono-Regular", "Microsoft YaHei", monospace',
  },
];

export const defaultStyle: StyleConfig = {
  primaryColor: "",
  fontFamily: fontOptions[0].value,
  bodyFontSize: 14,
  lineHeight: 1.58,
  pageWidth: 900,
  pagePadding: 52,
  h1FontSize: 32,
  h2FontSize: 18,
  h3FontSize: 15,
  paragraphSpacing: 8,
  listSpacing: 6,
  sectionSpacing: 24,
  printMargin: 16,
};

export function getTemplateThemeColor(templateId: TemplateId) {
  return templates.find((template) => template.id === templateId)?.themeColor || templates[0].themeColor;
}

export function getEffectiveStyle(style: StyleConfig, templateId: TemplateId): StyleConfig {
  return {
    ...style,
    primaryColor: style.primaryColor || getTemplateThemeColor(templateId),
  };
}
