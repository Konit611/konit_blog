export type Locale = 'en' | 'ko' | 'zh' | 'ja';

export interface Translations {
  [key: string]: unknown;
}

/**
 * Load translations for a specific locale
 */
export async function loadTranslations(locale: Locale): Promise<Translations> {
  try {
    const response = await fetch(`/locales/${locale}/common.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${locale}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error loading translations for ${locale}:`, error);
    // Fallback to English if the requested locale fails
    if (locale !== 'en') {
      return loadTranslations('en');
    }
    return {};
  }
}

/**
 * Get a translated string by key with optional parameter substitution
 */
export function getTranslation(
  translations: Translations,
  key: string,
  params?: Record<string, unknown>
): string {
  const keys = key.split('.');
  let value: unknown = translations;

  for (const k of keys) {
    if (value && typeof value === 'object' && value !== null && k in value) {
      value = (value as Record<string, unknown>)[k];
    } else {
      return key; // Return key if translation not found
    }
  }

  if (typeof value !== 'string') {
    return key;
  }

  // Replace parameters in the translation
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
      const paramValue = params[paramKey];
      return paramValue !== undefined && paramValue !== null ? String(paramValue) : match;
    });
  }

  return value;
}

/**
 * Check if a locale is supported
 */
export function isSupportedLocale(locale: string): locale is Locale {
  return ['en', 'ko', 'zh', 'ja'].includes(locale);
}

/**
 * Get the default locale
 */
export function getDefaultLocale(): Locale {
  return 'en';
}

/**
 * Detect locale from browser or return default
 */
export function detectLocale(): Locale {
  if (typeof window === 'undefined') {
    return getDefaultLocale();
  }

  // Check for stored locale preference
  const storedLocale = localStorage.getItem('locale');
  if (storedLocale && isSupportedLocale(storedLocale)) {
    return storedLocale;
  }

  // Check browser language
  const browserLocale = navigator.language.split('-')[0];
  if (isSupportedLocale(browserLocale)) {
    return browserLocale;
  }

  return getDefaultLocale();
}

/**
 * Store locale preference
 */
export function storeLocale(locale: Locale): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('locale', locale);
  }
} 