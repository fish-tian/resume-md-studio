import type { StyleConfig, TemplateConfig, TemplateId } from "./types";

export const templates: TemplateConfig[] = [
  {
    id: "minimal",
    name: "素描",
    description: "黑白灰排版，弱装饰，突出内容本身。",
    swatch: "linear-gradient(135deg, #ffffff, #f4f4f5)",
    themeColor: "#111827",
  },
  {
    id: "cyberpunk",
    name: "夜城",
    description: "高对比霓虹风格，适合创意和技术展示。",
    swatch: "linear-gradient(135deg, #fff200 0 58%, #050505 58% 72%, #ff2bd6 72% 84%, #00e5ff 84%)",
    themeColor: "#ff2bd6",
  },
  {
    id: "aurora",
    name: "星幕",
    description: "深色渐变与大标题开场，适合作品集和视觉岗位。",
    swatch: "linear-gradient(135deg, #050816 0%, #1e1b4b 48%, #38bdf8 100%)",
    themeColor: "#38bdf8",
  },
  {
    id: "tide",
    name: "潮汐",
    description: "青绿色弧形页眉和居中信息，清爽但有记忆点。",
    swatch: "linear-gradient(180deg, #0f8b8d 0 38%, #ffffff 38%)",
    themeColor: "#0f8b8d",
  },
  {
    id: "notebook",
    name: "札记",
    description: "紧凑黑白稿纸感，适合内容很多的一页简历。",
    swatch: "linear-gradient(135deg, #ffffff 0 72%, #111827 72% 78%, #f3f4f6 78%)",
    themeColor: "#111827",
  },
  {
    id: "harbor",
    name: "蓝湾",
    description: "蓝色渐变抬头与左侧资料栏，适合清爽现代的职业简历。",
    swatch: "linear-gradient(135deg, #ffffff 0 30%, #2563eb 30% 72%, #bae6fd 100%)",
    themeColor: "#2563eb",
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
