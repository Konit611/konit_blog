import { SupportedLocale } from '@/types/common.types';

export const SUPPORTED_LOCALES: readonly SupportedLocale[] = ['en', 'ko', 'zh', 'ja'];
export const DEFAULT_LOCALE: SupportedLocale = 'ko';

export const LOCALE_NAMES: Record<string, string> = {
  en: 'English',
  ko: '한국어',
  zh: '中文',
  ja: '日本語',
};
