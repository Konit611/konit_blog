import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ['en', 'ko', 'zh', 'ja'];
const DEFAULT_LOCALE = 'en';

function getLocaleFromAcceptLanguage(acceptLanguage: string): string {
  const languages = acceptLanguage
    .split(',')
    .map(lang => lang.split(';')[0].trim().toLowerCase())
    .map(lang => lang.split('-')[0]); // Extract language code only

  for (const lang of languages) {
    if (SUPPORTED_LOCALES.includes(lang)) {
      return lang;
    }
  }

  return DEFAULT_LOCALE;
}

function getLocaleFromCookie(request: NextRequest): string | null {
  const locale = request.cookies.get('locale')?.value;
  return locale && SUPPORTED_LOCALES.includes(locale) ? locale : null;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip for public files like images, fonts, etc.
  if (PUBLIC_FILE.test(pathname)) {
    return;
  }

  // Skip for API routes
  if (pathname.startsWith('/api')) {
    return;
  }

  // Check if the pathname already includes a locale
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return;
  }

  // Detect user preferred language
  let locale = DEFAULT_LOCALE;

  // First, check for stored preference in cookie
  const cookieLocale = getLocaleFromCookie(request);
  if (cookieLocale) {
    locale = cookieLocale;
  } else {
    // Fall back to Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || '';
    locale = getLocaleFromAcceptLanguage(acceptLanguage);
  }

  // Redirect to the appropriate locale version
  const redirectUrl = new URL(`/${locale}${pathname === '/' ? '' : pathname}`, request.url);
  
  const response = NextResponse.redirect(redirectUrl);
  
  // Set the locale cookie for future visits
  response.cookies.set('locale', locale, {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    httpOnly: false, // Allow client-side access
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  });

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}; 