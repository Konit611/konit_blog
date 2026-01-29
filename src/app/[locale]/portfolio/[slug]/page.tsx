import { notFound } from 'next/navigation';
import { getPortfolioBySlug, getAllPortfolioMetadata, markdownToHtml, getRelatedPosts } from '../../../../lib/portfolio';
import { Metadata } from 'next';
import React from 'react';
import Layout from '../../../../components/layout/Layout';
import RelatedPosts from '../../../../components/portfolio/RelatedPosts';

interface PortfolioDetailPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PortfolioDetailPageProps): Promise<Metadata> {
  try {
    const { locale, slug } = await params;
    const project = getPortfolioBySlug(slug, locale);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://konit611.com';
    const canonicalUrl = `${siteUrl}/${locale}/portfolio/${slug}`;
    
    return {
      title: `${project.title} - Portfolio`,
      description: project.description || `Learn about ${project.title} project.`,
      alternates: {
        canonical: canonicalUrl,
      },
      icons: {
        icon: '/favicon.ico',
      },
    };
  } catch {
    return {
      title: 'Project Not Found - Portfolio',
      description: 'The requested portfolio project could not be found.',
    };
  }
}

const translations = {
  ko: {
    backToPortfolio: "포트폴리오로 돌아가기",
    technologies: "사용 기술",
    projectLinks: "프로젝트 링크",
    viewProject: "프로젝트 보기",
    viewCode: "코드 보기",
    projectDetails: "프로젝트 상세",
    developer: "개발자",
    relatedPosts: "학습 과정 기록",
    readMore: "자세히 보기",
    minRead: "분"
  },
  en: {
    backToPortfolio: "Back to Portfolio",
    technologies: "Technologies",
    projectLinks: "Project Links",
    viewProject: "View Project",
    viewCode: "View Code",
    projectDetails: "Project Details",
    developer: "Developer",
    relatedPosts: "Learning Journey",
    readMore: "Read More",
    minRead: "min read"
  },
  zh: {
    backToPortfolio: "返回作品集",
    technologies: "使用技术",
    projectLinks: "项目链接",
    viewProject: "查看项目",
    viewCode: "查看代码",
    projectDetails: "项目详情",
    developer: "开发者",
    relatedPosts: "学习历程",
    readMore: "阅读更多",
    minRead: "分钟"
  },
  ja: {
    backToPortfolio: "ポートフォリオに戻る",
    technologies: "使用技術",
    projectLinks: "プロジェクトリンク",
    viewProject: "プロジェクトを見る",
    viewCode: "コードを見る",
    projectDetails: "プロジェクト詳細",
    developer: "開発者",
    relatedPosts: "学習の記録",
    readMore: "続きを読む",
    minRead: "分"
  }
};

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  try {
    const { locale, slug } = await params;
    const project = getPortfolioBySlug(slug, locale);
    const t = translations[locale as keyof typeof translations] || translations.en;

    // Convert markdown to HTML
    const htmlContent = await markdownToHtml(project.content);

    // Get related blog posts
    const relatedPosts = getRelatedPosts(slug, locale);

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    return (
      <Layout locale={locale}>
        {/* Main Content */}
        <article className="w-full max-w-4xl mx-auto py-8 md:py-12">
          {/* Header */}
          <header className="mb-8">
            {/* Title */}
            <h1 className="font-noto-serif font-bold text-gray-900 text-3xl md:text-4xl lg:text-5xl leading-tight mb-4">
              {project.title}
            </h1>

            {/* Description */}
            {project.description && (
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
                {project.description}
              </p>
            )}

            {/* Meta Info */}
            <div className="flex items-center gap-3 py-4 border-t border-b border-gray-200">
              <div className="w-10 h-10 rounded-full bg-gray-300" />
              <div className="flex-1">
                <div className="font-semibold text-gray-900 text-sm">
                  {t.developer}
                </div>
                <div className="text-gray-600 text-sm">
                  Full Stack Developer
                </div>
              </div>
              <time className="text-gray-600 text-sm">
                {formatDate(project.date)}
              </time>
            </div>
          </header>

          {/* Cover Image */}
          {project.coverImage && (
            <div className="mb-8 md:mb-12">
              <div 
                className="w-full aspect-video rounded-lg bg-cover bg-center shadow-md"
                style={{ backgroundImage: `url(${project.coverImage})` }}
              />
            </div>
          )}

          {/* Technologies Section */}
          <section className="mb-8 md:mb-12">
            <h2 className="font-noto-serif font-bold text-gray-900 text-2xl md:text-3xl mb-4">
              {t.technologies}
            </h2>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {project.tech.map((tech: string) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 md:px-4 md:py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Project Links Section */}
          {(project.projectUrl || project.githubUrl) && (
            <section className="mb-8 md:mb-12">
              <h2 className="font-noto-serif font-bold text-gray-900 text-2xl md:text-3xl mb-4">
                {t.projectLinks}
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 bg-blue-600 text-white text-sm md:text-base font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {t.viewProject}
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-5 py-2.5 md:px-6 md:py-3 bg-gray-800 text-white text-sm md:text-base font-medium rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    {t.viewCode}
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Project Details/Content */}
          <section className="mb-8">
            <h2 className="font-noto-serif font-bold text-gray-900 text-2xl md:text-3xl mb-4">
              {t.projectDetails}
            </h2>
            <div 
              className="markdown-content"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
          </section>

          {/* Related Blog Posts */}
          <RelatedPosts
            posts={relatedPosts}
            locale={locale}
            translations={{
              title: t.relatedPosts,
              readMore: t.readMore,
              minRead: t.minRead
            }}
          />
        </article>
      </Layout>
    );
  } catch (error) {
    console.error('Error loading portfolio project:', error);
    notFound();
  }
}

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  try {
    const { locale } = params;
    const projects = getAllPortfolioMetadata(locale);
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
} 