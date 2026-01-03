# KONIT Studio - 다언어 기술 블로그

Next.js 15와 TypeScript 기반의 다언어 지원 기술 블로그입니다. 한국어, 영어, 중국어, 일본어를 지원합니다.

## ✨ 주요 기능

- 🌍 **다언어 지원**: 한국어, 영어, 중국어, 일본어 (4개 언어)
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- 🎨 **모던 UI**: Tailwind CSS v4를 사용한 깔끔한 디자인
- 📝 **Markdown 지원**: 포스트 작성을 위한 Markdown 형식
- 🏷️ **계층적 카테고리**: 대분류/중분류 2단계 카테고리 시스템
- 🔍 **필터링 기능**: 카테고리별 포스트 필터링 및 검색
- ⚡ **정적 생성**: Next.js App Router + SSG를 활용한 빠른 로딩
- 🎯 **SEO 최적화**: JSON-LD, Sitemap, OpenGraph 지원
- 🧩 **아토믹 디자인**: 재사용 가능한 컴포넌트 아키텍처
- 💼 **포트폴리오**: 프로젝트 쇼케이스 섹션

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 18.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 결과를 확인하세요.

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 타입 검사
npm run type-check

# 코드 포맷팅
npm run format
npm run format:check

# 린팅
npm run lint
npm run lint:fix

# Sitemap 생성
npm run sitemap
```

## 📁 프로젝트 구조

```
konit_dev_blog/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── [locale]/              # 다국어 라우팅
│   │   │   ├── blog/              # 블로그 포스트
│   │   │   ├── portfolio/         # 포트폴리오
│   │   │   ├── career/            # 경력 소개
│   │   │   ├── contact/           # 연락처
│   │   │   └── page.tsx           # 홈페이지
│   │   ├── globals.css            # 전역 스타일
│   │   └── layout.tsx             # 루트 레이아웃
│   │
│   ├── components/                # React 컴포넌트 (아토믹 디자인)
│   │   ├── atoms/                 # 기본 UI 요소
│   │   │   ├── Button/
│   │   │   ├── Badge/
│   │   │   ├── Heading/
│   │   │   ├── Text/
│   │   │   ├── Link/
│   │   │   └── Icon/
│   │   ├── molecules/             # 조합 컴포넌트
│   │   │   ├── Card/
│   │   │   ├── MenuItem/
│   │   │   ├── Pagination/
│   │   │   ├── PostMeta/
│   │   │   ├── SocialLinks/
│   │   │   └── LanguageSelector/
│   │   ├── organisms/             # 복잡한 UI 블록
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── BlogFilters/
│   │   │   └── PostCard/
│   │   ├── templates/             # 페이지 템플릿
│   │   │   ├── PageLayout/
│   │   │   └── BlogLayout/
│   │   ├── home/                  # 홈 페이지 전용 컴포넌트
│   │   └── layout/                # 레이아웃 컴포넌트
│   │
│   ├── constants/                 # 상수 정의
│   │   ├── locales.ts            # 지원 언어 목록
│   │   ├── config.ts             # 사이트 설정
│   │   └── categories.ts         # 카테고리 상수
│   │
│   ├── hooks/                     # 커스텀 훅
│   │   ├── usePagination.ts      # 페이지네이션 로직
│   │   ├── useFilters.ts         # 필터링 로직
│   │   └── useSectionScroll.ts   # 스크롤 제어
│   │
│   ├── lib/                       # 유틸리티 라이브러리
│   │   ├── metadata/              # 메타데이터 생성
│   │   ├── seo/                   # SEO 관련 (JSON-LD)
│   │   ├── categories.server.ts  # 카테고리 서버 로직
│   │   ├── categories.ts         # 카테고리 클라이언트 로직
│   │   ├── i18n-utils.ts         # 다국어 유틸리티
│   │   ├── markdown.ts           # Markdown 파싱
│   │   ├── portfolio.ts          # 포트폴리오 로직
│   │   └── posts.ts              # 포스트 로직
│   │
│   ├── types/                     # TypeScript 타입 정의
│   │   ├── post.types.ts         # 포스트 타입
│   │   ├── category.types.ts     # 카테고리 타입
│   │   ├── portfolio.types.ts    # 포트폴리오 타입
│   │   ├── i18n.types.ts         # 다국어 타입
│   │   └── common.types.ts       # 공통 타입
│   │
│   └── utils/                     # 헬퍼 함수
│       ├── date.utils.ts         # 날짜 포맷팅
│       ├── text.utils.ts         # 텍스트 처리
│       ├── seo.utils.ts          # SEO 유틸리티
│       └── metadata.utils.ts     # 메타데이터 헬퍼
│
├── data/                          # 데이터 파일
│   ├── posts/                     # 블로그 포스트 (계층 구조)
│   │   ├── ko/                   # 한국어
│   │   │   ├── planning/         # 대분류
│   │   │   │   ├── statistics/   # 중분류
│   │   │   │   └── math/
│   │   │   ├── design/
│   │   │   │   └── blender/
│   │   │   └── development/
│   │   │       ├── ios/
│   │   │       ├── algorithm/
│   │   │       └── ai/
│   │   ├── en/                   # 영어
│   │   ├── zh/                   # 중국어
│   │   └── ja/                   # 일본어
│   ├── portfolio/                 # 포트폴리오 프로젝트
│   ├── categories.json            # 카테고리 정의
│   └── parent-categories.json     # 대분류 카테고리
│
├── public/                        # 정적 파일
│   ├── locales/                  # 번역 파일
│   │   ├── ko/common.json
│   │   ├── en/common.json
│   │   ├── zh/common.json
│   │   └── ja/common.json
│   ├── images/                   # 이미지 파일
│   ├── fonts/                    # 폰트 파일
│   └── sitemap.xml               # 사이트맵
│
├── middleware.ts                  # Next.js 미들웨어 (i18n)
├── next.config.ts                # Next.js 설정
├── tailwind.config.ts            # Tailwind CSS 설정
└── tsconfig.json                 # TypeScript 설정
```

## 🏗️ 아키텍처

### 아토믹 디자인 패턴

프로젝트는 아토믹 디자인 패턴을 따릅니다:

1. **Atoms (원자)**: 가장 기본적인 UI 요소
   - Button, Badge, Heading, Text, Link, Icon
   
2. **Molecules (분자)**: Atoms를 조합한 간단한 컴포넌트
   - Card, MenuItem, Pagination, PostMeta, SocialLinks, LanguageSelector
   
3. **Organisms (유기체)**: Molecules를 조합한 복잡한 UI 블록
   - Header, Footer, BlogFilters, PostCard
   
4. **Templates (템플릿)**: 페이지 레이아웃 구조
   - PageLayout, BlogLayout

### 계층적 카테고리 시스템

블로그 포스트는 2단계 카테고리로 구조화됩니다:

- **대분류 (Parent Categories)**
  - Planning (기획)
  - Design (디자인)
  - Development (개발)

- **중분류 (Child Categories)**
  - Planning: Statistics, Math
  - Design: Blender, UX/UI
  - Development: iOS, Algorithm, AI

### 다국어 지원

- **지원 언어**: ko (한국어), en (English), zh (中文), ja (日本語)
- **URL 구조**: `/{locale}/blog`, `/{locale}/portfolio`
- **번역 파일**: `public/locales/{locale}/common.json`
- **포스트 파일**: `data/posts/{locale}/{parent}/{child}/*.md`

## 🛠️ 기술 스택

### 프레임워크 & 언어
- **Framework**: Next.js 15.3.2 (App Router)
- **Language**: TypeScript 5
- **Runtime**: Node.js 18+

### UI & 스타일링
- **Styling**: Tailwind CSS v4
- **Fonts**: Noto Sans, Noto Serif (Variable Fonts)
- **Typography**: @tailwindcss/typography

### 콘텐츠 관리
- **Markdown**: remark, remark-gfm, remark-html
- **Frontmatter**: gray-matter

### 다국어 & SEO
- **i18n**: next-i18next
- **Sitemap**: next-sitemap
- **JSON-LD**: 커스텀 구현

### 개발 도구
- **Linting**: ESLint 9
- **Formatting**: Prettier 3
- **Type Checking**: TypeScript

## 📝 콘텐츠 작성 가이드

### 새 블로그 포스트 추가

1. **적절한 디렉토리 선택**
   ```
   data/posts/{locale}/{parent-category}/{child-category}/
   ```

2. **Markdown 파일 생성**
   파일명은 URL slug가 됩니다 (예: `my-first-post.md`)

3. **Frontmatter 작성**
   ```markdown
   ---
   slug: "my-first-post"
   title: "나의 첫 번째 포스트"
   date: "2024-01-15"
   excerpt: "포스트 요약 설명입니다."
   categories: ["development", "ios"]
   tags: ["Swift", "SwiftUI", "iOS"]
   featured: true
   coverImage: "/images/my-post-cover.jpg"
   ---

   # 포스트 내용

   여기에 Markdown 형식으로 내용을 작성합니다...
   ```

4. **필수 필드**
   - `slug`: URL 경로 (고유해야 함)
   - `title`: 포스트 제목
   - `date`: 작성일 (YYYY-MM-DD)
   - `excerpt`: 요약 설명
   - `categories`: 카테고리 배열
   - `tags`: 태그 배열

5. **선택 필드**
   - `featured`: 추천 포스트 여부 (기본: false)
   - `coverImage`: 커버 이미지 경로

### 새 포트폴리오 프로젝트 추가

1. **파일 생성**
   ```
   data/portfolio/{locale}/project-name.md
   ```

2. **Frontmatter 구조**
   ```markdown
   ---
   slug: "project-name"
   title: "프로젝트 이름"
   date: "2024-01-15"
   excerpt: "프로젝트 설명"
   coverImage: "/images/project-cover.jpg"
   technologies: ["React", "Next.js", "TypeScript"]
   projectUrl: "https://project-url.com"
   githubUrl: "https://github.com/username/repo"
   featured: true
   ---

   ## 프로젝트 소개
   
   상세 내용...
   ```

### 카테고리 관리

#### 새 대분류(Parent) 카테고리 추가

`data/parent-categories.json` 수정:

```json
{
  "id": "new-parent",
  "slug": "new-parent",
  "name": {
    "ko": "새 대분류",
    "en": "New Parent",
    "zh": "新父类",
    "ja": "新しい親カテゴリ"
  },
  "description": {
    "ko": "설명",
    "en": "Description",
    "zh": "描述",
    "ja": "説明"
  }
}
```

#### 새 중분류(Child) 카테고리 추가

`data/categories.json` 수정:

```json
{
  "id": "new-child",
  "slug": "new-child",
  "parentId": "parent-id",
  "name": {
    "ko": "새 중분류",
    "en": "New Child",
    "zh": "新子类",
    "ja": "新しい子カテゴリ"
  },
  "description": {
    "ko": "설명",
    "en": "Description",
    "zh": "描述",
    "ja": "説明"
  }
}
```

### 번역 추가

`public/locales/{locale}/common.json`에 번역 키-값 추가:

```json
{
  "header": {
    "newMenu": "새 메뉴"
  }
}
```

## 🚀 배포

### Vercel (권장)

1. GitHub 리포지토리에 프로젝트 푸시
2. [Vercel](https://vercel.com)에서 Import
3. 자동으로 빌드 및 배포

### 환경 변수

필요한 경우 `.env.local` 파일 생성:

```env
NEXT_PUBLIC_SITE_URL=https://konit.studio
```

### 빌드 최적화

- **이미지 최적화**: Next.js Image 컴포넌트 자동 최적화
- **Code Splitting**: 자동 코드 분할
- **정적 생성**: 빌드 시 페이지 사전 렌더링
- **Sitemap**: 빌드 후 자동 생성 (`npm run postbuild`)

## 🧪 테스트

### 타입 체크
```bash
npm run type-check
```

### 린팅
```bash
npm run lint
npm run lint:fix
```

### 포맷 체크
```bash
npm run format:check
npm run format
```

### 빌드 테스트
```bash
npm run build
npm start
```

## 📚 주요 개념

### Server vs Client Components

- **Server Components**: 데이터 페칭, SEO 최적화 (기본)
- **Client Components**: 인터랙션, 상태 관리 (`'use client'` 지시어)

### 메타데이터 최적화

- `generateMetadata`: 동적 메타데이터 생성
- JSON-LD: 구조화된 데이터 마크업
- OpenGraph: 소셜 미디어 공유 최적화

### 커스텀 훅

- `usePagination`: 페이지네이션 로직 재사용
- `useFilters`: 필터링 상태 관리
- `useSectionScroll`: 스크롤 기반 인터랙션

## 🎯 향후 계획

- [ ] Unit/Integration 테스트 추가
- [ ] E2E 테스트 (Playwright)
- [ ] 댓글 시스템 (giscus)
- [ ] 조회수 트래킹
- [ ] RSS 피드
- [ ] 다크 모드 개선
- [ ] 검색 기능 강화 (Algolia)

## 🤝 기여

이슈와 PR을 환영합니다!

## 📄 라이선스

MIT License

---

**KONIT Studio** - 기술과 창작의 교차점

🌐 [https://konit.studio](https://konit.studio)
