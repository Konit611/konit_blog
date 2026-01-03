import React from 'react';

interface FooterProps {
  locale?: string;
}

export const Footer: React.FC<FooterProps> = ({ locale = 'en' }) => {
  // 언어별 텍스트 정의
  const translations = {
    en: {
      brand: "KONIT",
      description: "Explore programming insights, development tutorials, and technical deep-dives. Share knowledge about modern software development, web technologies, and daily learnings (TIL)."
    },
    ko: {
      brand: "KONIT",
      description: "프로그래밍 인사이트, 개발 튜토리얼, 기술 심화 내용을 탐험해보세요. 현대 소프트웨어 개발, 웹 기술, 일일 학습(TIL)에 대한 지식을 공유합니다."
    },
    zh: {
      brand: "KONIT",
      description: "探索编程见解、开发教程和技术深度解析。分享现代软件开发、网络技术和日常学习(TIL)的知识。"
    },
    ja: {
      brand: "KONIT",
      description: "プログラミングの洞察、開発チュートリアル、技術的な深掘りを探索してください。現代のソフトウェア開発、ウェブ技術、日々の学習(TIL)に関する知識を共有します。"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <footer className="w-full bg-white border-t border-gray-200 py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr_auto] gap-6 md:gap-8 items-start">
        {/* 브랜드 로고 */}
        <div className="flex items-center">
          <h2 className="font-serif font-medium text-black text-[32px] md:text-[42px] tracking-[-1.68px] leading-tight">
            {t.brand}
          </h2>
        </div>

        {/* 설명 텍스트 */}
        <div className="flex flex-col gap-2">
          <div className="font-noto-sans font-semibold text-black text-[15px] leading-5">
            {t.brand}
          </div>
          <p className="font-noto-sans font-normal text-gray-600 text-[14px] md:text-[15px] leading-relaxed">
            {t.description}
          </p>
        </div>

        {/* 소셜 아이콘 */}
        <div className="flex items-center gap-3">
          <a href="#" className="w-6 h-6 bg-blue-600 rounded hover:bg-blue-700 transition-colors" aria-label="Facebook" />
          <a href="#" className="w-6 h-6 bg-pink-600 rounded hover:bg-pink-700 transition-colors" aria-label="Instagram" />
          <a href="#" className="w-6 h-6 bg-blue-400 rounded hover:bg-blue-500 transition-colors" aria-label="Twitter" />
        </div>
      </div>
    </footer>
  );
};

export default Footer; 