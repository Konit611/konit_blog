import { PostMetadata } from '@/types';
import { getAllPostMetadata } from '@/lib/markdown';
import HomeClient from './HomeClient';
import { Metadata } from 'next';

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  
  // Load translations for metadata
  const translations = {
    en: {
      title: "Travel Blog - Discover Amazing Destinations",
      description: "Explore the world through our travel stories, tips, and guides. Discover amazing destinations, local cultures, and unforgettable experiences.",
      keywords: "travel blog, travel destinations, travel tips, travel guides, world travel, adventure, tourism, travel stories, vacation, backpacking"
    },
    ko: {
      title: "여행 블로그 - 놀라운 여행지를 발견하세요",
      description: "우리의 여행 이야기, 팁, 가이드를 통해 세계를 탐험하세요. 놀라운 여행지, 현지 문화, 잊을 수 없는 경험을 발견하세요.",
      keywords: "여행 블로그, 여행지, 여행 팁, 여행 가이드, 세계 여행, 모험, 관광, 여행 이야기, 휴가, 배낭여행"
    },
    zh: {
      title: "旅行博客 - 发现令人惊叹的目的地",
      description: "通过我们的旅行故事、技巧和指南探索世界。发现令人惊叹的目的地、当地文化和难忘的体验。",
      keywords: "旅行博客, 旅行目的地, 旅行技巧, 旅行指南, 世界旅行, 冒险, 旅游, 旅行故事, 度假, 背包旅行"
    },
    ja: {
      title: "旅行ブログ - 素晴らしい目的地を発見",
      description: "私たちの旅行記、ヒント、ガイドを通して世界を探検しましょう。素晴らしい目的地、地元の文化、忘れられない体験を発見してください。",
      keywords: "旅行ブログ, 旅行先, 旅行のコツ, 旅行ガイド, 世界旅行, 冒険, 観光, 旅行記, 休暇, バックパッキング"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelblog.com';

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: 'Alex Chen' }],
    creator: 'Alex Chen',
    publisher: 'Travel Blog',
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
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'ko': '/ko',
        'zh': '/zh',
        'ja': '/ja',
      },
    },
    formatDetection: {
      telephone: false,
      address: false,
      email: false,
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: `/${locale}`,
      siteName: 'Travel Blog',
      locale: locale,
      type: 'website',
      images: [
        {
          url: '/images/og-home.jpg',
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@travelblogger',
      title: t.title,
      description: t.description,
      images: ['/images/og-home.jpg'],
    },
    icons: {
      icon: '/favicon.ico',
    },
  };
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ko' },
    { locale: 'zh' },
    { locale: 'ja' }
  ];
}

export default async function HomePage({ params }: HomePageProps) {
  try {
    const { locale } = await params;
    const posts = getAllPostMetadata(locale);
    // Get the latest 3 posts
    const featuredPosts = posts.slice(0, 3);

    // Generate JSON-LD structured data for WebSite
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelblog.com';
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Travel Blog',
      description: 'Explore the world through our travel stories, tips, and guides. Discover amazing destinations, local cultures, and unforgettable experiences.',
      url: `${siteUrl}/${locale}`,
      inLanguage: locale,
      author: {
        '@type': 'Person',
        name: 'Alex Chen',
        url: `${siteUrl}/${locale}/contact`
      },
      publisher: {
        '@type': 'Organization',
        name: 'Travel Blog',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/images/logo.png`
        }
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/${locale}/blog?search={search_term_string}`
        },
        'query-input': 'required name=search_term_string'
      },
      mainEntity: {
        '@type': 'Blog',
        name: 'Travel Blog',
        description: 'Latest travel stories and destination guides',
        url: `${siteUrl}/${locale}/blog`,
        blogPost: featuredPosts.slice(0, 3).map(post => ({
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          url: `${siteUrl}/${locale}/blog/${post.slug}`,
          datePublished: post.date,
          author: {
            '@type': 'Person',
            name: post.author || 'Alex Chen'
          },
          image: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/images/og-blog.jpg`
        }))
      }
    };

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <HomeClient 
          featuredPosts={featuredPosts} 
          locale={locale}
        />
      </>
    );
  } catch (error) {
    console.error('Error loading posts:', error);
    const { locale } = await params;
    return (
      <HomeClient 
        featuredPosts={[]} 
        locale={locale}
      />
    );
  }
}
