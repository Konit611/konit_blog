'use client';

import { useTranslation } from '@/components/I18nProvider';
import Layout from '@/components/layout/Layout';
import Head from 'next/head';

interface ContactClientProps {
  locale: string;
}

export default function ContactClient({ locale }: ContactClientProps) {
  const { t, isLoading } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Generate JSON-LD structured data for Person
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://konit611.com';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: t('contact.bloggerName'),
    jobTitle: 'Software Developer',
    description: t('contact.aboutText'),
    url: `${siteUrl}/${locale}/contact`,
    email: t('contact.emailAddress'),
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seoul',
      addressCountry: 'South Korea'
    },
    sameAs: [
      t('contact.twitterUrl'),
      t('contact.instagramUrl'),
      t('contact.githubUrl'),
      t('contact.linkedinUrl'),
    ].filter(url => url && !url.startsWith('contact.')), // Filter out missing translations
    knowsLanguage: [
      { '@type': 'Language', name: 'English' },
      { '@type': 'Language', name: 'Korean' },
      { '@type': 'Language', name: 'Chinese' },
      { '@type': 'Language', name: 'Japanese' }
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: t('contact.emailAddress'),
      availableLanguage: ['English', 'Korean', 'Chinese', 'Japanese']
    }
  };

  return (
    <>
      <Head>
        <title>{t('contact.title')}</title>
        <meta name="description" content={t('contact.description')} />
        <meta name="keywords" content={t('contact.keywords')} />
        <meta property="og:title" content={t('contact.title')} />
        <meta property="og:description" content={t('contact.description')} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={t('contact.title')} />
        <meta name="twitter:description" content={t('contact.description')} />
      </Head>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <Layout locale={locale}>
        <div className="py-8 sm:py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-10 lg:mb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                {t('contact.heading')}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {t('contact.info.title')}
                </h2>
                
                {/* Name */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {t('contact.name')}
                  </h3>
                  <p className="text-gray-700 ml-7 text-sm sm:text-base">{t('contact.bloggerName')}</p>
                </div>
                
                {/* Email */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {t('contact.email')}
                  </h3>
                  <p className="ml-7">
                    <a 
                      href={`mailto:${t('contact.emailAddress')}`} 
                      className="text-blue-600 hover:text-blue-800 transition-colors text-sm sm:text-base break-all"
                    >
                      {t('contact.emailAddress')}
                    </a>
                  </p>
                </div>
                
                {/* Location */}
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t('contact.location')}
                  </h3>
                  <p className="text-gray-700 ml-7 text-sm sm:text-base">{t('contact.locationText')}</p>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                  {t('contact.about')}
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {t('contact.aboutText')}
                  </p>
                </div>

                {/* Interests */}
                <div className="mt-6 sm:mt-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                    {t('contact.interests')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {t('contact.interestsList').split(',').map((interest: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 text-xs sm:text-sm rounded-full"
                      >
                        {interest.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
} 