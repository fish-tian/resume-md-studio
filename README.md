# Resume MD Studio

一个基于 Markdown 的简历编辑、预览和导出工具。你可以在左侧编写简历 Markdown，在右侧实时预览排版效果，并切换模板、调整样式、导出 HTML 或打印为 PDF。

在线预览：[GitHub Pages](https://fish-tian.github.io/resume-md-studio/)

## 功能特性

- Markdown 实时编辑和预览
- 多套简历模板：素描、夜城、星幕、潮汐、札记、蓝湾
- 可调样式：主题色、经典色快捷选择、字体、字号、行距、页面宽度、页面边距、打印页边距等
- 支持上传 `.md` 文件
- 支持插入头像或图片
- 支持导出独立 HTML 文件
- 支持浏览器打印为 PDF
- 自动保存编辑内容到 `localStorage`
- 针对简历场景定制 Markdown 渲染，例如首张图片自动作为头像、`A | B` 分隔符样式化、`<!-- sidebar -->` 侧栏区块标记

## 技术栈

- React 19
- TypeScript
- Vite
- Tailwind CSS 4

## 快速开始

安装依赖：

```bash
npm install
```

启动开发服务：

```bash
npm run dev
```

构建生产版本：

```bash
npm run build
```

预览构建产物：

```bash
npm run preview
```

## 使用方式

打开开发服务后，在页面左侧输入或粘贴 Markdown 简历内容，右侧会实时展示最终排版。

顶部按钮说明：

- `上传 .md`：导入本地 Markdown 简历
- `插入头像链接`：插入图片 Markdown，首张图片会作为头像显示
- `导出 HTML`：导出可独立打开的 HTML 简历文件
- `打印 PDF`：调用浏览器打印功能，可保存为 PDF

模板说明：

- `素描`：黑白灰排版，弱装饰，突出内容本身。
- `夜城`：高对比黄黑赛博视觉，适合创意和技术展示。
- `星幕`：深空蓝紫渐变，适合作品集和视觉岗位。
- `潮汐`：青绿色弧形页眉，信息居中展示。
- `札记`：紧凑稿纸感，适合信息密度较高的一页简历。
- `蓝湾`：蓝色渐变抬头和左右分栏，适合清爽现代的职业简历。

## 本地私有简历

开发服务会优先读取 `local-private/resume-main.md`，用于维护不提交到公开仓库的个人简历内容。该文件可以直接引用同目录图片：

```markdown
![头像](./avatar.png)
```

预览时，应用会根据 `resume-main.md` 的所在目录解析相对图片路径，并通过受限的本地资源接口读取 `local-private/` 下的图片。因此 `./avatar.png` 会被解析为 `local-private/avatar.png`，不需要放到 `public/`，也不需要把图片转成 base64。

注意事项：

- 该能力只服务于本地开发预览，不改变 Markdown 原文。
- 外部 URL、data URL、以 `/` 开头的站点路径不会被改写。
- 导出的独立 HTML 仍会保留 Markdown 中的原始图片路径；如果需要独立 HTML 在任意位置打开都能显示头像，请使用外部 URL、data URL，或把图片和 HTML 放在匹配的相对路径下。

## 支持的 Markdown 语法

当前项目使用自定义轻量 Markdown 渲染器，主要支持简历常用语法：

```markdown
![头像](avatars/xiaoming.jpg)

# 姓名
男 | 26岁 | 13800000000 | email@example.com

## 个人优势

- 熟悉 Java、Spring Boot、MySQL、Redis
- 具备完整业务系统开发经验

## 项目经历

### 订单与审批服务 | Spring Boot / MyBatis / Redis

为内部业务流程提供订单创建、状态流转和审批处理能力。

<!-- sidebar -->
## 技能清单

- Java、Spring Boot、MySQL、Redis
- Git、Docker、Linux
```

支持项：

- 标题：`#` 到 `######`
- 无序列表：`- 项目` 或 `* 项目`
- 段落
- 加粗：`**文本**`
- 斜体：`*文本*`
- 行内代码：`` `code` ``
- 链接：`[文本](url)`
- 图片：`![描述](url)`
- 分割线：`---`
- 代码块：三个反引号包裹
- 简历分隔符：`A | B` 中左右有空格的 `|` 会渲染为主题色分隔符
- 侧栏区块：`<!-- sidebar -->` 会把紧随其后的一个 `##` 区块标记为侧栏内容，供 `蓝湾` 等两栏模板使用

侧栏示例：

```markdown
<!-- sidebar -->
## 联系方式

- 手机：13800000000
- 邮箱：email@example.com

<!-- sidebar -->
## 技能清单

- Java、Spring Boot、MySQL
- Git、Docker、Linux
```

注意：当前不是完整 Markdown 规范实现，暂不支持表格、引用块、嵌套列表、任务列表等复杂语法。

## 项目结构

```text
.
├── examples/              # 示例 Markdown 简历
├── local-private/         # 本地私有简历和图片，默认不提交
├── public/                # 静态资源，例如头像
├── scripts/               # 命令行转换脚本
├── src/
│   ├── App.tsx            # 主应用界面
│   ├── config.ts          # 模板和默认样式配置
│   ├── exportHtml.ts      # 独立 HTML 导出
│   ├── markdown.ts        # 自定义 Markdown 渲染器
│   ├── resumeStyles.ts    # 简历模板和打印样式
│   └── styles.css         # 应用界面样式
├── templates/             # 静态 HTML/CSS 模板示例
└── package.json
```

## 命令说明

```bash
npm run dev
```

启动 Vite 开发服务。

```bash
npm run build
```

执行 TypeScript 编译并构建生产资源到 `dist/`。

```bash
npm run preview
```

本地预览 `dist/` 构建结果。

```bash
npm run build:html
```

使用 `scripts/md-to-html.js` 将示例 Markdown 转换为静态 HTML。

## 打印 PDF 建议

点击页面中的 `打印 PDF` 后，建议在浏览器打印面板中选择：

- 目标打印机：保存为 PDF
- 纸张：A4
- 边距：默认或无，由应用内打印页边距控制
- 背景图形：如果模板使用背景或渐变，建议开启

页面已针对打印做了样式处理，长简历会按 A4 自然分页。

## 开发说明

Markdown 渲染逻辑位于 `src/markdown.ts`。如果需要增加新的简历专用语法，优先在 `renderInline()` 或 `markdownToHtml()` 中扩展，并在 `src/resumeStyles.ts` 中补充对应样式。

简历模板样式集中在 `src/resumeStyles.ts`，应用界面样式集中在 `src/styles.css`。两栏模板不要依赖区块顺序猜测左右栏，优先使用 `<!-- sidebar -->` 这类显式语义标记。
