import { I18nProvider } from '@/components/I18nProvider';
import { Locale, isSupportedLocale } from '@/lib/i18n-utils';
import { notFound } from 'next/navigation';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  
  // Validate locale parameter
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  const validLocale = locale as Locale;

  return (
    <I18nProvider initialLocale={validLocale}>
      {children}
    </I18nProvider>
  );
}

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'ko' },
    { locale: 'zh' },
    { locale: 'ja' },
  ];
} 