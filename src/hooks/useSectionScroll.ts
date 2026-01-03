// hooks/useSectionScroll.ts
import { useState, useEffect, useCallback, RefObject, useRef } from "react";

export function useSectionScroll(
  containerRef: RefObject<HTMLDivElement | null>,
  total: number,
  time: number
) {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number>(0);

  const scrollTo = useCallback((idx: number) => {
    setCurrent(idx);
  }, []);

  // 휠 스크롤 비활성화
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const preventScroll = (e: WheelEvent) => {
      e.preventDefault();
    };

    container.addEventListener('wheel', preventScroll, { passive: false });
    return () => {
      container.removeEventListener('wheel', preventScroll);
    };
  }, [containerRef]);

  // 시간 기반 프로그레스 애니메이션 및 자동 전환
  useEffect(() => {
    let start: number | null = null;

    const animate = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const p = Math.min((elapsed / time) * 100, 100);
      
      setProgress(p);

      if (elapsed < time) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        // 시간이 다 되면 다음 섹션으로 이동
        scrollTo((current + 1) % total);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameRef.current);
      setProgress(0); // 섹션이 바뀔 때 바를 즉시 0으로 리셋
    };
  }, [current, total, time, scrollTo]); // current가 바뀔 때마다 이 Effect가 재실행되며 타이머가 신선하게 시작됨

  return { current, progress, scrollTo };
}