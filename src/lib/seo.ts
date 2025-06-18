import { Metadata } from 'next';

// Base site configuration
export const siteConfig = {
  name: 'Travel Blog',
  description: 'A multilingual travel blog sharing adventures and experiences from around the world',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://travel-blog.com',
  ogImage: '/images/og-default.jpg',
  author: 'Travel Blogger',
  keywords: ['travel', 'blog', 'adventure', 'tourism', 'culture', 'photography'],
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
      title: 'Travel Blog - Adventures Around the World',
      description: 'Discover amazing travel destinations, cultural experiences, and adventure stories from around the globe. Join us on our journey!',
      keywords: ['travel', 'blog', 'adventure', 'tourism', 'culture', 'photography', 'destinations'],
    },
    ko: {
      title: '여행 블로그 - 세계 각지의 모험',
      description: '전 세계의 놀라운 여행지, 문화적 경험, 모험 이야기를 발견하세요. 우리의 여행에 함께하세요!',
      keywords: ['여행', '블로그', '모험', '관광', '문화', '사진', '여행지'],
    },
    zh: {
      title: '旅行博客 - 世界各地的冒险',
      description: '发现世界各地令人惊叹的旅行目的地、文化体验和冒险故事。加入我们的旅程！',
      keywords: ['旅行', '博客', '冒险', '旅游', '文化', '摄影', '目的地'],
    },
    ja: {
      title: 'トラベルブログ - 世界中の冒険',
      description: '世界中の素晴らしい旅行先、文化的体験、冒険の物語を発見してください。私たちの旅に参加しましょう！',
      keywords: ['旅行', 'ブログ', '冒険', '観光', '文化', '写真', '目的地'],
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