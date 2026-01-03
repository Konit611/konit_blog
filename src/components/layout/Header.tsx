'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useParams } from 'next/navigation';

export default function Header() {
  const params = useParams();
  const locale = params.locale as string;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 언어별 텍스트 정의
  const translations = {
    en: {
      brand: "KONIT",
      nav: {
        home: "Home",
        blog: "Blog",
        portfolio: "Portfolio",
        career: "Career",
        contact: "Contact"
      }
    },
    ko: {
      brand: "KONIT",
      nav: {
        home: "홈",
        blog: "블로그",
        portfolio: "포트폴리오",
        career: "경력",
        contact: "연락처"
      }
    },
    zh: {
      brand: "KONIT",
      nav: {
        home: "首页",
        blog: "博客",
        portfolio: "作品集",
        career: "职业经历",
        contact: "联系"
      }
    },
    ja: {
      brand: "KONIT",
      nav: {
        home: "ホーム",
        blog: "ブログ",
        portfolio: "ポートフォリオ",
        career: "キャリア",
        contact: "お問い合わせ"
      }
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

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

  // 페이지 이동 시 메뉴는 Next.js가 자동으로 처리
  const handleMenuClick = () => {
    // 아무것도 하지 않음 - Link가 알아서 페이지 전환
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between px-0 py-4 relative self-stretch w-full flex-[0_0_auto] z-[100] bg-white">
        {/* 로고 */}
        <div className="inline-flex h-12 items-center gap-3 relative flex-[0_0_auto]">
          <Link href={`/${locale}`}>
            <div className="relative w-fit font-serif font-medium text-black text-2xl sm:text-3xl lg:text-[42px] tracking-[-1.68px] leading-tight whitespace-nowrap cursor-pointer hover:text-gray-700 transition-colors">
              {t.brand}
            </div>
          </Link>
        </div>

        {/* 데스크톱 네비게이션 (lg 이상에서만 표시) */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8">
          <div className="inline-flex items-start gap-4 xl:gap-6 2xl:gap-8 relative flex-[0_0_auto]">
            <Link href={`/${locale}`}>
              <div className="relative w-fit font-noto-sans font-medium text-black text-lg xl:text-xl 2xl:text-[28px] tracking-[-0.28px] leading-8 whitespace-nowrap hover:text-gray-600 transition-colors cursor-pointer">
                {t.nav.home}
              </div>
            </Link>
            <Link href={`/${locale}/blog`}>
              <div className="relative w-fit font-noto-sans font-medium text-black text-lg xl:text-xl 2xl:text-[28px] tracking-[-0.28px] leading-8 whitespace-nowrap hover:text-gray-600 transition-colors cursor-pointer">
                {t.nav.blog}
              </div>
            </Link>
            <Link href={`/${locale}/portfolio`}>
              <div className="relative w-fit font-noto-sans font-medium text-black text-lg xl:text-xl 2xl:text-[28px] tracking-[-0.28px] leading-8 whitespace-nowrap hover:text-gray-600 transition-colors cursor-pointer">
                {t.nav.portfolio}
              </div>
            </Link>
            <Link href={`/${locale}/career`}>
              <div className="relative w-fit font-noto-sans font-medium text-black text-lg xl:text-xl 2xl:text-[28px] tracking-[-0.28px] leading-8 whitespace-nowrap hover:text-gray-600 transition-colors cursor-pointer">
                {t.nav.career}
              </div>
            </Link>
            <Link href={`/${locale}/contact`}>
              <div className="relative w-fit font-noto-sans font-medium text-black text-lg xl:text-xl 2xl:text-[28px] tracking-[-0.28px] leading-8 whitespace-nowrap hover:text-gray-600 transition-colors cursor-pointer">
                {t.nav.contact}
              </div>
            </Link>
          </div>

          {/* 언어 전환 드롭다운 */}
          <div className="flex items-center">
            <LanguageSwitcher currentLocale={locale} />
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
          <Link href={`/${locale}`} onClick={handleMenuClick}>
            <div className="font-noto-sans font-medium text-black text-2xl sm:text-3xl hover:text-gray-600 transition-colors cursor-pointer">
              {t.nav.home}
            </div>
          </Link>
          <Link href={`/${locale}/blog`} onClick={handleMenuClick}>
            <div className="font-noto-sans font-medium text-black text-2xl sm:text-3xl hover:text-gray-600 transition-colors cursor-pointer">
              {t.nav.blog}
            </div>
          </Link>
          <Link href={`/${locale}/portfolio`} onClick={handleMenuClick}>
            <div className="font-noto-sans font-medium text-black text-2xl sm:text-3xl hover:text-gray-600 transition-colors cursor-pointer">
              {t.nav.portfolio}
            </div>
          </Link>
          <Link href={`/${locale}/career`} onClick={handleMenuClick}>
            <div className="font-noto-sans font-medium text-black text-2xl sm:text-3xl hover:text-gray-600 transition-colors cursor-pointer">
              {t.nav.career}
            </div>
          </Link>
          <Link href={`/${locale}/contact`} onClick={handleMenuClick}>
            <div className="font-noto-sans font-medium text-black text-2xl sm:text-3xl hover:text-gray-600 transition-colors cursor-pointer">
              {t.nav.contact}
            </div>
          </Link>

          {/* 언어 전환 - 가운데 정렬 */}
          <div className="pt-6 sm:pt-8 border-t border-gray-200 w-48 flex justify-center">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>
      </div>
    </div>
  );
} 