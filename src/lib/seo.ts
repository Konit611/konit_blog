import { Metadata } from 'next';

// Base site configuration
export const siteConfig = {
  name: 'Konit Developer Blog',
  description: 'A multilingual developer blog sharing programming insights, software development experiences, and technical knowledge',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://konit611.com',
  ogImage: '/images/og-default.jpg',
  author: 'Konit Developer',
  keywords: ['developer', 'blog', 'programming', 'software development', 'web development', 'technology', 'coding', 'tutorials', 'AI', 'algorithm', 'iOS', 'design'],
  supportedLocales: ['en', 'ko', 'zh', 'ja'],
};

// Generate alternate language URLs
export function generateAlternateLanguages(
  path: string,
  currentLocale: string,
  supportedLocales: string[] = siteConfig.supportedLocales
): { [key: string]: string } {
  const alternates: { [key: string]: string } = {};
  
  supportedLocales.forEach((locale) => {
    if (locale !== currentLocale) {
      alternates[locale] = `${siteConfig.url}/${locale}${path}`;
    }
  });
  
  return alternates;
}

// Generate canonical URL
export function generateCanonicalUrl(path: string, locale: string): string {
  return `${siteConfig.url}/${locale}${path}`;
}

// Generate hreflang tags for internationalization
export function generateHreflangTags(
  path: string,
  supportedLocales: string[] = siteConfig.supportedLocales
): { [key: string]: string } {
  const hreflang: { [key: string]: string } = {};
  
  supportedLocales.forEach((locale) => {
    hreflang[locale] = `${siteConfig.url}/${locale}${path}`;
  });
  
  // Add x-default for the default language (English)
  hreflang['x-default'] = `${siteConfig.url}/en${path}`;
  
  return hreflang;
}

// Get localized site metadata
export function getLocalizedSiteMetadata(locale: string): {
  title: string;
  description: string;
  keywords: string[];
} {
  const localizedContent = {
    en: {
      title: 'Developer Blog - Programming Insights & Tech Knowledge',
      description: 'Explore software development tutorials, programming tips, AI insights, and technical experiences. Join us on our coding journey!',
      keywords: ['developer', 'programming', 'coding', 'software development', 'web development', 'AI', 'algorithm', 'iOS', 'design', 'technology', 'tutorials'],
    },
    ko: {
      title: '개발 블로그 - 프로그래밍 인사이트 & 기술 지식',
      description: '소프트웨어 개발 튜토리얼, 프로그래밍 팁, AI 인사이트, 기술 경험을 탐험하세요. 우리의 코딩 여정에 함께하세요!',
      keywords: ['개발자', '프로그래밍', '코딩', '소프트웨어 개발', '웹 개발', 'AI', '알고리즘', 'iOS', '디자인', '기술', '튜토리얼'],
    },
    zh: {
      title: '开发博客 - 编程见解与技术知识',
      description: '探索软件开发教程、编程技巧、AI见解和技术经验。加入我们的编程之旅！',
      keywords: ['开发者', '编程', '代码', '软件开发', 'Web开发', 'AI', '算法', 'iOS', '设计', '技术', '教程'],
    },
    ja: {
      title: '開発ブログ - プログラミングの洞察と技術知識',
      description: 'ソフトウェア開発チュートリアル、プログラミングのヒント、AIの洞察、技術的な経験を探求してください。私たちのコーディングの旅に参加しましょう！',
      keywords: ['開発者', 'プログラミング', 'コーディング', 'ソフトウェア開発', 'Web開発', 'AI', 'アルゴリズム', 'iOS', 'デザイン', '技術', 'チュートリアル'],
    },
  };

  return localizedContent[locale as keyof typeof localizedContent] || localizedContent.en;
}

// Generate JSON-LD structured data script tag
export function generateStructuredDataScript(data: object): string {
  return `<script type="application/ld+json">${JSON.stringify(data, null, 2)}</script>`;
}

// Common metadata generator for pages
export function generatePageMetadata({
  title,
  description,
  path = '',
  locale = 'en',
  type = 'website',
  image,
  publishedTime,
  modifiedTime,
  author,
  keywords = [],
}: {
  title: string;
  description: string;
  path?: string;
  locale?: string;
  type?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string[];
}): Metadata {
  const canonicalUrl = generateCanonicalUrl(path, locale);
  const alternateLanguages = generateAlternateLanguages(path, locale);
  const fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
  const ogImage = image || siteConfig.ogImage;
  
  return {
    title: fullTitle,
    description,
    keywords: [...siteConfig.keywords, ...keywords].join(', '),
    authors: author ? [{ name: author }] : [{ name: siteConfig.author }],
    
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.name,
      locale,
      type: type === 'article' ? 'article' : 'website',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : [siteConfig.author],
      }),
    },
    
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
      creator: `@${siteConfig.author.replace(' ', '').toLowerCase()}`,
    },
    
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
  };
} 