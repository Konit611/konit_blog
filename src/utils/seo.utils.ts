/**
 * SEO Utilities
 * Functions for SEO optimization
 */

import type { Metadata } from 'next';

/**
 * Generate keywords string from array
 */
export function generateKeywords(keywords: string[]): string {
  return keywords.join(', ');
}

/**
 * Generate Open Graph image URL
 */
export function generateOgImageUrl(
  siteUrl: string,
  imagePath?: string,
  defaultImage: string = '/images/og-default.jpg'
): string {
  if (!imagePath) {
    return `${siteUrl}${defaultImage}`;
  }
  
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  return `${siteUrl}${imagePath}`;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(siteUrl: string, path: string): string {
  const cleanSiteUrl = siteUrl.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanSiteUrl}${cleanPath}`;
}

/**
 * Generate alternate language URLs
 */
export function generateAlternateUrls(
  siteUrl: string,
  path: string,
  locales: string[]
): Record<string, string> {
  const alternates: Record<string, string> = {};
  
  for (const locale of locales) {
    const localePrefix = locale === 'ko' ? '' : `/${locale}`;
    alternates[locale] = `${siteUrl}${localePrefix}${path}`;
  }
  
  return alternates;
}

/**
 * Validate and sanitize meta description
 */
export function sanitizeDescription(description: string, maxLength: number = 160): string {
  // Remove HTML tags
  const cleaned = description.replace(/<[^>]*>/g, '');
  
  // Trim and truncate
  const trimmed = cleaned.trim();
  
  if (trimmed.length <= maxLength) {
    return trimmed;
  }
  
  return trimmed.slice(0, maxLength - 3) + '...';
}

/**
 * Generate robots meta content
 */
export function generateRobotsMeta(index: boolean = true, follow: boolean = true): Metadata['robots'] {
  return {
    index,
    follow,
    googleBot: {
      index,
      follow,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };
}

