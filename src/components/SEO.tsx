import { Metadata } from 'next';

export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  locale?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  alternateLanguages?: { [key: string]: string };
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  image = '/images/og-default.jpg',
  url = '',
  locale = 'en',
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  section,
  tags = [],
  alternateLanguages = {},
}: SEOProps): Metadata {
  const siteName = 'Tech Blog';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  
  // Base metadata
  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: author ? [{ name: author }] : undefined,
    
    // Open Graph
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName,
      locale,
      type: type === 'article' ? 'article' : 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: author ? [author] : undefined,
        section,
        tags,
      }),
    },
    
    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: author ? `@${author}` : undefined,
    },
    
    // Robots
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
    
    // Verification (can be added later)
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_VERIFICATION,
    },
  };
  
  // Add alternate languages if provided
  if (Object.keys(alternateLanguages).length > 0) {
    metadata.alternates = {
      languages: alternateLanguages,
    };
  }
  
  return metadata;
}

// Utility function for generating structured data
export function generateArticleStructuredData({
  title,
  description,
  url,
  image,
  publishedTime,
  modifiedTime,
  author,
  locale = 'en',
}: {
  title: string;
  description: string;
  url: string;
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  locale?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    image: image ? [image] : undefined,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: author
      ? {
          '@type': 'Person',
          name: author,
        }
      : undefined,
    publisher: {
      '@type': 'Organization',
      name: 'Travel Blog',
      logo: {
        '@type': 'ImageObject',
        url: '/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: locale,
  };
}

// Utility function for generating website structured data
export function generateWebsiteStructuredData({
  url,
  name = 'Tech Blog',
  description,
  locale = 'en',
}: {
  url: string;
  name?: string;
  description: string;
  locale?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
    url,
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
} 