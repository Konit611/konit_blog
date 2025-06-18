# 다언어 여행 블로그

Next.js 기반의 다언어 지원 여행 블로그입니다. 한국어, 영어, 중국어, 일본어를 지원합니다.

## 기능

- 🌍 **다언어 지원**: 한국어, 영어, 중국어, 일본어
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- 🎨 **모던 UI**: Tailwind CSS를 사용한 깔끔한 디자인
- 📝 **Markdown 지원**: 포스트 작성을 위한 Markdown 형식
- 🏷️ **카테고리 시스템**: 여행 관련 카테고리별 포스트 분류
- 🔍 **검색 기능**: 포스트 검색 및 필터링
- ⚡ **정적 생성**: Next.js의 SSG를 활용한 빠른 로딩

## 시작하기

### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인할 수 있습니다.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 시작
npm start

# 타입 검사
npm run type-check

# 코드 포맷팅
npm run format

# 린팅
npm run lint
```

## 프로젝트 구조

```
travel/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # 홈페이지
│   │   └── ko/             # 한국어 페이지
│   │       ├── posts/      # 포스트 목록
│   │       └── contact/    # 연락처
│   ├── components/         # React 컴포넌트
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   └── types/              # TypeScript 타입 정의
│       └── index.ts
├── data/                   # 데이터 파일
│   ├── posts/              # 언어별 포스트
│   │   ├── ko/
│   │   ├── en/
│   │   ├── zh/
│   │   └── ja/
│   ├── locales/            # UI 번역 파일
│   │   ├── ko.json
│   │   ├── en.json
│   │   ├── zh.json
│   │   └── ja.json
│   └── categories.json     # 카테고리 정의
└── DATA_STRUCTURE.md       # 데이터 구조 문서
```

## 데이터 구조

자세한 데이터 구조와 스키마 정보는 [DATA_STRUCTURE.md](./DATA_STRUCTURE.md)를 참조하세요.

### 지원 언어

- **ko**: 한국어 (기본)
- **en**: English
- **zh**: 中文 (简体)
- **ja**: 日本語

### 카테고리

- 여행 팁 (Travel Tips)
- 여행지 (Destinations)
- 음식 문화 (Food & Culture)
- 숙박 (Accommodation)
- 교통 (Transportation)
- 알뜰 여행 (Budget Travel)

## 기술 스택

- **프레임워크**: Next.js 15.3.2
- **언어**: TypeScript
- **스타일링**: Tailwind CSS v4
- **린팅**: ESLint + Prettier
- **폰트**: Geist

## 개발 가이드

### 새 포스트 추가

1. `data/posts/{locale}/` 디렉토리에 Markdown 파일 생성
2. Frontmatter에 메타데이터 추가:

```markdown
---
slug: "post-slug"
title: "포스트 제목"
date: "2024-01-15"
excerpt: "포스트 요약"
categories: ["destinations", "food-culture"]
tags: ["태그1", "태그2"]
featured: true
coverImage: "/images/cover.jpg"
---

# 포스트 내용...
```

### 새 언어 추가

1. `data/locales/` 에 새 언어 JSON 파일 추가
2. `data/posts/` 에 새 언어 폴더 추가
3. `src/types/index.ts` 의 `SupportedLocale` 타입 업데이트

### 새 카테고리 추가

`data/categories.json` 파일에 새 카테고리 객체 추가:

```json
{
  "id": "new-category",
  "name": {
    "ko": "새 카테고리",
    "en": "New Category",
    "zh": "新分类",
    "ja": "新しいカテゴリー"
  },
  "description": {
    "ko": "카테고리 설명",
    "en": "Category description",
    "zh": "分类描述",
    "ja": "カテゴリーの説明"
  }
}
```

## 배포

Vercel을 사용한 배포가 권장됩니다:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

자세한 배포 방법은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 참조하세요.

## 라이선스

MIT License
# konit_blog
# konit_blog
# konit_blog
