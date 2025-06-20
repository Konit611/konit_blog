'use client';

import { useState } from 'react';
import { useTranslation } from '../I18nProvider';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useParams } from 'next/navigation';

export default function Header() {
  const { t } = useTranslation();
  const params = useParams();
  const locale = params.locale as string;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <a 
              href={`/${locale}`} 
              className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
            >
              {t('blog.title')}
            </a>
          </div>

          {/* Desktop Navigation */}
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

          {/* Desktop Language Switcher */}
          <div className="hidden md:flex items-center">
            <LanguageSwitcher currentLocale={locale} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher currentLocale={locale} />
            <button
              type="button"
              className="text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label="Toggle menu"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <a
                href={`/${locale}`}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation.home')}
              </a>
              <a
                href={`/${locale}/blog`}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation.blog')}
              </a>
              <a
                href={`/${locale}/contact`}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('navigation.contact')}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 