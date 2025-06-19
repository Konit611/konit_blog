import React from 'react';

interface FooterProps {
  locale: string;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  // 언어별 텍스트 정의
  const translations = {
    en: {
      brand: "Konit",
      description: "Explore programming insights, development tutorials, and technical deep-dives. Share knowledge about modern software development, web technologies, and daily learnings (TIL)."
    },
    ko: {
      brand: "Konit",
      description: "프로그래밍 인사이트, 개발 튜토리얼, 기술 심화 내용을 탐험해보세요. 현대 소프트웨어 개발, 웹 기술, 일일 학습(TIL)에 대한 지식을 공유합니다."
    },
    zh: {
      brand: "Konit",
      description: "探索编程见解、开发教程和技术深度解析。分享现代软件开发、网络技术和日常学习(TIL)的知识。"
    },
    ja: {
      brand: "Konit",
      description: "プログラミングの洞察、開発チュートリアル、技術的な深掘りを探索してください。現代のソフトウェア開発、ウェブ技術、日々の学習(TIL)に関する知識を共有します。"
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  return (
    <div className="flex flex-col h-[228px] items-center relative self-stretch w-full z-0 bg-white">
      <div className="flex h-[172px] items-start justify-between pt-6 pb-24 px-0 relative self-stretch w-full">
        <div className="inline-flex h-8 items-center justify-center gap-1.5 relative flex-[0_0_auto]">
          <div className="inline-flex h-12 items-center gap-3 relative flex-[0_0_auto] mt-[-8.00px] mb-[-8.00px]">
            <div className="relative w-fit font-hepta-slab font-extrabold text-black text-[42px] tracking-[-1.68px] leading-[42px] whitespace-nowrap">
              {t.brand}
            </div>
          </div>
        </div>

        <div className="inline-flex items-start gap-3 relative flex-[0_0_auto]">
          <div className="relative w-6 h-6 bg-blue-600 rounded" />
          <div className="relative w-6 h-6 bg-pink-600 rounded" />
          <div className="relative w-6 h-6 bg-blue-400 rounded" />
        </div>

        <footer className="inline-flex items-start gap-12 absolute top-6 left-[229px] bg-transparent">
          <div className="flex flex-col w-[200px] items-start justify-center gap-2 relative">
            <div className="relative self-stretch mt-[-1.00px] font-libre-franklin font-semibold text-black text-[15px] tracking-[0] leading-5">
              {t.brand}
            </div>
            <p className="relative w-[947px] mr-[-747.00px] font-libre-franklin font-semibold text-[#00000099] text-[15px] tracking-[0] leading-5">
              {t.description}
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Footer;
