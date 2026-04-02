# 项目上下文

### 版本技术栈

- **Framework**: Next.js 16 (App Router)
- **Core**: React 19
- **Language**: TypeScript 5
- **UI 组件**: shadcn/ui (基于 Radix UI)
- **Styling**: Tailwind CSS 4

## 目录结构

```
├── public/                 # 静态资源
│   ├── product-*.jpg       # 双屏产品图片
│   ├── triple-*.jpg        # 三屏产品图片
│   └── aplus-*.jpg         # A+内容图片
├── scripts/                # 构建与启动脚本
│   ├── build.sh            # 构建脚本
│   ├── dev.sh              # 开发环境启动脚本
│   ├── prepare.sh          # 预处理脚本
│   └── start.sh            # 生产环境启动脚本
├── src/
│   ├── app/                # 页面路由与布局
│   │   ├── page.tsx        # 主页 - 产品选择页面
│   │   ├── api/            # API 路由
│   │   │   └── fetch-url/  # URL内容抓取API
│   │   └── product/        # 产品页面路由
│   │       ├── dual-screen/    # 双屏产品页面
│   │       └── triple-screen/  # 三屏产品页面
│   ├── components/ui/      # Shadcn UI 组件库
│   ├── hooks/              # 自定义 Hooks
│   ├── lib/                # 工具库
│   │   └── utils.ts        # 通用工具函数 (cn)
│   └── server.ts           # 自定义服务端入口
├── next.config.ts          # Next.js 配置
├── package.json            # 项目依赖管理
└── tsconfig.json           # TypeScript 配置
```

- 项目文件（如 app 目录、pages 目录、components 等）默认初始化到 `src/` 目录下。

## 产品信息

### 双屏产品 (Dual Screen Extender)
- **路由**: `/product/dual-screen`
- **价格**: $196.99 (原价 $359.99, -50%)
- **规格**: 14" FHD 1080P IPS, 100% sRGB, 300尼特
- **重量**: 1.9 lbs
- **适用**: 远程办公、开发者、商务人士

### 三屏产品 (Triple Screen Extender)
- **路由**: `/product/triple-screen`
- **价格**: $393.99 (原价 $699.99, -44%)
- **规格**: 2×14" FHD 1080P IPS 扩展屏幕, 100% sRGB, 300尼特, 防眩光+低蓝光
- **总显示屏**: 3个 (笔记本屏幕 + 2个扩展屏幕)
- **重量**: 3.5 lbs
- **适用**: 股票交易员、内容创作者、游戏玩家、高级用户
- **显示模式**: 扩展、镜像、竖屏

## 包管理规范

**仅允许使用 pnpm** 作为包管理器，**严禁使用 npm 或 yarn**。
**常用命令**：
- 安装依赖：`pnpm add <package>`
- 安装开发依赖：`pnpm add -D <package>`
- 安装所有依赖：`pnpm install`
- 移除依赖：`pnpm remove <package>`

## 开发规范

- **项目理解加速**：初始可以依赖项目下`package.json`文件理解项目类型，如果没有或无法理解退化成阅读其他文件。
- **Hydration 错误预防**：严禁在 JSX 渲染逻辑中直接使用 typeof window、Date.now()、Math.random() 等动态数据。必须使用 'use client' 并配合 useEffect + useState 确保动态内容仅在客户端挂载后渲染；同时严禁非法 HTML 嵌套（如 <p> 嵌套 <div>）。


## UI 设计与组件规范 (UI & Styling Standards)

- 模板默认预装核心组件库 `shadcn/ui`，位于`src/components/ui/`目录下
- Next.js 项目**必须默认**采用 shadcn/ui 组件、风格和规范，**除非用户指定用其他的组件和规范。**


