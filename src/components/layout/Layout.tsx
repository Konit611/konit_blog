import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  locale: string;
}

export default function Layout({ children, locale }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen relative bg-white">
      {/* 고정 헤더 */}
      <div className="sticky top-0 z-[100] bg-white px-4 sm:px-8 lg:px-12">
        <Header />
      </div>
      
      {/* 메인 컨텐츠 */}
      <main className="flex-1 w-full flex justify-center items-center px-4 sm:px-8 lg:px-12">
        {children}
      </main>
      
      {/* 푸터 - 헤더와 같은 패딩 적용 */}
      <div className="px-4 sm:px-8 lg:px-12">
        <Footer locale={locale} />
      </div>
    </div>
  );
} 