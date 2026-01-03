/**
 * usePagination Hook
 * Custom hook for pagination logic
 */

'use client';

import { useState, useMemo } from 'react';

interface UsePaginationOptions<T> {
  items: T[];
  itemsPerPage: number;
  initialPage?: number;
}

interface UsePaginationResult<T> {
  currentPage: number;
  totalPages: number;
  paginatedItems: T[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
}

export function usePagination<T>({
  items,
  itemsPerPage,
  initialPage = 1,
}: UsePaginationOptions<T>): UsePaginationResult<T> {
  const [currentPage, setCurrentPage] = useState(initialPage);

  // 총 페이지 수 계산
  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage);
  }, [items.length, itemsPerPage]);

  // 현재 페이지의 아이템들
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  }, [items, currentPage, itemsPerPage]);

  // 다음/이전 페이지 존재 여부
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  // 페이지 이동 함수들
  const goToPage = (page: number) => {
    const validPage = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(validPage);
    // 페이지 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPage = () => {
    if (hasNextPage) {
      goToPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (hasPrevPage) {
      goToPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    goToPage(1);
  };

  const goToLastPage = () => {
    goToPage(totalPages);
  };

  return {
    currentPage,
    totalPages,
    paginatedItems,
    hasNextPage,
    hasPrevPage,
    goToPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
  };
}

/**
 * Calculate pagination range for display
 * Returns array of page numbers with ellipsis
 */
export function calculatePaginationRange(
  currentPage: number,
  totalPages: number,
  maxDisplayed: number = 5
): (number | 'ellipsis')[] {
  if (totalPages <= maxDisplayed) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const range: (number | 'ellipsis')[] = [];
  const halfDisplay = Math.floor(maxDisplayed / 2);

  // Always show first page
  range.push(1);

  let start = Math.max(2, currentPage - halfDisplay);
  let end = Math.min(totalPages - 1, currentPage + halfDisplay);

  // Adjust if near start or end
  if (currentPage <= halfDisplay + 1) {
    end = maxDisplayed - 1;
  } else if (currentPage >= totalPages - halfDisplay) {
    start = totalPages - maxDisplayed + 2;
  }

  // Add ellipsis if needed
  if (start > 2) {
    range.push('ellipsis');
  }

  // Add middle pages
  for (let i = start; i <= end; i++) {
    range.push(i);
  }

  // Add ellipsis if needed
  if (end < totalPages - 1) {
    range.push('ellipsis');
  }

  // Always show last page
  if (totalPages > 1) {
    range.push(totalPages);
  }

  return range;
}

