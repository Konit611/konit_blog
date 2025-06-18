import { PostMetadata } from '../../../types';
import { getAllPostMetadata, getAllCategories } from '../../../lib/markdown';
import BlogClient from './BlogClient';
import { Metadata } from 'next';

interface BlogPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  // Load translations for metadata
  const translations = {
    en: {
      title: "Travel Blog - Latest Travel Stories and Tips",
      description: "Browse our collection of travel stories, destination guides, and practical tips. Find inspiration for your next adventure and discover hidden gems around the world.",
      keywords: "travel blog posts, travel stories, destination guides, travel tips, travel inspiration, adventure travel, travel experiences"
    },
    ko: {
      title: "여행 블로그 - 최신 여행 이야기와 팁",
      description: "여행 이야기, 여행지 가이드, 실용적인 팁 모음을 둘러보세요. 다음 모험을 위한 영감을 찾고 전 세계의 숨겨진 보석을 발견하세요.",
      keywords: "여행 블로그 포스트, 여행 이야기, 여행지 가이드, 여행 팁, 여행 영감, 모험 여행, 여행 경험"
    },
    zh: {
      title: "旅行博客 - 最新旅行故事和技巧",
      description: "浏览我们的旅行故事、目的地指南和实用技巧集合。为您的下一次冒险寻找灵感，发现世界各地的隐藏宝石。",
      keywords: "旅行博客文章, 旅行故事, 目的地指南, 旅行技巧, 旅行灵感, 冒险旅行, 旅行体验"
    },
    ja: {
      title: "旅行ブログ - 最新の旅行ストーリーとヒント",
      description: "旅行ストーリー、目的地ガイド、実用的なヒントのコレクションをご覧ください。次の冒険のインスピレーションを見つけ、世界中の隠れた宝石を発見してください。",
      keywords: "旅行ブログ記事, 旅行ストーリー, 目的地ガイド, 旅行のヒント, 旅行インスピレーション, アドベンチャー旅行, 旅行体験"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelblog.com';
  const canonicalUrl = `${siteUrl}/${locale}/blog`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: 'Alex Chen' }],
    creator: 'Alex Chen',
    publisher: 'Travel Blog',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${siteUrl}/en/blog`,
        'ko': `${siteUrl}/ko/blog`,
        'zh': `${siteUrl}/zh/blog`,
        'ja': `${siteUrl}/ja/blog`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      siteName: 'Travel Blog',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/og-blog.jpg`,
          width: 1200,
          height: 630,
          alt: t.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      creator: '@travelblogger',
      images: [`${siteUrl}/images/og-blog.jpg`],
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

export default async function BlogPage({ params }: BlogPageProps) {
  try {
    const { locale } = await params;
    const posts = getAllPostMetadata(locale);
    const categories = getAllCategories(locale);

    // Generate JSON-LD structured data for Blog
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelblog.com';
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Travel Blog',
      description: 'Browse our collection of travel stories, destination guides, and practical tips. Find inspiration for your next adventure and discover hidden gems around the world.',
      url: `${siteUrl}/${locale}/blog`,
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
      blogPost: posts.slice(0, 10).map(post => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: `${siteUrl}/${locale}/blog/${post.slug}`,
        datePublished: post.date,
        author: {
          '@type': 'Person',
          name: post.author || 'Alex Chen'
        },
        image: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/images/og-blog.jpg`,
        keywords: post.categories.concat(post.tags || [])
      })),
      numberOfPosts: posts.length,
      about: categories.map(category => ({
        '@type': 'Thing',
        name: category,
        description: `Travel content about ${category}`
      }))
    };

    return (
      <>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        <BlogClient 
          posts={posts} 
          categories={categories} 
          locale={locale}
        />
      </>
    );
  } catch (error) {
    console.error('Error loading blog data:', error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg text-red-600">
          Error loading blog posts. Please try again later.
        </div>
      </div>
    );
  }
} 