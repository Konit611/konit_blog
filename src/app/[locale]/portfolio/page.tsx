import React from 'react';
import { getAllPortfolioMetadata } from '@/lib/portfolio';
import { PortfolioMetadata } from '@/types';
import { Layout } from '@/components/Layout';
import { Metadata } from 'next';
import Image from 'next/image';

interface PortfolioPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  // Load translations for metadata
  const translations = {
    en: {
      title: "Portfolio - Creative Projects & Work",
      description: "Explore my portfolio of creative projects, technical implementations, and professional work. Discover the technologies and methodologies I use to bring ideas to life.",
      keywords: "portfolio, projects, web development, creative work, software development, technical projects"
    },
    ko: {
      title: "포트폴리오 - 창작 프로젝트 및 작업",
      description: "창작 프로젝트, 기술적 구현, 전문적인 작업들로 구성된 포트폴리오를 탐험해보세요. 아이디어를 현실로 만들기 위해 사용하는 기술과 방법론을 확인하세요.",
      keywords: "포트폴리오, 프로젝트, 웹 개발, 창작 작업, 소프트웨어 개발, 기술 프로젝트"
    },
    zh: {
      title: "作品集 - 创意项目与作品",
      description: "探索我的创意项目、技术实现和专业作品组合。了解我用来将想法变为现实的技术和方法论。",
      keywords: "作品集, 项目, 网页开发, 创意作品, 软件开发, 技术项目"
    },
    ja: {
      title: "ポートフォリオ - クリエイティブプロジェクトと作品",
      description: "クリエイティブプロジェクト、技術的実装、専門的な作品からなるポートフォリオをご覧ください。アイデアを現実にするために使用する技術と方法論を確認してください。",
      keywords: "ポートフォリオ, プロジェクト, ウェブ開発, クリエイティブ作品, ソフトウェア開発, 技術プロジェクト"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
  const canonicalUrl = `${siteUrl}/${locale}/portfolio`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: 'Developer' }],
    creator: 'Developer',
    publisher: 'Personal Portfolio',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${siteUrl}/en/portfolio`,
        'ko': `${siteUrl}/ko/portfolio`,
        'zh': `${siteUrl}/zh/portfolio`,
        'ja': `${siteUrl}/ja/portfolio`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      siteName: 'Personal Portfolio',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/og-portfolio.jpg`,
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
      images: [`${siteUrl}/images/og-portfolio.jpg`],
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

const translations = {
  ko: {
    title: "포트폴리오",
    subtitle: "제가 작업한 프로젝트들을 소개합니다",
    viewProject: "프로젝트 보기",
    viewCode: "코드 보기",
    viewDetails: "자세히 보기",
    technologies: "사용 기술",
    workTogether: "함께 작업하고 싶으신가요?",
    workDescription: "새로운 프로젝트나 협업 기회에 대해 이야기해보세요.",
    getInTouch: "연락하기",
    noProjects: "포트폴리오 항목이 없습니다.",
    showingProjects: "프로젝트 {count}개"
  },
  en: {
    title: "Portfolio",
    subtitle: "Showcasing my recent work and projects",
    viewProject: "View Project",
    viewCode: "View Code",
    viewDetails: "View Details",
    technologies: "Technologies",
    workTogether: "Want to work together?",
    workDescription: "Let's discuss new projects or collaboration opportunities.",
    getInTouch: "Get in Touch",
    noProjects: "No portfolio items available.",
    showingProjects: "Showing {count} projects"
  },
  zh: {
    title: "作品集",
    subtitle: "展示我最近的工作和项目",
    viewProject: "查看项目",
    viewCode: "查看代码",
    viewDetails: "查看详情",
    technologies: "使用技术",
    workTogether: "想要一起合作吗？",
    workDescription: "让我们谈论新项目或合作机会。",
    getInTouch: "联系我",
    noProjects: "暂无作品集项目。",
    showingProjects: "显示 {count} 个项目"
  },
  ja: {
    title: "ポートフォリオ",
    subtitle: "私の最近の作品とプロジェクトを紹介します",
    viewProject: "プロジェクトを見る",
    viewCode: "コードを見る",
    viewDetails: "詳細を見る",
    technologies: "使用技術",
    workTogether: "一緒に仕事をしませんか？",
    workDescription: "新しいプロジェクトやコラボレーションの機会について話し合いましょう。",
    getInTouch: "お問い合わせ",
    noProjects: "ポートフォリオ項目がありません。",
    showingProjects: "{count} 個のプロジェクトを表示"
  }
};

export default async function PortfolioPage({ params }: PortfolioPageProps) {
  const { locale } = await params;
  const t = translations[locale as keyof typeof translations] || translations.en;

  // Get portfolio items from markdown files
  let portfolioItems: PortfolioMetadata[] = [];
  try {
    portfolioItems = getAllPortfolioMetadata(locale);
    // Sort by order first, then by date
    portfolioItems.sort((a, b) => {
      if ((a.order ?? 999) !== (b.order ?? 999)) {
        return (a.order ?? 999) - (b.order ?? 999);
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  } catch (error) {
    console.error('Failed to load portfolio items:', error);
    portfolioItems = [];
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Layout locale={locale}>
      <div className="w-full">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600">
              {t.subtitle}
            </p>
          </div>

          {/* Stats */}
          <div className="mb-8">
            <div className="text-sm text-gray-600">
              {portfolioItems.length > 0 ? (
                t.showingProjects.replace('{count}', portfolioItems.length.toString())
              ) : (
                t.noProjects
              )}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div id="portfolio-section">
            {portfolioItems.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {portfolioItems.map((item) => (
                  <article key={item.slug} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    {/* Project Image */}
                    <div className="aspect-video overflow-hidden">
                      <a href={`/${locale}/portfolio/${item.slug}`}>
                        {item.coverImage ? (
                          <Image
                            src={item.coverImage}
                            alt={item.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            width={400}
                            height={225}
                            priority={false}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-600 flex items-center justify-center hover:from-blue-500 hover:to-purple-700 transition-colors">
                            <div className="text-white text-lg font-semibold text-center px-4">
                              {item.title}
                            </div>
                          </div>
                        )}
                      </a>
                    </div>
                    
                    {/* Project Content */}
                    <div className="p-6">
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {item.tech.map((tech: string, index: number) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {/* Title */}
                      <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {item.title}
                      </h2>
                      
                      {/* Date */}
                      <p className="text-gray-600 text-sm mb-3">
                        {formatDate(item.date)}
                      </p>
                      
                      {/* Description */}
                      <p className="text-gray-700 mb-4 line-clamp-3">
                        {item.description}
                      </p>
                      
                      {/* Action Links */}
                      <div className="flex items-center justify-between">
                        <a 
                          href={`/${locale}/portfolio/${item.slug}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {t.viewDetails}
                          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                        
                        {/* External Links */}
                        <div className="flex gap-2">
                          {item.projectUrl && (
                            <a
                              href={item.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-blue-600 transition-colors"
                              title={t.viewProject}
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          )}
                          {item.githubUrl && (
                            <a
                              href={item.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-500 hover:text-gray-900 transition-colors"
                              title={t.viewCode}
                            >
                              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg">
                  {t.noProjects}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
} 