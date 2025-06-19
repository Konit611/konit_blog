import { Metadata } from 'next';

interface CareerLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: CareerLayoutProps): Promise<Metadata> {
  const { locale } = await params;
  
  const translations = {
    en: {
      title: "Career - Professional Experience",
      description: "Explore my professional journey, skills, and experience in software development.",
      keywords: "career, professional experience, software developer, full stack developer, skills, work experience"
    },
    ko: {
      title: "경력 - 전문 경력",
      description: "소프트웨어 개발 분야에서의 전문적인 여정, 기술, 경험을 확인해보세요.",
      keywords: "경력, 전문 경험, 소프트웨어 개발자, 풀스택 개발자, 기술, 업무 경험"
    },
    zh: {
      title: "职业经历 - 专业经验",
      description: "了解我在软件开发领域的专业历程、技能和经验。",
      keywords: "职业经历, 专业经验, 软件开发者, 全栈开发者, 技能, 工作经验"
    },
    ja: {
      title: "キャリア - 専門経験",
      description: "ソフトウェア開発分野での専門的な歩み、スキル、経験をご確認ください。",
      keywords: "キャリア, 専門経験, ソフトウェア開発者, フルスタック開発者, スキル, 業務経験"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';
  const canonicalUrl = `${siteUrl}/${locale}/career`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: 'Developer' }],
    creator: 'Developer',
    publisher: 'Personal Website',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${siteUrl}/en/career`,
        'ko': `${siteUrl}/ko/career`,
        'zh': `${siteUrl}/zh/career`,
        'ja': `${siteUrl}/ja/career`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      siteName: 'Professional Portfolio',
      locale: locale,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function CareerLayout({ children }: CareerLayoutProps) {
  return <>{children}</>;
} 