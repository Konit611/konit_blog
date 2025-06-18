import React from 'react';

interface FooterProps {
  locale: string;
}

export const Footer: React.FC<FooterProps> = ({ locale }) => {
  // 언어별 텍스트 정의
  const translations = {
    en: {
      brand: "Konit",
      description: "Discover amazing travel destinations around the world. From hidden gems to popular attractions, we bring you the best travel experiences and guides."
    },
    ko: {
      brand: "Konit",
      description: "전 세계의 놀라운 여행지를 발견하세요. 숨겨진 보석 같은 장소부터 인기 명소까지, 최고의 여행 경험과 가이드를 제공합니다."
    },
    zh: {
      brand: "Konit",
      description: "发现世界各地令人惊叹的旅行目的地。从隐藏的宝石到热门景点，我们为您带来最佳的旅行体验和指南。"
    },
    ja: {
      brand: "Konit",
      description: "世界中の素晴らしい旅行先を発見してください。隠れた名所から人気の観光地まで、最高の旅行体験とガイドをお届けします。"
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
