/**
 * Metadata Utilities
 * Helper functions for generating Next.js metadata
 */

import type { Metadata } from 'next';
import { SITE_CONFIG, SEO_CONFIG, SUPPORTED_LOCALES } from '@/constants';
import { generateOgImageUrl, generateCanonicalUrl, generateKeywords, sanitizeDescription, generateRobotsMeta } from './seo.utils';

interface GenerateMetadataParams {
  title: string;
  description: string;
  keywords?: string[];
  locale: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

/**
 * Generate page metadata
 */
export function generatePageMetadata(params: GenerateMetadataParams): Metadata {
  const {
    title,
    description,
    keywords = [],
    locale,
    path = '',
    image,
    type = 'website',
    author = SITE_CONFIG.author,
    publishedTime,
    modifiedTime,
  } = params;

  const siteUrl = SITE_CONFIG.url;
  const fullTitle = title.includes(SITE_CONFIG.name) 
    ? title 
    : `${title} | ${SITE_CONFIG.name}`;
  
  const canonicalUrl = generateCanonicalUrl(siteUrl, `/${locale}${path}`);
  const ogImage = generateOgImageUrl(siteUrl, image);
  const sanitizedDesc = sanitizeDescription(description);

  // Generate alternate language URLs
  const alternates: Record<string, string> = {};
  SUPPORTED_LOCALES.forEach(loc => {
    alternates[loc] = generateCanonicalUrl(siteUrl, `/${loc}${path}`);
  });

  const metadata: Metadata = {
    title: fullTitle,
    description: sanitizedDesc,
    keywords: keywords.length > 0 ? generateKeywords(keywords) : SITE_CONFIG.keywords.join(', '),
    authors: [{ name: author }],
    creator: author,
    publisher: SITE_CONFIG.name,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    openGraph: {
      title: fullTitle,
      description: sanitizedDesc,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      locale,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: sanitizedDesc,
      creator: SEO_CONFIG.twitter.handle,
      images: [ogImage],
    },
    robots: generateRobotsMeta(),
    icons: {
      icon: '/favicon.ico',
    },
  };

  return metadata;
}

/**
 * Generate blog post metadata
 */
export function generateBlogPostMetadata(
  post: {
    title: string;
    excerpt: string;
    date: string;
    author?: string;
    coverImage?: string;
    categories?: string[];
    tags?: string[];
  },
  locale: string
): Metadata {
  const keywords = [
    ...(post.categories || []),
    ...(post.tags || []),
    ...SITE_CONFIG.keywords.slice(0, 5),
  ];

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    keywords,
    locale,
    path: `/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`,
    image: post.coverImage,
    type: 'article',
    author: post.author,
    publishedTime: post.date,
  });
}

/**
 * Generate portfolio metadata
 */
export function generatePortfolioMetadata(
  item: {
    title: string;
    description: string;
    coverImage?: string;
    tech?: string[];
  },
  locale: string
): Metadata {
  const keywords = [
    ...(item.tech || []),
    'portfolio',
    'project',
    ...SITE_CONFIG.keywords.slice(0, 3),
  ];

  return generatePageMetadata({
    title: item.title,
    description: item.description,
    keywords,
    locale,
    path: `/portfolio/${item.title.toLowerCase().replace(/\s+/g, '-')}`,
    image: item.coverImage,
    type: 'website',
  });
}

