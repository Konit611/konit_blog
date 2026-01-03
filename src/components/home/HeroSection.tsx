// components/home/HeroSection.tsx
"use client";

interface HeroSectionProps {
  locale: string;
}

const translations = {
  ko: {
    subtitle: "가치를 창조하는 제작자"
  },
  ja: {
    subtitle: "価値を創る制作者"
  },
  en: {
    subtitle: "Creator of Value"
  },
  zh: {
    subtitle: "创造价值的创作者"
  }
};

export default function HeroSection({ locale }: HeroSectionProps) {
  const t = translations[locale as keyof typeof translations] || translations.en;
  
  return (
    <section data-index="0" className="h-screen w-full snap-start flex items-center justify-center bg-bg-base">
      {/* 반응형 Margin: 모바일 16px, 태블릿 32px, 데스크톱 64px */}
      <div className="px-4 sm:px-8 lg:px-16 max-w-[90rem] w-full">
        
        {/* 반응형 그리드 레이아웃 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          
          {/* 중앙 정렬: 모바일 전체, 데스크톱 12컬럼 중 8칸 차지 */}
          <div className="col-span-1 lg:col-span-8 lg:col-start-3 text-center">
            
            {/* 타이틀: font-display-serif (검정색) */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] tracking-[0.05em] sm:tracking-[0.1em] lg:tracking-[0.15em] mb-6 sm:mb-8 leading-tight text-black transition-all duration-1000 ease-out">
              {/* KONIT: 더 크고 굵게 강조 */}
              <span className="pr-4 sm:pr-6 lg:pr-8 font-medium font-serif mb-2 transition-all duration-1000 ease-out block sm:inline">
                KONIT
              </span>
              
              {/* STUDIO: 상대적으로 작고 우아하게 배치 */}
              <span className="font-light font-serif transition-all duration-1000 delay-200 block sm:inline">
                STUDIO
              </span>
            </h1>

            {/* 서브타이틀: font-display-sans (검정색) */}
            <p className="font-sans text-base sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl text-black tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.4em] font-regular transition-all duration-1000 delay-300">
              {t.subtitle}
            </p>
            
          </div>
        </div>
      </div>
    </section>
  );
}