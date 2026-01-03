/**
 * JSON-LD Schema Generators
 * Functions to generate structured data for SEO
 */

import { SITE_CONFIG } from '@/constants/config';
import { SupportedLocale } from '@/types/common.types';
import { Post } from '@/types/post.types';

/**
 * Generate Organization JSON-LD
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    sameAs: [
      `https://github.com/${SITE_CONFIG.social.github}`,
      `https://linkedin.com/in/${SITE_CONFIG.social.linkedin}`,
      `https://twitter.com/${SITE_CONFIG.social.twitter}`,
      `https://instagram.com/${SITE_CONFIG.social.instagram}`,
    ],
  };
}

/**
 * Generate WebSite JSON-LD
 */
export function generateWebSiteSchema(locale: SupportedLocale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url}/${locale}`,
    description: 'Tech Blog - Programming, Development, and Technology Insights',
    inLanguage: locale,
    publisher: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
    },
  };
}

/**
 * Generate BlogPosting JSON-LD
 */
export function generateBlogPostingSchema(
  post: Post,
  locale: SupportedLocale,
  author: string = SITE_CONFIG.author
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage.startsWith('http') 
      ? post.coverImage 
      : `${SITE_CONFIG.url}${post.coverImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: author || post.author || SITE_CONFIG.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/${locale}/blog/${post.slug}`,
    },
    keywords: post.tags?.join(', ') || post.categories.join(', '),
    articleSection: post.categories[0] || 'Technology',
    inLanguage: locale,
  };
}

/**
 * Generate BreadcrumbList JSON-LD
 */
export function generateBreadcrumbSchema(
  locale: SupportedLocale,
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}/${locale}${item.url}`,
    })),
  };
}

/**
 * Generate Person JSON-LD (for About/Contact pages)
 */
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: SITE_CONFIG.author,
    email: SITE_CONFIG.email,
    url: SITE_CONFIG.url,
    jobTitle: 'Software Developer',
    sameAs: [
      `https://github.com/${SITE_CONFIG.social.github}`,
      `https://linkedin.com/in/${SITE_CONFIG.social.linkedin}`,
      `https://twitter.com/${SITE_CONFIG.social.twitter}`,
    ],
  };
}

/**
 * Generate ItemList JSON-LD (for blog listing)
 */
export function generateItemListSchema(
  posts: Post[],
  locale: SupportedLocale
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_CONFIG.url}/${locale}/blog/${post.slug}`,
      name: post.title,
    })),
  };
}

/**
 * Helper to convert JSON-LD object to script tag
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function jsonLdScriptProps(jsonLd: Record<string, any>) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(jsonLd) },
  };
}

