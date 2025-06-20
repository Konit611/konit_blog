
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
      title: "Tech Blog - Development Insights & Daily Learning",
      description: "Explore programming insights, coding tutorials, and technical deep-dives. Share knowledge about software development, web technologies, and daily learnings (TIL).",
      keywords: "tech blog, programming, software development, coding tutorials, TIL, web development, technical insights, developer blog, programming tips"
    },
    ko: {
      title: "기술 블로그 - 개발 인사이트와 일일 학습",
      description: "프로그래밍 인사이트, 코딩 튜토리얼, 기술 심화 내용을 탐험하세요. 소프트웨어 개발, 웹 기술, 일일 학습(TIL)에 대한 지식을 공유합니다.",
      keywords: "기술 블로그, 프로그래밍, 소프트웨어 개발, 코딩 튜토리얼, TIL, 웹 개발, 기술 인사이트, 개발자 블로그, 프로그래밍 팁"
    },
    zh: {
      title: "技术博客 - 开发见解与日常学习",
      description: "探索编程见解、编程教程和技术深度解析。分享软件开发、网络技术和日常学习(TIL)的知识。",
      keywords: "技术博客, 编程, 软件开发, 编程教程, 今日所学, 网页开发, 技术见解, 开发者博客, 编程技巧"
    },
    ja: {
      title: "技術ブログ - 開発インサイトと日々の学習",
      description: "プログラミングの洞察、コーディングチュートリアル、技術的な深掘りを探索してください。ソフトウェア開発、ウェブ技術、日々の学習(TIL)に関する知識を共有します。",
      keywords: "技術ブログ, プログラミング, ソフトウェア開発, コーディングチュートリアル, TIL, ウェブ開発, 技術的洞察, 開発者ブログ, プログラミングのヒント"
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
    publisher: 'Tech Blog',
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
      siteName: 'Tech Blog',
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
      creator: '@developer',
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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techblog.com';
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Tech Blog',
      description: 'Explore programming insights, coding tutorials, and technical deep-dives. Share knowledge about software development, web technologies, and daily learnings.',
      url: `${siteUrl}/${locale}`,
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
        name: 'Tech Blog',
        description: 'Latest development insights and technical tutorials',
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
