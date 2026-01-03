/**
 * LanguageSelector Component (Molecule)
 * Language switcher dropdown
 */

'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { SUPPORTED_LOCALES, LOCALE_NAMES } from '@/constants';

export interface LanguageSelectorProps {
  currentLocale: string;
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLocale,
  className = '',
}) => {
  const router = useRouter();
  const pathname = usePathname();
  
  const handleLanguageChange = (newLocale: string) => {
    // Replace the locale in the pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };
  
  return (
    <select
      value={currentLocale}
      onChange={(e) => handleLanguageChange(e.target.value)}
      className={`px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer ${className}`}
    >
      {SUPPORTED_LOCALES.map((locale) => (
        <option key={locale} value={locale}>
          {LOCALE_NAMES[locale]}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;

