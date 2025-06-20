'use client';

import { useTranslation } from '../I18nProvider';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useParams } from 'next/navigation';

export default function Footer() {
  const { t } = useTranslation();
  const params = useParams();
  const locale = params.locale as string;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Blog Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('blog.title')}</h3>
            <p className="text-gray-300">
              {t('meta.defaultDescription')}
            </p>
            <div className="flex space-x-4">
              {/* Social Media Links */}
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('footer.quickLinks')}</h3>
            <div className="space-y-2">
              <a
                href={`/${locale}`}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t('navigation.home')}
              </a>
              <a
                href={`/${locale}/blog`}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t('navigation.blog')}
              </a>
              <a
                href={`/${locale}/contact`}
                className="block text-gray-300 hover:text-white transition-colors"
              >
                {t('navigation.contact')}
              </a>
            </div>
          </div>

          {/* Language & Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t('footer.language')}</h3>
            <div className="space-y-4">
              <LanguageSwitcher currentLocale={locale} />
              <div className="text-gray-300">
                <p>{t('footer.contact')}</p>
                <a
                  href={`mailto:contact@${t('blog.title').toLowerCase().replace(/\s+/g, '')}.com`}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  contact@travelblog.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © {currentYear} {t('blog.title')}. {t('footer.allRightsReserved')}
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href={`/${locale}/privacy`}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <a
              href={`/${locale}/terms`}
              className="text-gray-400 hover:text-white text-sm transition-colors"
            >
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 