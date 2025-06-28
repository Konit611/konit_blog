import { getAllPostMetadata, getAllCategories } from '../../../lib/markdown';
import { getCategories } from '../../../lib/categories.server';
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
      title: "Tech Blog - Latest Development Insights and TIL",
      description: "Explore development insights, coding tutorials, and daily learnings. Discover programming tips, tech trends, and practical solutions for modern software development.",
      keywords: "tech blog, programming tutorials, development insights, coding tips, TIL, software engineering, web development, technical articles"
    },
    ko: {
      title: "기술 블로그 - 최신 개발 인사이트와 TIL",
      description: "개발 인사이트, 코딩 튜토리얼, 일일 학습 내용을 탐험해보세요. 프로그래밍 팁, 기술 트렌드, 현대 소프트웨어 개발을 위한 실용적인 해결책을 발견하세요.",
      keywords: "기술 블로그, 프로그래밍 튜토리얼, 개발 인사이트, 코딩 팁, TIL, 소프트웨어 엔지니어링, 웹 개발, 기술 아티클"
    },
    zh: {
      title: "技术博客 - 最新开发见解与今日所学",
      description: "探索开发见解、编程教程和日常学习内容。发现编程技巧、技术趋势和现代软件开发的实用解决方案。",
      keywords: "技术博客, 编程教程, 开发见解, 编程技巧, 今日所学, 软件工程, 网页开发, 技术文章"
    },
    ja: {
      title: "技術ブログ - 最新の開発インサイトとTIL",
      description: "開発インサイト、プログラミングチュートリアル、日々の学習内容を探索してください。プログラミングのヒント、技術トレンド、現代のソフトウェア開発のための実用的なソリューションを発見してください。",
      keywords: "技術ブログ, プログラミングチュートリアル, 開発インサイト, コーディングのヒント, TIL, ソフトウェアエンジニアリング, ウェブ開発, 技術記事"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';
  const canonicalUrl = `${siteUrl}/${locale}/blog`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: 'Alex Chen' }],
    creator: 'Alex Chen',
    publisher: 'Tech Blog',
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
      siteName: 'Tech Blog',
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
      creator: '@developer',
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
    const categoryIds = getAllCategories();
    const categories = getCategories();

    // Generate JSON-LD structured data for Blog
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Tech Blog',
      description: 'Browse our collection of development insights, coding tutorials, and technical articles. Find practical solutions for modern software development and discover the latest tech trends.',
      url: `${siteUrl}/${locale}/blog`,
      inLanguage: locale,
      author: {
        '@type': 'Person',
        name: 'Alex Chen',
        url: `${siteUrl}/${locale}/contact`
      },
      publisher: {
        '@type': 'Organization',
        name: 'Tech Blog',
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
      about: categoryIds.map(category => ({
        '@type': 'Thing',
        name: category,
        description: `Technical content about ${category}`
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