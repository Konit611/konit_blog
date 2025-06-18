---
title: "多语言旅行博客平台"
description: "使用Next.js和TypeScript构建的现代旅行博客平台"
coverImage: ""
tech: ["Next.js", "TypeScript", "Tailwind CSS", "Markdown", "Vercel"]
projectUrl: "https://konit-travel.vercel.app"
githubUrl: "https://github.com/username/travel-blog"
order: 1
featured: true
date: "2024-01-15"
---

# 多语言旅行博客平台

这是一个基于 **Next.js 15** 和 **TypeScript** 构建的现代旅行博客平台。支持4种语言（中文、英文、韩文、日文），具有基于Markdown的内容管理系统。

## 主要功能

### 🌍 多语言支持
- 支持中文、英文、韩文、日文
- 基于URL的语言路由（`/ko`、`/en`、`/zh`、`/ja`）
- 自动浏览器语言检测和重定向
- 通过Cookie存储语言偏好

### 📝 Markdown内容管理
- 使用Gray-matter进行frontmatter解析
- 通过Remark插件支持GitHub Flavored Markdown
- 图片优化和响应式布局
- 分类和标签系统

### 🎨 现代UI/UX
- 使用Tailwind CSS v4的实用程序样式
- 响应式设计（移动端、平板、桌面）
- Google字体集成（Geist、Hepta Slab等）
- 计划支持深色/浅色模式

## 技术特性

### 架构
```
├── Next.js App Router        # 最新路由系统
├── TypeScript               # 类型安全
├── 基于中间件的i18n          # 国际化
└── 静态站点生成              # 性能优化
```

### 性能优化
- **静态生成**：构建时预生成页面
- **图片优化**：利用Next.js Image组件
- **包优化**：Tree shaking和代码分割
- **SEO优化**：自动元数据和站点地图生成

这个项目使我学会了**现代Web开发技术栈**和**多语言网站开发专业知识**。 