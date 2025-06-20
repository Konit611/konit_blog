'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { detectLocale, storeLocale } from '@/lib/i18n-utils';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Detect user's preferred language
    const locale = detectLocale();
    
    // Store the detected locale
    storeLocale(locale);
    
    // Redirect to the appropriate locale
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg">Redirecting...</div>
    </div>
  );
} 