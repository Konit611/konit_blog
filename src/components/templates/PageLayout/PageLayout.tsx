/**
 * PageLayout Template
 * Main layout template with header and footer
 */

import React from 'react';
import { Header, Footer } from '@/components/organisms';

interface PageLayoutProps {
  children: React.ReactNode;
  locale: string;
  translations: {
    header: {
      brand: string;
      nav: {
        home: string;
        blog: string;
        portfolio: string;
        career: string;
        contact: string;
      };
    };
    footer: {
      brand: string;
      description: string;
    };
  };
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  locale,
  translations,
}) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <Header translations={translations.header} />
      
      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <Footer locale={locale} translations={translations.footer} />
    </div>
  );
};

export default PageLayout;

