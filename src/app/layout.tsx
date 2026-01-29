import type { Metadata } from 'next';
import localFont from "next/font/local";
import { headers } from 'next/headers';
import './globals.css';
import { siteConfig } from '@/lib/seo';

const notoSerifDisplay = localFont({
  src: "../../public/fonts/NotoSerifDisplay-Variable.woff2",
  variable: "--font-noto-serif-display",
  weight: "100 900",
  display: "swap",
});

const notoSansDisplay = localFont({
  src: "../../public/fonts/NotoSansDisplay-Variable.woff2",
  variable: "--font-noto-sans-display",
  weight: "100 900",
  display: "swap",
});

const notoSansJP = localFont({
  src: "../../public/fonts/NotoSansJP-Variable.woff2",
  variable: "--font-noto-sans-jp",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
    yahoo: process.env.YAHOO_VERIFICATION,
  },
  icons: {
    icon: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
};

const SUPPORTED_LOCALES = ['en', 'ko', 'zh', 'ja'];

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get('x-next-url') || headersList.get('x-invoke-path') || '';
  const segments = pathname.split('/').filter(Boolean);
  const locale = SUPPORTED_LOCALES.includes(segments[0]) ? segments[0] : 'en';

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${notoSansJP.variable} ${notoSerifDisplay.variable} ${notoSansDisplay.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
