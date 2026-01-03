// components/common/SectionIndicator.tsx
"use client";

interface SectionIndicatorProps {
  current: number;
  total: number;
  onSelect: (idx: number) => void;
}

export default function SectionIndicator({ current, total, onSelect }: SectionIndicatorProps) {
  return (
    // 모바일에서 숨김, 데스크톱에서만 표시
    <div className="hidden lg:flex fixed right-6 xl:right-10 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
            current === i ? 'bg-black scale-150' : 'bg-black/20 hover:bg-black/40'
          }`}
          aria-label={`Go to section ${i + 1}`}
        />
      ))}
    </div>
  );
}