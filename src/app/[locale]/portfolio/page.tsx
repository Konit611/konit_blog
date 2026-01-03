import React from 'react';
import { getAllPortfolioMetadata } from '@/lib/portfolio';
import { PortfolioMetadata } from '@/types';
import Layout from '@/components/layout/Layout';
import ContentCard from '@/components/ContentCard';
import { Metadata } from 'next';

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
    icons: {
      icon: '/favicon.ico',
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
                  <ContentCard
                    key={item.slug}
                    type="portfolio"
                    slug={item.slug}
                    title={item.title}
                    date={item.date}
                    excerpt={item.description}
                    coverImage={item.coverImage}
                    locale={locale}
                    projectUrl={item.projectUrl}
                    githubUrl={item.githubUrl}
                    viewDetailsText={t.viewDetails}
                    viewProjectText={t.viewProject}
                    viewCodeText={t.viewCode}
                  />
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