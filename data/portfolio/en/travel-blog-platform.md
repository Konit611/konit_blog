---
title: "Multilingual Travel Blog Platform"
description: "A modern travel blog platform built with Next.js and TypeScript"
coverImage: ""
tech: ["Next.js", "TypeScript", "Tailwind CSS", "Markdown", "Vercel"]
projectUrl: "https://konit-travel.vercel.app"
githubUrl: "https://github.com/username/travel-blog"
order: 1
featured: true
date: "2024-01-15"
---

# Multilingual Travel Blog Platform

This project is a modern travel blog platform built with **Next.js 15** and **TypeScript**. It supports 4 languages (Korean, English, Chinese, Japanese) and features a markdown-based content management system.

## Key Features

### 🌍 Multilingual Support
- Support for Korean, English, Chinese, and Japanese
- URL-based language routing (`/ko`, `/en`, `/zh`, `/ja`)
- Automatic browser language detection and redirect
- Language preference storage via cookies

### 📝 Markdown Content Management
- Frontmatter parsing with Gray-matter
- GitHub Flavored Markdown support via Remark plugins
- Image optimization and responsive layouts
- Category and tag systems

### 🎨 Modern UI/UX
- Utility-based styling with Tailwind CSS v4
- Responsive design (mobile, tablet, desktop)
- Google Fonts integration (Geist, Hepta Slab, etc.)
- Dark/Light mode support planned

## Technical Features

### Architecture
```
├── Next.js App Router        # Latest routing system
├── TypeScript               # Type safety
├── Middleware-based i18n    # Internationalization
└── Static Site Generation   # Performance optimization
```

### Performance Optimization
- **Static Generation**: Pre-generated pages at build time
- **Image Optimization**: Next.js Image component utilization
- **Bundle Optimization**: Tree shaking and code splitting
- **SEO Optimization**: Automatic metadata and sitemap generation

## Challenges and Solutions

### 1. Multilingual Routing Implementation
**Problem**: Implementing multilingual routing in Next.js 15 App Router

**Solution**: 
- Language detection and redirect via middleware
- Dynamic routing with `[locale]` for URL structure
- Combined cookie and Accept-Language header detection

### 2. Performance Metrics
- **Lighthouse Score**: 95+ (Performance)
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

This project enabled learning **modern web development stack** and **multilingual website development expertise**. 