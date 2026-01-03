/**
 * Header Organism
 * Main header with navigation and language switcher
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heading } from '@/components/atoms';
import { LanguageSelector } from '@/components/molecules';
import { useParams } from 'next/navigation';

interface HeaderProps {
  translations: {
    brand: string;
    nav: {
      home: string;
      blog: string;
      portfolio: string;
      career: string;
      contact: string;
    };
  };
}

export const Header: React.FC<HeaderProps> = ({ translations }) => {
  const params = useParams();
  const locale = params.locale as string;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = translations;

  // 모바일 메뉴 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClick = () => {
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { href: `/${locale}`, label: t.nav.home },
    { href: `/${locale}/blog`, label: t.nav.blog },
    { href: `/${locale}/portfolio`, label: t.nav.portfolio },
    { href: `/${locale}/career`, label: t.nav.career },
    { href: `/${locale}/contact`, label: t.nav.contact },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-0 py-4 relative self-stretch w-full flex-[0_0_auto] z-[100] bg-white">
        {/* 로고 */}
        <div className="inline-flex h-12 items-center gap-3 relative flex-[0_0_auto]">
          <Link href={`/${locale}`}>
            <Heading 
              level={1} 
              className="font-serif text-2xl sm:text-3xl lg:text-[42px] tracking-[-1.68px] leading-tight whitespace-nowrap cursor-pointer hover:text-gray-700 transition-colors"
            >
              {t.brand}
            </Heading>
          </Link>
        </div>

        {/* 데스크톱 네비게이션 (lg 이상에서만 표시) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <nav className="inline-flex items-start gap-4 xl:gap-6 2xl:gap-8 relative flex-[0_0_auto]">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <div className="relative w-fit font-noto-sans font-medium text-black text-lg xl:text-xl 2xl:text-[28px] tracking-[-0.28px] leading-8 whitespace-nowrap hover:text-gray-600 transition-colors cursor-pointer">
                  {item.label}
                </div>
              </Link>
            ))}
          </nav>

          {/* 언어 전환 드롭다운 */}
          <div className="flex items-center">
            <LanguageSelector currentLocale={locale} />
          </div>
        </div>

        {/* 모바일 메뉴 버튼 (lg 미만에서만 표시) */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none z-[110]"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span className={`block h-0.5 w-full bg-black transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-0.5 w-full bg-black transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-full bg-black transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </div>
        </button>
      </div>

      {/* Divider - 헤더 아래 별도 줄에 위치 */}
      <div className="w-full h-0.5 bg-gray-200" />

      {/* 모바일 전체 화면 메뉴 */}
      <div
        className={`fixed inset-0 bg-white z-[105] lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={toggleMobileMenu}
          className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center focus:outline-none z-[110]"
          aria-label="Close menu"
        >
          <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center justify-center h-full space-y-6 sm:space-y-8 p-8">
          {/* 메뉴 항목들 */}
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} onClick={handleMenuClick}>
              <div className="font-noto-sans font-medium text-black text-2xl sm:text-3xl hover:text-gray-600 transition-colors cursor-pointer">
                {item.label}
              </div>
            </Link>
          ))}

          {/* 언어 전환 - 가운데 정렬 */}
          <div className="pt-6 sm:pt-8 border-t border-gray-200 w-48 flex justify-center">
            <LanguageSelector currentLocale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

