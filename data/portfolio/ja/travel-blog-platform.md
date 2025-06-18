---
title: "多言語旅行ブログプラットフォーム"
description: "Next.jsとTypeScriptで構築された現代的な旅行ブログプラットフォーム"
coverImage: ""
tech: ["Next.js", "TypeScript", "Tailwind CSS", "Markdown", "Vercel"]
projectUrl: "https://konit-travel.vercel.app"
githubUrl: "https://github.com/username/travel-blog"
order: 1
featured: true
date: "2024-01-15"
---

# 多言語旅行ブログプラットフォーム

**Next.js 15** と **TypeScript** をベースとした現代的な旅行ブログプラットフォームです。4つの言語（日本語、英語、韓国語、中国語）をサポートし、Markdownベースのコンテンツ管理システムを備えています。

## 主な機能

### 🌍 多言語サポート
- 日本語、英語、韓国語、中国語をサポート
- URLベースの言語ルーティング（`/ko`、`/en`、`/zh`、`/ja`）
- ブラウザ言語の自動検出とリダイレクト
- Cookieによる言語設定の保存

### 📝 Markdownコンテンツ管理
- Gray-matterによるfrontmatterの解析
- RemarkプラグインによるGitHub Flavored Markdownサポート
- 画像最適化とレスポンシブレイアウト
- カテゴリとタグシステム

### 🎨 モダンUI/UX
- Tailwind CSS v4を活用したユーティリティベースのスタイリング
- レスポンシブデザイン（モバイル、タブレット、デスクトップ）
- Google Fontsの統合（Geist、Hepta Slabなど）
- ダーク/ライトモードサポート予定

## 技術的特徴

### アーキテクチャ
```
├── Next.js App Router        # 最新のルーティングシステム
├── TypeScript               # 型安全性
├── ミドルウェアベースのi18n   # 国際化
└── 静的サイト生成            # パフォーマンス最適化
```

### パフォーマンス最適化
- **静的生成**：ビルド時のページ事前生成
- **画像最適化**：Next.js Imageコンポーネントの活用
- **バンドル最適化**：Tree shakingとコード分割
- **SEO最適化**：メタデータとサイトマップの自動生成

このプロジェクトにより**現代的なWeb開発スタック**と**多言語Webサイト構築の専門知識**を習得することができました。 