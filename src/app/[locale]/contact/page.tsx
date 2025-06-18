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
      title: "Contact - Travel Blog",
      description: "Get in touch with Alex Chen, travel blogger and adventurer. Connect with us for travel tips, collaboration opportunities, or just to share your travel stories.",
      keywords: "contact travel blogger, travel blog contact, Alex Chen contact, travel collaboration, travel tips contact"
    },
    ko: {
      title: "연락처 - 여행 블로그",
      description: "여행 블로거이자 모험가인 알렉스 첸과 연락하세요. 여행 팁, 협업 기회, 또는 여행 이야기를 공유하기 위해 연락주세요.",
      keywords: "여행 블로거 연락처, 여행 블로그 연락처, 알렉스 첸 연락처, 여행 협업, 여행 팁 연락처"
    },
    zh: {
      title: "联系我们 - 旅行博客",
      description: "与旅行博主和冒险家陈亚历克斯取得联系。联系我们获取旅行技巧、合作机会，或只是分享您的旅行故事。",
      keywords: "联系旅行博主, 旅行博客联系, 陈亚历克斯联系, 旅行合作, 旅行技巧联系"
    },
    ja: {
      title: "お問い合わせ - 旅行ブログ",
      description: "旅行ブロガーで冒険家のアレックス・チェンにお問い合わせください。旅行のヒント、コラボレーションの機会、または旅行ストーリーの共有についてご連絡ください。",
      keywords: "旅行ブロガー連絡先, 旅行ブログ連絡先, アレックス・チェン連絡先, 旅行コラボレーション, 旅行ヒント連絡先"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelblog.com';
  const canonicalUrl = `${siteUrl}/${locale}/contact`;

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
      siteName: 'Travel Blog',
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
      creator: '@travelblogger',
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