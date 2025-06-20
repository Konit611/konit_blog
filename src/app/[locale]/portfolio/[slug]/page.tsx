import { notFound } from 'next/navigation';
import { getPortfolioBySlug, getAllPortfolioMetadata, markdownToHtml } from '../../../../lib/portfolio';
import { Metadata } from 'next';
import React from 'react';
import { Layout } from '../../../../components/Layout';

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
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
    const canonicalUrl = `${siteUrl}/${locale}/portfolio/${slug}`;
    
    return {
      title: `${project.title} - Portfolio`,
      description: project.description || `Learn about ${project.title} project.`,
      alternates: {
        canonical: canonicalUrl,
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
    developer: "개발자"
  },
  en: {
    backToPortfolio: "Back to Portfolio",
    technologies: "Technologies",
    projectLinks: "Project Links",
    viewProject: "View Project",
    viewCode: "View Code",
    projectDetails: "Project Details",
    developer: "Developer"
  },
  zh: {
    backToPortfolio: "返回作品集",
    technologies: "使用技术",
    projectLinks: "项目链接",
    viewProject: "查看项目",
    viewCode: "查看代码",
    projectDetails: "项目详情",
    developer: "开发者"
  },
  ja: {
    backToPortfolio: "ポートフォリオに戻る",
    technologies: "使用技術",
    projectLinks: "プロジェクトリンク",
    viewProject: "プロジェクトを見る",
    viewCode: "コードを見る",
    projectDetails: "プロジェクト詳細",
    developer: "開発者"
  }
};

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  try {
    const { locale, slug } = await params;
    const project = getPortfolioBySlug(slug, locale);
    const t = translations[locale as keyof typeof translations] || translations.en;

    // Convert markdown to HTML
    const htmlContent = await markdownToHtml(project.content);

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
        <div className="flex items-start px-0 py-12 relative self-stretch w-full flex-[0_0_auto] z-[2]">
          <div className="flex flex-col items-start relative flex-1 grow max-w-[80%] mx-auto">
            {/* Article Header */}
            <div className="px-0 py-10 z-[4] flex flex-col items-center gap-8 relative self-stretch w-full flex-[0_0_auto] bg-white">
              <div className="flex flex-col max-w-[1000px] items-start gap-6 relative w-full flex-[0_0_auto]">
                {/* Back Link */}
                <div className="relative self-stretch mt-[-1.00px] font-outfit font-medium text-[#d62500] text-[15px] tracking-[0] leading-5 overflow-hidden text-ellipsis">
                  <a 
                    href={`/${locale}/portfolio`}
                    className="hover:underline"
                  >
                    ← {t.backToPortfolio}
                  </a>
                </div>

                <h1 className="relative self-stretch font-domine font-bold text-[#271c1a] text-5xl tracking-[-0.96px] leading-[52px]">
                  {project.title}
                </h1>

                {project.description && (
                  <p className="relative self-stretch font-outfit font-normal text-[#271c1a] text-xl tracking-[0] leading-6">
                    {project.description}
                  </p>
                )}
              </div>

              {/* Project Info */}
              <div className="flex flex-col max-w-[1000px] items-start gap-5 relative w-full flex-[0_0_auto] bg-white">
                <div className="flex items-center gap-3 relative self-stretch w-full flex-[0_0_auto] bg-white">
                  <div className="relative w-9 h-9 rounded-[999px] bg-gray-300 bg-cover bg-[50%_50%]" />

                  <div className="flex flex-col w-[248px] items-start relative self-stretch">
                    <div className="relative self-stretch mt-[-1.00px] font-outfit font-semibold text-[#271c1a] text-[13px] tracking-[0] leading-4 overflow-hidden text-ellipsis">
                      {t.developer}
                    </div>
                    <div className="relative self-stretch font-outfit font-normal text-[#2e18139e] text-[13px] tracking-[0] leading-4 overflow-hidden text-ellipsis">
                      Full Stack Developer
                    </div>
                  </div>
                </div>

                <div className="relative self-stretch font-outfit font-normal text-[#271c1a] text-[15px] tracking-[0] leading-5 overflow-hidden text-ellipsis">
                  {formatDate(project.date)}
                </div>
              </div>
            </div>

            {/* Cover Image */}
            {project.coverImage && (
              <div className="flex flex-col items-center justify-center px-0 py-8 relative self-stretch w-full flex-[0_0_auto] z-[2] bg-white">
                <div 
                  className="relative w-[1000px] h-[600px] ml-[-108.00px] mr-[-108.00px] rounded-lg border-[1.5px] border-solid border-transparent bg-cover bg-[50%_50%]"
                  style={{ backgroundImage: `url(${project.coverImage})` }}
                />
              </div>
            )}

            {/* Project Content */}
            <div className="z-[1] flex flex-col items-center gap-8 px-0 py-[52px] relative self-stretch w-full flex-[0_0_auto] bg-white">
              <div className="max-w-[1000px] w-full">
                {/* Technologies Section */}
                <div className="mb-8">
                  <h2 className="font-domine font-bold text-[#271c1a] text-3xl tracking-[-0.48px] leading-[36px] mb-4">
                    {t.technologies}
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {project.tech.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Project Links Section */}
                {(project.projectUrl || project.githubUrl) && (
                  <div className="mb-8">
                    <h2 className="font-domine font-bold text-[#271c1a] text-3xl tracking-[-0.48px] leading-[36px] mb-4">
                      {t.projectLinks}
                    </h2>
                    <div className="flex gap-4">
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          className="inline-flex items-center px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-colors"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          {t.viewCode}
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Project Description/Content */}
                <div className="mb-8">
                  <h2 className="font-domine font-bold text-[#271c1a] text-3xl tracking-[-0.48px] leading-[36px] mb-4">
                    {t.projectDetails}
                  </h2>
                  <div 
                    className="markdown-content"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div className="relative self-stretch w-full h-12 z-[1] bg-white" />
      </Layout>
    );
  } catch (error) {
    console.error('Error loading portfolio project:', error);
    notFound();
  }
}

export async function generateStaticParams({ params }: { params: Promise<{ locale: string }> }) {
  try {
    const { locale } = await params;
    const projects = getAllPortfolioMetadata(locale);
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
} 