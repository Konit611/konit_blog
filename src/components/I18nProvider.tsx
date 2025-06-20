'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Locale, 
  Translations, 
  loadTranslations, 
  getTranslation, 
  detectLocale, 
  storeLocale 
} from '@/lib/i18n-utils';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, unknown>) => string;
  translations: Translations;
  isLoading: boolean;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

interface I18nProviderProps {
  children: ReactNode;
  initialLocale?: Locale;
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale || 'en');
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Detect locale on client side if no initial locale provided
    if (!initialLocale) {
      const detectedLocale = detectLocale();
      setLocaleState(detectedLocale);
    }
  }, [initialLocale]);

  useEffect(() => {
    const loadTranslationsForLocale = async () => {
      setIsLoading(true);
      try {
        const data = await loadTranslations(locale);
        setTranslations(data);
      } catch (error) {
        console.error(`Failed to load translations for ${locale}:`, error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslationsForLocale();
  }, [locale]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    storeLocale(newLocale);
  };

  const t = (key: string, params?: Record<string, unknown>): string => {
    return getTranslation(translations, key, params);
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, translations, isLoading }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
} 