/**
 * Site Configuration
 * General site-wide configuration constants
 */

export const SITE_CONFIG = {
  name: 'KONIT Studio',
  shortName: 'KONIT',
  author: 'Konit',
  email: 'konit611@gmail.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://konit611.com',
  description: {
    en: 'Explore programming insights, coding tutorials, and technical deep-dives. Share knowledge about software development, web technologies, and daily learnings (TIL).',
    ko: '프로그래밍 인사이트, 코딩 튜토리얼, 기술 심화 내용을 탐험하세요. 소프트웨어 개발, 웹 기술, 일일 학습(TIL)에 대한 지식을 공유합니다.',
    zh: '探索编程见解、编程教程和技术深度解析。分享软件开发、网络技术和日常学习(TIL)的知识。',
    ja: 'プログラミングの洞察、コーディングチュートリアル、技術的な深掘りを探索してください。ソフトウェア開発、ウェブ技術、日々の学習(TIL)に関する知識を共有します。',
  },
  keywords: [
    'tech blog',
    'programming',
    'software development',
    'coding tutorials',
    'TIL',
    'web development',
    'technical insights',
    'developer blog',
    'programming tips',
  ],
  social: {
    github: 'konit611',
    linkedin: 'konit611',
    twitter: 'konit611',
    instagram: 'konit611',
  },
} as const;

/**
 * Pagination Configuration
 */
export const PAGINATION = {
  POSTS_PER_PAGE: 9, // 3x3 grid
  PORTFOLIO_PER_PAGE: 6,
  RELATED_POSTS_LIMIT: 3,
  RECENT_POSTS_LIMIT: 5,
  FEATURED_POSTS_LIMIT: 3,
} as const;

/**
 * SEO Configuration
 */
export const SEO_CONFIG = {
  titleTemplate: '%s | KONIT Studio',
  defaultTitle: 'KONIT Studio - Tech Blog',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'KONIT Studio',
    images: {
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    handle: '@konit611',
    site: '@konit611',
    cardType: 'summary_large_image',
  },
} as const;

// Backward compatibility - export individual values
export const POSTS_PER_PAGE = PAGINATION.POSTS_PER_PAGE;
