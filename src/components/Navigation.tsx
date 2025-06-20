'use client';

import { useTranslation } from './I18nProvider';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useParams } from 'next/navigation';

export function Navigation() {
  const { t } = useTranslation();
  const params = useParams();
  const locale = params.locale as string;

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a href={`/${locale}`} className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors">
              {t('blog.title')}
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href={`/${locale}`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t('navigation.home')}
            </a>
            <a
              href={`/${locale}/blog`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t('navigation.blog')}
            </a>
            <a
              href={`/${locale}/contact`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t('navigation.contact')}
            </a>
          </nav>

          {/* Language Switcher */}
          <div className="flex items-center">
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu (hidden by default) */}
        <div className="md:hidden border-t border-gray-200 py-4">
          <div className="flex flex-col space-y-4">
            <a
              href={`/${locale}`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t('navigation.home')}
            </a>
            <a
              href={`/${locale}/blog`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t('navigation.blog')}
            </a>
            <a
              href={`/${locale}/contact`}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              {t('navigation.contact')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
} 