import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, locale }) => {
  return (
    <div className="flex flex-col min-h-[900px] items-center px-12 py-0 relative bg-white">
      <Header locale={locale} />
      <main className="flex-1 w-full flex justify-center">
        {children}
      </main>
      <Footer locale={locale} />
    </div>
  );
};
