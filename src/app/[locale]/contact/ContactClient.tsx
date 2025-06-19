'use client';

import { useTranslation } from '@/components/I18nProvider';
import { Layout } from '@/components/Layout';
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://travelblog.com';
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
        <div className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {t('contact.heading')}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('contact.subtitle')}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Contact Information */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('contact.info.title')}
                </h2>
                
                {/* Name */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {t('contact.name')}
                  </h3>
                  <p className="text-gray-700 ml-7">{t('contact.bloggerName')}</p>
                </div>
                
                {/* Email */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {t('contact.email')}
                  </h3>
                  <p className="ml-7">
                    <a 
                      href={`mailto:${t('contact.emailAddress')}`} 
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {t('contact.emailAddress')}
                    </a>
                  </p>
                </div>
                
                {/* Location */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {t('contact.location')}
                  </h3>
                  <p className="text-gray-700 ml-7">{t('contact.locationText')}</p>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    {t('contact.social')}
                  </h3>
                  <div className="ml-7 space-y-3">
                    {['twitter', 'instagram', 'github', 'linkedin'].map(platform => {
                      const username = t(`contact.${platform}`);
                      const url = t(`contact.${platform}Url`);
                      
                      if (!username || username === `contact.${platform}`) return null;
                      
                      return (
                        <div key={platform} className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                            {platform === 'twitter' && (
                              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                              </svg>
                            )}
                            {platform === 'instagram' && (
                              <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                            )}
                            {platform === 'github' && (
                              <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                              </svg>
                            )}
                            {platform === 'linkedin' && (
                              <svg className="w-4 h-4 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                              </svg>
                            )}
                          </div>
                          <a 
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            @{username}
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* About Section */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {t('contact.about')}
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {t('contact.aboutText')}
                  </p>
                </div>
                
                {/* Languages */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {t('contact.languages')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['en', 'ko', 'zh', 'ja'].map(lang => (
                      <span 
                        key={lang}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                      >
                        {t(`contact.language.${lang}`)}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Interests */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {t('contact.interests')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {t('contact.interestsList').split(',').map((interest: string, index: number) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
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