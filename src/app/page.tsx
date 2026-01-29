import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

const SUPPORTED_LOCALES = ['en', 'ko', 'zh', 'ja'];
const DEFAULT_LOCALE = 'en';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';
  const preferredLang = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().split('-')[0].toLowerCase())
    .find(lang => SUPPORTED_LOCALES.includes(lang));

  const locale = preferredLang || DEFAULT_LOCALE;
  redirect(`/${locale}`);
}
