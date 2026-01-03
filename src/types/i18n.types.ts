/**
 * I18n Types
 * Types related to internationalization
 */

export type Locale = 'ko' | 'en' | 'zh' | 'ja';

export interface LocaleData {
  [key: string]: string | LocaleData;
}

export interface Translations {
  [key: string]: string | Translations;
}

export interface LocalizedString {
  [key: string]: string;
}

