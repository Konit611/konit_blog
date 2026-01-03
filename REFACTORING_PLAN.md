# 🔧 konit_dev_blog 리팩토링 계획서

## 📋 목차
1. [개요](#개요)
2. [현재 상태 분석](#현재-상태-분석)
3. [리팩토링 목표](#리팩토링-목표)
4. [리팩토링 전략](#리팩토링-전략)
5. [단계별 태스크](#단계별-태스크)
6. [아키텍처 개선 방안](#아키텍처-개선-방안)

---

## 개요

**프로젝트**: konit_dev_blog  
**목적**: 여행 블로그 → 기술 블로그 전환에 따른 전면 리팩토링  
**기준**:
1. Next.js 베스트 아키텍처 준수
2. 코드 중복 제거
3. 아토믹 디자인 패턴 적용
4. 여행 블로그 관련 문구 제거 및 기술 블로그에 최적화

---

## 현재 상태 분석

### ✅ 잘 구현된 부분
- Next.js 15 App Router 사용
- 다국어 지원 (i18n) 구조
- TypeScript 타입 정의
- 카테고리 계층 구조 (Parent/Child)
- SEO 최적화 (Metadata, JSON-LD)
- Markdown 기반 콘텐츠 관리

### ⚠️ 개선이 필요한 부분

#### 1. **여행 블로그 관련 레거시 코드**
- **위치**: 여러 파일에 걸쳐 'Travel Blog', 'Alex Chen' 등의 문구 존재
- **파일**:
  - `src/app/[locale]/page.tsx`: `travelblog.com` URL
  - `src/app/[locale]/contact/ContactClient.tsx`: `travelblog.com` URL
  - `src/app/[locale]/blog/page.tsx`: 'Alex Chen' 작성자명
  - `src/components/layout/Footer.tsx`: 여행 관련 설명
  - `public/locales/*`: 여행 관련 번역 문구

#### 2. **코드 중복**
- **메타데이터 생성**: 각 페이지마다 번역 객체와 메타데이터 생성 로직이 중복
  - `src/app/[locale]/page.tsx`
  - `src/app/[locale]/blog/page.tsx`
  - `src/app/[locale]/contact/page.tsx`
  - `src/app/[locale]/portfolio/page.tsx`
  - `src/app/[locale]/career/page.tsx`

- **JSON-LD 스키마**: 각 페이지에서 개별적으로 JSON-LD 생성
  
- **번역 객체**: 컴포넌트 내부에 하드코딩된 번역 객체
  - `Header.tsx`
  - `Footer.tsx`
  - `HeroSection.tsx`
  - `ValueSection.tsx`
  - `career/page.tsx`
  - `portfolio/page.tsx`

#### 3. **컴포넌트 구조 (아토믹 디자인 미적용)**
현재 구조:
```
src/components/
  ├── CategoryFilter.tsx (Organism 수준)
  ├── ContentCard.tsx (Molecule 수준)
  ├── home/ (Feature 기반)
  ├── layout/ (Layout 기반)
  └── portfolio/ (Feature 기반)
```

개선 필요:
- Atoms, Molecules, Organisms 단위로 재구조화 필요
- 반복되는 UI 패턴을 재사용 가능한 컴포넌트로 분리
- 예: Button, Input, Card, Badge, Icon 등

#### 4. **아키텍처 개선**
- **lib 디렉토리**: 서버/클라이언트 함수가 혼재
  - `categories.ts` (클라이언트)
  - `categories.server.ts` (서버)
  - 명확한 구분 필요

- **유틸리티 함수**: 분산되어 있음
  - SEO 관련
  - 날짜 포맷
  - 텍스트 처리

- **상수 관리**: 하드코딩된 값들
  - 로케일 목록
  - 페이지당 포스트 수
  - 색상, 스타일 값

#### 5. **타입 관리**
- `src/types/index.ts`에 모든 타입이 한 파일에 집중
- 도메인별 타입 분리 필요

#### 6. **데이터 폴더 구조**
- **현재 구조**: Child Category만 기준으로 폴더 구성
  ```
  data/posts/ko/
    ├── ai/
    ├── algorithm/
    ├── blender/
    ├── ios/
    ├── math/
    └── statistics/
  ```
- **문제점**:
  - Parent Category (planning, design, development)가 폴더 구조에 반영되지 않음
  - 카테고리 계층 구조와 실제 파일 구조가 불일치
  - 새로운 카테고리 추가 시 혼란 가능성

- **개선 필요**:
  - Parent Category를 기준으로 폴더 재구성
  - 계층 구조를 파일 시스템에 명확히 반영

---

## 리팩토링 목표

### 1. Next.js 베스트 프랙티스 적용
- ✅ App Router 최적화
- ✅ Server/Client Component 명확한 분리
- ✅ Server Actions 적용 (필요시)
- ✅ 병렬 라우트 및 인터셉팅 라우트 고려
- ✅ 레이아웃 최적화

### 2. 코드 중복 제거
- ✅ 메타데이터 생성 유틸리티 함수화
- ✅ JSON-LD 생성 유틸리티 함수화
- ✅ 번역 객체를 JSON 파일로 통합
- ✅ 공통 로직 추출

### 3. 아토믹 디자인 패턴 적용
```
src/components/
  ├── atoms/          # 최소 단위 (Button, Input, Icon, Badge)
  ├── molecules/      # Atom 조합 (SearchBar, Card, MenuItem)
  ├── organisms/      # 복잡한 UI (Header, Footer, CategoryFilter)
  ├── templates/      # 페이지 레이아웃
  └── pages/          # 페이지별 컴포넌트 (필요시)
```

### 4. 기술 블로그 최적화
- ✅ 모든 여행 관련 문구 제거
- ✅ 기술 블로그에 맞는 SEO 키워드
- ✅ 개발자 포트폴리오에 맞는 컨텐츠

---

## 리팩토링 전략

### Phase 1: 기초 정비 (Foundation)
1. 상수 및 타입 정리
2. 유틸리티 함수 분리
3. 번역 파일 통합
4. 데이터 폴더 재구성 (최신 카테고리 기준)

### Phase 2: 컴포넌트 재구조화 (Component Refactoring)
1. 아토믹 디자인 패턴 적용
2. 공통 컴포넌트 추출
3. Props 인터페이스 최적화

### Phase 3: 로직 최적화 (Logic Optimization)
1. 메타데이터 생성 자동화
2. SEO 유틸리티 함수화
3. 중복 로직 제거

### Phase 4: 레거시 제거 (Legacy Cleanup)
1. 여행 블로그 문구 제거
2. 사용하지 않는 코드 제거
3. 기술 블로그 문구로 교체

### Phase 5: 테스트 및 검증 (Testing)
1. 빌드 에러 확인
2. 타입 체크
3. 린트 에러 수정

---

## 단계별 태스크

### 📌 Phase 1: 기초 정비 (Foundation)

#### Task 1.1: 상수 파일 생성
**목표**: 프로젝트 전반에 사용되는 상수를 중앙 관리

**작업 파일**:
- `src/constants/index.ts` (생성)
- `src/constants/locales.ts` (생성)
- `src/constants/config.ts` (생성)

**내용**:
```typescript
// src/constants/locales.ts
export const SUPPORTED_LOCALES = ['en', 'ko', 'zh', 'ja'] as const;
export const DEFAULT_LOCALE = 'ko';

// src/constants/config.ts
export const POSTS_PER_PAGE = 9;
export const SITE_CONFIG = {
  name: 'KONIT Studio',
  author: 'Konit',
  email: 'konit611@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://konit.studio',
};
```

**영향 받는 파일**:
- 모든 페이지 파일
- 레이아웃 파일
- 메타데이터 생성 함수

---

#### Task 1.2: 타입 정리 및 분리
**목표**: 도메인별로 타입 파일 분리

**작업 파일**:
- `src/types/post.types.ts` (생성)
- `src/types/category.types.ts` (생성)
- `src/types/portfolio.types.ts` (생성)
- `src/types/common.types.ts` (생성)
- `src/types/i18n.types.ts` (생성)

**기존 파일**:
- `src/types/index.ts` → 각 타입 파일로 분리 후 re-export만 유지

---

#### Task 1.3: 유틸리티 함수 정리
**목표**: 재사용 가능한 유틸리티 함수 분리

**작업 파일**:
- `src/utils/seo.utils.ts` (생성) - 메타데이터, JSON-LD 생성
- `src/utils/date.utils.ts` (생성) - 날짜 포맷팅
- `src/utils/text.utils.ts` (생성) - 텍스트 처리
- `src/utils/metadata.utils.ts` (생성) - 메타데이터 생성 헬퍼

**내용**:
```typescript
// src/utils/metadata.utils.ts
export function generatePageMetadata(params: MetadataParams): Metadata {
  // 공통 메타데이터 생성 로직
}

export function generateJSONLD(params: JSONLDParams): object {
  // JSON-LD 스키마 생성 로직
}
```

**영향 받는 파일**:
- 모든 페이지 파일의 `generateMetadata` 함수
- SEO 관련 컴포넌트

---

#### Task 1.4: 번역 파일 통합 및 정리
**목표**: 컴포넌트 내 하드코딩된 번역을 JSON으로 이전

**작업 파일**:
- `public/locales/en/common.json` (수정)
- `public/locales/ko/common.json` (수정)
- `public/locales/zh/common.json` (수정)
- `public/locales/ja/common.json` (수정)

**새로 추가할 키**:
```json
{
  "header": {
    "brand": "KONIT",
    "nav": { ... }
  },
  "footer": {
    "description": "...",
    "copyright": "..."
  },
  "home": {
    "hero": { ... },
    "value": { ... }
  },
  "career": { ... },
  "portfolio": { ... }
}
```

**영향 받는 파일**:
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/home/HeroSection.tsx`
- `src/components/home/ValueSection.tsx`
- `src/app/[locale]/career/page.tsx`
- `src/app/[locale]/portfolio/page.tsx`

---

#### Task 1.5: 데이터 폴더 재구성
**목표**: 최신 카테고리 구조에 맞게 데이터 폴더 재구성

**현재 구조**:
```
data/
├── posts/
│   ├── en/
│   │   ├── ai/
│   │   ├── algorithm/
│   │   ├── blender/
│   │   ├── ios/
│   │   ├── math/
│   │   └── statistics/
│   ├── ko/
│   ├── zh/
│   └── ja/
└── portfolio/
    ├── en/
    ├── ko/
    ├── zh/
    └── ja/
```

**개선된 구조** (Parent Category 반영):
```
data/
├── posts/
│   ├── en/
│   │   ├── planning/           # Parent Category
│   │   │   ├── statistics/     # Child Category
│   │   │   │   └── *.md
│   │   │   └── math/           # Child Category
│   │   │       └── *.md
│   │   ├── design/             # Parent Category
│   │   │   └── blender/        # Child Category
│   │   │       └── *.md
│   │   └── development/        # Parent Category
│   │       ├── ios/            # Child Category
│   │       │   └── *.md
│   │       ├── algorithm/      # Child Category
│   │       │   └── *.md
│   │       └── ai/             # Child Category
│   │           └── *.md
│   ├── ko/ (동일 구조)
│   ├── zh/ (동일 구조)
│   └── ja/ (동일 구조)
└── portfolio/ (변경 없음)
```

**작업 순서**:

1. **백업 생성**
   ```bash
   cp -r data/posts data/posts_backup
   ```

2. **새 폴더 구조 생성**
   - 각 locale 디렉토리에 parent category 폴더 생성
   - 각 parent category 안에 child category 폴더 생성

3. **파일 이동**
   ```bash
   # 예시: ko 폴더
   # Planning (statistics, math)
   mkdir -p data/posts/ko/planning/statistics
   mkdir -p data/posts/ko/planning/math
   mv data/posts/ko/statistics/* data/posts/ko/planning/statistics/
   mv data/posts/ko/math/* data/posts/ko/planning/math/
   
   # Design (blender)
   mkdir -p data/posts/ko/design/blender
   mv data/posts/ko/blender/* data/posts/ko/design/blender/
   
   # Development (ios, algorithm, ai)
   mkdir -p data/posts/ko/development/ios
   mkdir -p data/posts/ko/development/algorithm
   mkdir -p data/posts/ko/development/ai
   mv data/posts/ko/ios/* data/posts/ko/development/ios/
   mv data/posts/ko/algorithm/* data/posts/ko/development/algorithm/
   mv data/posts/ko/ai/* data/posts/ko/development/ai/
   
   # 빈 폴더 삭제
   rmdir data/posts/ko/statistics data/posts/ko/math data/posts/ko/blender
   rmdir data/posts/ko/ios data/posts/ko/algorithm data/posts/ko/ai
   ```

4. **모든 locale에 동일하게 적용**
   - `en/`, `zh/`, `ja/` 폴더에도 동일한 작업 수행

5. **마크다운 파일 처리 로직 수정**
   - `src/lib/markdown.ts` 파일의 경로 탐색 로직 수정
   - Parent Category → Child Category 순으로 탐색하도록 변경

**코드 수정**:

```typescript
// src/lib/markdown.ts 수정 필요 부분

/**
 * Get post slugs with updated folder structure
 */
export function getPostSlugs(locale: string): string[] {
  const localeDir = path.join(postsDirectory, locale);
  if (!fs.existsSync(localeDir)) return [];
  
  const slugs: string[] = [];
  const parentCategories = getParentCategoryIds(); // 새로 필요
  
  // Check parent category → child category structure
  for (const parentId of parentCategories) {
    const parentDir = path.join(localeDir, parentId);
    if (!fs.existsSync(parentDir)) continue;
    
    const childCategories = fs.readdirSync(parentDir);
    for (const childId of childCategories) {
      const childDir = path.join(parentDir, childId);
      if (!fs.statSync(childDir).isDirectory()) continue;
      
      const files = fs.readdirSync(childDir);
      files
        .filter(file => file.endsWith('.md'))
        .forEach(file => {
          slugs.push(file.replace(/\.md$/, ''));
        });
    }
  }
  
  return slugs;
}

/**
 * Get a single post by slug with updated folder structure
 */
export function getPostBySlug(slug: string, locale: string): Post {
  const realSlug = slug.replace(/\.md$/, '');
  const localeDir = path.join(postsDirectory, locale);
  
  const parentCategories = getParentCategoryIds();
  const categories = getCategories();
  
  // Search in parent → child category structure
  for (const parentId of parentCategories) {
    const childCategories = categories.filter(c => c.parentId === parentId);
    
    for (const child of childCategories) {
      const postPath = path.join(localeDir, parentId, child.id, `${realSlug}.md`);
      if (fs.existsSync(postPath)) {
        return parsePostFile(postPath, realSlug);
      }
    }
  }
  
  // Fallback to English if not found
  // ... (동일한 로직 반복)
  
  throw new Error(`Post not found: ${slug} in ${locale} or en`);
}
```

**영향 받는 파일**:
- `src/lib/markdown.ts` - 파일 탐색 로직 수정
- `src/lib/categories.server.ts` - Parent Category ID 가져오는 함수 필요 (이미 있을 수 있음)
- `data/posts/` 전체 폴더 구조

**주의사항**:
- ⚠️ 백업 필수
- ⚠️ 파일 이동 후 빌드 테스트 필수
- ⚠️ Git으로 변경 사항 추적
- ⚠️ 모든 locale에 동일하게 적용

**검증**:
1. 모든 마크다운 파일이 올바른 위치로 이동되었는지 확인
2. `npm run build`로 빌드 성공 확인
3. 각 카테고리 페이지에서 포스트가 정상적으로 표시되는지 확인
4. 포스트 상세 페이지 접근 확인

---

### 📌 Phase 2: 컴포넌트 재구조화

#### Task 2.1: Atoms 생성
**목표**: 최소 단위 재사용 컴포넌트 생성

**작업 파일** (생성):
- `src/components/atoms/Button/Button.tsx`
- `src/components/atoms/Button/Button.types.ts`
- `src/components/atoms/Button/index.ts`
- `src/components/atoms/Badge/Badge.tsx`
- `src/components/atoms/Icon/Icon.tsx`
- `src/components/atoms/Heading/Heading.tsx`
- `src/components/atoms/Text/Text.tsx`
- `src/components/atoms/Link/Link.tsx`
- `src/components/atoms/Image/Image.tsx`

**컴포넌트 예시**:
```typescript
// Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ ... }) => { ... }
```

---

#### Task 2.2: Molecules 생성
**목표**: Atom을 조합한 중간 수준 컴포넌트

**작업 파일** (생성):
- `src/components/molecules/Card/Card.tsx`
- `src/components/molecules/Card/ContentCard.tsx` (기존 ContentCard 이전)
- `src/components/molecules/MenuItem/MenuItem.tsx`
- `src/components/molecules/SocialLinks/SocialLinks.tsx`
- `src/components/molecules/LanguageSelector/LanguageSelector.tsx`
- `src/components/molecules/Pagination/Pagination.tsx`
- `src/components/molecules/PostMeta/PostMeta.tsx` (날짜, 카테고리, 읽는시간 표시)

**기존 파일 이전**:
- `src/components/ContentCard.tsx` → `src/components/molecules/Card/ContentCard.tsx`

---

#### Task 2.3: Organisms 재구조화
**목표**: 복잡한 UI 블록을 Organism으로 구성

**작업 파일**:
- `src/components/organisms/Header/Header.tsx` (기존 이전)
- `src/components/organisms/Footer/Footer.tsx` (기존 이전)
- `src/components/organisms/Navigation/Navigation.tsx` (Header에서 분리)
- `src/components/organisms/CategoryFilter/CategoryFilter.tsx` (기존 이전)
- `src/components/organisms/PostGrid/PostGrid.tsx` (생성)
- `src/components/organisms/HeroSection/HeroSection.tsx` (기존 이전)
- `src/components/organisms/ValueSection/ValueSection.tsx` (기존 이전)

**기존 파일 경로 변경**:
- `src/components/layout/Header.tsx` → `src/components/organisms/Header/`
- `src/components/layout/Footer.tsx` → `src/components/organisms/Footer/`
- `src/components/CategoryFilter.tsx` → `src/components/organisms/CategoryFilter/`
- `src/components/home/*` → `src/components/organisms/*/`

---

#### Task 2.4: Templates 생성
**목표**: 페이지 레이아웃 템플릿 생성

**작업 파일** (생성):
- `src/components/templates/PageLayout/PageLayout.tsx`
- `src/components/templates/BlogLayout/BlogLayout.tsx`
- `src/components/templates/PortfolioLayout/PortfolioLayout.tsx`

**기존 파일 대체**:
- `src/components/layout/Layout.tsx` → Templates로 통합

---

### 📌 Phase 3: 로직 최적화

#### Task 3.1: 메타데이터 생성 함수 통합
**목표**: 중복된 메타데이터 생성 로직을 유틸리티로 통합

**작업 파일**:
- `src/lib/metadata/generators.ts` (생성)
- `src/lib/metadata/schemas.ts` (생성)
- `src/lib/metadata/types.ts` (생성)

**함수**:
```typescript
export function generatePageMetadata(config: PageMetadataConfig): Metadata
export function generateBlogPostMetadata(post: Post, locale: string): Metadata
export function generatePortfolioMetadata(item: Portfolio, locale: string): Metadata
```

**영향 받는 파일**:
- `src/app/[locale]/page.tsx`
- `src/app/[locale]/blog/page.tsx`
- `src/app/[locale]/blog/[slug]/page.tsx`
- `src/app/[locale]/contact/page.tsx`
- `src/app/[locale]/portfolio/page.tsx`
- `src/app/[locale]/career/page.tsx`

---

#### Task 3.2: JSON-LD 스키마 자동 생성
**목표**: 구조화된 데이터 생성 자동화

**작업 파일**:
- `src/lib/seo/jsonld.ts` (생성)

**함수**:
```typescript
export function generateWebsiteSchema(locale: string): object
export function generateBlogSchema(posts: Post[], locale: string): object
export function generatePersonSchema(locale: string): object
export function generateBreadcrumbSchema(path: string[], locale: string): object
```

---

#### Task 3.3: 페이지네이션 로직 통합
**목표**: BlogClient의 페이지네이션을 재사용 가능하게 분리

**작업 파일**:
- `src/hooks/usePagination.ts` (생성)
- `src/components/molecules/Pagination/Pagination.tsx`

**적용 위치**:
- `src/app/[locale]/blog/BlogClient.tsx`
- 추후 포트폴리오에도 적용 가능

---

### 📌 Phase 4: 레거시 제거

#### Task 4.1: 여행 블로그 문구 제거
**목표**: 모든 여행 관련 문구를 기술 블로그 문구로 교체

**작업 파일** 및 **변경 내용**:

| 파일 | 변경 전 | 변경 후 |
|------|---------|---------|
| `src/app/[locale]/page.tsx` | `https://travelblog.com` | `https://konit.studio` |
| `src/app/[locale]/contact/ContactClient.tsx` | `https://travelblog.com` | `https://konit.studio` |
| `src/app/[locale]/blog/page.tsx` | `Alex Chen` | `Konit` |
| `src/components/layout/Footer.tsx` | Travel 관련 설명 | Tech 관련 설명 |
| `public/locales/*/common.json` | Travel 관련 번역 | Tech 관련 번역 |

**검색 키워드**:
- "travel"
- "Alex Chen"
- "travelblog"
- "journey" (여행 맥락)
- "destination" (여행 맥락)

---

#### Task 4.2: 기술 블로그 최적화
**목표**: SEO 및 콘텐츠를 기술 블로그에 맞게 최적화

**작업 내용**:

1. **SEO 키워드 업데이트**
   - Travel → Tech/Development
   - Destination → Technology
   - Journey → Learning Path

2. **메타 설명 업데이트**
   - 각 페이지의 description을 기술 블로그에 맞게 수정

3. **사이트 이름 통일**
   - "KONIT Studio" 또는 "Konit Tech Blog"로 통일

---

#### Task 4.3: 사용하지 않는 코드 제거
**목표**: Dead code 제거

**확인할 파일**:
- `src/lib/posts.ts` - 주석 처리된 함수 확인
- `src/components/` - 사용하지 않는 컴포넌트
- `src/app/[locale]/career/page.tsx` - 주석 처리된 섹션

**제거 대상**:
- 주석 처리된 코드 블록
- Import만 되고 사용되지 않는 함수
- 빈 디렉토리

---

## 아키텍처 개선 방안

### 최종 디렉토리 구조

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # 로케일별 라우트
│   │   ├── blog/
│   │   │   ├── [slug]/
│   │   │   │   └── page.tsx
│   │   │   ├── BlogClient.tsx   # 클라이언트 컴포넌트
│   │   │   └── page.tsx         # 서버 컴포넌트
│   │   ├── portfolio/
│   │   ├── career/
│   │   ├── contact/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/                   # Atomic Design
│   ├── atoms/                    # 최소 단위
│   │   ├── Button/
│   │   ├── Badge/
│   │   ├── Icon/
│   │   ├── Heading/
│   │   ├── Text/
│   │   ├── Link/
│   │   └── Image/
│   ├── molecules/                # Atoms 조합
│   │   ├── Card/
│   │   ├── MenuItem/
│   │   ├── SocialLinks/
│   │   ├── LanguageSelector/
│   │   ├── Pagination/
│   │   └── PostMeta/
│   ├── organisms/                # 복잡한 UI 블록
│   │   ├── Header/
│   │   ├── Footer/
│   │   ├── Navigation/
│   │   ├── CategoryFilter/
│   │   ├── PostGrid/
│   │   ├── HeroSection/
│   │   └── ValueSection/
│   ├── templates/                # 페이지 레이아웃
│   │   ├── PageLayout/
│   │   ├── BlogLayout/
│   │   └── PortfolioLayout/
│   ├── I18nProvider.tsx
│   ├── LanguageSwitcher.tsx
│   └── SEO.tsx
│
├── lib/                          # 비즈니스 로직
│   ├── markdown.ts              # 마크다운 처리 (서버)
│   ├── posts.ts                 # 포스트 관련 로직
│   ├── portfolio.ts             # 포트폴리오 로직
│   ├── categories.ts            # 카테고리 (클라이언트)
│   ├── categories.server.ts    # 카테고리 (서버)
│   ├── i18n-utils.ts           # 국제화 유틸
│   ├── seo.ts                  # SEO 설정
│   └── metadata/               # 메타데이터 생성 (신규)
│       ├── generators.ts
│       ├── schemas.ts
│       └── types.ts
│
├── utils/                       # 순수 유틸리티 함수 (신규)
│   ├── seo.utils.ts
│   ├── date.utils.ts
│   ├── text.utils.ts
│   └── metadata.utils.ts
│
├── hooks/                       # Custom Hooks
│   ├── useSectionScroll.ts
│   └── usePagination.ts        # 신규
│
├── types/                       # TypeScript 타입 정의
│   ├── index.ts                # Re-export
│   ├── post.types.ts           # 신규
│   ├── category.types.ts       # 신규
│   ├── portfolio.types.ts      # 신규
│   ├── common.types.ts         # 신규
│   └── i18n.types.ts           # 신규
│
├── constants/                   # 상수 (신규)
│   ├── index.ts
│   ├── locales.ts
│   └── config.ts
│
└── styles/                      # 스타일 (필요시)
    └── theme.ts
```

---

## 예상 결과

### 개선 지표

| 항목 | 개선 전 | 개선 후 | 개선율 |
|------|---------|---------|--------|
| 코드 중복 | 높음 | 낮음 | -70% |
| 번들 크기 | 기준 | 최적화 | -10~15% |
| 타입 커버리지 | 80% | 95%+ | +15% |
| 컴포넌트 재사용성 | 낮음 | 높음 | +200% |
| 유지보수성 | 중간 | 높음 | +150% |

### 장점

1. **개발 생산성 향상**
   - 재사용 가능한 컴포넌트로 개발 속도 증가
   - 명확한 구조로 새로운 기능 추가 용이

2. **유지보수성 개선**
   - 코드 중복 제거로 버그 수정 용이
   - 아토믹 디자인으로 컴포넌트 위치 파악 쉬움

3. **확장성 향상**
   - 새로운 페이지 추가 시 기존 컴포넌트 재사용
   - 다국어 추가 용이

4. **코드 품질 향상**
   - 타입 안정성 증가
   - 일관된 코딩 스타일

---

## 리팩토링 우선순위

### 🔴 High Priority (즉시 진행)
- Phase 1: 기초 정비
- Phase 4: 레거시 제거 (여행 블로그 문구)

### 🟡 Medium Priority (순차 진행)
- Phase 2: 컴포넌트 재구조화
- Phase 3: 로직 최적화

### 🟢 Low Priority (선택적 진행)
- Phase 5: 테스트 및 검증 (지속적)

---

## 주의사항

1. **점진적 리팩토링**
   - 한 번에 모든 것을 바꾸지 말고 단계별로 진행
   - 각 Phase 완료 후 빌드 및 테스트 확인

2. **하위 호환성**
   - 기존 데이터(마크다운 파일) 구조 유지
   - URL 구조 변경 없음

3. **백업**
   - 리팩토링 전 Git 브랜치 생성
   - 각 Phase별 커밋

4. **테스트**
   - 각 변경사항마다 빌드 테스트
   - 주요 페이지 수동 테스트

---

## 다음 단계

1. **이 계획서 리뷰 및 승인**
2. **리팩토링 브랜치 생성**
   ```bash
   git checkout -b refactor/architecture-improvement
   ```
3. **Phase 1부터 순차적으로 진행**
4. **각 Phase 완료 후 PR 생성 및 리뷰**

---

## 참고 자료

- [Next.js 공식 문서 - App Router](https://nextjs.org/docs/app)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [React Best Practices](https://react.dev/learn)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)

---

**작성일**: 2026-01-03  
**작성자**: AI Assistant  
**버전**: 1.0

