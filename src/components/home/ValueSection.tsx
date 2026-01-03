// components/home/ValueSection.tsx
import Image from 'next/image';

interface ValueSectionProps {
  locale: string;
}

const translations = {
  ko: {
    title: "문제에서\n가치로",
    description: "단순한 개발자가 아닌 가치를 만들기 위해 노력합니다."
  },
  ja: {
    title: "問題から\n価値を",
    description: "単なる開発者ではなく、価値を創造するために努力します。"
  },
  en: {
    title: "From Problem\nTo Value",
    description: "We create value from problems, not just a developer."
  },
  zh: {
    title: "从问题\n到价值",
    description: "我们从问题中创造价值，而不是仅仅成为一个开发者。"
  }
};

export default function ValueSection({ locale }: ValueSectionProps) {
  const t = translations[locale as keyof typeof translations] || translations.en;
  
  return (
    <section data-index="1" className="h-screen w-full snap-start flex items-center justify-center">
      {/* 반응형 Margin: 모바일 16px, 태블릿 32px, 데스크톱 64px */}
      <div className="w-full px-4 sm:px-8 lg:px-16 max-w-[90rem] mx-auto">
        {/* 반응형 그리드: 모바일 1컬럼, 데스크톱 12컬럼 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-5 items-center">
          
          {/* 이미지 영역: 모바일 전체, 데스크톱 5컬럼 */}
          <div className="col-span-1 lg:col-span-5 order-1 lg:order-1">
            <div className="relative w-full h-64 sm:h-80 md:h-96 lg:h-[500px] xl:h-[600px] rounded-2xl shadow-sm border border-black/5 overflow-hidden">
              <Image
                src="/images/Vector.png"
                alt="Value Creation"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* 텍스트 영역: 모바일 전체, 데스크톱 5컬럼 (8번째부터 시작) */}
          <div className="col-span-1 lg:col-span-5 lg:col-start-8 flex flex-col text-left order-2 lg:order-2">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-semibold leading-[1.15] mb-6 lg:mb-8 text-black whitespace-pre-line">
              {t.title}
            </h2>
            <div className="w-full h-[2px] bg-black opacity-30 mb-6 lg:mb-8" />
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl leading-[1.6] sm:leading-[1.7] lg:leading-[1.8] text-black font-sans font-regular break-keep">
              {t.description}
            </p>
          </div>
          
        </div>
      </div>
    </section>
  );
}