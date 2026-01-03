/**
 * Metadata Generation Utilities
 * Centralized functions for generating page metadata
 */

import { Metadata } from 'next';
import { SITE_CONFIG } from '@/constants/config';
import { SUPPORTED_LOCALES } from '@/constants/locales';
import { SupportedLocale } from '@/types/common.types';
import { Translations } from '@/types/i18n.types';

interface GenerateMetadataOptions {
  locale: SupportedLocale;
  title?: string;
  description?: string;
  keywords?: string | string[];
  path?: string;
  type?: 'website' | 'article';
  images?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
}

/**
 * Generate complete page metadata
 */
export function generatePageMetadata(options: GenerateMetadataOptions): Metadata {
  const {
    locale,
    title = SITE_CONFIG.name,
    description = '',
    keywords = [],
    path = '/',
    type = 'website',
    images = [`${SITE_CONFIG.url}/images/og-default.jpg`],
    author = SITE_CONFIG.author,
    publishedTime,
    modifiedTime,
    section,
    tags = [],
  } = options;

  const fullTitle = title === SITE_CONFIG.name ? title : `${title} | ${SITE_CONFIG.name}`;
  const canonicalUrl = `${SITE_CONFIG.url}/${locale}${path === '/' ? '' : path}`;

  // 대체 언어 URL 생성
  const alternateLanguages: Record<string, string> = {};
  SUPPORTED_LOCALES.forEach((lang) => {
    alternateLanguages[lang] = `${SITE_CONFIG.url}/${lang}${path === '/' ? '' : path}`;
  });

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: Array.isArray(keywords) ? keywords : [keywords],
    authors: [{ name: author }],
    creator: author,
    publisher: SITE_CONFIG.name,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale: locale,
      type: type,
      images: images.map(img => ({
        url: img.startsWith('http') ? img : `${SITE_CONFIG.url}${img}`,
        width: 1200,
        height: 630,
        alt: title,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      creator: `@${SITE_CONFIG.social.twitter}`,
      images: images.map(img => img.startsWith('http') ? img : `${SITE_CONFIG.url}${img}`),
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
    icons: {
      icon: '/favicon.ico',
    },
  };

  // 아티클 메타데이터 추가
  if (type === 'article' && metadata.openGraph) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ogMeta = metadata.openGraph as any;
    ogMeta.type = 'article';
    ogMeta.article = {
      publishedTime,
      modifiedTime,
      author: author,
      section,
      tags,
    };
  }

  return metadata;
}

/**
 * Generate metadata from translations
 */
export function generateMetadataFromTranslations(
  locale: SupportedLocale,
  translations: Translations,
  pageKey: string,
  path: string,
  type: 'website' | 'article' = 'website'
): Metadata {
  const t = (key: string): string => {
    const value = translations[key];
    return typeof value === 'string' ? value : '';
  };

  return generatePageMetadata({
    locale,
    title: t(`${pageKey}.title`),
    description: t(`${pageKey}.description`),
    keywords: t(`${pageKey}.keywords`)?.split(',').map((k: string) => k.trim()) || [],
    path,
    type,
  });
}

/**
 * Generate article metadata for blog posts
 */
export function generateArticleMetadata(options: {
  locale: SupportedLocale;
  title: string;
  description: string;
  coverImage: string;
  publishedTime: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  section?: string;
  slug: string;
}): Metadata {
  const {
    locale,
    title,
    description,
    coverImage,
    publishedTime,
    modifiedTime,
    author = SITE_CONFIG.author,
    tags = [],
    section,
    slug,
  } = options;

  return generatePageMetadata({
    locale,
    title,
    description,
    keywords: tags,
    path: `/blog/${slug}`,
    type: 'article',
    images: [coverImage],
    author,
    publishedTime,
    modifiedTime,
    section,
    tags,
  });
}

