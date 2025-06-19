import ContactClient from './ContactClient';
import { Metadata } from 'next';

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  
  // Load translations for metadata
  const translations = {
    en: {
      title: "Contact - Tech Portfolio",
      description: "Get in touch with me for development projects, collaboration opportunities, or technical discussions. Let's build something amazing together.",
      keywords: "contact developer, tech portfolio contact, software developer contact, development collaboration, tech consultation"
    },
    ko: {
      title: "연락처 - 기술 포트폴리오",
      description: "개발 프로젝트, 협업 기회, 또는 기술적 논의를 위해 연락주세요. 함께 멋진 것을 만들어봅시다.",
      keywords: "개발자 연락처, 기술 포트폴리오 연락처, 소프트웨어 개발자 연락처, 개발 협업, 기술 컨설팅"
    },
    zh: {
      title: "联系我们 - 技术作品集",
      description: "联系我进行开发项目、合作机会或技术讨论。让我们一起创建令人惊叹的东西。",
      keywords: "联系开发者, 技术作品集联系, 软件开发者联系, 开发合作, 技术咨询"
    },
    ja: {
      title: "お問い合わせ - 技術ポートフォリオ",
      description: "開発プロジェクト、コラボレーションの機会、または技術的な議論についてお気軽にお問い合わせください。一緒に素晴らしいものを作りましょう。",
      keywords: "開発者連絡先, 技術ポートフォリオ連絡先, ソフトウェア開発者連絡先, 開発コラボレーション, 技術コンサルティング"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://techportfolio.com';
  const canonicalUrl = `${siteUrl}/${locale}/contact`;

  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    authors: [{ name: 'Developer' }],
    creator: 'Developer',
    publisher: 'Tech Portfolio',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': `${siteUrl}/en/contact`,
        'ko': `${siteUrl}/ko/contact`,
        'zh': `${siteUrl}/zh/contact`,
        'ja': `${siteUrl}/ja/contact`,
      },
    },
    openGraph: {
      title: t.title,
      description: t.description,
      url: canonicalUrl,
      siteName: 'Tech Portfolio',
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/og-contact.jpg`,
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
      images: [`${siteUrl}/images/og-contact.jpg`],
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

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  return <ContactClient locale={locale} />;
} 