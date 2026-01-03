// components/common/ScrollControls.tsx
"use client";

interface ScrollControlsProps {
  current: number;
  total: number;
  progress: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function ScrollControls({
  current,
  total,
  progress,
  onPrev,
  onNext,
}: ScrollControlsProps) {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 lg:bottom-12 lg:right-16 z-100 flex flex-col items-end gap-4 lg:gap-6 pointer-events-none">
      {/* 컨트롤 영역 */}
      <div className="flex items-center gap-6 sm:gap-8 lg:gap-10 pointer-events-auto text-black">
        <button 
          onClick={onPrev} 
          className="cursor-pointer hover:opacity-50 transition-opacity scale-75 sm:scale-90 lg:scale-100"
          aria-label="Previous section"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <span className="text-[10px] sm:text-[11px] lg:text-[12px] font-mono tracking-[0.2em]">
          {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <button 
          onClick={onNext} 
          className="cursor-pointer hover:opacity-50 transition-opacity scale-75 sm:scale-90 lg:scale-100"
          aria-label="Next section"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* 프로그레스 바 영역: 반응형 너비 */}
      <div className="relative h-0.5 w-32 sm:w-40 lg:w-48 overflow-hidden bg-black/10">
        <div
          className="absolute left-0 top-0 h-full bg-black"
          style={{
            width: `${progress}%`,
            transition: "none",
          }}
        />
      </div>
    </div>
  );
}