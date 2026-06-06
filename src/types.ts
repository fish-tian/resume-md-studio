export type TemplateId =
  | "apple"
  | "minimal"
  | "business"
  | "sweet"
  | "cyberpunk";

export type StyleConfig = {
  primaryColor: string;
  fontFamily: string;
  bodyFontSize: number;
  lineHeight: number;
  pageWidth: number;
  pagePadding: number;
  h1FontSize: number;
  h2FontSize: number;
  h3FontSize: number;
  paragraphSpacing: number;
  listSpacing: number;
  sectionSpacing: number;
  printMargin: number;
};

export type TemplateConfig = {
  id: TemplateId;
  name: string;
  description: string;
  swatch: string;
  themeColor: string;
};
