'use client';

import { useState, useEffect, useRef } from 'react';
import { PostMetadata } from '@/types';
import { useSectionScroll } from '@/hooks/useSectionScroll';
import Header from '@/components/layout/Header';

// Home Section 컴포넌트들
import HeroSection from '@/components/home/HeroSection';
import ValueSection from '@/components/home/ValueSection';
import ScrollControls from '@/components/home/ScrollControls';
import SectionIndicator from '@/components/home/SectionIndicator';

interface HomeClientProps {
  featuredPosts: PostMetadata[];
  locale: string;
}

export default function HomeClient({ locale }: HomeClientProps) {
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const SECTION_COUNT = 2; // HeroSection + ValueSection
  const AUTO_SCROLL_TIME = 5000; // 5초마다 자동 전환
  
  const { current, progress, scrollTo } = useSectionScroll(
    containerRef,
    SECTION_COUNT,
    AUTO_SCROLL_TIME
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const handlePrev = () => {
    const prev = current === 0 ? SECTION_COUNT - 1 : current - 1;
    scrollTo(prev);
  };

  const handleNext = () => {
    const next = (current + 1) % SECTION_COUNT;
    scrollTo(next);
  };

  return (
    <div className="relative bg-white overflow-hidden h-screen">
      {/* Fixed Header with Layout styles - 반응형 패딩 */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-white px-4 sm:px-8 lg:px-12">
        <Header />
      </div>
      
      {/* Full Screen Scroll Container - 휠 스크롤 비활성화 */}
      <div 
        ref={containerRef}
        className="overflow-hidden relative"
        style={{ 
          height: `${SECTION_COUNT * 100}vh`, // 섹션 개수만큼 높이 설정
          transform: `translateY(-${current * 100}vh)`,
          transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Sections */}
        <HeroSection locale={locale} />
        <ValueSection locale={locale} />
      </div>
      
      {/* Fixed UI Controls */}
      <ScrollControls
        current={current}
        total={SECTION_COUNT}
        progress={progress}
        onPrev={handlePrev}
        onNext={handleNext}
      />
      
      <SectionIndicator
        current={current}
        total={SECTION_COUNT}
        onSelect={scrollTo}
      />
    </div>
  );
} 